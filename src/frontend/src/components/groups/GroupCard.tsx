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
      className="cursor-pointer hover:border-primary/50 transition-all duration-300 motion-safe:hover:scale-105 motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-1"
      onClick={() => navigate({ to: `/groups/${groupId.toString()}` })}
    >
      <CardHeader>
        <CardTitle className="transition-colors duration-200 group-hover:text-primary">{group.name}</CardTitle>
        <CardDescription className="line-clamp-2">{group.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:scale-110" />
          <span>{group.members.length} members</span>
        </div>
      </CardContent>
    </Card>
  );
}
