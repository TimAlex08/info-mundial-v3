import { Timer } from "lucide-react";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { COUNTDOWN_TARGET } from "@/lib/constants";

export function AnnouncementBar() {
  return (
    <div className="bg-brand-blue-dark text-white">
      <div className="mx-auto flex max-w-[var(--page-width)] items-center justify-center gap-3 px-4 py-2">
        <Timer className="h-4 w-4 shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-wider">
          Cuenta regresiva Mundial 2026
        </span>
        <CountdownTimer
          targetDate={COUNTDOWN_TARGET}
          textColor="#ff000e"
          labelColor="#ff000e"
        />
      </div>
    </div>
  );
}
