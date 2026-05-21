import apiClient from '@/lib/axios';

interface ApiResponse<T> {
  status: string;
  statusCode: number;
  data: T;
}

export interface CreateBookingPayload {
  packageId: number;
  travelDate: string;       // ISO date string
  totalGuests: number;
  guests: {
    firstName: string;
    lastName?: string;
    age?: number;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    phone?: string;
    email?: string;
    nationality?: string;
  }[];
  specialRequest?: string;
  fromState?: string;
}

export interface CreateBookingResponse {
  bookingNumber: string;
  bookingId: number;
  totalAmount: number;
  clientSecret: string;
}

export interface BookingDetail {
  id: number;
  bookingNumber: string;
  travelDate: string;
  totalGuests: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  bookingStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentStatus: 'PENDING' | 'PARTIAL' | 'PAID' | 'FAILED' | 'REFUNDED';
  specialRequest?: string;
  createdAt: string;
  package: {
    id: number;
    title: string;
    days: number;
    nights: number;
    destination: { id: number; name: string } | null;
    gallery: { url: string }[];
  };
  guests: {
    id: number;
    firstName: string;
    lastName?: string;
    age?: number;
    gender?: string;
  }[];
  payments: {
    id: number;
    transactionId?: string;
    paymentStatus: string;
    amount: number;
    paidAt?: string;
  }[];
}

export async function createBookingApi(
  payload: CreateBookingPayload,
): Promise<CreateBookingResponse> {
  const res = await apiClient.post<ApiResponse<CreateBookingResponse>>(
    '/web/booking/create',
    payload,
  );
  return res.data.data;
}

export async function getBookingByNumberApi(
  bookingNumber: string,
): Promise<BookingDetail> {
  const res = await apiClient.get<ApiResponse<BookingDetail>>(
    `/web/booking/${bookingNumber}`,
  );
  return res.data.data;
}

export async function getMyBookingsApi(): Promise<BookingDetail[]> {
  const res = await apiClient.get<ApiResponse<BookingDetail[]>>('/web/booking/my');
  return res.data.data;
}
