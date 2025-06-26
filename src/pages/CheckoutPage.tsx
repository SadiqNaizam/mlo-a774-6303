import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

// Icons
import { CreditCard, Home, Landmark, PlusCircle, Ticket } from 'lucide-react';

// Placeholder Data
const orderItems = [
  { name: 'Classic Cheeseburger', price: 14.99, quantity: 1 },
  { name: 'Large Fries', price: 5.49, quantity: 1 },
  { name: 'Soda', price: 2.50, quantity: 2 },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    console.log("Order placed!");
    // Simulate API call
    setTimeout(() => {
      setOrderPlaced(true);
    }, 1000);
  };
  
  const handleViewOrders = () => {
    navigate('/user-profile'); // Navigate to user profile to see all orders
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 container py-12 text-center">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl text-green-600">Order Placed Successfully!</CardTitle>
                    <CardDescription>Your delicious meal is on its way. You can track the progress below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <OrderTracker currentStatus="confirmed" />
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                    <Button onClick={handleViewOrders}>View All My Orders</Button>
                    <Button variant="outline" onClick={() => navigate('/')}>Continue Shopping</Button>
                </CardFooter>
            </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Delivery and Payment */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Home className="w-5 h-5" /> Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Foodie Lane" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Flavor Town" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" defaultValue="12345" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment Method</CardTitle>
                <CardDescription>Select how you'd like to pay for your order.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="card" className="space-y-4">
                  <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="w-6 h-6" />
                    <span className="font-semibold">Credit or Debit Card</span>
                  </Label>
                  <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.png" alt="PayPal" className="w-6 h-auto" />
                    <span className="font-semibold">PayPal</span>
                  </Label>
                  <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary">
                    <RadioGroupItem value="bank" id="bank" />
                    <Landmark className="w-6 h-6" />
                    <span className="font-semibold">Cash on Delivery</span>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-1 sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {orderItems.map(item => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span>{item.quantity} x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                 <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Input placeholder="Promo Code"/>
                    <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                    Place Order
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;