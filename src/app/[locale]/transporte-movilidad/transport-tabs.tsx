"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionButton } from "@/components/ui/section-button";

interface TransportTab {
  label: string;
  heading: string;
  image: string;
  imageAlt: string;
  text: string;
  buttonLabel: string;
  buttonStyle?: "solid" | "outlined" | "link";
}

interface TransportTabsProps {
  tabs: TransportTab[];
  className?: string;
}

export function TransportTabs({ tabs, className }: TransportTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = tabs[activeTab];

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Tab bar */}
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full bg-gray-100 p-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveTab(i)}
            className="relative z-10 px-5 py-2.5 text-sm font-semibold transition-colors duration-200 rounded-full"
            style={{
              color: i === activeTab ? "#ffffff" : "#1f3359",
            }}
          >
            {i === activeTab && (
              <motion.span
                layoutId="transport-pill"
                className="absolute inset-0 rounded-full bg-[#db0138]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active tab heading */}
      <AnimatePresence mode="wait">
        <motion.h3
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="text-center text-xl font-bold text-[#1f3359] md:text-2xl"
        >
          {currentTab.heading}
        </motion.h3>
      </AnimatePresence>

      {/* All tabs in same grid cell — tallest defines the height */}
      <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
        {tabs.map((tab, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              opacity: i === activeTab ? 1 : 0,
            }}
            transition={{ duration: 0.25 }}
            className={cn(
              "grid grid-cols-1 gap-6 md:grid-cols-2",
              i !== activeTab && "pointer-events-none"
            )}
            aria-hidden={i !== activeTab}
          >
            {/* Image card */}
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-lg md:min-h-0">
              <Image
                src={tab.image}
                alt={tab.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 920px) 100vw, 50vw"
              />
            </div>

            {/* Text card */}
            <div className="flex flex-col justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg md:p-10">
              <div
                className="prose max-w-none text-sm leading-relaxed text-gray-700 text-justify"
                dangerouslySetInnerHTML={{ __html: tab.text }}
              />
              <SectionButton
                label={tab.buttonLabel}
                style={tab.buttonStyle}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
