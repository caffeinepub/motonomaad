import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { Group } from '@/backend';

interface GroupCardProps {
  group: Group;
  groupId: bigint;
}

export default function GroupCard({ group, groupId }: GroupCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:border-primary/50 transition-colors"
      onClick={() => navigate({ to: `/groups/${groupId.toString()}` })}
    >
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
        <CardDescription className="line-clamp-2">{group.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{group.members.length} members</span>
        </div>
      </CardContent>
    </Card>
  );
}
