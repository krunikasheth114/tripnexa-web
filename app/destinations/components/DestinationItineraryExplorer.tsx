"use client";

import type { ApiPackage } from "@/services/destinations";
import ItineryFilter from "./ItineryFilter";
import Itineries from "./Itineries";

interface DestinationInfo {
    id?: number;
    name: string;
    description: string;
    image: string;
}

interface DestinationItineraryExplorerProps {
    destination: DestinationInfo;
    packages: ApiPackage[];
}

const budgetOptions = [
    "All Budgets",
    "Under Rs 10,000",
    "Rs 10,000 - Rs 15,000",
    "Above Rs 15,000",
];

const durationOptions = [
    "All Durations",
    "1–3 Days",
    "4–6 Days",
    "7+ Days",
];

export default function DestinationItineraryExplorer({
    packages,
}: DestinationItineraryExplorerProps) {
    return (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr]">
            <ItineryFilter packages={packages} durationOptions={durationOptions} budgetOptions={budgetOptions} />
            <Itineries packages={packages} />
        </div>
    );
}
