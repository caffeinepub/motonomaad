import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar, Wrench, MessageSquare, Route } from 'lucide-react';
import TimelineSection from '@/components/marketing/TimelineSection';
import FaqSection from '@/components/marketing/FaqSection';

export default function LandingPage() {
  const features = [
    {
      icon: Route,
      title: 'Trip Planner',
      description: 'Discover curated motorcycle routes tailored to your riding style—scenic, off-road, or urban adventures.',
    },
    {
      icon: Wrench,
      title: 'Certified Mechanics',
      description: 'Find trusted mechanics along your route. Get help when you need it, wherever you are.',
    },
    {
      icon: Users,
      title: 'Riding Groups',
      description: 'Connect with fellow riders, join groups, and share the journey with like-minded nomads.',
    },
    {
      icon: Calendar,
      title: 'Events & Meetups',
      description: 'Discover and join motorcycle events, rallies, and meetups in your area or on your route.',
    },
    {
      icon: MessageSquare,
      title: 'Social Feed',
      description: 'Share your adventures, tips, and stories with the Motonomaad community.',
    },
    {
      icon: MapPin,
      title: 'Route Waypoints',
      description: 'Get detailed waypoints and stops for every journey, ensuring you never miss a great experience.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Plan Your Route',
      description: 'Enter your starting point, destination, and riding preferences to get personalized trip suggestions.',
    },
    {
      number: '02',
      title: 'Connect & Prepare',
      description: 'Find mechanics along your route, join groups, and connect with riders heading the same way.',
    },
    {
      number: '03',
      title: 'Hit the Road',
      description: 'Follow your curated itinerary, share your journey, and make memories on the open road.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 motion-safe:animate-fade-in-up">
              <div className="space-y-6">
                <div className="inline-block motion-safe:animate-slide-in-left">
                  <p className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-primary border-l-4 border-primary pl-4">
                    Ride. Wander. Repeat.
                  </p>
                </div>
                <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight leading-[0.9] text-balance">
                  <span className="block motion-safe:animate-slide-in-left motion-safe:[animation-delay:100ms]">RIDE</span>
                  <span className="block text-primary motion-safe:animate-slide-in-left motion-safe:[animation-delay:200ms]">FREE.</span>
                  <span className="block motion-safe:animate-slide-in-left motion-safe:[animation-delay:300ms]">RIDE FAR.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-xl motion-safe:animate-fade-in motion-safe:[animation-delay:400ms]">
                  Plan epic routes, connect with certified mechanics, and join a tribe of riders who live for the open road.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 motion-safe:animate-fade-in motion-safe:[animation-delay:500ms]">
                <Button asChild size="lg" className="text-lg px-8 transition-all duration-300 motion-safe:hover:scale-105">
                  <Link to="/trip-planner">Plan Your Trip</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 transition-all duration-300 motion-safe:hover:scale-105">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative motion-safe:animate-fade-in motion-safe:[animation-delay:300ms]">
              <img
                src="/assets/generated/motonomad-hero.dim_1600x900.png"
                alt="Motorcycle adventure"
                className="rounded-2xl shadow-2xl w-full h-auto transition-all duration-500 motion-safe:hover:scale-105 motion-safe:hover:shadow-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 motion-safe:animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight">
              The Ultimate Platform for Motorcycle Nomads
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Motonomaad brings together everything you need for unforgettable motorcycle journeys. From route planning
              to community connections, we've got you covered on every mile of your adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center space-y-4 mb-16 motion-safe:animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight">Everything You Need to Ride</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed specifically for motorcycle adventurers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const animationDelay = `${index * 100}ms`;
              return (
                <Card 
                  key={index} 
                  className="feature-card border-2 hover:border-primary/50 transition-all duration-300 motion-safe:hover:scale-105 motion-safe:hover:shadow-lg motion-safe:animate-fade-in-up"
                  style={{ animationDelay }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary/20 motion-safe:group-hover:scale-110">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-heading">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container">
          <div className="text-center space-y-4 mb-16 motion-safe:animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started on your next adventure in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const animationDelay = `${index * 150}ms`;
              return (
                <div 
                  key={index} 
                  className="relative motion-safe:animate-fade-in-up"
                  style={{ animationDelay }}
                >
                  <div className="space-y-4 transition-all duration-300 motion-safe:hover:translate-y-[-8px]">
                    <div className="text-6xl font-heading text-primary/20 transition-all duration-300 motion-safe:hover:text-primary/40">{step.number}</div>
                    <h3 className="text-2xl font-heading">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 motion-safe:animate-fade-in-up transition-all duration-500 motion-safe:hover:shadow-xl motion-safe:hover:border-primary/40">
            <CardContent className="p-12 md:p-16">
              <div className="max-w-3xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight">Ready to Hit the Road?</h2>
                  <p className="text-lg text-muted-foreground">
                    Join thousands of riders planning their next adventure with Motonomaad
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8 transition-all duration-300 motion-safe:hover:scale-105">
                    <Link to="/trip-planner">Start Planning</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 transition-all duration-300 motion-safe:hover:scale-105">
                    <Link to="/mechanics">Find Mechanics</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 transition-all duration-300 motion-safe:hover:scale-105">
                    <Link to="/groups">Join Community</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
