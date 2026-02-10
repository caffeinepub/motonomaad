import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useCreateMechanicRequest } from '@/hooks/useMechanics';
import { toast } from 'sonner';
import type { Mechanic } from '@/backend';

interface MechanicRequestDialogProps {
  mechanic: Mechanic;
  onClose: () => void;
}

export default function MechanicRequestDialog({ mechanic, onClose }: MechanicRequestDialogProps) {
  const { identity, login } = useInternetIdentity();
  const [problemDescription, setProblemDescription] = useState('');
  const createRequest = useCreateMechanicRequest();

  const isAuthenticated = !!identity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please sign in to contact a mechanic');
      login();
      return;
    }

    if (!problemDescription.trim()) {
      toast.error('Please describe your issue');
      return;
    }

    try {
      await createRequest.mutateAsync({
        mechanic: mechanic.name,
        problemDescription: problemDescription.trim(),
      });
      toast.success('Request sent successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to send request');
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {mechanic.name}</DialogTitle>
          <DialogDescription>Describe your issue and we'll connect you with the mechanic</DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">You need to sign in to contact a mechanic.</p>
            <Button onClick={login} className="w-full">
              Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="problem">Describe Your Issue *</Label>
              <Textarea
                id="problem"
                placeholder="Tell us what's wrong with your motorcycle..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={createRequest.isPending}>
                {createRequest.isPending ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
