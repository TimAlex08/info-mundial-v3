"use client";

import Image from "next/image";
import { useCallback } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";
import { SectionButton } from "@/components/ui/section-button";

type MediaRatio = "original" | "portrait" | "landscape" | "square" | "wide";

export interface EventItem {
  image?: string;
  imageAlt?: string;
  heading?: string;
  description?: string;
  location?: string;
  timezone?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  detailsButtonLabel?: string;
  detailsHref?: string;
  detailsTargetBlank?: boolean;
  buyTicketsButtonLabel?: string;
  buyTicketsHref?: string;
  buyTicketsTargetBlank?: boolean;
  enableAddToCalendar?: boolean;
}

export interface EventsProps {
  heading?: string;
  events: EventItem[];
  maxColumns?: "1" | "2" | "3";
  mobileColumns?: 1 | 2;
  mediaRatio?: MediaRatio;
  showDate?: boolean;
  detailsButtonStyle?: "solid" | "outlined" | "link";
  buyTicketsButtonStyle?: "solid" | "outlined" | "link";
  addToCalendarLabel?: string;
  addToCalendarButtonStyle?: "solid" | "outlined" | "link";
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
  sectionWidth?: "wide" | "narrow";
  desktopPaddingTop?: number;
  desktopPaddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  id?: string;
  className?: string;
}

const ratioClasses: Record<MediaRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(dateStr: string) {
  const [, , day] = dateStr.split("-");
  const [year, month] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1);
  const monthStr = date.toLocaleDateString("en-US", { month: "short" });
  return { day: day, month: monthStr };
}

function isValidDate(dateStr?: string): boolean {
  if (!dateStr) return false;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return false;
  const [year, month, day] = parts;
  if (year.length !== 4 || month.length !== 2 || day.length !== 2)
    return false;
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  return m >= 1 && m <= 12 && d >= 1 && d <= 31;
}

function generateICS(event: EventItem) {
  const uid = `${Date.now()}-${Math.floor(Math.random() * 10000)}@mundial-mty.com`;
  const tz = event.timezone || "America/Monterrey";
  const title = event.heading || "";
  const desc = event.description
    ? event.description.replace(/<[^>]*>/g, "")
    : "";
  const location = event.location || "";

  const startDateClean = (event.startDate || "").replace(/-/g, "");
  const endDateClean = (event.endDate || event.startDate || "").replace(
    /-/g,
    ""
  );
  const startTimeClean = event.startTime
    ? `T${event.startTime.replace(":", "")}00`
    : "";
  const endTimeClean = event.endTime
    ? `T${event.endTime.replace(":", "")}00`
    : event.startTime
      ? "T235900"
      : "";

  const hasTime = startTimeClean || endTimeClean;
  let dtstart: string;
  let dtend: string;

  if (!hasTime) {
    dtstart = `DTSTART;VALUE=DATE:${startDateClean}`;
    dtend = `DTEND;VALUE=DATE:${endDateClean}`;
  } else {
    dtstart = `DTSTART;TZID=${tz}:${startDateClean}${startTimeClean}`;
    dtend = `DTEND;TZID=${tz}:${endDateClean}${endTimeClean}`;
  }

  const vtimezone = hasTime
    ? `BEGIN:VTIMEZONE\nTZID:${tz}\nBEGIN:STANDARD\nDTSTART:19700101T000000\nTZOFFSETFROM:+0000\nTZOFFSETTO:+0000\nTZNAME:${tz}\nEND:STANDARD\nEND:VTIMEZONE`
    : "";

  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0];

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
PRODID:-//MundialMTY//NONSGML v1.0//EN
${vtimezone}
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}Z
${dtstart}
${dtend}
SUMMARY:${title}
DESCRIPTION:${desc}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:REMINDER
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "event.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function resolveColumns(max: string, count: number): number {
  const m = parseInt(max, 10);
  return Math.min(m, count);
}

