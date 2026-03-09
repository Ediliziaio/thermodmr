import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

import { fadeUp, stagger } from "@/lib/animations";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)] mb-8 sm:mb-12 text-center">
            Galleria
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                      {img.caption && (
                        <div className="bg-white px-4 py-3">
                          <p className="text-xs text-[hsl(0,0%,45%)] font-medium">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12 h-10 w-10 bg-white/90 hover:bg-white border-[hsl(0,0%,88%)] shadow-md" />
              <CarouselNext className="hidden sm:flex -right-12 h-10 w-10 bg-white/90 hover:bg-white border-[hsl(0,0%,88%)] shadow-md" />
            </Carousel>
            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-[hsl(195,85%,45%)]"
                      : "w-2.5 bg-[hsl(0,0%,78%)] hover:bg-[hsl(0,0%,60%)]"
                  }`}
                  aria-label={`Vai alla slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGallery;
