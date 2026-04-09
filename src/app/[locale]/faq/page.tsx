import { setRequestLocale } from "next-intl/server";
import { CollapsibleTabs } from "@/components/sections/collapsible-tabs";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CollapsibleTabs
      sectionWidth="narrow"
      desktopPaddingTop={-160}
      mobilePaddingTop={-80}
      blocks={[
        {
          type: "topic",
          heading: "Shipping",
          text: "<p>Shipping charges for your order will be calculated and displayed at checkout.</p>",
        },
        {
          type: "tab",
          heading: "What delivery options do you offer?",
          content:
            "<p>We offer several delivery options, including standard shipping, express shipping, and, for some items, in-store pickup. Delivery times and costs vary depending on the option chosen and the delivery location.</p>",
        },
        {
          type: "tab",
          heading: "Can I track my order?",
          content:
            "<p>Yes, once your order is dispatched, we will send you a tracking number via email. You can use this number to track your order's progress on our carrier's website.</p>",
        },
        {
          type: "tab",
          heading: "Do you ship internationally?",
          content:
            "<p>Yes, we do offer international shipping. However, shipping times and costs will vary depending on the destination country. Please note that international customers are responsible for any customs fees or taxes incurred.</p>",
        },
      ]}
    />
  );
}
