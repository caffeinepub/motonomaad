import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useCreatePost } from '@/hooks/useFeed';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

export default function PostComposer() {
  const { identity, login } = useInternetIdentity();
  const [content, setContent] = useState('');
  const createPost = useCreatePost();

  const isAuthenticated = !!identity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please sign in to create a post');
      login();
      return;
    }

    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    try {
      await createPost.mutateAsync(content.trim());
      setContent('');
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post');
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground mb-4">Sign in to share your riding experiences</p>
          <Button onClick={login}>Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Story</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's on your mind? Share your latest ride, gear, or tips..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <Button type="submit" disabled={createPost.isPending} className="gap-2">
            {createPost.isPending ? (
              'Posting...'
            ) : (
              <>
                <Send className="h-4 w-4" />
                Post
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
