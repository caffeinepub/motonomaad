import { Link } from '@tanstack/react-router';

export default function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <img
        src="/assets/generated/motonomaad-logo.dim_512x512.png"
        alt="Motonomaad"
        className="h-10 w-10 brand-logo-glow transition-all group-hover:scale-110"
      />
      <span className="brand-wordmark text-2xl uppercase tracking-wider">
        Motonomaad
      </span>
    </Link>
  );
}