export function Events({
  heading,
  events,
  maxColumns = "1",
  mobileColumns = 2,
  mediaRatio = "original",
  showDate = true,
  detailsButtonStyle = "outlined",
  buyTicketsButtonStyle = "solid",
  addToCalendarLabel = "Add to calendar",
  addToCalendarButtonStyle = "link",
  colorType = "default",
  backgroundColor,
  textColor,
  sectionWidth = "wide",
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: EventsProps) {
  if (events.length === 0) return null;

  const columns = resolveColumns(maxColumns, events.length);

  const gridCols: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
  };

  return (
    <SectionWrapper
      id={id}
      sectionWidth={sectionWidth}
      colorType={colorType}
      backgroundColor={backgroundColor}
      textColor={textColor}
      desktopPaddingTop={desktopPaddingTop}
      desktopPaddingBottom={desktopPaddingBottom}
      mobilePaddingTop={mobilePaddingTop}
      mobilePaddingBottom={mobilePaddingBottom}
      className={className}
    >
      {heading && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
        </div>
      )}

      <div
        className={cn(
          "grid gap-6",
          mobileColumns === 2 ? "grid-cols-2" : "grid-cols-1",
          gridCols[columns] || "md:grid-cols-1"
        )}
      >
        {events.map((event, i) => {
          const hasValidStart = isValidDate(event.startDate);
          const hasValidEnd = isValidDate(event.endDate);
          const shortDate = hasValidStart
            ? formatShortDate(event.startDate!)
            : null;

          return (
            <div key={i} className="flex flex-col">
              {/* Date line (above image for multi-col) */}
              {hasValidStart && columns > 1 && (
                <p className="mb-2 text-sm">
                  {formatDate(event.startDate!)}
                  {event.startTime && ` ${event.startTime}`}
                  {(hasValidEnd || event.endTime) && " — "}
                  {hasValidEnd &&
                    event.startDate !== event.endDate &&
                    formatDate(event.endDate!)}
                  {event.endTime && ` ${event.endTime}`}
                </p>
              )}

              {/* Image with date badge */}
              {event.image && (
                <div className="relative">
                  <div
                    className={cn(
                      "relative w-full overflow-hidden rounded-[var(--images-and-section-radius)]",
                      ratioClasses[mediaRatio]
                    )}
                  >
                    <Image
                      src={event.image}
                      alt={event.imageAlt || ""}
                      fill
                      className="object-cover"
                      sizes={`(max-width: 920px) ${mobileColumns === 2 ? "50vw" : "100vw"}, ${Math.round(100 / columns)}vw`}
                    />
                  </div>
                  {showDate && shortDate && (
                    <div className="absolute bottom-3 left-3 flex flex-col items-center rounded bg-white px-3 py-1.5 text-center leading-tight text-black shadow">
                      <span className="text-xl font-bold">{shortDate.day}</span>
                      <span className="text-xs uppercase">{shortDate.month}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Event info */}
              <div className="mt-3 flex flex-col gap-2">
                {/* Date line (for single column layout) */}
                {hasValidStart && columns === 1 && (
                  <p className="text-sm">
                    {formatDate(event.startDate!)}
                    {event.startTime && ` ${event.startTime}`}
                    {(hasValidEnd || event.endTime) && " — "}
                    {hasValidEnd &&
                      event.startDate !== event.endDate &&
                      formatDate(event.endDate!)}
                    {event.endTime && ` ${event.endTime}`}
                  </p>
                )}

                {event.heading && (
                  <h3 className="text-lg font-bold">{event.heading}</h3>
                )}

                {event.location && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <p>{event.location}</p>
                  </div>
                )}

                {event.description && (
                  <div
                    className="prose max-w-none text-sm opacity-80"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                )}

                {/* Buttons */}
                {(event.detailsButtonLabel ||
                  event.buyTicketsButtonLabel ||
                  event.enableAddToCalendar) && (
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {event.detailsButtonLabel && (
                      <SectionButton
                        label={event.detailsButtonLabel}
                        href={event.detailsHref}
                        style={detailsButtonStyle}
                        targetBlank={event.detailsTargetBlank}
                      />
                    )}
                    {event.buyTicketsButtonLabel && (
                      <SectionButton
                        label={event.buyTicketsButtonLabel}
                        href={event.buyTicketsHref}
                        style={buyTicketsButtonStyle}
                        targetBlank={event.buyTicketsTargetBlank}
                      />
                    )}
                    {event.enableAddToCalendar && hasValidStart && (
                      <button
                        type="button"
                        onClick={() => generateICS(event)}
                        className={cn(
                          "text-sm underline underline-offset-2 transition-opacity hover:opacity-70",
                          addToCalendarButtonStyle === "solid" &&
                            "rounded bg-current px-4 py-2 no-underline",
                          addToCalendarButtonStyle === "outlined" &&
                            "rounded border border-current px-4 py-2 no-underline"
                        )}
                      >
                        {addToCalendarLabel}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
