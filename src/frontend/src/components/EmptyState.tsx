import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  showHero?: boolean;
}

export default function EmptyState({ icon, title, description, action, showHero }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        {showHero && (
          <img
            src="/assets/generated/motonomad-hero.dim_1600x900.png"
            alt="Motonomad"
            className="w-full max-w-md mb-8 rounded-lg opacity-60"
          />
        )}
        {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  );
}
