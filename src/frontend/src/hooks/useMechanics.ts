import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Mechanic, MechanicRequest } from '@/backend';

export function useGetMechanics() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Mechanic[]>({
    queryKey: ['mechanics'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMechanics();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateMechanicRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { mechanic: string; problemDescription: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createMechanicRequest(params.problemDescription, params.mechanic);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mechanicRequests'] });
      queryClient.invalidateQueries({ queryKey: ['profileOverview'] });
    },
  });
}

export function useGetUserRequests() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MechanicRequest[]>({
    queryKey: ['mechanicRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserRequests();
    },
    enabled: !!actor && !actorFetching,
  });
}
