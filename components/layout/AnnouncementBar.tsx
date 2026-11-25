import { brand } from "@/data/siteContent";

/**
 * Thin announcement strip above the navbar. Swap `brand.tagline`
 * in data/siteContent.ts to change the message — no component
 * edits needed.
 */
export default function AnnouncementBar() {
  return (
    // Fixed h-11 (44px) so the Home hero can size itself against a
    // known --announcement-height in globals.css instead of guessing
    // at this bar's padding-driven height. Centering is now handled
    // by flex instead of vertical padding, so the visual result is
    // unchanged.
    <div className="h-11 flex items-center justify-center bg-moss text-linen">
      <p className="eyebrow text-center px-4 tracking-[0.16em]">
        {brand.tagline}
      </p>
    </div>
  );
}
