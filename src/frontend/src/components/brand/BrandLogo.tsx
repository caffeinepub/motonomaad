import { Link } from '@tanstack/react-router';

export default function BrandLogo() {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-1 -mx-1"
    >
      <img
        src="/assets/generated/motonomaad-logo-v2.dim_512x512.png"
        alt="Motonomaad"
        className="h-10 w-10 brand-logo-glow transition-all duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105"
      />
      <span className="brand-wordmark text-2xl uppercase leading-none transition-all duration-300 motion-safe:group-hover:opacity-90 motion-safe:group-focus-visible:opacity-90">
        Motonomaad
      </span>
    </Link>
  );
}
