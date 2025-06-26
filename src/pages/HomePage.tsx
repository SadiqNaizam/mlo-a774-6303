import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import RestaurantCard from '@/components/RestaurantCard';
import CuisineCategoryFilter from '@/components/CuisineCategoryFilter';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import { Search } from 'lucide-react';

// Placeholder data for restaurant cards
const featuredRestaurants = [
  {
    id: 1,
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop',
    cuisineTypes: ['Burgers', 'American', 'Fast Food'],
    rating: 4.5,
    deliveryTime: 25,
  },
  {
    id: 2,
    slug: 'the-golden-spoon',
    name: 'The Golden Spoon',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.8,
    deliveryTime: 35,
  },
  {
    id: 3,
    slug: 'saffron-thread',
    name: 'The Saffron Thread',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1935&auto=format&fit=crop',
    cuisineTypes: ['Indian', 'Curry'],
    rating: 4.7,
    deliveryTime: 40,
  },
  {
    id: 4,
    slug: 'pacific-rim-sushi',
    name: 'Pacific Rim Sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1949&auto=format&fit=crop',
    cuisineTypes: ['Sushi', 'Japanese', 'Seafood'],
    rating: 4.9,
    deliveryTime: 30,
  },
];

const newRestaurants = [
  {
    id: 5,
    slug: 'crisp-green',
    name: 'Crisp & Green',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-2850a86b2bda?q=80&w=1974&auto=format&fit=crop',
    cuisineTypes: ['Salads', 'Healthy', 'Wraps'],
    rating: 4.6,
    deliveryTime: 20,
  },
  {
    id: 6,
    slug: 'the-wok-stop',
    name: 'The Wok Stop',
    imageUrl: 'https://images.unsplash.com/photo-1626700051185-3c48383a1618?q=80&w=1974&auto=format&fit=crop',
    cuisineTypes: ['Chinese', 'Noodles'],
    rating: 4.4,
    deliveryTime: 35,
  },
   {
    id: 7,
    slug: 'the-burrito-bar',
    name: 'The Burrito Bar',
    imageUrl: 'https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?q=80&w=2133&auto=format&fit=crop',
    cuisineTypes: ['Mexican', 'Burritos', 'Tacos'],
    rating: 4.7,
    deliveryTime: 30,
  },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    // In a real app, you would trigger a filter or API call here.
    console.log("Selected category:", category);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <ScrollArea className="flex-grow">
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white bg-black">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')" }}></div>
            <div className="relative z-10 container px-4 flex flex-col items-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-shadow-lg">
                Your next meal, delivered.
              </h1>
              <p className="max-w-xl md:text-xl mb-8 text-shadow">
                Discover the best local restaurants and get your favorite food delivered right to your door.
              </p>
              <div className="w-full max-w-lg flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Enter restaurant or cuisine..."
                    className="w-full pl-10 h-12 text-lg"
                  />
                </div>
                <Link to="/restaurant-listing">
                  <Button size="lg" className="h-12">Search</Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container py-8 md:py-12">
            {/* Cuisine Filter Section */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Or browse by category</h2>
              <CuisineCategoryFilter selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
            </section>

            {/* Featured Restaurants Section */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Featured Restaurants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            </section>

            {/* New on FeastFlow Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">New on FeastFlow</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default HomePage;