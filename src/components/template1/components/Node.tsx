"use client";
import React from "react";
import { Users, GitMerge, Database, Layers, Server } from "lucide-react";
import type { NodeProps } from "../types/simulatorTypes";

export const Node = React.forwardRef<HTMLDivElement, NodeProps>(
  ({ id, type, title, status, isActive = true, isDead = false, onClick, icon }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        onClick={onClick}
        className={`relative flex flex-col items-center justify-center p-4 border-2 transition-all duration-300 z-10 ${
          onClick ? "cursor-pointer hover:scale-105" : ""
        } ${
          isDead
            ? "bg-red-950/30 border-red-500/50 opacity-80"
            : type === "client"
            ? "bg-slate-800 border-slate-600"
            : type === "lb"
            ? "bg-blue-950/30 border-blue-500/50"
            : type === "db"
            ? "bg-yellow-950/30 border-yellow-500/50"
            : type === "cache"
            ? "bg-green-950/30 border-green-500/50 border-dashed"
            : "bg-slate-800 border-slate-600 hover:border-cyan-400"
        } ${
          type === "server" && !isDead ? "hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]" : ""
        } rounded-sm min-w-[100px] min-h-[80px]`}
      >
        <div className="mb-2 text-slate-300">
          {icon || (
            type === "client" ? <Users size={20} /> :
            type === "lb" ? <GitMerge size={20} /> :
            type === "db" ? <Database size={20} /> :
            type === "cache" ? <Layers size={20} /> :
            <Server size={20} />
          )}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-1">
          {title}
        </span>
        {status && (
          <span className={`font-mono text-[9px] ${
            isDead ? "text-red-400" : "text-slate-400"
          }`}>
            {status}
          </span>
        )}
        
        {/* Toggle Button for Servers */}
        {type === "server" && (
          <div className={`mt-2 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider rounded cursor-pointer transition-colors ${
            isDead 
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
              : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
          }`}>
            {isDead ? "Restart" : "Active"}
          </div>
        )}
      </div>
    );
  }
);
Node.displayName = "Node";
