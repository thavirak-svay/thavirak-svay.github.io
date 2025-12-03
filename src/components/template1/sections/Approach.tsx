"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Send, Zap, ZapOff, RotateCcw } from "lucide-react";
import { Node } from "../components/Node";
import type { Packet, ServerState } from "../types/simulatorTypes";

export const Approach = () => {
  // State
  const [servers, setServers] = useState<ServerState[]>([
    { id: "s1", active: true, name: "Server A" },
    { id: "s2", active: true, name: "Server B" },
    { id: "s3", active: true, name: "Server C" },
  ]);
  const [stats, setStats] = useState({ total: 0, success: 0, fail: 0, cache: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [isSpamming, setIsSpamming] = useState(false);

  // Refs for positioning
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const spamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const serverIndexRef = useRef(0);

  // Helper to add log
  const addLog = (msg: string, type: "info" | "success" | "error" = "info") => {
    const timestamp = new Date().toLocaleTimeString().split(" ")[0];
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 8));
  };

  // Helper to get node position relative to container
  const getNodePos = (id: string) => {
    const node = nodesRef.current[id];
    const container = containerRef.current;
    if (!node || !container) return { x: 0, y: 0 };

    const nodeRect = node.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return {
      x: nodeRect.left - containerRect.left + nodeRect.width / 2,
      y: nodeRect.top - containerRect.top + nodeRect.height / 2,
    };
  };

  // Toggle Server Status
  const toggleServer = (index: number) => {
    setServers(prev => {
      const newServers = [...prev];
      // Create a new object reference to avoid direct mutation
      newServers[index] = { ...newServers[index], active: !newServers[index].active };
      
      addLog(
        `Server ${newServers[index].name} ${newServers[index].active ? "rebooted" : "crashed"}`, 
        newServers[index].active ? "success" : "error"
      );
      return newServers;
    });
  };

  // Core Logic: Send Request
  const sendRequest = async () => {
    setStats(prev => ({ ...prev, total: prev.total + 1 }));
    
    // 1. Create Packet at Client
    const packetId = Date.now() + Math.random();
    const clientPos = getNodePos("client");
    
    // Initial Packet State
    setPackets(prev => [...prev, { id: packetId, type: "request", x: clientPos.x, y: clientPos.y }]);

    // Helper to move packet
    const movePacket = async (targetId: string, duration = 800) => {
      const targetPos = getNodePos(targetId);
      setPackets(prev => prev.map(p => p.id === packetId ? { ...p, x: targetPos.x, y: targetPos.y } : p));
      await new Promise(r => setTimeout(r, duration));
    };

    // 1. Client -> LB
    // Wait a bit for initial render at Client
    await new Promise(r => setTimeout(r, 100));
    await movePacket("lb");

    // 2. LB Logic (Round Robin)
    let targetServer = null;
    const activeServers = servers.filter(s => s.active);
    
    if (activeServers.length > 0) {
      // Simple Round Robin finding next active server
      let attempts = 0;
      while (attempts < servers.length) {
        serverIndexRef.current = (serverIndexRef.current + 1) % servers.length;
        if (servers[serverIndexRef.current].active) {
          targetServer = servers[serverIndexRef.current];
          break;
        }
        attempts++;
      }
    }

    if (!targetServer) {
      // 503 Error
      setPackets(prev => prev.map(p => p.id === packetId ? { ...p, type: "error" } : p));
      addLog("503 Service Unavailable: No healthy servers", "error");
      setStats(prev => ({ ...prev, fail: prev.fail + 1 }));
      setTimeout(() => setPackets(prev => prev.filter(p => p.id !== packetId)), 800);
      return;
    }

    // 3. LB -> Server
    await movePacket(targetServer.id);

    // 4. Server Logic (Cache vs DB)
    const isCacheHit = Math.random() < 0.4; // 40% hit rate

    if (isCacheHit) {
      await movePacket("cache", 600);
      setPackets(prev => prev.map(p => p.id === packetId ? { ...p, type: "cache-response" } : p));
      addLog(`Cache HIT handled by ${targetServer.name}`, "success");
      setStats(prev => ({ ...prev, cache: prev.cache + 1 }));
      await movePacket(targetServer.id, 600);
    } else {
      await movePacket("db", 1000);
      setPackets(prev => prev.map(p => p.id === packetId ? { ...p, type: "db-response" } : p));
      addLog(`DB Query processed by ${targetServer.name}`, "info");
      await movePacket(targetServer.id, 1000);
    }

    // 5. Server -> Client
    await movePacket("client", 800);
    setStats(prev => ({ ...prev, success: prev.success + 1 }));
    
    // Cleanup
    setPackets(prev => prev.filter(p => p.id !== packetId));
  };

  // Auto-play Logic
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || isSpamming) return;
    const interval = setInterval(() => {
      sendRequest();
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlay, isSpamming, servers]);

  // Auto-failover Demo
  useEffect(() => {
    const timer = setTimeout(() => {
      // Automatically kill Server A after 8 seconds to demonstrate failover
      setServers(prev => {
        const newServers = [...prev];
        if (newServers[0].active) {
          newServers[0] = { ...newServers[0], active: false };
          addLog("Simulated Failure: Server A crashed!", "error");
        }
        return newServers;
      });
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Spam Logic (Smoother)
  useEffect(() => {
    if (isSpamming) {
      // Slowed down from 200ms to 600ms for less chaos
      spamIntervalRef.current = setInterval(sendRequest, 600);
    } else {
      if (spamIntervalRef.current) clearInterval(spamIntervalRef.current);
    }
    return () => {
      if (spamIntervalRef.current) clearInterval(spamIntervalRef.current);
    };
  }, [isSpamming, servers]);

  return (
    <section id="process" className="py-20 md:py-32 px-6 md:px-20 relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
              BACKEND <span className="text-slate-500">PLAYGROUND</span>
            </h2>
            <p className="font-mono text-sm text-slate-300">
              Interactive distributed system simulator. Visualize traffic flow, load balancing, and failover.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto md:h-[600px] lg:h-[500px]">
          {/* Simulator Area */}
          <div 
            ref={containerRef}
            className="lg:col-span-2 bg-slate-900/50 border border-white/5 rounded-sm relative overflow-hidden p-4 md:p-8 flex flex-col justify-between"
          >
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-2 md:gap-4 h-full relative z-10">
              {/* Client (Left, Centered vertically) */}
              <div className="col-span-1 row-span-1 md:row-span-3 flex items-center justify-center py-4 md:py-0">
                <Node 
                  ref={el => { nodesRef.current["client"] = el; }}
                  id="client" 
                  type="client" 
                  title="User" 
                  status="Browser/Mobile" 
                />
              </div>

              {/* LB (Middle-Left, Centered) */}
              <div className="col-span-1 row-span-1 md:row-span-3 flex items-center justify-center py-4 md:py-0">
                <Node 
                  ref={el => { nodesRef.current["lb"] = el; }}
                  id="lb" 
                  type="lb" 
                  title="Load Balancer" 
                  status="Round Robin" 
                />
              </div>

              {/* Servers (Middle-Right, Stacked) */}
              <div className="col-span-1 row-span-1 md:row-span-3 flex flex-row md:flex-col justify-between items-center py-4 md:py-4 gap-2 md:gap-0">
                {servers.map((server, i) => (
                  <Node
                    key={server.id}
                    ref={el => { nodesRef.current[server.id] = el; }}
                    id={server.id}
                    type="server"
                    title={server.name}
                    status={server.active ? "Online" : "Offline"}
                    isDead={!server.active}
                    onClick={() => toggleServer(i)}
                  />
                ))}
              </div>

              {/* DB & Cache (Right, Stacked) */}
              <div className="col-span-1 row-span-1 md:row-span-3 flex flex-row md:flex-col justify-around items-center py-4 md:py-0 gap-4 md:gap-0">
                <Node 
                  ref={el => { nodesRef.current["db"] = el; }}
                  id="db" 
                  type="db" 
                  title="Primary DB" 
                  status="PostgreSQL" 
                />
                <Node 
                  ref={el => { nodesRef.current["cache"] = el; }}
                  id="cache" 
                  type="cache" 
                  title="Cache" 
                  status="Redis (40% Hit)" 
                />
              </div>
            </div>

            {/* Packets Layer */}
            {packets.map(packet => (
              <motion.div
                key={packet.id}
                initial={false}
                animate={{ 
                  x: packet.x - 6, // Center offset
                  y: packet.y - 6 
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.4 }} // Duration handled by logic, but this smooths updates
                className={`absolute w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] z-50 pointer-events-none ${
                  packet.type === "error" ? "bg-red-500 text-red-500" :
                  packet.type === "db-response" ? "bg-yellow-400 text-yellow-400" :
                  packet.type === "cache-response" ? "bg-green-400 text-green-400" :
                  "bg-cyan-400 text-cyan-400"
                }`}
                style={{ left: 0, top: 0 }} // Position controlled by x/y transform
              />
            ))}
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none" />
            
            {/* Controls Overlay */}
            <div className="relative md:absolute md:bottom-6 md:left-6 mt-8 md:mt-0 z-20 flex flex-wrap gap-2 justify-center md:justify-start">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`group relative p-2 border rounded-md transition-all active:scale-95 backdrop-blur-sm ${
                  isAutoPlay
                    ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                    : "bg-slate-900/80 border-slate-700 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-white/10 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
                  {isAutoPlay ? "Pause" : "Resume"}
                </span>
              </button>
              <button
                onClick={() => sendRequest()}
                className="group relative p-2 bg-slate-900/80 border border-slate-700 text-slate-400 rounded-md hover:bg-slate-800 transition-all active:scale-95 backdrop-blur-sm"
              >
                <Send size={16} />
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-white/10 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
                  Send Once
                </span>
              </button>
              <button
                onClick={() => {
                  setIsSpamming(!isSpamming);
                  if (!isSpamming) setIsAutoPlay(false);
                }}
                className={`group relative p-2 border rounded-md transition-all active:scale-95 backdrop-blur-sm ${
                  isSpamming 
                    ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse" 
                    : "bg-yellow-500/10 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
                }`}
              >
                {isSpamming ? <ZapOff size={16} /> : <Zap size={16} />}
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-white/10 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
                  {isSpamming ? "Stop Spike" : "Spike Traffic"}
                </span>
              </button>
              <button
                onClick={() => {
                  setStats({ total: 0, success: 0, fail: 0, cache: 0 });
                  setLogs([]);
                  setServers(prev => prev.map(s => ({ ...s, active: true })));
                }}
                className="group relative p-2 bg-slate-900/80 border border-slate-700 text-slate-400 rounded-md hover:bg-slate-800 transition-all active:scale-95 backdrop-blur-sm"
              >
                <RotateCcw size={16} />
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-white/10 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
                  Reset
                </span>
              </button>
            </div>
          </div>

          {/* Dashboard / Logs */}
          <div className="flex flex-col gap-4">
            {/* Stats */}
            <div className="bg-black/40 border border-white/10 p-4 rounded-sm">
              <h3 className="text-slate-400 text-[10px] uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Live Metrics</h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Requests</span>
                  <span className="text-white">{stats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Successful</span>
                  <span className="text-emerald-400">{stats.success}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Failed (503)</span>
                  <span className="text-red-400">{stats.fail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cache Hits</span>
                  <span className="text-yellow-400">{stats.cache}</span>
                </div>
              </div>
            </div>

            {/* Logs */}
            <div className="flex-1 bg-black/40 border border-white/10 p-4 rounded-sm overflow-hidden flex flex-col">
              <h3 className="text-slate-400 text-[10px] uppercase tracking-widest mb-3 border-b border-white/5 pb-2">System Logs</h3>
              <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1.5 scrollbar-hide">
                {logs.length === 0 && <span className="text-slate-400 italic">System initialized... waiting for traffic.</span>}
                {logs.map((log, i) => (
                  <div key={i} className={`${
                    log.includes("error") || log.includes("crashed") ? "text-red-400" :
                    log.includes("success") || log.includes("rebooted") || log.includes("HIT") ? "text-emerald-400" :
                    "text-slate-300"
                  }`}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
