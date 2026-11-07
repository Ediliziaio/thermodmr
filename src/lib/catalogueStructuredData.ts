/** Quote-only catalogue pages must not advertise an unpriced purchase offer.
 * Keep page identity without requesting Product rich results until genuine
 * prices or reviews are supplied in the visible page data.
 */
export function catalogueStructuredData(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(catalogueStructuredData);
  if (!value || typeof value !== "object") return value;
  const node = value as Record<string, unknown>;
  if (node["@type"] === "Product") {
    const offer = node.offers as Record<string, unknown> | undefined;
    const rawPrice = offer?.price ?? (offer?.priceSpecification as Record<string, unknown> | undefined)?.price;
    const hasPrice = (typeof rawPrice === "number" || typeof rawPrice === "string") &&
      String(rawPrice).trim() !== "" && Number.isFinite(Number(rawPrice)) && Number(rawPrice) >= 0;
    if (!hasPrice && !node.review && !node.aggregateRating) {
      return Object.fromEntries([
        ["@type", "WebPage"],
        ...Object.entries(node).filter(([key]) => ["@context", "@id", "name", "description", "url", "image"].includes(key)),
      ]);
    }
    if (offer && !hasPrice) {
      const { offers: _unpricedOffer, ...withoutOffer } = node;
      return Object.fromEntries(Object.entries(withoutOffer).map(([key, val]) => [key, catalogueStructuredData(val)]));
    }
  }
  return Object.fromEntries(Object.entries(node).map(([key, val]) => [key, catalogueStructuredData(val)]));
}
