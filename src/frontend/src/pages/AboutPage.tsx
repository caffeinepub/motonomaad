import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Target, Users, Compass } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Compass,
      title: 'Adventure First',
      description: 'We believe in the transformative power of the open road and the freedom it brings.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Our platform is built by riders, for riders. Every feature reflects real community needs.',
    },
    {
      icon: Heart,
      title: 'Safety & Support',
      description: 'We prioritize rider safety with verified mechanics and reliable route information.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Leveraging blockchain technology to create a decentralized, secure platform for riders.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Riders' },
    { value: '500+', label: 'Verified Mechanics' },
    { value: '1,000+', label: 'Curated Routes' },
    { value: '200+', label: 'Community Events' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">About Motonomaad</h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance">
              Empowering motorcycle adventurers to explore the world with confidence and community
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Motonomaad was born from a simple belief: every motorcycle journey should be an adventure, not a worry.
                We're building the ultimate platform for riders who crave freedom, community, and the thrill of the open
                road. Whether you're planning a weekend escape or a cross-country expedition, Motonomaad connects you
                with the resources, people, and experiences that make every ride unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Motonomaad started in 2024 when a group of passionate riders realized there was no single platform
                  that truly understood the needs of motorcycle adventurers. We were tired of juggling multiple apps,
                  unreliable information, and disconnected communities.
                </p>
                <p>
                  Built on the Internet Computer blockchain, Motonomaad offers a decentralized, secure, and
                  community-owned platform. We're not just another tech company—we're riders building for riders,
                  ensuring that the platform evolves with the community's needs.
                </p>
                <p>
                  Today, thousands of riders use Motonomaad to plan trips, find mechanics, connect with fellow
                  adventurers, and share their stories. We're just getting started, and we're excited to have you along
                  for the ride.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">By the Numbers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our growing community of motorcycle enthusiasts
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
