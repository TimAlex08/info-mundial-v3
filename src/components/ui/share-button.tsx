"use client";

import { useState, useCallback } from "react";
import { Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ShareButtonProps {
  url: string;
  title?: string;
  className?: string;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareButton({ url, title = "", className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [url]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <a
        href={`https://www.facebook.com/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition-opacity hover:opacity-70"
        aria-label="Share on Facebook"
      >
        <FacebookIcon className="h-4 w-4" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition-opacity hover:opacity-70"
        aria-label="Share on X"
      >
        <XIcon className="h-4 w-4" />
      </a>

      <button
        type="button"
        onClick={copyLink}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition-opacity hover:opacity-70"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
