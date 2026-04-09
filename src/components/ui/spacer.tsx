import { cn } from "@/lib/utils";

export interface SpacerProps {
  desktopHeight?: number;
  mobileHeight?: number;
  className?: string;
}

export function Spacer({
  desktopHeight = 40,
  mobileHeight = 20,
  className,
}: SpacerProps) {
  return (
    <div
      className={cn("w-full", className)}
      style={
        {
          "--desktop-height": `${desktopHeight}px`,
          "--mobile-height": `${mobileHeight}px`,
          height: "var(--desktop-height)",
        } as React.CSSProperties
      }
    >
      <style>{`
        @media (max-width: 920px) {
          [style*="--desktop-height: ${desktopHeight}px"][style*="--mobile-height: ${mobileHeight}px"] {
            height: var(--mobile-height) !important;
          }
        }
      `}</style>
    </div>
  );
}
