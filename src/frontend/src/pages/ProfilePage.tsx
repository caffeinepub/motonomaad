import RequireAuth from '@/components/auth/RequireAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetCallerUserProfile } from '@/hooks/useCurrentUserProfile';
import { useGetProfileOverview } from '@/hooks/useProfileOverview';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import FeedPostCard from '@/components/feed/FeedPostCard';
import GroupCard from '@/components/groups/GroupCard';
import EventCard from '@/components/events/EventCard';
import EmptyState from '@/components/EmptyState';
import { User, MessageSquare, Users, Calendar, Wrench } from 'lucide-react';
import { Variant_pending_completed_rejected_accepted } from '@/backend';

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfileContent />
    </RequireAuth>
  );
}

function ProfileContent() {
  const { identity } = useInternetIdentity();
  const { data: profile } = useGetCallerUserProfile();
  const { data: overview, isLoading } = useGetProfileOverview();

  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-3xl">{profile?.name || 'Rider'}</CardTitle>
                {profile?.bio && <CardDescription className="mt-2">{profile.bio}</CardDescription>}
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2">
              <Users className="h-4 w-4" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <Wrench className="h-4 w-4" />
              Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Loading posts...</p>
                </CardContent>
              </Card>
            ) : overview?.posts && overview.posts.length > 0 ? (
              overview.posts
                .sort((a, b) => Number(b.createdAt - a.createdAt))
                .map((post, index) => <FeedPostCard key={index} post={post} />)
            ) : (
              <EmptyState
                icon={<MessageSquare className="h-12 w-12" />}
                title="No Posts Yet"
                description="You haven't created any posts. Share your riding experiences with the community!"
              />
            )}
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Loading groups...</p>
                </CardContent>
              </Card>
            ) : overview?.groups && overview.groups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {overview.groups.map((group, index) => (
                  <GroupCard key={index} group={group} groupId={BigInt(index + 1)} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Users className="h-12 w-12" />}
                title="No Groups Joined"
                description="You haven't joined any groups yet. Explore groups to connect with riders who share your interests!"
              />
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Loading events...</p>
                </CardContent>
              </Card>
            ) : overview?.events && overview.events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {overview.events.map((event, index) => (
                  <EventCard key={index} event={event} eventId={BigInt(index + 1)} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Calendar className="h-12 w-12" />}
                title="No Events Joined"
                description="You haven't joined any events yet. Check out upcoming events and join the rides!"
              />
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Loading requests...</p>
                </CardContent>
              </Card>
            ) : overview?.mechanicRequests && overview.mechanicRequests.length > 0 ? (
              <div className="space-y-4">
                {overview.mechanicRequests
                  .sort((a, b) => Number(b.createdAt - a.createdAt))
                  .map((request, index) => {
                    const getStatusStyle = (status: Variant_pending_completed_rejected_accepted) => {
                      switch (status) {
                        case Variant_pending_completed_rejected_accepted.pending:
                          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
                        case Variant_pending_completed_rejected_accepted.accepted:
                          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                        case Variant_pending_completed_rejected_accepted.completed:
                          return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                        case Variant_pending_completed_rejected_accepted.rejected:
                          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
                        default:
                          return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
                      }
                    };

                    return (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">Request to {request.mechanic}</CardTitle>
                              <CardDescription>
                                {new Date(Number(request.createdAt) / 1000000).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </CardDescription>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{request.problemDescription}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            ) : (
              <EmptyState
                icon={<Wrench className="h-12 w-12" />}
                title="No Mechanic Requests"
                description="You haven't contacted any mechanics yet. Browse our certified mechanics when you need help!"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
