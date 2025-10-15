import { useState } from 'react';
import BrandSelector from '../BrandSelector';

export default function BrandSelectorExample() {
  const [brand, setBrand] = useState('indianoil');
  
  return (
    <div className="p-6 max-w-md">
      <BrandSelector selectedBrand={brand} onBrandChange={setBrand} />
    </div>
  );
}
