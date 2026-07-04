import type { HTMLAttributes } from "react";

type CardShadow = "ink" | "pink" | "blue" | "mint";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  shadow?: CardShadow;
};

const SHADOW_CLASS: Record<CardShadow, string> = {
  ink: "card-sticky--ink",
  pink: "card-sticky--pink",
  blue: "card-sticky--blue",
  mint: "card-sticky--mint",
};

/**
 * Generic rounded, black-outlined container with the sticky-note offset
 * shadow, per FRD §3.3/§6.3. Reusable version of the `card-sticky
 * card-sticky--*` className pairs used inline everywhere so far (landing
 * page mode cards, auth card, admin upload box, etc.) — swap those in when
 * convenient, not required.
 */
export default function Card({
  shadow = "ink",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`card-sticky ${SHADOW_CLASS[shadow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}