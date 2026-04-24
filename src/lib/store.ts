import { UserProfile, DepositRequest, ServiceOrder, MarketplaceItem, PaymentMethod, Transaction, SupportTicket, WithdrawRequest, Product, EcomOrder } from '../types';

const STORAGE_KEYS = {
  USERS: 'nexus_users',
  DEPOSITS: 'nexus_deposits',
  ORDERS: 'nexus_orders',
  MARKETPLACE: 'nexus_marketplace',
  PAYMENT_METHODS: 'nexus_payment_methods',
  CURRENT_USER: 'nexus_current_user',
  TRANSACTIONS: 'nexus_transactions',
  TICKETS: 'nexus_tickets',
  WITHDRAWS: 'nexus_withdraws',
  PRODUCTS: 'nexus_products',
  ECOM_ORDERS: 'nexus_ecom_orders',
};

// Initial Data
const DEFAULT_MARKETPLACE: MarketplaceItem[] = [
  { id: '1', name: 'Shopify', logoUrl: 'https://cdn.worldvectorlogo.com/logos/shopify.svg', redirectLink: 'https://shopify.com' },
  { id: '2', name: 'USDT', logoUrl: 'https://cdn.worldvectorlogo.com/logos/tether-1.svg', redirectLink: '#' },
  { id: '3', name: 'Amazon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', redirectLink: '#' },
  { id: '4', name: 'AliExpress', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/AliExpress_logo.svg', redirectLink: '#' },
  { id: '5', name: 'Alibaba', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Alibaba_Group_logo.svg', redirectLink: '#' },
  { id: '6', name: 'CJ Dropshipping', logoUrl: 'https://cjdropshipping.com/assets/images/logo.png', redirectLink: '#' },
];

export const mockStore = {
  getUsers: (): UserProfile[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  
  saveUsers: (users: UserProfile[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getDeposits: (): DepositRequest[] => {
    const data = localStorage.getItem(STORAGE_KEYS.DEPOSITS);
    return data ? JSON.parse(data) : [];
  },

  saveDeposits: (deposits: DepositRequest[]) => {
    localStorage.setItem(STORAGE_KEYS.DEPOSITS, JSON.stringify(deposits));
  },

  getOrders: (): ServiceOrder[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  saveOrders: (orders: ServiceOrder[]) => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },

  saveTransactions: (transactions: Transaction[]) => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  getMarketplace: (): MarketplaceItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MARKETPLACE);
    return data ? JSON.parse(data) : DEFAULT_MARKETPLACE;
  },

  saveMarketplace: (items: MarketplaceItem[]) => {
    localStorage.setItem(STORAGE_KEYS.MARKETPLACE, JSON.stringify(items));
  },

  getPaymentMethods: (): PaymentMethod[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
    return data ? JSON.parse(data) : [];
  },

  savePaymentMethods: (methods: PaymentMethod[]) => {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
  },

  getTickets: (): SupportTicket[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return data ? JSON.parse(data) : [];
  },

  saveTickets: (tickets: SupportTicket[]) => {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  },

  getWithdraws: (): WithdrawRequest[] => {
    const data = localStorage.getItem(STORAGE_KEYS.WITHDRAWS);
    return data ? JSON.parse(data) : [];
  },

  saveWithdraws: (withdraws: WithdrawRequest[]) => {
    localStorage.setItem(STORAGE_KEYS.WITHDRAWS, JSON.stringify(withdraws));
  },

  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  saveProducts: (products: Product[]) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  getEcomOrders: (): EcomOrder[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ECOM_ORDERS);
    return data ? JSON.parse(data) : [];
  },

  saveEcomOrders: (orders: EcomOrder[]) => {
    localStorage.setItem(STORAGE_KEYS.ECOM_ORDERS, JSON.stringify(orders));
  },

  getCurrentUser: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: UserProfile | null) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  // Helper to initialize an admin if none exists
  initAdmin: (email: string) => {
    const users = mockStore.getUsers();
    const existing = users.find(u => u.email === email);
    if (existing) {
      if (existing.role !== 'admin') {
        existing.totalOrders = existing.totalOrders || 0;
        existing.unfulfilledOrders = existing.unfulfilledOrders || 0;
        existing.fulfilledOrders = existing.fulfilledOrders || 0;
        existing.completedOrders = existing.completedOrders || 0;
        existing.refundedOrders = existing.refundedOrders || 0;
        mockStore.saveUsers(users);
      }
    } else {
      const admin: UserProfile = {
        uid: 'admin-123',
        email,
        displayName: 'Administrator',
        balance: 1000000,
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        totalOrders: 0,
        unfulfilledOrders: 0,
        fulfilledOrders: 0,
        completedOrders: 0,
        refundedOrders: 0,
      };
      users.push(admin);
      mockStore.saveUsers(users);
    }
  }
};
