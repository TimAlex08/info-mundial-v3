"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SocialMediaLinks } from "@/components/ui/social-media-links";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Flyout() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showTab, setShowTab] = useState(false);
  const tLayout = useTranslations("layout");

  const close = useCallback(() => {
    setIsOpen(false);
    setShowTab(true);
  }, []);

  // Scroll trigger at 75%
  useEffect(() => {
    if (hasTriggered) return;

    const onScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.75) {
        setHasTriggered(true);
        setIsOpen(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasTriggered]);

  return (
    <>
      {/* Sticky Tab */}
      {showTab && !isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-1/2 z-[27] -translate-x-1/2 rounded-full bg-brand-red px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-opacity hover:opacity-90"
        >
          {tLayout("learn_more")}
        </button>
      )}

      {/* Flyout Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-0 right-0 top-0 z-[27] flex w-[480px] max-w-full flex-col bg-brand-red text-white shadow-2xl"
          >
            {/* Close */}
            <div className="flex justify-end px-6 pt-4">
              <button
                type="button"
                onClick={close}
                aria-label={tLayout("close")}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center px-8 pb-8">
              <SocialMediaLinks
                links={SOCIAL_LINKS}
                heading={tLayout("follow_us")}
                className="items-center text-center"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
