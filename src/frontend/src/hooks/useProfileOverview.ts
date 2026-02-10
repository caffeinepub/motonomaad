import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { FeedPost, Group, Event, MechanicRequest, Profile } from '@/backend';

interface ProfileOverview {
  profile?: Profile;
  posts: FeedPost[];
  groups: Group[];
  events: Event[];
  mechanicRequests: MechanicRequest[];
}

export function useGetProfileOverview() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<ProfileOverview>({
    queryKey: ['profileOverview'],
    queryFn: async () => {
      if (!actor || !identity) {
        return {
          posts: [],
          groups: [],
          events: [],
          mechanicRequests: [],
        };
      }
      const result = await actor.getProfileOverview(identity.getPrincipal());
      return {
        profile: result.profile || undefined,
        posts: result.posts,
        groups: result.groups,
        events: result.events,
        mechanicRequests: result.mechanicRequests,
      };
    },
    enabled: !!actor && !actorFetching && !!identity,
  });
}
