import { CATALOGO_VALDEZ, filtrarCatalogo, sugerenciasLocales } from "./catalogo-valdez";
import type { Producto } from "../types";

export const DEMO_PRODUCTOS: Producto[] = CATALOGO_VALDEZ;

export function filtrarDemo(productos: Producto[], q: string, categoria = ""): Producto[] {
  return filtrarCatalogo(productos, q, categoria);
}

export { sugerenciasLocales };
