import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone } from 'lucide-react';
import type { Mechanic } from '@/backend';

interface MechanicCardProps {
  mechanic: Mechanic;
  onContact: () => void;
}

export default function MechanicCard({ mechanic, onContact }: MechanicCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{mechanic.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {mechanic.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{mechanic.rating.toFixed(1)}</span>
        </div>

        {mechanic.specialties.length > 0 && (
          <div>
            <p className="text-sm font-semibold mb-2">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {mechanic.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {mechanic.contactInfo && (
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {mechanic.contactInfo}
          </div>
        )}

        <Button onClick={onContact} className="mt-auto w-full">
          Contact Mechanic
        </Button>
      </CardContent>
    </Card>
  );
}
