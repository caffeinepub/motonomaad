import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetUpcomingEvents, useJoinEvent, useLeaveEvent } from '@/hooks/useEvents';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetUserProfile } from '@/hooks/useCurrentUserProfile';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, MapPin, Users, UserPlus, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

export default function EventDetailPage() {
  const { eventId } = useParams({ from: '/events/$eventId' });
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();
  const { data: events } = useGetUpcomingEvents();
  const joinEvent = useJoinEvent();
  const leaveEvent = useLeaveEvent();

  const isAuthenticated = !!identity;
  const eventIdNum = BigInt(eventId);
  const event = events?.[Number(eventIdNum) - 1];

  const isAttending = event?.attendees.some((a) => a.toString() === identity?.getPrincipal().toString());

  const handleJoin = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to join events');
      login();
      return;
    }

    try {
      await joinEvent.mutateAsync(eventIdNum);
      toast.success('Joined event successfully!');
    } catch (error) {
      toast.error('Failed to join event');
      console.error(error);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveEvent.mutateAsync(eventIdNum);
      toast.success('Left event successfully');
    } catch (error) {
      toast.error('Failed to leave event');
      console.error(error);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!event) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Event not found</p>
            <Button onClick={() => navigate({ to: '/events' })} className="mt-4">
              Back to Events
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/events' })} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <CardTitle className="text-3xl">{event.name}</CardTitle>
                <div className="space-y-1">
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.datetime)}
                  </CardDescription>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </CardDescription>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {event.attendees.length} attending
                  </CardDescription>
                </div>
              </div>
              {isAuthenticated && (
                <div>
                  {isAttending ? (
                    <Button
                      variant="outline"
                      onClick={handleLeave}
                      disabled={leaveEvent.isPending}
                      className="gap-2"
                    >
                      <UserMinus className="h-4 w-4" />
                      {leaveEvent.isPending ? 'Leaving...' : 'Leave Event'}
                    </Button>
                  ) : (
                    <Button onClick={handleJoin} disabled={joinEvent.isPending} className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      {joinEvent.isPending ? 'Joining...' : 'Join Event'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Attendees ({event.attendees.length})</h3>
              {event.attendees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.attendees.map((attendee, index) => (
                    <AttendeeCard key={index} attendeeId={attendee} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No attendees yet. Be the first to join!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AttendeeCard({ attendeeId }: { attendeeId: any }) {
  const { data: profile } = useGetUserProfile(attendeeId);

  const name = profile?.name || attendeeId.toString().slice(0, 8) + '...';
  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{name}</p>
        {profile?.bio && <p className="text-xs text-muted-foreground truncate">{profile.bio}</p>}
      </div>
    </div>
  );
}
