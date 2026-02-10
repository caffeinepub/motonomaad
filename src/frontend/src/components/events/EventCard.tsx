import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { Event } from '@/backend';

interface EventCardProps {
  event: Event;
  eventId: bigint;
}

export default function EventCard({ event, eventId }: EventCardProps) {
  const navigate = useNavigate();

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      className="cursor-pointer hover:border-primary/50 transition-colors"
      onClick={() => navigate({ to: `/events/${eventId.toString()}` })}
    >
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(event.datetime)}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{event.attendees.length} attending</span>
        </div>
      </CardContent>
    </Card>
  );
}
