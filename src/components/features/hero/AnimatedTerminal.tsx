"use client";

const LINES = [
  "> loading developer stack...",
  "",
  "✔ .NET backend services initialized",
  "✔ Next.js frontend running",
  "✔ FastAPI microservices ready",
  "✔ Vite build pipeline active",
  "",
  "> loading projects...",
  "",
  "ArchFlow → Agile platform with DDD",
  "ACTI-case → partner management system",
  "InboxIQ → AI email triage system",
  "",
  "✔ All systems running.",
];

export function AnimatedTerminal() {
  return (
    <div
      className="w-full max-w-[640px] aspect-video rounded-xl border border-white/10 bg-white/5 backdrop-blur shadow-lg overflow-hidden fade-in-right delay-300 flex flex-col"
      style={{
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.4), 0 0 60px rgba(109,40,217,0.06)",
      }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 bg-[#0d0d0f]/80 shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden />
        <span className="text-xs text-white/50 ml-2 font-medium">terminal</span>
      </div>
      <div className="p-4 font-mono text-sm min-h-0 flex-1 overflow-auto bg-[#0d0d0f]/95">
        {LINES.map((line, i) => (
          <div
            key={i}
            className="text-white/85 leading-relaxed opacity-0 animate-terminal-line whitespace-pre"
            style={{
              animationDelay: `${i * 0.18}s`,
              animationFillMode: "forwards",
            }}
          >
            {line === "" ? "\u00A0" : line}
          </div>
        ))}
      </div>
    </div>
  );
}
