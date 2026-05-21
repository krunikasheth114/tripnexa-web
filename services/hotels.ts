import apiClient from "@/lib/axios";

export interface ApiHotelGallery {
    id: number;
    url: string;
    position: number | null;
    hotelId: number | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface ApiHotel {
    id: number;
    name: string;
    city: string | null;
    address: string | null;
    starRating: number | null;
    perNightPrice: number | null;
    description: string | null;
    destinationId: number | null;
    status: string;
    gallery: ApiHotelGallery[];
    destination?: {
        id: number;
        name: string;
        slug: string;
    } | null;
    createdAt: string;
    updatedAt: string;
}

export interface HotelsPaginatedResponse {
    data: ApiHotel[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

interface ApiResponse<T> {
    status: string;
    data: T;
}

export interface FetchHotelsParams {
    destinationId?: number;
    starRating?: number;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}

export async function fetchHotels(
    params?: FetchHotelsParams
): Promise<HotelsPaginatedResponse> {
    try {
        const response = await apiClient.get<ApiResponse<HotelsPaginatedResponse>>(
            "/web/hotels",
            { params }
        );
        return (
            response.data.data ?? {
                data: [],
                total: 0,
                page: 1,
                limit: 9,
                hasMore: false,
            }
        );
    } catch {
        return { data: [], total: 0, page: 1, limit: 9, hasMore: false };
    }
}
