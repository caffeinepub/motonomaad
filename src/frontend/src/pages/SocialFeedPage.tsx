import { Card, CardContent } from '@/components/ui/card';
import { useGetFeed } from '@/hooks/useFeed';
import PostComposer from '@/components/feed/PostComposer';
import FeedPostCard from '@/components/feed/FeedPostCard';
import EmptyState from '@/components/EmptyState';
import { MessageSquare } from 'lucide-react';

export default function SocialFeedPage() {
  const { data: posts, isLoading } = useGetFeed();

  const sortedPosts = posts ? [...posts].sort((a, b) => Number(b.createdAt - a.createdAt)) : [];

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Social Feed</h1>
          <p className="text-muted-foreground">Share your rides, gear, and connect with fellow riders</p>
        </div>

        <PostComposer />

        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground">Loading posts...</p>
              </CardContent>
            </Card>
          ) : sortedPosts.length > 0 ? (
            sortedPosts.map((post, index) => <FeedPostCard key={index} post={post} />)
          ) : (
            <EmptyState
              icon={<MessageSquare className="h-12 w-12" />}
              title="No Posts Yet"
              description="Be the first to share your riding experience with the community!"
              showHero
            />
          )}
        </div>
      </div>
    </div>
  );
}
