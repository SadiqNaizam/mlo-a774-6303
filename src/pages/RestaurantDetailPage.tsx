import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItem from '@/components/MenuItem';
import StarRating from '@/components/StarRating';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock } from 'lucide-react';

// --- Placeholder Data ---

const restaurant = {
  name: "The Burger Palace",
  rating: 4.7,
  reviewCount: 381,
  address: "123 Flavor Town, Burger City",
  hours: "11:00 AM - 10:00 PM",
  tags: ["Burgers", "American", "Top Rated"],
  imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const menu = {
  burgers: [
    { id: 1, name: "Classic Cheeseburger", description: "A juicy beef patty with melted cheddar cheese, lettuce, tomato, and our special sauce.", price: 12.99, imageUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1964&auto=format&fit=crop" },
    { id: 2, name: "Bacon Avocado Burger", description: "Topped with crispy bacon, fresh avocado, Swiss cheese, and a zesty mayo.", price: 15.49, imageUrl: "https://images.unsplash.com/photo-1605789534311-39e4b2a84f3B?q=80&w=1887&auto=format&fit=crop" },
    { id: 3, name: "Spicy Jalapeño Burger", description: "Kicked up with spicy jalapeños, pepper jack cheese, and a chipotle aioli.", price: 13.99, imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3e28c84b?q=80&w=1935&auto=format&fit=crop" },
  ],
  sides: [
    { id: 4, name: "Crispy French Fries", description: "Golden, crispy, and perfectly salted. The perfect companion to any burger.", price: 4.99, imageUrl: "https://images.unsplash.com/photo-1576107232684-c7be35d08b99?q=80&w=1935&auto=format&fit=crop" },
    { id: 5, name: "Onion Rings", description: "Thick-cut onion rings, battered and fried to golden perfection.", price: 6.49, imageUrl: "https://images.unsplash.com/photo-1549557434-25a8f4c287a9?q=80&w=1903&auto=format&fit=crop" },
  ],
  drinks: [
    { id: 6, name: "Classic Milkshake", description: "A thick and creamy milkshake available in vanilla, chocolate, or strawberry.", price: 7.00, imageUrl: "https://images.unsplash.com/photo-1626202157122-5839c05e1a5f?q=80&w=1887&auto=format&fit=crop" },
    { id: 7, name: "Fountain Soda", description: "Choose from a variety of classic fountain drinks.", price: 2.99 },
  ],
};

const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Restaurant Banner */}
        <div className="relative h-48 md:h-64 bg-gray-300">
          <img
            src={restaurant.imageUrl}
            alt={`${restaurant.name} interior`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        </div>

        <div className="container -mt-16 md:-mt-24 pb-12">
          {/* Restaurant Info Card */}
          <Card className="relative z-10 p-6 shadow-xl bg-background">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{restaurant.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <StarRating rating={restaurant.rating} size={20} readonly />
                    <span className="text-sm text-muted-foreground font-medium">{restaurant.rating.toFixed(1)} ({restaurant.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {restaurant.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground space-y-2 mt-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4"/>
                        <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4"/>
                        <span>{restaurant.hours}</span>
                    </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Menu Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <Tabs defaultValue="burgers" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="burgers">Burgers</TabsTrigger>
                <TabsTrigger value="sides">Sides</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
              </TabsList>
              <TabsContent value="burgers">
                <Card>
                  <div className="flex flex-col">
                    {menu.burgers.map(item => (
                      <MenuItem key={item.id} {...item} />
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="sides">
                <Card>
                  <div className="flex flex-col">
                    {menu.sides.map(item => (
                      <MenuItem key={item.id} {...item} />
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="drinks">
                <Card>
                  <div className="flex flex-col">
                    {menu.drinks.map(item => (
                      <MenuItem key={item.id} {...item} />
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;