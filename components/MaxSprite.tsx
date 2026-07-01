// Max the hedgehog. Pure SVG. No images, no animation library.

type Props = {
  size?: number;
  mood?: "calm" | "thrilled" | "concerned";
  className?: string;
};

export default function MaxSprite({
  size = 160,
  mood = "calm",
  className,
}: Props) {
  const eyeShape =
    mood === "thrilled" ? 1.6 : mood === "concerned" ? 0.6 : 1.0;

  return (
    <svg
      viewBox="0 0 200 160"
      width={size}
      height={(size * 160) / 200}
      role="img"
      aria-label="Max the hedgehog"
      className={className}
    >
      {/* shadow */}
      <ellipse cx="105" cy="140" rx="70" ry="6" fill="#0001" />

      {/* spiky back: layered triangles */}
      <g fill="#6b4a2b">
        {Array.from({ length: 18 }).map((_, i) => {
          const cx = 50 + i * 6;
          const h = 22 + ((i * 7) % 11);
          return (
            <polygon
              key={i}
              points={`${cx - 4},${90} ${cx + 4},${90} ${cx},${90 - h}`}
            />
          );
        })}
      </g>

      {/* body */}
      <ellipse cx="105" cy="100" rx="70" ry="34" fill="#c89a6b" />

      {/* face */}
      <ellipse cx="50" cy="100" rx="28" ry="26" fill="#f1d6b3" />

      {/* nose */}
      <circle cx="26" cy="100" r="5" fill="#2b1d12" />

      {/* eye */}
      <ellipse cx="44" cy={94} rx="3" ry={3 * eyeShape} fill="#2b1d12" />
      <circle cx="45" cy={93} r="1" fill="#fff" />

      {/* tiny smile */}
      <path
        d="M30 108 q5 4 10 0"
        stroke="#2b1d12"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* feet */}
      <ellipse cx="80" cy="138" rx="8" ry="4" fill="#6b4a2b" />
      <ellipse cx="140" cy="138" rx="8" ry="4" fill="#6b4a2b" />
    </svg>
  );
}
