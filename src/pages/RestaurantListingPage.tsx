import React, { useState } from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';

// Sample data for restaurant cards
const sampleRestaurants = [
  { id: 1, slug: 'burger-palace', name: 'Burger Palace', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop', cuisineTypes: ['Burgers', 'American', 'Fast Food'], rating: 4.5, deliveryTime: 25 },
  { id: 2, slug: 'pizza-heaven', name: 'Pizza Heaven', imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop', cuisineTypes: ['Pizza', 'Italian'], rating: 4.8, deliveryTime: 30 },
  { id: 3, slug: 'sushi-spot', name: 'Sushi Spot', imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1945&auto=format&fit=crop', cuisineTypes: ['Sushi', 'Japanese', 'Asian'], rating: 4.7, deliveryTime: 40 },
  { id: 4, slug: 'taco-fiesta', name: 'Taco Fiesta', imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2071&auto=format&fit=crop', cuisineTypes: ['Mexican', 'Tacos'], rating: 4.3, deliveryTime: 20 },
  { id: 5, slug: 'veggie-delight', name: 'Veggie Delight', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17025?q=80&w=2070&auto=format&fit=crop', cuisineTypes: ['Vegetarian', 'Healthy', 'Salads'], rating: 4.9, deliveryTime: 35 },
  { id: 6, slug: 'noodle-house', name: 'Noodle House', imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1892&auto=format&fit=crop', cuisineTypes: ['Asian', 'Noodles', 'Thai'], rating: 4.6, deliveryTime: 30 },
];

const cuisineOptions = ["Italian", "Mexican", "Japanese", "American", "Vegetarian", "Thai"];
const dietaryOptions = ["Vegan", "Gluten-Free"];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');
  const [priceRange, setPriceRange] = useState([25]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="space-y-6">
                <Accordion type="multiple" defaultValue={['cuisine', 'price']} className="w-full">
                    {/* Cuisine Filter */}
                    <AccordionItem value="cuisine">
                        <AccordionTrigger className="text-base font-semibold">Cuisine</AccordionTrigger>
                        <AccordionContent className="space-y-2 pt-2">
                            {cuisineOptions.map(cuisine => (
                                <div key={cuisine} className="flex items-center space-x-2">
                                    <Checkbox id={`cuisine-${cuisine}`} />
                                    <Label htmlFor={`cuisine-${cuisine}`} className="font-normal">{cuisine}</Label>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>

                    {/* Price Range Filter */}
                    <AccordionItem value="price">
                        <AccordionTrigger className="text-base font-semibold">Price Range</AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                <span>$0</span>
                                <span>${priceRange[0]}</span>
                            </div>
                            <Slider
                                defaultValue={[25]}
                                max={50}
                                step={1}
                                onValueChange={(value) => setPriceRange(value)}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    
                    {/* Dietary Needs Filter */}
                     <AccordionItem value="dietary">
                        <AccordionTrigger className="text-base font-semibold">Dietary</AccordionTrigger>
                        <AccordionContent className="space-y-2 pt-2">
                             {dietaryOptions.map(option => (
                                <div key={option} className="flex items-center space-x-2">
                                    <Checkbox id={`dietary-${option}`} />
                                    <Label htmlFor={`dietary-${option}`} className="font-normal">{option}</Label>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Button className="w-full">Apply Filters</Button>
            </div>
          </aside>

          {/* Main Content: Restaurants List */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 sm:mb-0">
                Showing Restaurants for <span className="text-primary">"Burgers"</span>
              </h1>
              <div className="w-full sm:w-auto">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="delivery">Fastest Delivery</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;