import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSuggestTrips } from '@/hooks/useTripSuggestions';
import TripSuggestionCard from '@/components/trips/TripSuggestionCard';
import EmptyState from '@/components/EmptyState';
import { MapPin, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function TripPlannerPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [days, setDays] = useState('');
  const [tripType, setTripType] = useState<'scenic' | 'offroad' | 'urban'>('scenic');
  const [hasSearched, setHasSearched] = useState(false);

  const suggestTrips = useSuggestTrips();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from.trim() || !to.trim()) {
      toast.error('Please enter both source and destination');
      return;
    }

    const daysNum = parseInt(days);
    if (!daysNum || daysNum < 1) {
      toast.error('Please enter a valid number of days (minimum 1)');
      return;
    }

    setHasSearched(true);
    suggestTrips.mutate({
      from: from.trim(),
      to: to.trim(),
      days: BigInt(daysNum),
      tripType,
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Trip Planner</h1>
          <p className="text-muted-foreground">Plan your next motorcycle adventure with curated itineraries</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plan Your Route</CardTitle>
            <CardDescription>Enter your trip details to get personalized itinerary suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder="Starting location"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Destination"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="days">Number of Days</Label>
                  <Input
                    id="days"
                    type="number"
                    min="1"
                    placeholder="e.g., 3"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tripType">Ride Type</Label>
                  <Select value={tripType} onValueChange={(value: any) => setTripType(value)}>
                    <SelectTrigger id="tripType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scenic">Scenic</SelectItem>
                      <SelectItem value="offroad">Off-road</SelectItem>
                      <SelectItem value="urban">Urban</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={suggestTrips.isPending}>
                {suggestTrips.isPending ? (
                  'Searching...'
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Find Itineraries
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {hasSearched && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Suggested Itineraries</h2>
            {suggestTrips.isPending ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Searching for the best routes...</p>
                </CardContent>
              </Card>
            ) : suggestTrips.data && suggestTrips.data.length > 0 ? (
              <div className="grid gap-4">
                {suggestTrips.data.map((trip, index) => (
                  <TripSuggestionCard key={index} trip={trip} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<MapPin className="h-12 w-12" />}
                title="No Itineraries Found"
                description="We couldn't find any itineraries matching your criteria. Try adjusting your search parameters."
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
