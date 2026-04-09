import { cn } from "@/lib/utils";

export interface DividerProps {
  opacity?: number;
  paddingTop?: number;
  paddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  className?: string;
}

export function Divider({
  opacity = 0.15,
  paddingTop = 0,
  paddingBottom = 0,
  mobilePaddingTop,
  mobilePaddingBottom,
  className,
}: DividerProps) {
  return (
    <div
      className={cn("w-full", className)}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <hr
        className="border-0 h-px w-full"
        style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
      />
      {(mobilePaddingTop !== undefined || mobilePaddingBottom !== undefined) && (
        <style>{`
          @media (max-width: 920px) {
            .divider-responsive {
              padding-top: ${mobilePaddingTop ?? paddingTop}px !important;
              padding-bottom: ${mobilePaddingBottom ?? paddingBottom}px !important;
            }
          }
        `}</style>
      )}
    </div>
  );
}
