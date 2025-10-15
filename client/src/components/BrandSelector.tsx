import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface BrandSelectorProps {
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
}

const brands = [
  { id: 'indianoil', name: 'Indian Oil', icon: '🛢️' },
  { id: 'bharat', name: 'Bharat Petroleum', icon: '⛽' },
  { id: 'hp', name: 'HP Oil', icon: '🏭' },
  { id: 'essar', name: 'Essar Oil', icon: '🔧' },
];

export default function BrandSelector({ selectedBrand, onBrandChange }: BrandSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Select Fuel Brand</Label>
      <div className="grid grid-cols-2 gap-3">
        {brands.map((brand) => (
          <Card
            key={brand.id}
            data-testid={`card-brand-${brand.id}`}
            className={`p-4 cursor-pointer hover-elevate active-elevate-2 transition-all ${
              selectedBrand === brand.id ? 'border-primary ring-2 ring-primary/20' : ''
            }`}
            onClick={() => onBrandChange(brand.id)}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{brand.icon}</div>
              <div className="text-sm font-medium">{brand.name}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
