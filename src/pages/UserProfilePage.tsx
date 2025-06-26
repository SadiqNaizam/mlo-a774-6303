import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { User, MapPin, CreditCard, Package, History } from 'lucide-react';

// Placeholder data
const activeOrder = {
  id: 'FF12345',
  restaurant: 'The Burger Joint',
  status: 'delivery' as const,
  items: [
    { name: 'Classic Cheeseburger', quantity: 1 },
    { name: 'Large Fries', quantity: 1 },
    { name: 'Cola', quantity: 1 },
  ],
  total: 25.50,
};

const pastOrders = [
  {
    id: 'FF09876',
    date: '2024-07-15',
    restaurant: 'Pizza Palace',
    total: 32.00,
    items: ['1x Pepperoni Pizza', '1x Garlic Bread'],
  },
  {
    id: 'FF54321',
    date: '2024-06-28',
    restaurant: 'Sushi Central',
    total: 45.75,
    items: ['1x Dragon Roll', '1x Tuna Nigiri Set'],
  },
];

const userProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
};

const savedAddresses = [
  { id: 1, type: 'Home', address: '123 Main St, Anytown, USA 12345' },
  { id: 2, type: 'Work', address: '456 Business Blvd, Workville, USA 54321' },
];

const savedPayments = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/26' },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container py-8 md:py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Your Account</h1>
          <p className="text-muted-foreground">Manage your orders, profile, and settings.</p>
        </div>
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders"><Package className="w-4 h-4 mr-2" />Order History</TabsTrigger>
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" />Profile Settings</TabsTrigger>
            <TabsTrigger value="addresses"><MapPin className="w-4 h-4 mr-2" />Addresses & Payments</TabsTrigger>
          </TabsList>

          {/* Order History Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Order</CardTitle>
                <CardDescription>Tracking your current delivery from {activeOrder.restaurant}.</CardDescription>
              </CardHeader>
              <CardContent>
                <OrderTracker currentStatus={activeOrder.status} />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Past Orders</CardTitle>
                <CardDescription>Review your previous orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {pastOrders.map(order => (
                    <AccordionItem value={`item-${order.id}`} key={order.id}>
                      <AccordionTrigger>
                        <div className="flex justify-between w-full pr-4">
                          <span>Order #{order.id} from {order.restaurant}</span>
                          <span className="text-muted-foreground">{order.date}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                        <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                          {order.items.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Settings Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your name and password here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={userProfile.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={userProfile.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" type="password" placeholder="Enter new password" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses & Payments Tab */}
          <TabsContent value="addresses" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><MapPin className="w-5 h-5 mr-2" />Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedAddresses.map(addr => (
                    <div key={addr.id} className="p-4 border rounded-lg flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{addr.type}</p>
                        <p className="text-sm text-muted-foreground">{addr.address}</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                  <Button variant="secondary" className="w-full">Add New Address</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><CreditCard className="w-5 h-5 mr-2" />Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedPayments.map(payment => (
                    <div key={payment.id} className="p-4 border rounded-lg flex justify-between items-start">
                       <div>
                        <p className="font-semibold">{payment.type} ending in {payment.last4}</p>
                        <p className="text-sm text-muted-foreground">Expires {payment.expiry}</p>
                      </div>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  ))}
                  <Button variant="secondary" className="w-full">Add New Payment</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;