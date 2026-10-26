import { Database, Monitor, Radio, Server, type LucideIcon } from "lucide-react";
import type { Diagram } from "./projects-data";

function Node({
  Icon,
  label,
  sub,
  accent = false,
}: {
  Icon: LucideIcon;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "flex w-[5.25rem] shrink-0 flex-col items-center gap-1.5 border bg-surface px-1.5 py-2.5 shadow-[0_6px_16px_-10px_rgba(10,10,10,0.45)] " +
        (accent ? "border-ink" : "border-line-strong")
      }
    >
      <span
        className={
          "flex h-8 w-8 items-center justify-center " + (accent ? "bg-ink text-page" : "border border-line bg-page text-ink")
        }
      >
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="text-[0.62rem] font-bold uppercase leading-none tracking-wide text-ink">{label}</span>
      <span className="max-w-full truncate font-mono text-[0.55rem] leading-none text-muted">{sub}</span>
    </div>
  );
}

function Link() {
  return (
    <span className="arch-link relative -mx-px h-px min-w-3 flex-1" aria-hidden>
      <span className="absolute -right-0.5 -top-[3px] h-[7px] w-[7px] rotate-45 border-r border-t border-ink" />
    </span>
  );
}

export function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <div
      className="relative flex h-44 w-full flex-col items-center justify-center gap-0 overflow-hidden border-b border-line bg-page"
      aria-hidden
    >
      <div className="arch-grid absolute inset-0" />
      <div className="relative flex w-full items-center justify-center px-4">
        <Node Icon={Monitor} label="Client" sub={diagram.client} />
        <Link />
        <Node Icon={Server} label="API" sub={diagram.api} accent />
        <Link />
        <Node Icon={Database} label="DB" sub={diagram.db} />
      </div>
      {diagram.side && (
        <div className="relative flex flex-col items-center">
          <span className="arch-link-v h-3 w-px" />
          <span className="flex items-center gap-1.5 border border-line-strong bg-surface px-2 py-1 font-mono text-[0.55rem] text-muted">
            <Radio className="h-2.5 w-2.5 text-ink" strokeWidth={2} aria-hidden />
            {diagram.side}
          </span>
        </div>
      )}
    </div>
  );
}
