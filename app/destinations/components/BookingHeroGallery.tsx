"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { DestinationGalleryImage } from "@/services/destinations";

interface BookingHeroGalleryProps {
  destinationName: string;
  images: DestinationGalleryImage[];
}

export default function BookingHeroGallery({
  destinationName,
  images,
}: BookingHeroGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleImages = images.slice(0, 5);
  const extraCount = Math.max(images.length - visibleImages.length, 0);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? images.length - 1
            : (current - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  if (visibleImages.length === 0) {
    return null;
  }

  return (
    <>
      <section className="mb-8">
        <div className="hidden gap-3 md:grid md:grid-cols-[1.35fr_1fr]">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="group relative min-h-[420px] overflow-hidden rounded-[18px] text-left"
          >
            <Image
              src={visibleImages[0].src}
              alt={visibleImages[0].alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              {visibleImages[0].label ? (
                <p className="text-sm font-medium text-white/88">
                  {visibleImages[0].label}
                </p>
              ) : null}
              <p className="mt-2 max-w-md text-3xl font-semibold text-white">
                {destinationName} gallery
              </p>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            {visibleImages.slice(1).map((image, index) => {
              const galleryIndex = index + 1;
              const isOverlayCard = galleryIndex === visibleImages.length - 1;

              return (
                <button
                  key={`${image.src}-${galleryIndex}`}
                  type="button"
                  onClick={() => setActiveIndex(galleryIndex)}
                  className="group relative min-h-[204px] overflow-hidden rounded-[18px] text-left"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isOverlayCard
                        ? "bg-black/45"
                        : "bg-gradient-to-t from-black/40 via-black/0 to-transparent"
                    }`}
                  />
                  <div className="absolute inset-x-4 bottom-4">
                    {isOverlayCard ? (
                      <>
                        <p className="text-lg font-semibold text-white">
                          {extraCount > 0
                            ? `+${extraCount} Photos`
                            : "View All Photos"}
                        </p>
                        <p className="mt-1 text-sm text-white/78">
                          Open full gallery
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-medium text-white">
                        {image.label}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:hidden">
          <div className="relative mb-3 overflow-hidden rounded-[18px]">
            <span className="absolute right-4 top-4 z-10 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
              1 / {images.length}
            </span>
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative h-[280px] min-w-full snap-center overflow-hidden rounded-[18px]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-sm font-medium text-white">
                    {image.label ?? destinationName}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[70] bg-[#08131b]/90 px-4 py-6 backdrop-blur-sm">
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#E8C7BF]">
                  Gallery
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {activeIndex + 1} / {images.length} {destinationName} moments
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                Close
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (activeIndex - 1 + images.length) % images.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/70"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/70"
              >
                Next
              </button>
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={`${image.src}-thumb-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-[14px] border transition ${
                    index === activeIndex
                      ? "border-white"
                      : "border-white/10 opacity-65 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
