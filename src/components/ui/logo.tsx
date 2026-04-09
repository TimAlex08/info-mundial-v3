import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

interface LogoProps {
  height?: number;
  variant?: "main" | "footer";
  locale?: string;
  className?: string;
}

const LOGO_CONFIG = {
  main: {
    src: "/logos/logo-horizontal.png",
    aspectRatio: 2.5,
  },
  footer: {
    src: "/logos/logo-circle-white.png",
    aspectRatio: 1,
  },
} as const;

export function Logo({
  height = 80,
  variant = "main",
  locale = "es",
  className,
}: LogoProps) {
  const config = LOGO_CONFIG[variant];
  const width = Math.round(height * config.aspectRatio);

  return (
    <Link
      href={`/${locale}`}
      className={className}
      aria-label={SITE_NAME}
    >
      <Image
        src={config.src}
        alt={SITE_NAME}
        width={width}
        height={height}
        priority
      />
    </Link>
  );
}
