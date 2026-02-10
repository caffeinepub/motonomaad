import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Variant_scenic_urban_offroad } from '@/backend';
import type { Trip } from '@/backend';

interface SuggestTripsParams {
  from: string;
  to: string;
  days: bigint;
  tripType: 'scenic' | 'offroad' | 'urban';
}

export function useSuggestTrips() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: SuggestTripsParams) => {
      if (!actor) throw new Error('Actor not available');

      const tripTypeMap = {
        scenic: Variant_scenic_urban_offroad.scenic,
        offroad: Variant_scenic_urban_offroad.offroad,
        urban: Variant_scenic_urban_offroad.urban,
      };

      const tripTypeVariant = tripTypeMap[params.tripType];

      return actor.suggestTrips(params.from, params.to, params.days, tripTypeVariant);
    },
  });
}
