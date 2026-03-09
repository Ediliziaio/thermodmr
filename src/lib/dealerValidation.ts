/**
 * Validates Italian P.IVA (11 digits)
 */
export function validatePIva(value: string): string | null {
  const cleaned = value.trim();
  if (!/^\d{11}$/.test(cleaned)) {
    return "La Partita IVA deve essere composta da 11 cifre numeriche";
  }
  return null;
}

/**
 * Validates Italian Codice Fiscale (16 alphanumeric chars)
 */
export function validateCodiceFiscale(value: string): string | null {
  const cleaned = value.trim().toUpperCase();
  if (!/^[A-Z0-9]{16}$/.test(cleaned)) {
    return "Il Codice Fiscale deve essere composto da 16 caratteri alfanumerici";
  }
  return null;
}
