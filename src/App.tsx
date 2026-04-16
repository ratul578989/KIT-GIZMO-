import { useState, useEffect } from 'react';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  ShoppingBag, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  Plus, 
  Ticket,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Copy,
  Trash2,
  ChevronRight,
  Package,
  Truck,
  MapPin,
  Phone,
  Search,
  Filter,
  ArrowRight,
  Edit,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { mockStore } from './lib/store';
import { UserProfile, DepositRequest, ServiceOrder, MarketplaceItem, PaymentMethod, SupportTicket, TicketMessage, Product, EcomOrder, ShippingAddress, WithdrawRequest } from './types';
import { storage, db, isFirebaseReady, isStorageReady } from './lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// --- Error Boundary ---

class ErrorBoundary extends React.Component<any, any> {
  state: any;
  props: any;
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle size={64} className="text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            The application encountered an unexpected error. Please try refreshing the page.
          </p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-8 p-4 bg-navy-900 rounded border border-border text-xs text-left overflow-auto max-w-full">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Components ---

const Marquee = () => (
  <div className="bg-primary py-1 overflow-hidden">
    <div className="animate-marquee text-primary-foreground font-bold text-sm">
      🔥 Deposit $50 and get a Professional Shopify Website for FREE (Full Setup + Payment Gateway)! &nbsp;&nbsp;&nbsp;&nbsp; 
      🔥 Deposit $50 and get a Professional Shopify Website for FREE (Full Setup + Payment Gateway)! &nbsp;&nbsp;&nbsp;&nbsp;
      🔥 Deposit $50 and get a Professional Shopify Website for FREE (Full Setup + Payment Gateway)!
    </div>
  </div>
);

const LandingPage = ({ onLoginClick, onSignupClick }: { onLoginClick: () => void, onSignupClick: () => void }) => {
  const marketplace = mockStore.getMarketplace();
  
  return (
    <div className="min-h-screen bg-navy-950 text-foreground">
      <Marquee />
      
      {/* Navigation */}
      <nav className="h-20 border-b border-border/50 flex items-center justify-between px-8 bg-navy-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary glow-cyan-text">KIT GIZMO</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onLoginClick}>Login</Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={onSignupClick}>Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
              >
                Elevate Your Social Media Presence <br className="hidden md:block" />
                <span className="text-primary glow-cyan-text">Instantly with KIT GIZMO</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-10"
              >
                The ultimate platform for high-end digital services, e-commerce management, and social growth.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
              >
                <Button size="lg" className="bg-primary text-primary-foreground text-lg px-8 py-6 h-auto" onClick={onSignupClick}>Get Started Now</Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-primary/20 hover:bg-primary/5">View Services</Button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 w-full max-w-md md:max-w-none"
            >
              <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-border/50 glow-cyan">
                <img 
                  src="https://picsum.photos/seed/tech/800/600" 
                  alt="Kit Gizmo Dashboard" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-24 px-8 bg-navy-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Our Premium Services</h3>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Shopify Development', desc: 'Full setup, theme customization, and payment gateway integration.', icon: ShoppingBag },
              { title: 'Social Growth', desc: 'Boost your presence across all major platforms with targeted strategies.', icon: LayoutDashboard },
              { title: 'Digital Marketing', desc: 'High-converting ad campaigns and content management.', icon: Wallet }
            ].map((s, i) => (
              <Card key={i} className="bg-navy-900 border-border hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <s.icon size={24} />
                  </div>
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Student Success Stories</h3>
            <p className="text-muted-foreground">Join thousands of successful entrepreneurs who started with Kit Gizmo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Alex Rivera', story: 'Kit Gizmo helped me launch my Shopify store in 48 hours. I hit $10k in sales within the first month!', role: 'E-commerce Entrepreneur' },
              { name: 'Sarah Chen', story: 'The social media growth services are unmatched. My brand visibility tripled in just two weeks.', role: 'Content Creator' }
            ].map((story, i) => (
              <Card key={i} className="bg-navy-900 border-border italic">
                <CardContent className="pt-6">
                  <p className="text-lg mb-6">"{story.story}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {story.name[0]}
                    </div>
                    <div>
                      <p className="font-bold not-italic">{story.name}</p>
                      <p className="text-xs text-muted-foreground not-italic">{story.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-24 px-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Trusted by Industry Leaders</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {marketplace.map(p => p.logoUrl ? (
              <img key={p.id} src={p.logoUrl} alt={p.name} className="h-10 md:h-14 w-auto object-contain" referrerPolicy="no-referrer" />
            ) : null)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-border/50 bg-navy-900/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-xl font-bold text-primary glow-cyan-text">KIT GIZMO</h1>
            <p className="text-sm text-muted-foreground mt-2">© 2026 Kit Gizmo. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SidebarContent = ({ user, onLogout, closeSheet }: { user: UserProfile, onLogout: () => void, closeSheet?: () => void }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Add Funds', path: '/deposit', icon: Wallet },
    { name: 'Withdraw', path: '/withdraw', icon: LogOut },
    { name: 'Transaction History', path: '/transactions', icon: Clock },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'My Orders', path: '/orders', icon: Package },
    { name: 'Support', path: '/support', icon: Ticket },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  if (user.role === 'admin') {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: ShieldCheck });
  }

  return (
    <div className="flex flex-col h-full bg-navy-900">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary glow-cyan-text">KIT GIZMO</h1>
        <p className="text-xs text-muted-foreground">Service Platform</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const LinkContent = (
            <Button
              variant={isActive ? 'secondary' : 'ghost'}
              className={`w-full justify-start gap-3 h-12 ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}
            >
              <Icon size={20} />
              {item.name}
            </Button>
          );

          return (
            <div key={item.path}>
              {closeSheet ? (
                <SheetClose>
                  <Link to={item.path}>
                    {LinkContent}
                  </Link>
                </SheetClose>
              ) : (
                <Link to={item.path}>
                  {LinkContent}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user.displayName[0]}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user.displayName}</p>
            <p className="text-xs text-muted-foreground truncate">${user.balance.toLocaleString()}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 h-12" onClick={onLogout}>
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
};

const Sidebar = ({ user, onLogout }: { user: UserProfile, onLogout: () => void }) => {
  return (
    <div className="hidden lg:flex w-64 border-r border-border h-screen flex-col sticky top-0">
      <SidebarContent user={user} onLogout={onLogout} />
    </div>
  );
};

// --- Pages ---

const DashboardStats = ({ user }: { user: UserProfile }) => {
  const stats = [
    { title: 'Total Deposited', value: `$${user.balance.toLocaleString()}`, icon: Wallet },
    { title: 'Total Withdrawn', value: `$${(user.totalWithdrawn || 0).toLocaleString()}`, icon: LogOut },
    { title: 'Total Orders', value: user.totalOrders, icon: Clock },
    { title: 'Unfulfilled', value: user.unfulfilledOrders, icon: AlertCircle },
    { title: 'Fulfilled', value: user.fulfilledOrders, icon: CheckCircle2 },
    { title: 'Completed', value: user.completedOrders, icon: CheckCircle2 },
    { title: 'Refunded', value: user.refundedOrders, icon: X },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="bg-navy-900 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <stat.icon size={16} />
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// --- E-commerce Components ---

const Shop = ({ user }: { user: UserProfile }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isFirebaseReady && db) {
          const q = query(collection(db, 'products'));
          const querySnapshot = await getDocs(q);
          const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
          setProducts(productsData);
        } else {
          setProducts(mockStore.getProducts());
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handlePurchase = async () => {
    if (!checkoutProduct) return;
    if (user.balance < checkoutProduct.price) {
      toast.error('Insufficient balance. Please add funds.');
      return;
    }

    if (!shippingAddress.name || !shippingAddress.address || !shippingAddress.city || !shippingAddress.zipCode || !shippingAddress.phone) {
      toast.error('Please fill in all shipping details.');
      return;
    }

    setIsProcessing(true);
    try {
      const newOrder: Omit<EcomOrder, 'id'> = {
        userId: user.uid,
        userEmail: user.email,
        productId: checkoutProduct.id,
        productName: checkoutProduct.name,
        price: checkoutProduct.price,
        status: 'pending',
        shippingAddress,
        createdAt: new Date().toISOString()
      };

      if (isFirebaseReady && db) {
        // Update balance
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          balance: user.balance - checkoutProduct.price
        });

        // Add order
        await addDoc(collection(db, 'ecom_orders'), newOrder);
      } else {
        // Mock update
        const users = mockStore.getUsers();
        const userIdx = users.findIndex(u => u.uid === user.uid);
        if (userIdx !== -1) {
          users[userIdx].balance -= checkoutProduct.price;
          mockStore.saveUsers(users);
          mockStore.setCurrentUser(users[userIdx]);
        }

        const orders = mockStore.getEcomOrders();
        orders.push({ id: Math.random().toString(36).substr(2, 9), ...newOrder });
        mockStore.saveEcomOrders(orders);
      }

      toast.success('Purchase successful! Your order is being processed.');
      setCheckoutProduct(null);
      // Refresh user data if needed (via parent or reload)
      window.location.reload();
    } catch (error) {
      console.error('Error processing purchase:', error);
      toast.error('Failed to process purchase.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Shop</h2>
          <p className="text-muted-foreground">Premium products for your business.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse bg-navy-900/50 border-border/50">
              <div className="h-48 bg-navy-800 rounded-t-lg"></div>
              <CardContent className="p-6 space-y-4">
                <div className="h-6 bg-navy-800 rounded w-3/4"></div>
                <div className="h-4 bg-navy-800 rounded w-full"></div>
                <div className="h-10 bg-navy-800 rounded w-full mt-4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <Card className="bg-navy-900/50 border-border/50 p-12 text-center">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-xl font-semibold mb-2">No products available</h3>
          <p className="text-muted-foreground">Check back later for new arrivals.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-navy-900/50 border-border/50 hover:border-primary/50 transition-all group h-full flex flex-col rounded-xl overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 text-primary-foreground font-bold px-3 py-1 text-lg shadow-lg">
                      ${product.price.toLocaleString()}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 mt-auto">
                  <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Package size={14} className="text-primary" /> {product.stock} units available
                    </span>
                  </div>
                  <Button 
                    className="w-full h-11 font-bold group-hover:glow-cyan transition-all"
                    onClick={() => setCheckoutProduct(product)}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl"
            >
              <Card className="bg-navy-950 border-primary/30 shadow-2xl shadow-primary/10">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
                  <div>
                    <CardTitle>Checkout Summary</CardTitle>
                    <CardDescription>Complete your purchase for {checkoutProduct.name}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setCheckoutProduct(null)}>
                    <X size={20} />
                  </Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <MapPin size={18} className="text-primary" /> Shipping Address (USA)
                      </h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="ship-name">Full Name</Label>
                          <Input 
                            id="ship-name" 
                            placeholder="John Doe" 
                            value={shippingAddress.name}
                            onChange={e => setShippingAddress({...shippingAddress, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="ship-address">Street Address</Label>
                          <Input 
                            id="ship-address" 
                            placeholder="123 Main St" 
                            value={shippingAddress.address}
                            onChange={e => setShippingAddress({...shippingAddress, address: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor="ship-city">City</Label>
                            <Input 
                              id="ship-city" 
                              placeholder="New York" 
                              value={shippingAddress.city}
                              onChange={e => setShippingAddress({...shippingAddress, city: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="ship-zip">Zip Code</Label>
                            <Input 
                              id="ship-zip" 
                              placeholder="10001" 
                              value={shippingAddress.zipCode}
                              onChange={e => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="ship-phone">Phone Number</Label>
                          <Input 
                            id="ship-phone" 
                            placeholder="+1 (555) 000-0000" 
                            value={shippingAddress.phone}
                            onChange={e => setShippingAddress({...shippingAddress, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Wallet size={18} className="text-primary" /> Payment Summary
                      </h4>
                      <div className="bg-navy-900/50 rounded-lg p-4 space-y-3 border border-border/50">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Product Price</span>
                          <span>${checkoutProduct.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="text-green-500">FREE</span>
                        </div>
                        <div className="border-t border-border/50 pt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-primary">${checkoutProduct.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="bg-navy-900/50 rounded-lg p-4 space-y-2 border border-border/50">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Your Balance</span>
                          <span className={user.balance >= checkoutProduct.price ? 'text-green-500' : 'text-destructive'}>
                            ${user.balance.toLocaleString()}
                          </span>
                        </div>
                        {user.balance < checkoutProduct.price && (
                          <p className="text-xs text-destructive">
                            Insufficient balance. Please add funds to your wallet.
                          </p>
                        )}
                      </div>
                      <Button 
                        className="w-full h-12 text-lg font-bold glow-cyan"
                        disabled={isProcessing}
                        onClick={handlePurchase}
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          `Confirm Purchase - $${checkoutProduct.price.toLocaleString()}`
                        )}
                      </Button>
                      {user.balance < checkoutProduct.price && (
                        <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10" asChild>
                          <Link to="/deposit">Add Funds to Wallet</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (isFirebaseReady && db) {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productsData);
      } else {
        setProducts(mockStore.getProducts());
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isStorageReady || !storage) {
      toast.error('Firebase Storage is not configured. Please use Image URLs instead.');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setCurrentProduct({ ...currentProduct, image: downloadURL });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!currentProduct.name || !currentProduct.price || currentProduct.stock === undefined) {
      toast.error('Please fill in required fields.');
      return;
    }

    setIsSaving(true);
    try {
      const productData = {
        ...currentProduct,
        createdAt: currentProduct.createdAt || new Date().toISOString()
      };

      if (isFirebaseReady && db) {
        if (currentProduct.id) {
          await updateDoc(doc(db, 'products', currentProduct.id), productData);
        } else {
          await addDoc(collection(db, 'products'), productData);
        }
      } else {
        const products = mockStore.getProducts();
        if (currentProduct.id) {
          const idx = products.findIndex(p => p.id === currentProduct.id);
          products[idx] = { ...products[idx], ...productData } as Product;
        } else {
          products.push({ id: Math.random().toString(36).substr(2, 9), ...productData } as Product);
        }
        mockStore.saveProducts(products);
      }

      toast.success(currentProduct.id ? 'Product updated' : 'Product added');
      setIsEditing(false);
      setCurrentProduct({ name: '', description: '', price: 0, stock: 0, image: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      if (isFirebaseReady && db) {
        await deleteDoc(doc(db, 'products', id));
      } else {
        const products = mockStore.getProducts();
        const filtered = products.filter(p => p.id !== id);
        mockStore.saveProducts(filtered);
      }
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Product Management</h3>
        <Button onClick={() => {
          setCurrentProduct({ name: '', description: '', price: 0, stock: 0, image: '' });
          setIsEditing(true);
        }}>
          <Plus size={18} className="mr-2" /> Add Product
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-navy-900/50 border-primary/30">
          <CardHeader>
            <CardTitle>{currentProduct.id ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input 
                    value={currentProduct.name} 
                    onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                    placeholder="e.g. Premium Shopify Theme"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <Input 
                        value={currentProduct.image} 
                        onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})}
                        placeholder="Image URL (https://...)"
                        className="flex-1"
                      />
                      <div className="relative">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          disabled={uploading}
                        />
                        <Button 
                          variant="outline" 
                          type="button" 
                          disabled={uploading || !isStorageReady} 
                          className="whitespace-nowrap"
                        >
                          {uploading ? 'Uploading...' : isStorageReady ? 'Upload File' : 'Upload Disabled'}
                        </Button>
                      </div>
                    </div>
                    {currentProduct.image && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-navy-950">
                        <img 
                          src={currentProduct.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => setCurrentProduct({...currentProduct, image: ''})}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price (USD)</Label>
                    <Input 
                      type="number"
                      value={isNaN(currentProduct.price || 0) ? '' : currentProduct.price} 
                      onChange={e => {
                        const val = parseFloat(e.target.value);
                        setCurrentProduct({...currentProduct, price: isNaN(val) ? 0 : val});
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Quantity</Label>
                    <Input 
                      type="number"
                      value={isNaN(currentProduct.stock || 0) ? '' : currentProduct.stock} 
                      onChange={e => {
                        const val = parseInt(e.target.value);
                        setCurrentProduct({...currentProduct, stock: isNaN(val) ? 0 : val});
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea 
                    className="w-full min-h-[120px] bg-navy-950 border border-border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={currentProduct.description}
                    onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                    placeholder="Describe the product..."
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSaveProduct} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-md border border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-navy-900/50">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading products...</TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No products found</TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} className="hover:bg-navy-900/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-navy-800 overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ImageIcon size={16} />
                        </div>
                      )}
                    </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{product.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => {
                        setCurrentProduct(product);
                        setIsEditing(true);
                      }}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<EcomOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      if (isFirebaseReady && db) {
        const querySnapshot = await getDocs(collection(db, 'ecom_orders'));
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EcomOrder));
        setOrders(ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } else {
        setOrders(mockStore.getEcomOrders().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: EcomOrder['status']) => {
    try {
      if (isFirebaseReady && db) {
        await updateDoc(doc(db, 'ecom_orders', orderId), { status: newStatus });
      } else {
        const orders = mockStore.getEcomOrders();
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx !== -1) {
          orders[idx].status = newStatus;
          mockStore.saveEcomOrders(orders);
        }
      }
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">E-commerce Orders</h3>
      <div className="rounded-md border border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-navy-900/50">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shipping Info</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading orders...</TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No orders found</TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-navy-900/30">
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell>{order.userEmail}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>${order.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'delivered' ? 'success' : 
                      order.status === 'shipped' ? 'default' : 
                      order.status === 'processing' ? 'secondary' : 'outline'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div className="font-bold">{order.shippingAddress.name}</div>
                      <div>{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.zipCode}</div>
                      <div>{order.shippingAddress.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <select 
                      className="bg-navy-950 border border-border rounded px-2 py-1 text-xs focus:outline-none"
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as EcomOrder['status'])}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const OrderHistory = ({ user }: { user: UserProfile }) => {
  const [orders, setOrders] = useState<EcomOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (isFirebaseReady && db) {
          const q = query(collection(db, 'ecom_orders'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EcomOrder));
          setOrders(ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        } else {
          const ordersData = mockStore.getEcomOrders().filter(o => o.userId === user.uid);
          setOrders(ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.uid]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
        <p className="text-muted-foreground">Track your product purchases and shipping status.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse bg-navy-900/50 border-border/50 h-24"></Card>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <Card className="bg-navy-900/50 border-border/50 p-12 text-center">
          <Package size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground">Your product purchases will appear here.</p>
          <Button className="mt-6" asChild>
            <Link to="/dashboard/shop">Go to Shop</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="bg-navy-900/50 border-border/50 hover:border-primary/30 transition-all overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded bg-navy-800 flex items-center justify-center text-primary">
                    <Package size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{order.productName}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="font-mono text-xs">ID: {order.id}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-primary">${order.price.toLocaleString()}</span>
                    <Badge variant={
                      order.status === 'delivered' ? 'success' : 
                      order.status === 'shipped' ? 'default' : 
                      order.status === 'processing' ? 'secondary' : 'outline'
                    }>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck size={14} />
                    {order.status === 'pending' && 'Awaiting processing'}
                    {order.status === 'processing' && 'Preparing for shipment'}
                    {order.status === 'shipped' && 'In transit to your address'}
                    {order.status === 'delivered' && 'Delivered to your address'}
                  </div>
                </div>
              </div>
              
              <div className="bg-navy-950/50 px-6 py-3 border-t border-border/50 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  <span>{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.zipCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = ({ user }: { user: UserProfile }) => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setOrders(mockStore.getOrders().filter(o => o.userId === user.uid));
    setTransactions(mockStore.getTransactions().filter(t => t.userId === user.uid));
  }, [user.uid]);

  return (
    <div className="space-y-8">
      <DashboardStats user={user} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-navy-900 border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/shop">
              <Button className="w-full h-20 md:h-24 flex-col gap-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-lg">
                <ShoppingBag />
                Shop Products
              </Button>
            </Link>
            <Link to="/deposit">
              <Button className="w-full h-20 md:h-24 flex-col gap-2 bg-accent/10 border border-accent/20 hover:bg-accent/20 text-accent text-lg">
                <Wallet />
                Deposit USDT
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-navy-900 border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 && orders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
            ) : (
              <div className="space-y-4">
                {transactions.slice(0, 2).map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-navy-950 border border-border">
                    <div className="flex items-center gap-3">
                      <Wallet className="text-accent" size={18} />
                      <div>
                        <p className="text-sm font-medium">Deposit: ${t.amount}</p>
                        <p className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant={t.status === 'success' ? 'default' : t.status === 'rejected' ? 'destructive' : 'secondary'}>
                      {t.status}
                    </Badge>
                  </div>
                ))}
                {orders.slice(0, 2).map(o => (
                  <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-navy-950 border border-border">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="text-primary" size={18} />
                      <div>
                        <p className="text-sm font-medium">{o.serviceName}</p>
                        <p className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {o.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TransactionHistory = ({ user }: { user: UserProfile }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(mockStore.getTransactions().filter(t => t.userId === user.uid));
  }, [user.uid]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Transaction History</h2>
        <Badge variant="outline" className="text-primary border-primary/20">USDT Payments</Badge>
      </div>
      
      <Card className="bg-navy-900 border-border overflow-hidden">
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((t) => (
                  <TableRow key={t.id} className="border-border hover:bg-navy-950/50">
                    <TableCell className="text-muted-foreground">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-bold text-primary">${t.amount.toLocaleString()}</TableCell>
                    <TableCell>{t.method}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={t.status === 'success' ? 'default' : t.status === 'rejected' ? 'destructive' : 'secondary'}
                        className={t.status === 'success' ? 'bg-green-500/20 text-green-500 border-green-500/20' : ''}
                      >
                        {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {transactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-border">
            {transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((t) => (
              <div key={t.id} className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleDateString()}</span>
                  <Badge 
                    variant={t.status === 'success' ? 'default' : t.status === 'rejected' ? 'destructive' : 'secondary'}
                    className={t.status === 'success' ? 'bg-green-500/20 text-green-500 border-green-500/20' : ''}
                  >
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t.method}</span>
                  <span className="font-bold text-primary text-lg">${t.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">No transactions found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ServiceOrderHistory = ({ user }: { user: UserProfile }) => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);

  useEffect(() => {
    setOrders(mockStore.getOrders().filter(o => o.userId === user.uid));
  }, [user.uid]);

  const getStatusBadge = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case 'unfulfilled':
      case 'fulfilled':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/20">Processing</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/20">Complete</Badge>;
      case 'refunded':
        return <Badge variant="destructive">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Order History</h2>
        <Link to="/order" className="w-full sm:w-auto">
          <Button size="sm" className="gap-2 w-full sm:w-auto"><Plus size={16} /> New Order</Button>
        </Link>
      </div>
      
      <Card className="bg-navy-900 border-border overflow-hidden">
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((o) => (
                  <TableRow key={o.id} className="border-border hover:bg-navy-950/50">
                    <TableCell className="font-medium">{o.serviceName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-bold text-primary">${o.price}</TableCell>
                    <TableCell className="text-right">
                      {getStatusBadge(o.status)}
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      You haven't placed any orders yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-border">
            {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((o) => (
              <div key={o.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm">{o.serviceName}</span>
                  {getStatusBadge(o.status)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</span>
                  <span className="font-bold text-primary">${o.price}</span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">You haven't placed any orders yet.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SupportCenter = ({ user }: { user: UserProfile }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [replyText, setReplyText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const refreshTickets = () => {
    const allTickets = mockStore.getTickets().filter(t => t.userId === user.uid);
    setTickets(allTickets);
    if (selectedTicket) {
      const updated = allTickets.find(t => t.id === selectedTicket.id);
      if (updated) setSelectedTicket(updated);
    }
  };

  useEffect(() => {
    refreshTickets();
  }, [user.uid]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsUploading(true);
    let screenshotUrl = '';

    try {
      if (file && storage && isStorageReady) {
        const fileRef = ref(storage, `tickets/${Date.now()}_${file.name}`);
        const uploadResult = await uploadBytes(fileRef, file);
        screenshotUrl = await getDownloadURL(uploadResult.ref);
      } else if (file) {
        screenshotUrl = previewUrl || '';
      }

      const newTicket: SupportTicket = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.uid,
        userEmail: user.email,
        subject,
        message,
        screenshotUrl: screenshotUrl || undefined,
        status: 'open',
        createdAt: new Date().toISOString(),
        messages: [],
        hasNewAdminReply: false,
        hasNewUserReply: false,
      };

      const allTickets = mockStore.getTickets();
      allTickets.push(newTicket);
      mockStore.saveTickets(allTickets);
      refreshTickets();
      
      setShowForm(false);
      setSubject('');
      setMessage('');
      setFile(null);
      setPreviewUrl(null);
      toast.success('Support ticket submitted!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReply = () => {
    if (!replyText || !selectedTicket || selectedTicket.status === 'closed') return;

    const newMessage: TicketMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.uid,
      senderRole: 'user',
      text: replyText,
      createdAt: new Date().toISOString(),
    };

    const allTickets = mockStore.getTickets();
    const ticketIndex = allTickets.findIndex(t => t.id === selectedTicket.id);
    if (ticketIndex !== -1) {
      const ticket = allTickets[ticketIndex];
      ticket.messages = [...(ticket.messages || []), newMessage];
      ticket.hasNewUserReply = true;
      mockStore.saveTickets(allTickets);
      setReplyText('');
      refreshTickets();
      toast.success('Reply sent!');
    }
  };

  const markAsRead = (ticket: SupportTicket) => {
    if (ticket.hasNewAdminReply) {
      const allTickets = mockStore.getTickets();
      const target = allTickets.find(t => t.id === ticket.id);
      if (target) {
        target.hasNewAdminReply = false;
        mockStore.saveTickets(allTickets);
        refreshTickets();
      }
    }
  };

  if (selectedTicket) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => setSelectedTicket(null)} className="gap-2">
          <ChevronRight className="rotate-180" size={18} /> Back to Tickets
        </Button>

        <Card className="bg-navy-900 border-border overflow-hidden flex flex-col h-[600px]">
          <CardHeader className="border-b border-border bg-navy-950/50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">{selectedTicket.subject}</CardTitle>
                <CardDescription>Ticket ID: {selectedTicket.id}</CardDescription>
              </div>
              <Badge variant={selectedTicket.status === 'open' ? 'default' : selectedTicket.status === 'in-progress' ? 'secondary' : 'outline'}>
                {selectedTicket.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Initial Message */}
            <div className="flex flex-col items-start max-w-[80%]">
              <div className="bg-navy-800 p-4 rounded-2xl rounded-tl-none border border-border">
                <p className="text-sm">{selectedTicket.message}</p>
                {selectedTicket.screenshotUrl && (
                  <img 
                    src={selectedTicket.screenshotUrl} 
                    alt="Screenshot" 
                    className="mt-3 max-w-full rounded-lg border border-border cursor-pointer" 
                    onClick={() => window.open(selectedTicket.screenshotUrl, '_blank')}
                  />
                )}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 ml-2">
                {new Date(selectedTicket.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Conversation Thread */}
            {(selectedTicket.messages || []).map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.senderRole === 'user' ? 'items-end ml-auto' : 'items-start'} max-w-[80%]`}
              >
                <div className={`p-4 rounded-2xl border ${
                  msg.senderRole === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none border-primary/20' 
                    : 'bg-navy-800 text-foreground rounded-tl-none border-border'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 mx-2">
                  {msg.senderRole === 'admin' ? 'Support Agent' : 'You'} • {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </CardContent>

          {selectedTicket.status !== 'closed' && (
            <div className="p-4 border-t border-border bg-navy-950/50">
              <div className="flex gap-2">
                <Input 
                  value={replyText} 
                  onChange={e => setReplyText(e.target.value)} 
                  placeholder="Type your message..." 
                  className="bg-navy-950 border-border"
                  onKeyPress={e => e.key === 'Enter' && handleReply()}
                />
                <Button onClick={handleReply} className="bg-primary text-primary-foreground">
                  Send
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">Support Center</h2>
        <Button onClick={() => setShowForm(true)} className="bg-primary text-primary-foreground">
          <Plus size={18} className="mr-2" /> Open New Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(t => (
          <Card 
            key={t.id} 
            className={`bg-navy-900 border-border cursor-pointer hover:border-primary/50 transition-all relative ${t.hasNewAdminReply ? 'ring-2 ring-primary' : ''}`}
            onClick={() => {
              setSelectedTicket(t);
              markAsRead(t);
            }}
          >
            {t.hasNewAdminReply && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                NEW REPLY
              </div>
            )}
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">{t.subject}</CardTitle>
                <CardDescription>{new Date(t.createdAt).toLocaleString()}</CardDescription>
              </div>
              <Badge variant={t.status === 'open' ? 'default' : t.status === 'in-progress' ? 'secondary' : 'outline'}>
                {t.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">{t.message}</p>
            </CardContent>
          </Card>
        ))}
        {tickets.length === 0 && !showForm && (
          <div className="text-center py-12 space-y-6">
            <Ticket size={64} className="mx-auto text-primary opacity-50" />
            <p className="text-muted-foreground">No active support tickets. Need help? Open a new ticket.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="w-full max-w-lg bg-navy-900 border-border relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-primary">
              <X size={20} />
            </button>
            <CardHeader>
              <CardTitle>Open New Ticket</CardTitle>
              <CardDescription>Describe your issue and attach a screenshot if needed.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Deposit not showing" className="bg-navy-950" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <textarea 
                    className="w-full min-h-[120px] bg-navy-950 border border-border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your problem in detail..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Screenshot (Optional)</Label>
                  <div className="flex flex-col gap-4">
                    {!previewUrl ? (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <Button 
                          type="button" 
                          className={`w-full gap-2 h-12 ${isStorageReady ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-navy-800 text-muted-foreground cursor-not-allowed'}`}
                          disabled={!isStorageReady}
                        >
                          <Plus size={18} /> {isStorageReady ? 'Upload Screenshot' : 'Upload Disabled (Storage Not Configured)'}
                        </Button>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-video bg-navy-950 rounded-lg border border-border overflow-hidden group">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                        <button 
                          type="button"
                          onClick={removeFile}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-primary text-primary-foreground" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Submit Ticket'}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)} disabled={isUploading}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const DepositPage = ({ user, onUpdateUser }: { user: UserProfile, onUpdateUser: (u: UserProfile) => void }) => {
  const [amount, setAmount] = useState('');
  const [proof, setProof] = useState('');
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setMethods(mockStore.getPaymentMethods());
  }, []);

  const handleDeposit = async () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val < 30 || val > 500000) {
      toast.error('Amount must be between $30 and $500,000');
      return;
    }
    if (!proof) {
      toast.error('Please provide transaction proof (Hash or URL)');
      return;
    }

    setIsProcessing(true);
    setShowSuccess(false);

    // Simulate network delay for "Processing" animation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newDeposit: DepositRequest = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.uid,
      userEmail: user.email,
      amount: val,
      method: 'Manual Payment',
      proofUrl: proof,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const deposits = mockStore.getDeposits();
    deposits.push(newDeposit);
    mockStore.saveDeposits(deposits);

    // Create transaction record
    const transactions = mockStore.getTransactions();
    transactions.push({
      id: newDeposit.id,
      userId: user.uid,
      amount: val,
      method: 'USDT',
      status: 'pending',
      createdAt: newDeposit.createdAt
    });
    mockStore.saveTransactions(transactions);
    
    setIsProcessing(false);
    setShowSuccess(true);
    setAmount('');
    setProof('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="bg-navy-900 border-primary/20 mx-4 md:mx-0">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Add Funds</CardTitle>
          <CardDescription>Minimum deposit: $30 | Maximum: $500,000</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {methods.map(m => (
              <div key={m.id} className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm">
                <p className="font-bold text-primary mb-2">{m.name}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="font-mono select-all break-all text-xs md:text-sm bg-navy-950 p-2 rounded border border-border w-full">{m.address}</p>
                  <Button 
                    variant="secondary" 
                    className="w-full sm:w-auto h-12 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => {
                      navigator.clipboard.writeText(m.address);
                      toast.success('Copied to Clipboard!');
                    }}
                  >
                    <Copy size={18} />
                    Copy Address
                  </Button>
                </div>
                {m.qrCodeUrl && (
                  <div className="mt-4 flex justify-center">
                    <img src={m.qrCodeUrl} alt="QR Code" className="w-48 h-48 rounded-lg border-2 border-primary/20 p-2 bg-white" />
                  </div>
                )}
              </div>
            ))}
            {methods.length === 0 && <p className="text-muted-foreground">No manual payment methods configured.</p>}
          </div>

          <div className="space-y-8 pt-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="0.00" 
                value={amount} 
                onChange={(e) => {
                  setAmount(e.target.value);
                  setShowSuccess(false);
                }}
                className="bg-navy-950 border-border h-12 text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proof">Transaction Hash / Proof URL</Label>
              <Input 
                id="proof" 
                placeholder="Paste TXID or image link" 
                value={proof} 
                onChange={(e) => {
                  setProof(e.target.value);
                  setShowSuccess(false);
                }}
                className="bg-navy-950 border-border h-12"
              />
            </div>

            <AnimatePresence>
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-cyan-500/20 border border-cyan-500/50 p-4 rounded-lg text-white text-sm font-medium text-center shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                >
                  Payment Received! Please wait 10-30 minutes for manual verification. Your balance will be updated automatically once approved.
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-bold relative overflow-hidden" 
              onClick={handleDeposit}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Processing...</span>
                </div>
              ) : (
                "Submit Deposit Request"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const WithdrawPage = ({ user, onUpdateUser }: { user: UserProfile, onUpdateUser: (u: UserProfile) => void }) => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<WithdrawRequest[]>([]);

  const refreshHistory = () => {
    setHistory(mockStore.getWithdraws().filter(w => w.userId === user.uid));
  };

  useEffect(() => {
    refreshHistory();
  }, [user.uid]);

  const handleWithdraw = async () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val < 200) {
      toast.error('Minimum withdrawal is $200');
      return;
    }
    if (val > user.balance) {
      toast.error('Insufficient balance');
      return;
    }
    if (!address || address.length < 10) {
      toast.error('Please provide a valid TRC20 wallet address');
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newWithdraw: WithdrawRequest = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.uid,
      userEmail: user.email,
      amount: val,
      address,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Deduct from balance immediately
    const allUsers = mockStore.getUsers();
    const targetUser = allUsers.find(u => u.uid === user.uid);
    if (targetUser) {
      targetUser.balance -= val;
      mockStore.saveUsers(allUsers);
      onUpdateUser({...targetUser});
      mockStore.setCurrentUser(targetUser);
    }

    const allWithdraws = mockStore.getWithdraws();
    allWithdraws.push(newWithdraw);
    mockStore.saveWithdraws(allWithdraws);
    
    setIsProcessing(false);
    setAmount('');
    setAddress('');
    refreshHistory();
    toast.success('Withdraw request sent! Please wait for admin approval.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 md:px-0">
      <Card className="bg-navy-900 border-border">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Withdraw Funds (TRC20)</CardTitle>
          <CardDescription>Minimum withdrawal: $200 | Processing time: 12-24 hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="200.00" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="bg-navy-950 border-border h-12 text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">TRC20 Wallet Address</Label>
              <Input 
                id="address" 
                placeholder="T..." 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                className="bg-navy-950 border-border h-12"
              />
            </div>
          </div>

          <Button 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-bold relative overflow-hidden" 
            onClick={handleWithdraw}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>Processing...</span>
              </div>
            ) : (
              "Submit Withdraw Request"
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Withdraw History</h3>
        <Card className="bg-navy-900 border-border overflow-hidden">
          <CardContent className="p-0">
            <div className="hidden sm:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((w) => (
                    <TableRow key={w.id} className="border-border">
                      <TableCell className="text-muted-foreground">{new Date(w.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="font-bold text-primary">${w.amount.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-xs truncate max-w-[200px]">{w.address}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={w.status === 'success' ? 'default' : w.status === 'rejected' ? 'destructive' : 'secondary'}>
                          {w.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {history.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">No withdrawal history found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="sm:hidden divide-y divide-border">
              {history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((w) => (
                <div key={w.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{new Date(w.createdAt).toLocaleDateString()}</span>
                    <Badge variant={w.status === 'success' ? 'default' : w.status === 'rejected' ? 'destructive' : 'secondary'}>
                      {w.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs truncate max-w-[150px]">{w.address}</span>
                    <span className="font-bold text-primary">${w.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminPanel = ({ user }: { user: UserProfile }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [deposits, setDeposits] = useState<DepositRequest[]>([]);
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>([]);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [newLogo, setNewLogo] = useState({ name: '', url: '', link: '' });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [withdraws, setWithdraws] = useState<WithdrawRequest[]>([]);
  const [newPayment, setNewPayment] = useState({ name: '', address: '', qrCodeUrl: '' });

  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [statsForm, setStatsForm] = useState({
    totalOrders: 0,
    unfulfilledOrders: 0,
    fulfilledOrders: 0,
    completedOrders: 0,
    refundedOrders: 0,
    balance: 0
  });

  const saveStats = () => {
    if (!editingUser) return;
    const allUsers = mockStore.getUsers();
    const index = allUsers.findIndex(u => u.uid === editingUser.uid);
    if (index !== -1) {
      allUsers[index] = { ...allUsers[index], ...statsForm };
      mockStore.saveUsers(allUsers);
      refreshData();
      setEditingUser(null);
      toast.success('Stats updated');
    }
  };

  const openEditStats = (user: UserProfile) => {
    setEditingUser(user);
    setStatsForm({
      totalOrders: user.totalOrders || 0,
      unfulfilledOrders: user.unfulfilledOrders || 0,
      fulfilledOrders: user.fulfilledOrders || 0,
      completedOrders: user.completedOrders || 0,
      refundedOrders: user.refundedOrders || 0,
      balance: user.balance
    });
  };

  const refreshData = () => {
    setUsers(mockStore.getUsers());
    setDeposits(mockStore.getDeposits());
    setMarketplace(mockStore.getMarketplace());
    setPaymentMethods(mockStore.getPaymentMethods());
    setOrders(mockStore.getOrders());
    setWithdraws(mockStore.getWithdraws());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const adjustBalance = (uid: string, amount: number) => {
    const allUsers = mockStore.getUsers();
    const targetUser = allUsers.find(u => u.uid === uid);
    if (targetUser) {
      targetUser.balance += amount;
      mockStore.saveUsers(allUsers);

      // Create transaction record for manual adjustment
      const allTransactions = mockStore.getTransactions();
      allTransactions.push({
        id: Math.random().toString(36).substr(2, 9),
        userId: uid,
        amount: Math.abs(amount),
        method: amount >= 0 ? 'Manual Credit' : 'Manual Debit',
        status: 'success',
        createdAt: new Date().toISOString()
      });
      mockStore.saveTransactions(allTransactions);

      refreshData();
      toast.success(`Balance adjusted for ${targetUser.displayName}`);
    }
  };

  const handleDepositAction = (id: string, action: 'completed' | 'rejected') => {
    const allDeposits = mockStore.getDeposits();
    const deposit = allDeposits.find(d => d.id === id);
    if (deposit && deposit.status === 'pending') {
      deposit.status = action;
      mockStore.saveDeposits(allDeposits);

      // Update transaction record
      const allTransactions = mockStore.getTransactions();
      const transaction = allTransactions.find(t => t.id === id);
      if (transaction) {
        transaction.status = action === 'completed' ? 'success' : 'rejected';
        mockStore.saveTransactions(allTransactions);
      }
      
      if (action === 'completed') {
        const allUsers = mockStore.getUsers();
        const targetUser = allUsers.find(u => u.uid === deposit.userId);
        if (targetUser) {
          targetUser.balance += deposit.amount;
          mockStore.saveUsers(allUsers);
        }
        toast.success('Deposit accepted and balance updated.');
      } else {
        toast.error('Deposit rejected.');
      }
      
      refreshData();
    }
  };

  const handleWithdrawAction = (id: string, action: 'success' | 'rejected') => {
    const allWithdraws = mockStore.getWithdraws();
    const withdraw = allWithdraws.find(w => w.id === id);
    if (withdraw && withdraw.status === 'pending') {
      withdraw.status = action;
      mockStore.saveWithdraws(allWithdraws);

      const allUsers = mockStore.getUsers();
      const targetUser = allUsers.find(u => u.uid === withdraw.userId);
      
      if (targetUser) {
        if (action === 'success') {
          targetUser.totalWithdrawn = (targetUser.totalWithdrawn || 0) + withdraw.amount;
          toast.success('Withdrawal marked as complete.');
        } else {
          // Refund balance if rejected
          targetUser.balance += withdraw.amount;
          toast.error('Withdrawal rejected and funds refunded.');
        }
        mockStore.saveUsers(allUsers);
      }
      
      refreshData();
    }
  };

  const addMarketplaceItem = () => {
    if (!newLogo.name || !newLogo.url) return;
    const items = mockStore.getMarketplace();
    items.push({
      id: Math.random().toString(36).substr(2, 9),
      name: newLogo.name,
      logoUrl: newLogo.url,
      redirectLink: newLogo.link || '#',
    });
    mockStore.saveMarketplace(items);
    setNewLogo({ name: '', url: '', link: '' });
    refreshData();
    toast.success('Marketplace item added');
  };

  const addPaymentMethod = () => {
    if (!newPayment.name || !newPayment.address) return;
    const methods = mockStore.getPaymentMethods();
    methods.push({
      id: Math.random().toString(36).substr(2, 9),
      name: newPayment.name,
      address: newPayment.address,
      qrCodeUrl: newPayment.qrCodeUrl,
    });
    mockStore.savePaymentMethods(methods);
    setNewPayment({ name: '', address: '', qrCodeUrl: '' });
    refreshData();
    toast.success('Payment method added');
  };

  const deleteMarketplaceItem = (id: string) => {
    const items = mockStore.getMarketplace().filter(i => i.id !== id);
    mockStore.saveMarketplace(items);
    refreshData();
    toast.success('Marketplace item deleted');
  };

  const updateOrderStatus = (orderId: string, status: ServiceOrder['status']) => {
    const allOrders = mockStore.getOrders();
    const order = allOrders.find(o => o.id === orderId);
    if (order) {
      const oldStatus = order.status;
      order.status = status;
      mockStore.saveOrders(allOrders);
      
      // Update user stats
      const allUsers = mockStore.getUsers();
      const targetUser = allUsers.find(u => u.uid === order.userId);
      if (targetUser) {
        // Decrement old status count
        if (oldStatus === 'pending' || oldStatus === 'unfulfilled') targetUser.unfulfilledOrders = Math.max(0, (targetUser.unfulfilledOrders || 0) - 1);
        else if (oldStatus === 'fulfilled') targetUser.fulfilledOrders = Math.max(0, (targetUser.fulfilledOrders || 0) - 1);
        else if (oldStatus === 'completed') targetUser.completedOrders = Math.max(0, (targetUser.completedOrders || 0) - 1);
        else if (oldStatus === 'refunded') targetUser.refundedOrders = Math.max(0, (targetUser.refundedOrders || 0) - 1);

        // Increment new status count
        if (status === 'pending' || status === 'unfulfilled') targetUser.unfulfilledOrders = (targetUser.unfulfilledOrders || 0) + 1;
        else if (status === 'fulfilled') targetUser.fulfilledOrders = (targetUser.fulfilledOrders || 0) + 1;
        else if (status === 'completed') targetUser.completedOrders = (targetUser.completedOrders || 0) + 1;
        else if (status === 'refunded') targetUser.refundedOrders = (targetUser.refundedOrders || 0) + 1;

        mockStore.saveUsers(allUsers);
      }

      refreshData();
      toast.success(`Order status updated to ${status}`);
    }
  };

  return (
    <div className="space-y-8 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Admin Control Center</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refreshData}>Refresh Data</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Tabs defaultValue="users" className="w-full flex flex-col lg:flex-row gap-8">
          <TabsList className="bg-navy-900 border border-border flex flex-col h-auto p-2 gap-2 w-full lg:w-64 shrink-0">
            <TabsTrigger value="users" className="justify-start gap-3 py-4 px-4 w-full text-left"><User size={18} /> Users</TabsTrigger>
            <TabsTrigger value="deposits" className="justify-start gap-3 py-4 px-4 w-full text-left"><Wallet size={18} /> Deposits</TabsTrigger>
            <TabsTrigger value="products" className="justify-start gap-3 py-4 px-4 w-full text-left"><Package size={18} /> Products</TabsTrigger>
            <TabsTrigger value="ecom-orders" className="justify-start gap-3 py-4 px-4 w-full text-left"><Truck size={18} /> E-com Orders</TabsTrigger>
            <TabsTrigger value="marketplace" className="justify-start gap-3 py-4 px-4 w-full text-left"><ShoppingBag size={18} /> Marketplace</TabsTrigger>
            <TabsTrigger value="payments" className="justify-start gap-3 py-4 px-4 w-full text-left"><ShieldCheck size={18} /> Payments</TabsTrigger>
            <TabsTrigger value="withdraws" className="justify-start gap-3 py-4 px-4 w-full text-left"><LogOut size={18} /> Withdraw Requests</TabsTrigger>
            <TabsTrigger value="orders" className="justify-start gap-3 py-4 px-4 w-full text-left"><ShoppingBag size={18} /> Service Orders</TabsTrigger>
            <TabsTrigger value="tickets" className="justify-start gap-3 py-4 px-4 w-full text-left"><Ticket size={18} /> Support Tickets</TabsTrigger>
          </TabsList>

          <div className="flex-1 min-w-0">
            <TabsContent value="withdraws" className="mt-0">
              <Card className="bg-navy-900 border-border overflow-hidden">
                <CardHeader>
                  <CardTitle>Withdraw Management</CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-6">
                  <div className="divide-y divide-border">
                    {withdraws.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(w => (
                      <div key={w.id} className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-lg text-primary">${w.amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{w.userEmail}</p>
                          </div>
                          <Badge variant={w.status === 'success' ? 'default' : w.status === 'rejected' ? 'destructive' : 'secondary'}>
                            {w.status}
                          </Badge>
                        </div>
                        <div className="bg-navy-950 p-3 rounded border border-border">
                          <Label className="text-[10px] uppercase text-muted-foreground font-bold">TRC20 Address</Label>
                          <p className="font-mono text-sm break-all">{w.address}</p>
                        </div>
                        {w.status === 'pending' && (
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleWithdrawAction(w.id, 'success')}>Complete</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleWithdrawAction(w.id, 'rejected')}>Reject</Button>
                          </div>
                        )}
                      </div>
                    ))}
                    {withdraws.length === 0 && (
                      <div className="p-12 text-center text-muted-foreground">No withdrawal requests found.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="mt-0">
              <Card className="bg-navy-900 border-border overflow-hidden">
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <AdminProducts />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ecom-orders" className="mt-0">
              <Card className="bg-navy-900 border-border overflow-hidden">
                <CardHeader>
                  <CardTitle>E-commerce Orders</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <AdminOrders />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets" className="mt-0">
              <Card className="bg-navy-900 border-border overflow-hidden">
                <CardHeader>
                  <CardTitle>Support Management</CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-6">
                  <div className="divide-y divide-border">
                    {mockStore.getTickets().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(t => (
                      <div key={t.id} className={`p-6 space-y-4 relative ${t.hasNewUserReply ? 'bg-primary/5' : ''}`}>
                        {t.hasNewUserReply && (
                          <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">
                            NEW USER REPLY
                          </div>
                        )}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{t.subject}</h3>
                            <p className="text-sm text-muted-foreground">From: {t.userEmail}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant={t.status === 'open' ? 'default' : t.status === 'in-progress' ? 'secondary' : 'outline'}>
                              {t.status}
                            </Badge>
                            <select 
                              className="bg-navy-950 border border-border p-1 rounded text-xs"
                              value={t.status}
                              onChange={(e) => {
                                const tickets = mockStore.getTickets();
                                const target = tickets.find(tk => tk.id === t.id);
                                if (target) {
                                  target.status = e.target.value as SupportTicket['status'];
                                  mockStore.saveTickets(tickets);
                                  refreshData();
                                  toast.success('Status updated');
                                }
                              }}
                            >
                              <option value="open">Open</option>
                              <option value="in-progress">In Progress</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 bg-navy-950 rounded-lg border border-border custom-scrollbar">
                          {/* User's Original Message */}
                          <div className="flex flex-col items-start max-w-[90%]">
                            <div className="bg-navy-800 p-3 rounded-lg rounded-tl-none border border-border">
                              <p className="text-sm">{t.message}</p>
                              {t.screenshotUrl && (
                                <img 
                                  src={t.screenshotUrl} 
                                  alt="Screenshot" 
                                  className="mt-2 max-w-full rounded border border-border cursor-pointer" 
                                  onClick={() => window.open(t.screenshotUrl, '_blank')}
                                />
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1">{new Date(t.createdAt).toLocaleString()}</span>
                          </div>

                          {/* Conversation */}
                          {(t.messages || []).map(msg => (
                            <div key={msg.id} className={`flex flex-col ${msg.senderRole === 'admin' ? 'items-end ml-auto' : 'items-start'} max-w-[90%]`}>
                              <div className={`p-3 rounded-lg border ${
                                msg.senderRole === 'admin' 
                                  ? 'bg-primary text-primary-foreground rounded-tr-none border-primary/20' 
                                  : 'bg-navy-800 text-foreground rounded-tl-none border-border'
                              }`}>
                                <p className="text-sm">{msg.text}</p>
                              </div>
                              <span className="text-[10px] text-muted-foreground mt-1">
                                {msg.senderRole === 'admin' ? 'You' : 'User'} • {new Date(msg.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {t.status !== 'closed' && (
                          <div className="flex gap-2">
                            <Input 
                              id={`reply-${t.id}`}
                              placeholder="Type admin reply..." 
                              className="bg-navy-950 border-border"
                              onKeyPress={e => {
                                if (e.key === 'Enter') {
                                  const input = e.target as HTMLInputElement;
                                  if (!input.value) return;
                                  
                                  const newMessage: TicketMessage = {
                                    id: Math.random().toString(36).substr(2, 9),
                                    senderId: user.uid,
                                    senderRole: 'admin',
                                    text: input.value,
                                    createdAt: new Date().toISOString(),
                                  };

                                  const tickets = mockStore.getTickets();
                                  const target = tickets.find(tk => tk.id === t.id);
                                  if (target) {
                                    target.messages = [...(target.messages || []), newMessage];
                                    target.hasNewAdminReply = true;
                                    target.hasNewUserReply = false;
                                    if (target.status === 'open') target.status = 'in-progress';
                                    mockStore.saveTickets(tickets);
                                    input.value = '';
                                    refreshData();
                                    toast.success('Reply sent');
                                  }
                                }
                              }}
                            />
                            <Button size="sm" onClick={() => {
                              const input = document.getElementById(`reply-${t.id}`) as HTMLInputElement;
                              if (!input.value) return;
                              
                              const newMessage: TicketMessage = {
                                id: Math.random().toString(36).substr(2, 9),
                                senderId: user.uid,
                                senderRole: 'admin',
                                text: input.value,
                                createdAt: new Date().toISOString(),
                              };

                              const tickets = mockStore.getTickets();
                              const target = tickets.find(tk => tk.id === t.id);
                              if (target) {
                                target.messages = [...(target.messages || []), newMessage];
                                target.hasNewAdminReply = true;
                                target.hasNewUserReply = false;
                                if (target.status === 'open') target.status = 'in-progress';
                                mockStore.saveTickets(tickets);
                                input.value = '';
                                refreshData();
                                toast.success('Reply sent');
                              }
                            }}>Send</Button>
                          </div>
                        )}
                      </div>
                    ))}
                    {mockStore.getTickets().length === 0 && (
                      <div className="p-12 text-center text-muted-foreground">No support tickets found.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
          <Card className="bg-navy-900 border-border overflow-hidden">
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(o => (
                      <TableRow key={o.id}>
                        <TableCell className="font-medium">{o.serviceName}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{users.find(u => u.uid === o.userId)?.email || 'Unknown'}</TableCell>
                        <TableCell>
                          <select 
                            className="bg-navy-950 border border-border p-2 rounded text-sm"
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as ServiceOrder['status'])}
                          >
                            <option value="pending">Pending</option>
                            <option value="unfulfilled">Unfulfilled</option>
                            <option value="fulfilled">Fulfilled</option>
                            <option value="completed">Completed</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="sm:hidden divide-y divide-border">
                {orders.map(o => (
                  <div key={o.id} className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{o.serviceName}</p>
                        <p className="text-xs text-muted-foreground">{users.find(u => u.uid === o.userId)?.email || 'Unknown'}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Update Status</Label>
                      <select 
                        className="w-full bg-navy-950 border border-border p-4 rounded-lg text-lg font-medium h-14"
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as ServiceOrder['status'])}
                      >
                        <option value="pending">Pending</option>
                        <option value="unfulfilled">Unfulfilled</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="completed">Completed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="p-12 text-center text-muted-foreground">No orders found.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card className="bg-navy-900 border-border">
            <CardHeader>
              <CardTitle>Manual Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input value={newPayment.name} onChange={e => setNewPayment({...newPayment, name: e.target.value})} placeholder="Method Name (e.g. USDT TRC20)" className="h-12" />
                <Input value={newPayment.address} onChange={e => setNewPayment({...newPayment, address: e.target.value})} placeholder="Wallet Address/Instruction" className="h-12" />
                <Input value={newPayment.qrCodeUrl} onChange={e => setNewPayment({...newPayment, qrCodeUrl: e.target.value})} placeholder="QR Code URL (Optional)" className="h-12" />
              </div>
              <Button className="w-full h-12" onClick={addPaymentMethod}>Add Payment Method</Button>
              <div className="mt-4 space-y-2">
                {paymentMethods.map(m => (
                  <div key={m.id} className="p-4 bg-navy-950 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold">{m.name}</p>
                      <p className="text-sm text-muted-foreground font-mono">{m.address}</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => {
                      const methods = paymentMethods.filter(p => p.id !== m.id);
                      mockStore.savePaymentMethods(methods);
                      refreshData();
                    }}>Delete</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="bg-navy-900 border-border overflow-hidden">
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(u => (
                      <TableRow key={u.uid}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{u.displayName}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline">{u.role}</Badge></TableCell>
                        <TableCell className="font-mono text-primary">${u.balance.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="text-primary border-primary/20 hover:bg-primary/10" onClick={() => openEditStats(u)}>
                              Edit Stats
                            </Button>
                            <Button size="sm" variant="outline" className="text-green-500 border-green-500/20 hover:bg-green-500/10" onClick={() => adjustBalance(u.uid, 50)}>
                              +$50
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/10" onClick={() => adjustBalance(u.uid, -50)}>
                              -$50
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="sm:hidden divide-y divide-border">
                {users.map(u => (
                  <div key={u.uid} className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">{u.displayName}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{u.role}</Badge>
                    </div>
                    <div className="flex justify-between items-center bg-navy-950 p-4 rounded-lg border border-border">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Balance</span>
                      <span className="font-mono text-primary font-bold text-xl">${u.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button size="lg" variant="outline" className="w-full text-primary border-primary/20 hover:bg-primary/10 h-14 text-lg font-bold" onClick={() => openEditStats(u)}>
                        Edit Stats
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button size="lg" variant="outline" className="text-green-500 border-green-500/20 hover:bg-green-500/10 h-14 text-xl font-bold" onClick={() => adjustBalance(u.uid, 50)}>
                          +$50
                        </Button>
                        <Button size="lg" variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/10 h-14 text-xl font-bold" onClick={() => adjustBalance(u.uid, -50)}>
                          -$50
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposits" className="mt-6">
          <Card className="bg-navy-900 border-border overflow-hidden">
            <CardHeader>
              <CardTitle>Deposit Approval System</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Proof</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deposits.filter(d => d.status === 'pending').map(d => (
                      <TableRow key={d.id}>
                        <TableCell>{d.userEmail}</TableCell>
                        <TableCell className="font-bold">${d.amount}</TableCell>
                        <TableCell>
                          <a href={d.proofUrl} target="_blank" rel="noreferrer" className="text-primary flex items-center gap-1 hover:underline">
                            View Proof <ExternalLink size={14} />
                          </a>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleDepositAction(d.id, 'completed')}>Accept</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDepositAction(d.id, 'rejected')}>Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {deposits.filter(d => d.status === 'pending').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No pending deposits</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="sm:hidden divide-y divide-border">
                {deposits.filter(d => d.status === 'pending').map(d => (
                  <div key={d.id} className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">{d.userEmail}</span>
                      <span className="font-bold text-primary text-xl">${d.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary bg-primary/5 p-3 rounded-lg border border-primary/20">
                      <ExternalLink size={16} />
                      <a href={d.proofUrl} target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline">View Transaction Proof</a>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button size="lg" className="bg-green-600 hover:bg-green-700 h-14 text-lg font-bold" onClick={() => handleDepositAction(d.id, 'completed')}>Accept</Button>
                      <Button size="lg" variant="destructive" className="h-14 text-lg font-bold" onClick={() => handleDepositAction(d.id, 'rejected')}>Reject</Button>
                    </div>
                  </div>
                ))}
                {deposits.filter(d => d.status === 'pending').length === 0 && (
                  <div className="p-12 text-center text-muted-foreground">No pending deposits</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-navy-900 border-border lg:col-span-1">
              <CardHeader>
                <CardTitle>Add Partner Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Partner Name</Label>
                  <Input value={newLogo.name} onChange={e => setNewLogo({...newLogo, name: e.target.value})} placeholder="e.g. Amazon" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input value={newLogo.url} onChange={e => setNewLogo({...newLogo, url: e.target.value})} placeholder="https://..." className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Redirect Link</Label>
                  <Input value={newLogo.link} onChange={e => setNewLogo({...newLogo, link: e.target.value})} placeholder="https://..." className="h-12" />
                </div>
                <Button className="w-full h-12 text-lg" onClick={addMarketplaceItem}>Upload Logo</Button>
              </CardContent>
            </Card>

            <Card className="bg-navy-900 border-border lg:col-span-2">
              <CardHeader>
                <CardTitle>Current Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {marketplace.map(item => (
                    <div key={item.id} className="relative group p-4 rounded-lg bg-navy-950 border border-border flex flex-col items-center gap-2">
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt={item.name} className="h-12 w-auto object-contain" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="h-12 w-12 flex items-center justify-center bg-navy-900 rounded text-muted-foreground">
                          <ImageIcon size={16} />
                        </div>
                      )}
                      <p className="text-xs font-medium">{item.name}</p>
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteMarketplaceItem(item.id)}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  </div>

    {editingUser && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="w-full max-w-lg bg-navy-900 border-border relative overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setEditingUser(null)} 
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors p-2 bg-navy-950 rounded-full border border-border z-10"
            >
              <X size={20} />
            </button>
            <CardHeader>
              <CardTitle className="text-xl">Edit Stats: {editingUser.displayName}</CardTitle>
              <CardDescription>{editingUser.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-muted-foreground">Balance ($)</Label>
                  <Input 
                    type="number" 
                    className="bg-navy-950" 
                    value={isNaN(statsForm.balance) ? '' : statsForm.balance} 
                    onChange={e => {
                      const val = parseFloat(e.target.value);
                      setStatsForm({...statsForm, balance: isNaN(val) ? 0 : val});
                    }} 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-muted-foreground">Total Orders</Label>
                  <Input 
                    type="number" 
                    className="bg-navy-950" 
                    value={isNaN(statsForm.totalOrders) ? '' : statsForm.totalOrders} 
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setStatsForm({...statsForm, totalOrders: isNaN(val) ? 0 : val});
                    }} 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-muted-foreground">Unfulfilled</Label>
                  <Input 
                    type="number" 
                    className="bg-navy-950" 
                    value={isNaN(statsForm.unfulfilledOrders) ? '' : statsForm.unfulfilledOrders} 
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setStatsForm({...statsForm, unfulfilledOrders: isNaN(val) ? 0 : val});
                    }} 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-muted-foreground">Fulfilled</Label>
                  <Input 
                    type="number" 
                    className="bg-navy-950" 
                    value={isNaN(statsForm.fulfilledOrders) ? '' : statsForm.fulfilledOrders} 
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setStatsForm({...statsForm, fulfilledOrders: isNaN(val) ? 0 : val});
                    }} 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-muted-foreground">Completed</Label>
                  <Input 
                    type="number" 
                    className="bg-navy-950" 
                    value={isNaN(statsForm.completedOrders) ? '' : statsForm.completedOrders} 
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setStatsForm({...statsForm, completedOrders: isNaN(val) ? 0 : val});
                    }} 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-muted-foreground">Refunded</Label>
                  <Input 
                    type="number" 
                    className="bg-navy-950" 
                    value={isNaN(statsForm.refundedOrders) ? '' : statsForm.refundedOrders} 
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      setStatsForm({...statsForm, refundedOrders: isNaN(val) ? 0 : val});
                    }} 
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button className="flex-1 bg-primary text-primary-foreground" onClick={saveStats}>Save Changes</Button>
                <Button variant="outline" className="flex-1" onClick={() => setEditingUser(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const LoginPage = ({ onLogin, initialIsSignup = false }: { onLogin: (u: UserProfile) => void, initialIsSignup?: boolean }) => {
  const [isSignup, setIsSignup] = useState(initialIsSignup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setIsSignup(initialIsSignup);
  }, [initialIsSignup]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !password) return;

    const users = mockStore.getUsers();
    
    if (isSignup) {
      if (users.find(u => u.email === email)) {
        toast.error('User already exists');
        return;
      }
      const newUser: UserProfile = {
        uid: Math.random().toString(36).substr(2, 9),
        email,
        displayName: name || email.split('@')[0],
        balance: 0,
        role: 'user',
        createdAt: new Date().toISOString(),
        totalOrders: 0,
        unfulfilledOrders: 0,
        fulfilledOrders: 0,
        completedOrders: 0,
        refundedOrders: 0,
      };
      users.push(newUser);
      mockStore.saveUsers(users);
      onLogin(newUser);
      toast.success('Account created!');
    } else {
      const user = users.find(u => u.email === email);
      if (user) {
        onLogin(user);
        toast.success(`Welcome back, ${user.displayName}`);
      } else {
        toast.error('User not found. Please sign up.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-navy-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md bg-navy-900 border-primary/20 glow-cyan relative z-10">
        <CardHeader className="text-center">
          <button 
            onClick={() => window.location.reload()} 
            className="absolute top-4 left-4 text-muted-foreground hover:text-primary transition-colors"
          >
            <X size={20} />
          </button>
          <CardTitle className="text-3xl font-bold text-primary glow-cyan-text">KIT GIZMO</CardTitle>
          <CardDescription>
            {isSignup ? 'Create your management account' : 'Sign in to your dashboard'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="bg-navy-950 h-12" />
              </div>
            )}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="bg-navy-950 h-12" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-navy-950 h-12" />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg">
              {isSignup ? 'Create Account' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <button 
              className="text-primary hover:underline" 
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [initialIsSignup, setInitialIsSignup] = useState(false);

  useEffect(() => {
    // Initialize admin for the specific user email
    mockStore.initAdmin('info.kitgizmo@gmail.com');
    
    // Simulate auth check
    const savedUser = mockStore.getCurrentUser();
    if (savedUser) {
      // Refresh user data from "DB"
      const allUsers = mockStore.getUsers();
      const freshUser = allUsers.find(u => u.uid === savedUser.uid);
      if (freshUser) {
        setUser(freshUser);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    mockStore.setCurrentUser(u);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    mockStore.setCurrentUser(null);
  };

  if (loading) return <div className="min-h-screen bg-navy-950 flex items-center justify-center text-primary">Loading...</div>;

  if (!user && !showAuth) return (
    <LandingPage 
      onLoginClick={() => { setShowAuth(true); setInitialIsSignup(false); }}
      onSignupClick={() => { setShowAuth(true); setInitialIsSignup(true); }}
    />
  );

  if (!user && showAuth) return (
    <>
      <LoginPage onLogin={handleLogin} initialIsSignup={initialIsSignup} />
      <Toaster position="top-center" theme="dark" />
    </>
  );

  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col lg:flex-row min-h-screen bg-navy-950 text-foreground overflow-x-hidden">
          <Sidebar user={user} onLogout={handleLogout} />
          
          <div className="flex-1 flex flex-col min-w-0">
            <Marquee />
            
            <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-8 bg-navy-900/50 backdrop-blur-md sticky top-0 z-40">
              <div className="flex items-center gap-4">
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger>
                      <div className="rounded-full p-2 hover:bg-muted cursor-pointer flex items-center justify-center">
                        <Menu size={24} />
                      </div>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 bg-navy-900 border-r border-border">
                      <SidebarContent user={user} onLogout={handleLogout} />
                    </SheetContent>
                  </Sheet>
                </div>
                <Badge variant="outline" className="text-primary border-primary/20 hidden sm:inline-flex">System Online</Badge>
                <h1 className="text-lg font-bold text-primary glow-cyan-text lg:hidden">KIT GIZMO</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Balance</p>
                  <p className="text-sm md:text-base font-bold text-primary">${user.balance.toLocaleString()}</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <User size={20} />
                </Button>
              </div>
            </header>

            <main className="flex-1 p-4 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={window.location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                    <Routes>
                      <Route path="/" element={<Dashboard user={user} />} />
                      <Route path="/deposit" element={<DepositPage user={user} onUpdateUser={setUser} />} />
                      <Route path="/withdraw" element={<WithdrawPage user={user} onUpdateUser={setUser} />} />
                      <Route path="/transactions" element={<TransactionHistory user={user} />} />
                      <Route path="/shop" element={<Shop user={user} />} />
                      <Route path="/orders" element={<OrderHistory user={user} />} />
                      <Route path="/support" element={<SupportCenter user={user} />} />
                    <Route path="/profile" element={
                      <div className="max-w-2xl mx-auto">
                        <Card className="bg-navy-900 border-border">
                          <CardHeader>
                            <CardTitle>My Profile</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <Label className="text-muted-foreground">Display Name</Label>
                                <p className="font-medium">{user.displayName}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-muted-foreground">Email</Label>
                                <p className="font-medium">{user.email}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-muted-foreground">Account Status</Label>
                                <p className="font-medium text-green-500">Active</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-muted-foreground">Member Since</Label>
                                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    } />
                    {user.role === 'admin' && (
                      <Route path="/admin" element={<AdminPanel user={user} />} />
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
        <Toaster position="top-center" theme="dark" />
      </Router>
    </ErrorBoundary>
  );
}
