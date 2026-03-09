import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

import { fadeUp, stagger } from "@/lib/animations";

interface ProductBadge {
  label: string;
  color: "green" | "gold" | "purple";
}

interface ProductHeroProps {
  category: string;
  title: string;
  titleAccent: string;
  description: string;
  heroImage: string;
  badge?: ProductBadge;
}

const badgeColors = {
  green: "bg-[hsl(142,70%,45%)] text-white border-[hsl(142,70%,40%)]",
  gold: "bg-[hsl(38,90%,50%)] text-white border-[hsl(38,90%,45%)]",
  purple: "bg-[hsl(270,60%,55%)] text-white border-[hsl(270,60%,50%)]",
};

const ProductHero = ({ category, title, titleAccent, description, heroImage, badge }: ProductHeroProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="relative pt-20 min-h-[360px] sm:min-h-[480px] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt={`${title} ${titleAccent}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,8%)] via-[hsl(0,0%,8%,0.7)] to-[hsl(0,0%,8%,0.3)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 pt-16 sm:pt-24 w-full">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-white/60 hover:text-white text-xs">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/prodotti-pubblico" className="text-white/60 hover:text-white text-xs">Prodotti</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white/90 text-xs">{title} {titleAccent}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,65%)] uppercase mb-4">
            {category}
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap mb-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {title} <span className="text-[hsl(195,85%,55%)]">{titleAccent}</span>
            </h1>
            {badge && (
              <Badge className={`${badgeColors[badge.color]} text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                {badge.label}
              </Badge>
            )}
          </motion.div>
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero;
