/**
 * Shared animation variants and InView options for public pages.
 * Centralised to avoid duplication across 10+ files.
 */

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/** Default options for react-intersection-observer's useInView hook */
export const inViewOptions = {
  triggerOnce: true,
  threshold: 0.05,
  rootMargin: "0px 0px -50px 0px",
};
