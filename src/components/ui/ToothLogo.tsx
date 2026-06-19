type Props = {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
  title?: string;
};

export function ToothLogo({
  className,
  primaryColor = "currentColor",
  accentColor = "var(--color-primary)",
  title = "DentalIA",
}: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <path
        d="M20 4.5c-3.4 0-5.1 1.2-7.2 1.2-2.1 0-4-1.2-6.3-1.2C4.2 4.5 2.5 6.3 2.5 9.6c0 3 1.1 5.7 2.4 8.5 1.1 2.5 1.7 4.5 2.4 7.3.9 3.7 2.1 9.6 4.4 9.6 1.7 0 2.2-2.1 2.7-4.7.5-2.7 1-5.1 2.8-5.1 1.8 0 2.4 2.4 2.9 5 .5 2.6 1.1 4.8 2.7 4.8 2.3 0 3.5-5.9 4.4-9.6.7-2.8 1.3-4.8 2.4-7.3 1.3-2.8 2.4-5.5 2.4-8.5 0-3.3-1.7-5.1-4-5.1-2.3 0-4.2 1.2-6.3 1.2-2.1 0-3.8-1.2-7.2-1.2z"
        fill={primaryColor}
      />
      <path
        d="M13.3 10.3c-1.6 0-2.9 1-3.4 2.5-.3 1.1 0 1.9.6 1.9.7 0 .9-.6 1.5-1.5.6-.9 1.4-1.6 2.5-1.6.8 0 1.4-.4 1.4-1 0-.5-.7-1.2-2.6-1.2z"
        fill={accentColor}
        opacity="0.85"
      />
    </svg>
  );
}
