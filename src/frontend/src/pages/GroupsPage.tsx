import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetAllGroups } from '@/hooks/useGroups';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import CreateGroupDialog from '@/components/groups/CreateGroupDialog';
import GroupCard from '@/components/groups/GroupCard';
import EmptyState from '@/components/EmptyState';
import { Users, Plus } from 'lucide-react';

export default function GroupsPage() {
  const { data: groups, isLoading } = useGetAllGroups();
  const { identity, login } = useInternetIdentity();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const isAuthenticated = !!identity;

  const sortedGroups = groups ? [...groups].sort((a, b) => Number(b.createdAt - a.createdAt)) : [];

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Groups</h1>
            <p className="text-muted-foreground">Join communities of riders with shared interests</p>
          </div>
          {isAuthenticated ? (
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Group
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
              <p className="text-muted-foreground">Loading groups...</p>
            </CardContent>
          </Card>
        ) : sortedGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedGroups.map((group, index) => (
              <GroupCard key={index} group={group} groupId={BigInt(index + 1)} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Users className="h-12 w-12" />}
            title="No Groups Yet"
            description="Be the first to create a group and build a community of riders!"
            action={
              isAuthenticated ? (
                <Button onClick={() => setShowCreateDialog(true)}>Create First Group</Button>
              ) : (
                <Button onClick={login}>Sign In to Create</Button>
              )
            }
          />
        )}

        {showCreateDialog && <CreateGroupDialog onClose={() => setShowCreateDialog(false)} />}
      </div>
    </div>
  );
}
