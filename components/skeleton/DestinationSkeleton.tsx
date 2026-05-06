// components/DestinationCardSkeleton.tsx

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DestinationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      {/* Image */}
      <Skeleton height={220} />

      <div className="p-4">
        {/* Category */}
        <Skeleton width={80} height={20} />

        {/* Title */}
        <div className="mt-3">
          <Skeleton height={28} />
        </div>

        {/* Tagline */}
        <div className="mt-2 space-y-2">
          <Skeleton height={16} />
          <Skeleton height={16} width="80%" />
        </div>

        {/* Button */}
        <div className="mt-5">
          <Skeleton height={40} borderRadius={9999} />
        </div>
      </div>
    </div>
  );
}