import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMechanics } from '@/hooks/useMechanics';
import MechanicCard from '@/components/mechanics/MechanicCard';
import MechanicRequestDialog from '@/components/mechanics/MechanicRequestDialog';
import EmptyState from '@/components/EmptyState';
import { Wrench } from 'lucide-react';
import type { Mechanic } from '@/backend';

export default function MechanicsPage() {
  const { data: mechanics, isLoading } = useGetMechanics();
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Certified Mechanics</h1>
          <p className="text-muted-foreground">Find trusted mechanics for your motorcycle needs</p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">Loading mechanics...</p>
            </CardContent>
          </Card>
        ) : mechanics && mechanics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mechanics.map((mechanic, index) => (
              <MechanicCard key={index} mechanic={mechanic} onContact={() => setSelectedMechanic(mechanic)} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Wrench className="h-12 w-12" />}
            title="No Mechanics Available"
            description="We're working on adding certified mechanics to our network. Check back soon!"
          />
        )}

        {selectedMechanic && (
          <MechanicRequestDialog mechanic={selectedMechanic} onClose={() => setSelectedMechanic(null)} />
        )}
      </div>
    </div>
  );
}
