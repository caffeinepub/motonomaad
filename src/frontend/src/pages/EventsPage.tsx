import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetUpcomingEvents } from '@/hooks/useEvents';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import CreateEventDialog from '@/components/events/CreateEventDialog';
import EventCard from '@/components/events/EventCard';
import EmptyState from '@/components/EmptyState';
import { Calendar, Plus } from 'lucide-react';

export default function EventsPage() {
  const { data: events, isLoading } = useGetUpcomingEvents();
  const { identity, login } = useInternetIdentity();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const isAuthenticated = !!identity;

  const sortedEvents = events ? [...events].sort((a, b) => Number(a.datetime - b.datetime)) : [];

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Events</h1>
            <p className="text-muted-foreground">Discover and join upcoming motorcycle events</p>
          </div>
          {isAuthenticated ? (
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          ) : (
            <Button onClick={login} className="gap-2">
              <Plus className="h-4 w-4" />
              Sign In to Create
            </Button>
          )}
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">Loading events...</p>
            </CardContent>
          </Card>
        ) : sortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event, index) => (
              <EventCard key={index} event={event} eventId={BigInt(index + 1)} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Calendar className="h-12 w-12" />}
            title="No Events Yet"
            description="Be the first to organize a ride event and bring the community together!"
            action={
              isAuthenticated ? (
                <Button onClick={() => setShowCreateDialog(true)}>Create First Event</Button>
              ) : (
                <Button onClick={login}>Sign In to Create</Button>
              )
            }
          />
        )}

        {showCreateDialog && <CreateEventDialog onClose={() => setShowCreateDialog(false)} />}
      </div>
    </div>
  );
}
