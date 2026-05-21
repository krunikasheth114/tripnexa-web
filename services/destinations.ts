import apiClient from "@/lib/axios";

export interface ApiGallery {
    id: number;
    url: string;
    position: number;
    destinationId: number | null;
    packageId: number | null;
    itineraryId: number | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface DestinationGalleryImage {
    src: string;
    alt: string;
    label?: string;
}

export interface ApiMeal {
    mealType: string; // BREAKFAST | LUNCH | DINNER
}

export interface ApiActivity {
    activityType: string;
    title?: string | null;
    description?: string | null;
}

export interface ApiTransfer {
    transferType: string;
    pickupLocation?: string | null;
    dropLocation?: string | null;
    notes?: string | null;
}

export interface ApiItineraryHotel {
    hotel: { id: number; name: string; starRating: number | null; city: string | null };
}

export interface ApiItineraryDay {
    id: number;
    dayNumber: number;
    dayTitle: string | null;
    description: string | null;
    // Which destination this day is in (for multi-destination packages)
    destinationId: number | null;
    destination: { id: number; name: string; type: string | null; parentId: number | null } | null;
    meals: ApiMeal[];
    activities: ApiActivity[];
    transfers: ApiTransfer[];
    hotels: ApiItineraryHotel[];
    gallery: ApiGallery[];
}

export interface ApiPackage {
    id: number;
    destinationId: number;
    title: string;
    description?: string | null;
    price: number;
    discountPrice: number | null;
    days: number;
    nights: number;
    tags: string[];
    /** Hierarchical JSON: { meals?: string[], accommodation?: string[], transport?: string[], activities?: true, ... } */
    inclusions: Record<string, unknown> | null;
    exclusions: Record<string, unknown> | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    gallery: ApiGallery[];
    itineraries?: ApiItineraryDay[];
    destination?: { id: number; name: string; slug: string; type: string; parentId: number | null };
    primaryHotel?: { id: number; name: string; starRating: number | null; city: string | null } | null;
}

export interface ApiDestination {
    id: number;
    name: string;
    slug: string;
    type: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    gallery: ApiGallery[];
    packages: ApiPackage[];
}

export interface ApiResponse<T> {
    status: string;
    statusCode: number;
    data: T;
}

export interface NavDestination {
    id: number;
    name: string;
    slug: string;
    type: string | null;
}

export interface FeaturedPackage {
    id: number;
    title: string;
    days: number;
    nights: number;
    price: number;
    discountPrice: number | null;
    tags: string[];
    featured: boolean;
    gallery: { id: number; url: string; position: number }[];
    destination: { id: number; name: string; slug: string; type: string } | null;
    itineraries?: { id: number; dayNumber: number }[];
}

export async function fetchFeaturedPackages(): Promise<FeaturedPackage[]> {
    try {
        const response = await apiClient.get<ApiResponse<FeaturedPackage[]>>(
            "/web/packages/featured"
        );
        return response.data.data;
    } catch {
        return [];
    }
}

export async function fetchNavDestinations(): Promise<NavDestination[]> {
    try {
        const response = await apiClient.get<ApiResponse<NavDestination[]>>(
            "/web/destinations"
        );
        return response.data.data;
    } catch {
        return [];
    }
}

export async function fetchDestinations(): Promise<ApiDestination[]> {
    try {
        // limit=-1 returns a flat array instead of paginated object
        const response = await apiClient.get<ApiResponse<ApiDestination[] | { data: ApiDestination[] }>>(
            "/destinations",
            { params: { limit: -1 } }
        );
        const payload = response.data.data;
        // Guard: backend may return paginated shape {data:[], total} or flat []
        if (Array.isArray(payload)) return payload;
        return (payload as { data: ApiDestination[] }).data ?? [];
    } catch {
        return [];
    }
}

// ── Destination types (for filter dropdown) ────────────────────────────────
export const DESTINATION_TYPES = [
    "WILDLIFE",
    "HERITAGE",
    "RELIGIOUS",
    "BEACH",
    "ADVENTURE",
    "CULTURAL",
    "CITY",
    "REGION",
] as const;

export type DestinationType = (typeof DESTINATION_TYPES)[number];

export interface DestinationListItem {
    id: number;
    name: string;
    slug: string;
    type: string | null;
    description: string | null;
    gallery: { url: string }[];
    _count: { packages: number };
}

export interface DestinationsPaginatedResponse {
    data: DestinationListItem[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export interface FetchDestinationsListParams {
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export async function fetchDestinationsList(
    params?: FetchDestinationsListParams
): Promise<DestinationsPaginatedResponse> {
    try {
        const response = await apiClient.get<ApiResponse<DestinationsPaginatedResponse>>(
            "/web/destinations/list",
            { params }
        );
        return response.data.data;
    } catch {
        return { data: [], total: 0, page: 1, limit: 12, hasMore: false };
    }
}

export async function fetchPackagesByDestinationId(
    destinationId: string | number
): Promise<ApiPackage[]> {
    try {
        const response = await apiClient.get<ApiResponse<ApiPackage[]>>(
            "/packages",
            {
                params: { destinationId },
            }
        );
        return response.data.data ?? [];
    } catch {
        return [];
    }
}

export async function fetchPackageById(
    packageId: string | number
): Promise<ApiPackage | null> {
    try {
        const response = await apiClient.get<ApiResponse<ApiPackage>>(
            `/web/packages/${packageId}`
        );
        return response.data.data;
    } catch {
        return null;
    }
}
