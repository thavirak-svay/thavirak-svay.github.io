import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thavirak Svay - Backend Engineer",
  description: "Backend Developer with 5+ Years building scalable distributed systems and microservices across fintech, banking, e-commerce, and healthcare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
