import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';
import type { Trip } from '@/backend';
import { Variant_scenic_urban_offroad } from '@/backend';

interface TripSuggestionCardProps {
  trip: Trip;
}

export default function TripSuggestionCard({ trip }: TripSuggestionCardProps) {
  const tripTypeLabel = {
    [Variant_scenic_urban_offroad.scenic]: 'Scenic',
    [Variant_scenic_urban_offroad.offroad]: 'Off-road',
    [Variant_scenic_urban_offroad.urban]: 'Urban',
  }[trip.tripType];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl">
              {trip.from} → {trip.to}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {trip.days.toString()} {trip.days === 1n ? 'day' : 'days'}
            </CardDescription>
          </div>
          <Badge variant="secondary">{tripTypeLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {trip.waypoints.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Notable Stops
            </h4>
            <div className="flex flex-wrap gap-2">
              {trip.waypoints.map((waypoint, index) => (
                <Badge key={index} variant="outline">
                  {waypoint}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
