import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Pizza,
  Fish,
  Flame,
  Sandwich,
  UtensilsCrossed,
  Salad,
} from 'lucide-react';

// A type definition for a single cuisine category
type Cuisine = {
  name: string;
  slug: string;
  icon: React.ElementType;
};

// A predefined list of popular cuisines. This could be fetched from an API in a real app.
const cuisines: Cuisine[] = [
  { name: 'Pizza', slug: 'pizza', icon: Pizza },
  { name: 'Sushi', slug: 'sushi', icon: Fish },
  { name: 'Burgers', slug: 'burgers', icon: Sandwich },
  { name: 'Indian', slug: 'indian', icon: Flame },
  { name: 'Italian', slug: 'italian', icon: UtensilsCrossed },
  { name: 'Salads', slug: 'salads', icon: Salad },
];

// Props interface for the component
interface CuisineCategoryFilterProps {
  /** The currently active category slug */
  selectedCategory: string | null;
  /** Callback function to be invoked when a category is selected */
  onSelectCategory: (category: string) => void;
}

/**
 * A component that displays a horizontally scrollable list of cuisine categories
 * for filtering restaurants.
 */
const CuisineCategoryFilter: React.FC<CuisineCategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  console.log('CuisineCategoryFilter loaded');

  const handleSelect = (slug: string) => {
    // If the same category is clicked again, deselect it. Otherwise, select the new one.
    const newSelection = selectedCategory === slug ? '' : slug;
    onSelectCategory(newSelection);
  };

  return (
    <div className="w-full py-2">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-2 pb-2">
          {cuisines.map((cuisine) => (
            <Button
              key={cuisine.slug}
              variant={selectedCategory === cuisine.slug ? 'secondary' : 'outline'}
              className="h-12 px-4 space-x-2 border-gray-300"
              onClick={() => handleSelect(cuisine.slug)}
            >
              <cuisine.icon className="h-5 w-5" />
              <span className="font-semibold">{cuisine.name}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CuisineCategoryFilter;