export type UserRole = 'user' | 'admin';

export interface WithdrawRequest {
  id: string;
  userId: string;
  userEmail: string;
  amount: number;
  address: string;
  status: 'pending' | 'success' | 'rejected';
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  balance: number;
  role: UserRole;
  createdAt: string;
  totalOrders: number;
  unfulfilledOrders: number;
  fulfilledOrders: number;
  completedOrders: number;
  refundedOrders: number;
  totalWithdrawn?: number;
}

export interface DepositRequest {
  id: string;
  userId: string;
  userEmail: string;
  amount: number;
  method: string;
  proofUrl: string;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: string;
}

export interface ServiceOrder {
  id: string;
  userId: string;
  serviceName: string;
  price: number;
  status: 'Pending' | 'In-Progress' | 'Fullfilled' | 'Unfullfilled' | 'Refunded';
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  method: string;
  status: 'pending' | 'success' | 'rejected';
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  address: string;
  qrCodeUrl?: string;
}

export interface MarketplaceItem {
  id: string;
  logoUrl: string;
  redirectLink: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  createdAt: string;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

export interface EcomOrder {
  id: string;
  userId: string;
  userEmail: string;
  productId: string;
  productName: string;
  price: number;
  status: 'Pending' | 'In-Progress' | 'Fullfilled' | 'Unfullfilled' | 'Refunded';
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderRole: UserRole;
  text: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  message: string;
  screenshotUrl?: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: string;
  messages?: TicketMessage[];
  hasNewAdminReply?: boolean;
  hasNewUserReply?: boolean;
}
