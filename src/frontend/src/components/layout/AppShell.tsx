import { ReactNode } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import BrandLogo from '@/components/brand/BrandLogo';
import LoginButton from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = !!identity;

  const appLinks = [
    { to: '/trip-planner', label: 'Trip Planner' },
    { to: '/mechanics', label: 'Mechanics' },
    { to: '/social', label: 'Social' },
    { to: '/groups', label: 'Groups' },
    { to: '/events', label: 'Events' },
    { to: '/profile', label: 'Profile', authRequired: true },
  ];

  const companyLinks = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy' },
  ];

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      return;
    }
    navigate({ to: '/profile' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <BrandLogo />
            <nav className="hidden lg:flex items-center gap-6">
              {appLinks.map((link) => {
                if (link.authRequired && !isAuthenticated) {
                  return null;
                }
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
                    activeProps={{ className: 'text-foreground' }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="h-4 w-px bg-border mx-2" />
              {companyLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
                  activeProps={{ className: 'text-foreground' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <LoginButton />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden transition-transform duration-200 motion-safe:hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur animate-fade-in">
            <nav className="container py-4 flex flex-col gap-4">
              {appLinks.map((link) => {
                if (link.authRequired && !isAuthenticated) {
                  return null;
                }
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-2 hover:translate-x-1"
                    activeProps={{ className: 'text-foreground' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="h-px bg-border my-2" />
              {companyLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-2 hover:translate-x-1"
                  activeProps={{ className: 'text-foreground' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <LoginButton />
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/40 bg-muted/20 py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4 motion-safe:animate-fade-in-up">
              <BrandLogo />
              <p className="text-sm text-muted-foreground">
                The ultimate platform for motorcycle adventurers. Plan routes, connect with mechanics, and join the
                community.
              </p>
            </div>

            <div className="motion-safe:animate-fade-in-up motion-safe:[animation-delay:100ms]">
              <h3 className="font-heading text-sm font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                {appLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="motion-safe:animate-fade-in-up motion-safe:[animation-delay:200ms]">
              <h3 className="font-heading text-sm font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="motion-safe:animate-fade-in-up motion-safe:[animation-delay:300ms]">
              <h3 className="font-heading text-sm font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:support@motonomaad.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <Link
                    to="/social"
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Motonomaad. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with love using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'motonomaad'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-all duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
