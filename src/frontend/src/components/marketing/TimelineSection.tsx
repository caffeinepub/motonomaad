import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Zap } from 'lucide-react';

export default function TimelineSection() {
  const milestones = [
    {
      icon: Zap,
      year: '2024',
      title: 'The Spark',
      description:
        'Motonomad was born from a simple idea: motorcycle adventurers deserve a platform built specifically for their unique needs. We set out to create the ultimate companion for riders on the open road.',
    },
    {
      icon: MapPin,
      year: '2025',
      title: 'Building the Foundation',
      description:
        'We launched our core features - trip planning, mechanic directories, and community tools. Thousands of riders joined us, sharing routes and connecting across continents.',
    },
    {
      icon: Users,
      year: '2026',
      title: 'Growing the Tribe',
      description:
        'Our community exploded with groups, events, and shared adventures. Riders from every corner of the globe found their tribe and hit the road together.',
    },
    {
      icon: Calendar,
      year: 'Future',
      title: 'The Road Ahead',
      description:
        'We are just getting started. New features, deeper connections, and more adventures await. Join us as we continue to build the ultimate platform for motorcycle nomads.',
    },
  ];

  return (
    <section id="timeline" data-testid="REQ-15" className="py-20 md:py-28 bg-muted/20">
      <div className="container">
        <div className="text-center space-y-4 mb-16 motion-safe:animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From a spark of an idea to a thriving community of riders
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => {
            const animationDelay = `${index * 100}ms`;
            return (
              <Card 
                key={index} 
                className="timeline-card border-2 hover:border-primary/50 transition-all duration-300 motion-safe:hover:scale-105 motion-safe:hover:shadow-lg motion-safe:animate-fade-in-up"
                style={{ animationDelay }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 motion-safe:hover:bg-primary/20 motion-safe:hover:scale-110">
                    <milestone.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary uppercase tracking-wider">{milestone.year}</div>
                  <CardTitle className="text-xl font-heading">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
