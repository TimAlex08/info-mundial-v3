"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface CountdownTimerProps {
  targetDate: string;
  textColor?: string;
  labelColor?: string;
  showLabels?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({
  targetDate,
  textColor = "#ff000e",
  labelColor = "#ff000e",
  showLabels = true,
}: CountdownTimerProps) {
  const t = useTranslations("sections.countdown_timer");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calcTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { key: "days", value: timeLeft.days, label: t("days_short") },
    { key: "hours", value: timeLeft.hours, label: t("hours_short") },
    { key: "minutes", value: timeLeft.minutes, label: t("minutes_short") },
    { key: "seconds", value: timeLeft.seconds, label: t("seconds_short") },
  ];

  return (
    <div className="flex items-center gap-1 font-bold tabular-nums">
      {units.map((unit, i) => (
        <span key={unit.key} className="flex items-center gap-0.5">
          <span style={{ color: textColor }}>
            {String(unit.value).padStart(2, "0")}
          </span>
          {showLabels && (
            <span
              className="text-[0.65em] uppercase"
              style={{ color: labelColor }}
            >
              {unit.label}
            </span>
          )}
          {i < units.length - 1 && (
            <span className="mx-0.5" style={{ color: textColor }}>
              :
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
