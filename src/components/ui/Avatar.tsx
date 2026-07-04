import Image from "next/image";

type AvatarProps = {
  name: string;
  imageUrl?: string | null;
  size?: number;
};

const BG_COLORS = [
  "bg-[var(--bg-pink)]",
  "bg-[var(--bg-blue)]",
  "bg-[var(--bg-mint)]",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    // Likely an email — use the part before the @ instead of splitting on
    // spaces that won't exist.
    const base = parts[0].split("@")[0];
    return base.slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BG_COLORS[Math.abs(hash) % BG_COLORS.length];
}

/**
 * Circular avatar per FRD §6.3 — a real photo if `imageUrl` is provided
 * (e.g. Google's profile photo after OAuth sign-in), otherwise initials on
 * a color picked deterministically from the name, so the same person
 * always lands on the same color instead of a random one each render.
 *
 * Note: rendering an external photo via next/image requires that domain
 * (e.g. lh3.googleusercontent.com for Google) to be allow-listed in
 * next.config.mjs first — not set up yet, since nothing passes imageUrl
 * currently. Only the initials path is exercised today.
 */
export default function Avatar({ name, imageUrl, size = 32 }: AvatarProps) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full border-2 border-[var(--ink)] object-cover"
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border-2 border-[var(--ink)] text-xs font-bold text-[var(--ink)] ${getColorForName(name)}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  );
}