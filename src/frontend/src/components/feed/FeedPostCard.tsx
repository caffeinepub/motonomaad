import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetUserProfile } from '@/hooks/useCurrentUserProfile';
import type { FeedPost } from '@/backend';

interface FeedPostCardProps {
  post: FeedPost;
}

export default function FeedPostCard({ post }: FeedPostCardProps) {
  const { data: profile } = useGetUserProfile(post.author);

  const authorName = profile?.name || post.author.toString().slice(0, 8) + '...';
  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

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
    <Card className="transition-all duration-300 motion-safe:hover:shadow-md motion-safe:hover:border-primary/30 motion-safe:animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="transition-transform duration-300 motion-safe:hover:scale-110">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{authorName}</p>
            <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
    </Card>
  );
}
