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
      title: 'Route Planning Launch',
      description:
        'We launched our intelligent trip planner, helping thousands of riders discover scenic routes, off-road trails, and urban adventures tailored to their riding style and preferences.',
    },
    {
      icon: Users,
      year: '2025',
      title: 'Community Growth',
      description:
        'The Motonomad community exploded with riders connecting, forming groups, and organizing meetups. Our social features brought together nomads from around the world to share their passion.',
    },
    {
      icon: Calendar,
      year: '2026',
      title: 'The Road Ahead',
      description:
        'We continue to innovate with new features, partnerships with mechanics and gear suppliers, and expanded route coverage. Join us as we build the future of motorcycle adventure travel.',
    },
  ];

  return (
    <section id="timeline" data-testid="REQ-15" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From a simple idea to a thriving community of motorcycle adventurers
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {milestones.map((milestone, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors relative">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <milestone.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">{milestone.year}</div>
                <CardTitle className="text-xl">{milestone.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
