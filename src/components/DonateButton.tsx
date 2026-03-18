import Link from "next/link";

interface DonateButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  className?: string;
}

export default function DonateButton({
  size = "md",
  variant = "primary",
  className = "",
}: DonateButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-amber hover:bg-amber-light text-charcoal shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-amber text-amber hover:bg-amber hover:text-charcoal",
  };

  return (
    <Link
      href="/donate"
      className={`inline-block font-semibold rounded-full transition-all duration-300 hover:scale-105 text-center ${sizes[size]} ${variants[variant]} ${className}`}
    >
      Donate Now
    </Link>
  );
}
