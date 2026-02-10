import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGetAllGroups, useJoinGroup, useLeaveGroup } from '@/hooks/useGroups';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetUserProfile } from '@/hooks/useCurrentUserProfile';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Users, UserPlus, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

export default function GroupDetailPage() {
  const { groupId } = useParams({ from: '/groups/$groupId' });
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();
  const { data: groups } = useGetAllGroups();
  const joinGroup = useJoinGroup();
  const leaveGroup = useLeaveGroup();

  const isAuthenticated = !!identity;
  const groupIdNum = BigInt(groupId);
  const group = groups?.[Number(groupIdNum) - 1];

  const isMember = group?.members.some((m) => m.toString() === identity?.getPrincipal().toString());

  const handleJoin = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to join groups');
      login();
      return;
    }

    try {
      await joinGroup.mutateAsync(groupIdNum);
      toast.success('Joined group successfully!');
    } catch (error) {
      toast.error('Failed to join group');
      console.error(error);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveGroup.mutateAsync(groupIdNum);
      toast.success('Left group successfully');
    } catch (error) {
      toast.error('Failed to leave group');
      console.error(error);
    }
  };

  if (!group) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Group not found</p>
            <Button onClick={() => navigate({ to: '/groups' })} className="mt-4">
              Back to Groups
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/groups' })} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Groups
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-3xl">{group.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {group.members.length} members
                </CardDescription>
              </div>
              {isAuthenticated && (
                <div>
                  {isMember ? (
                    <Button
                      variant="outline"
                      onClick={handleLeave}
                      disabled={leaveGroup.isPending}
                      className="gap-2"
                    >
                      <UserMinus className="h-4 w-4" />
                      {leaveGroup.isPending ? 'Leaving...' : 'Leave Group'}
                    </Button>
                  ) : (
                    <Button onClick={handleJoin} disabled={joinGroup.isPending} className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      {joinGroup.isPending ? 'Joining...' : 'Join Group'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{group.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Members ({group.members.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.members.map((member, index) => (
                  <MemberCard key={index} memberId={member} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MemberCard({ memberId }: { memberId: any }) {
  const { data: profile } = useGetUserProfile(memberId);

  const name = profile?.name || memberId.toString().slice(0, 8) + '...';
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
