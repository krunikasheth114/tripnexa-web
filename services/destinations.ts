    import apiClient from "@/lib/axios";

    export interface ApiDestination {
    id: number;
    name: string;
    slug: string;
    type: string | null;
    description: string | null;
    status: string;
    }

    export async function fetchDestinations(): Promise<ApiDestination[]> {
    try {
        const response = await apiClient.get<{ data: ApiDestination[] }>("/destinations");
        return response.data.data.filter(
        (d) => d.status === "ACTIVE" && d.slug && d.type !== null
        );
    } catch {
        return [];
    }
    }
