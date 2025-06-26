import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface MenuItemProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, description, price, imageUrl }) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  console.log('MenuItem loaded for:', name);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of item ${id} (${name}) to cart.`);
    toast({
      title: "Item Added!",
      description: `Added ${quantity} x ${name} to your cart.`,
    });
    // Reset quantity to 1 after adding to cart for a smoother experience
    setQuantity(1);
  };

  return (
    <div className="flex items-start justify-between gap-4 p-4 border-b w-full">
      {/* Item Details */}
      <div className="flex-grow">
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        <p className="text-base font-bold mt-2 text-gray-800">${price.toFixed(2)}</p>
      </div>

      {/* Image & Actions */}
      <div className="flex-shrink-0 w-32 flex flex-col items-center gap-2">
        {imageUrl ? (
          <div className="w-full h-24 rounded-md overflow-hidden bg-gray-100">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full h-24 rounded-md bg-gray-100 flex items-center justify-center">
             <span className="text-xs text-muted-foreground">No Image</span>
          </div>
        )}

        <div className="flex items-center gap-1 w-full">
          <Button variant="outline" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleDecrement} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="font-bold text-center w-full">{quantity}</span>
          <Button variant="outline" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleIncrement}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>

        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;