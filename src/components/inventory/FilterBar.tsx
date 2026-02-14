import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export function FilterBar({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 text-sm"
        />
      </CardContent>
    </Card>
  );
}
