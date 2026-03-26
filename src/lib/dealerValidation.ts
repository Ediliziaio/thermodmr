/**
 * Validates Italian P.IVA (11 digits) including Luhn-style checksum.
 */
export function validatePIva(value: string): string | null {
  const cleaned = value.trim();
  if (!/^\d{11}$/.test(cleaned)) {
    return "La Partita IVA deve essere composta da 11 cifre numeriche";
  }

  // Checksum algorithm (DM 6 giugno 2003)
  const digits = cleaned.split("").map(Number);
  let oddSum = 0;
  let evenSum = 0;
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      oddSum += digits[i];
    } else {
      const doubled = digits[i] * 2;
      evenSum += doubled > 9 ? doubled - 9 : doubled;
    }
  }
  const checkDigit = (10 - ((oddSum + evenSum) % 10)) % 10;
  if (checkDigit !== digits[10]) {
    return "La Partita IVA non è valida (codice di controllo errato)";
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
