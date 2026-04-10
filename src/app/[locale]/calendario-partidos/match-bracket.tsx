"use client";

import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";

interface MatchData {
  month: string;
  day: string;
  year: string;
  image: string;
  imageAlt: string;
  team1: string;
  team2: string;
  venue: string;
  label: string;
  accent: string;
  accentDark: string;
}

const MATCHES: MatchData[] = [
  {
    month: "MAR",
    day: "26",
    year: "2026",
    image: "/images/calendarios/partido_1.jpeg",
    imageAlt: "Bolivia vs Surinam",
    team1: "Bolivia",
    team2: "Surinam",
    venue: "Estadio Monterrey",
    label: "Partido de repechaje",
    accent: "#2e4785",
    accentDark: "#1f3359",
  },
  {
    month: "MAR",
    day: "31",
    year: "2026",
    image: "/images/calendarios/partido_2.jpeg",
    imageAlt: "Clasificación al Mundial vs Irak",
    team1: "Por definir",
    team2: "Irak",
    venue: "Estadio Monterrey",
    label: "Por el último boleto al Mundial",
    accent: "#82bbe8",
    accentDark: "#2e4785",
  },
];

function MatchCard({ match }: { match: MatchData }) {
  const isLightAccent = match.accent === "#82bbe8";
  const dateTextColor = isLightAccent ? "#1f3359" : "#ffffff";
  const labelTextColor = isLightAccent ? "#1f3359" : "#ffffff";

  return (
    <div className="overflow-hidden rounded-lg bg-[#fafafa] shadow-[0_4px_16px_rgba(0,0,0,0.22)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col md:flex-row">
        {/* ── Date block ── */}
        <div
          className="flex shrink-0 flex-row items-center justify-center gap-3 px-6 py-4 md:w-[130px] md:flex-col md:gap-0 md:px-0 md:py-10"
          style={{ backgroundColor: match.accent, color: dateTextColor }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            {match.month}
          </span>
          <span className="text-4xl font-black leading-none md:my-1 md:text-5xl">
            {match.day}
          </span>
          <span className="text-xs font-semibold tracking-widest">
            {match.year}
          </span>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col gap-5 p-5 md:flex-row md:items-center md:gap-7 md:p-7">
          {/* Player image — square with solid border */}
          <div
            className="relative mx-auto h-[110px] w-[110px] shrink-0 overflow-hidden rounded-lg border-[3px] md:mx-0 md:h-[120px] md:w-[120px]"
            style={{ borderColor: match.accent }}
          >
            <Image
              src={match.image}
              alt={match.imageAlt}
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <span
              className="mb-1.5 inline-block rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: match.accent, color: labelTextColor }}
            >
              {match.label}
            </span>

            <h3 className="mb-2 mt-2 text-xl font-extrabold uppercase tracking-tight text-[#1f3359] md:text-2xl">
              {match.team1}{" "}
              <span className="font-bold text-[#82bbe8]">vs</span>{" "}
              {match.team2}
            </h3>

            <div className="flex items-center justify-center gap-1.5 text-sm text-[#2e4785] md:justify-start">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">{match.venue}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex shrink-0 justify-center pt-1 md:pt-0">
            <button
              type="button"
              className="rounded-lg bg-[#db0138] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_3px_0_#a50029] transition-all duration-150 hover:bg-[#f01245] active:translate-y-[2px] active:shadow-[0_1px_0_#a50029]"
            >
              Detalles del Partido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MatchBracket() {
  return (
    <section className="w-full bg-[#1f3359] py-16 md:py-24">
      <div className="mx-auto w-full px-6 md:max-w-[66%] md:px-0">
        {/* ── Heading ── */}
        <div className="mb-10 md:mb-14">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#82bbe8]">
            Monterrey 2026
          </p>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
            Pr&oacute;ximos Partidos
          </h2>
          <div className="mt-3 h-1 w-16 rounded-sm bg-[#db0138]" />
        </div>

        {/* ── Card list ── */}
        <div className="flex flex-col gap-5">
          {/* Match 1 */}
          <MatchCard match={MATCHES[0]} />

          {/* Bracket connector — flat, minimal */}
          <div className="flex flex-col items-center gap-1 py-1">
            <div className="h-5 w-px bg-[#82bbe8]" />
            <span className="rounded bg-[#2e4785] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#82bbe8]">
              El ganador avanza
            </span>
            <ChevronDown className="h-4 w-4 text-[#82bbe8]" />
          </div>

          {/* Match 2 */}
          <MatchCard match={MATCHES[1]} />
        </div>
      </div>
    </section>
  );
}
