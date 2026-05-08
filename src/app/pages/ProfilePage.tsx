import React, { useState } from 'react';
import { User, Package, MapPin, Heart, Settings } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock order data
  const orders = [
    {
      id: 'ORD001',
      date: '2026-03-20',
      status: 'Delivered',
      total: 850,
      items: 5,
    },
    {
      id: 'ORD002',
      date: '2026-03-15',
      status: 'In Transit',
      total: 1200,
      items: 8,
    },
    {
      id: 'ORD003',
      date: '2026-03-10',
      status: 'Delivered',
      total: 650,
      items: 3,
    },
  ];

  const savedAddresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Mohammed Ahmed',
      phone: '+91 93049 69534',
      address: '123 Main Street, Phulwari Sharif',
      city: 'Patna',
      state: 'Bihar',
      pincode: '801505',
    },
    {
      id: 2,
      type: 'Office',
      name: 'Mohammed Ahmed',
      phone: '+91 93049 69534',
      address: '456 Business Park, Boring Road',
      city: 'Patna',
      state: 'Bihar',
      pincode: '800001',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair mb-8">My Account</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h3>Mohammed Ahmed</h3>
              <p className="text-sm text-muted-foreground">+91 93049 69534</p>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left ${
                  activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'
                }`}
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left ${
                  activeTab === 'orders' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'
                }`}
              >
                <Package className="w-4 h-4" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left ${
                  activeTab === 'addresses' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Addresses
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left ${
                  activeTab === 'wishlist' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'
                }`}
              >
                <Heart className="w-4 h-4" />
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left ${
                  activeTab === 'settings' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Profile Information</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Mohammed" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Ahmed" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="mohammed@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+91 93049 69534" />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
                <Button className="bg-primary text-primary-foreground">Save Changes</Button>
              </form>
            </Card>
          )}

          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Order History</h2>
              </div>
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3>Order #{order.id}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl text-primary">₹{order.total}</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Saved Addresses</h2>
                <Button className="bg-primary text-primary-foreground">Add New Address</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {savedAddresses.map((address) => (
                  <Card key={address.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded">
                        {address.type}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>{address.name}</p>
                      <p className="text-muted-foreground">{address.phone}</p>
                      <p className="text-muted-foreground">{address.address}</p>
                      <p className="text-muted-foreground">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <Card className="p-6">
              <h2 className="text-2xl mb-6">My Wishlist</h2>
              <p className="text-muted-foreground">View your wishlist items</p>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4">Change Password</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="bg-primary text-primary-foreground">Update Password</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
