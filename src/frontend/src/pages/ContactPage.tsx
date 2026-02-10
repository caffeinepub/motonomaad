import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll get back to you within 24-48 hours.',
      action: 'support@motonomaad.com',
      href: 'mailto:support@motonomaad.com',
    },
    {
      icon: MessageSquare,
      title: 'Community Forum',
      description: 'Join our social feed to connect with other riders and get quick answers.',
      action: 'Visit Social Feed',
      href: '/social',
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Browse our FAQ and documentation for instant answers to common questions.',
      action: 'View FAQ',
      href: '/faq',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance">
              We're here to help with any questions about your motorcycle adventures
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">{method.description}</CardDescription>
                  {method.href.startsWith('mailto:') ? (
                    <a
                      href={method.href}
                      className="inline-block text-primary hover:underline font-medium"
                    >
                      {method.action}
                    </a>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link to={method.href}>{method.action}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Response Times</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  We strive to respond to all inquiries as quickly as possible. Email support typically responds within
                  24-48 hours during business days. For urgent matters related to safety or roadside assistance, please
                  contact emergency services first, then reach out to us for follow-up support.
                </p>
                <p>
                  Our community forum on the Social Feed is monitored by both our team and experienced riders who are
                  often able to provide quick answers to common questions about routes, mechanics, and trip planning.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Feedback & Suggestions</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  We're constantly improving Motonomaad based on feedback from our community. If you have ideas for new
                  features, improvements to existing functionality, or general suggestions, we'd love to hear from you.
                  Your input helps shape the future of the platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
