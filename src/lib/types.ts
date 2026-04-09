export interface MenuItem {
  key: string;
  href: string;
  children?: MenuItem[];
}

export interface SocialLink {
  platform: "instagram" | "tiktok" | "facebook" | "youtube";
  url: string;
  label: string;
}
