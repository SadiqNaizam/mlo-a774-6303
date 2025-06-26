import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  slug: string; // For future dynamic routing, e.g., /restaurant-detail/slug
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: number; // in minutes
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  slug,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime
}) => {
  console.log('RestaurantCard loaded for:', name);

  return (
    // The entire card links to the detail page. The route is static as per App.tsx.
    // A more advanced implementation might use the slug: `/restaurant-detail/${slug}`
    <Link to="/restaurant-detail" className="block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col group">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=FeastFlow'}
              alt={`Photo of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold truncate group-hover:text-primary">{name}</h3>
          
          <div className="flex flex-wrap gap-1 my-2">
            {cuisineTypes.slice(0, 3).map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="font-normal">
                {cuisine}
              </Badge>
            ))}
            {cuisineTypes.length > 3 && (
                <Badge variant="outline">+{cuisineTypes.length - 3}</Badge>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime} min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;