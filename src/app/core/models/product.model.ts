export interface Product {
  id?: string;

  // Básico
  slug: string;           // "aluminum-silver-mirror"
  name: string;           // "Silver Mirror"
  brand: string;          // "ALUTEC"
  image: string;          // URL o path local
  warranty: string;       // "10 Years"

  // Identificación
  code: string;           // "ACP-SM-001"

  // Especificaciones técnicas
  paintType: string;      // "PVDF", "PE"
  skinThickness: string;  // "0.3 mm"
  width: string;          // "1220 mm"
  height: string;         // "2440 mm"

  // Organización
  categories: string[];   // ["Mirror", "Exterior"]
  tags: string[];         // ["silver", "reflective", "premium"]

  // Para filtros visuales
  colorHex: string;
  //colorHex?: string;      // "#C9CCD6" (opcional)
}
