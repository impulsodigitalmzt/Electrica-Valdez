import { marcaDe } from "@/lib/brand";
import { CATALOGO_VALDEZ } from "@/lib/catalogo-valdez";
import type { Producto } from "@/types";

export const TIPOS_LUMINARIO = [
  { id: "todas", label: "Todas" },
  { id: "Lámparas de techo", label: "Lámparas de techo" },
  { id: "Focos LED", label: "Focos LED" },
  { id: "Empotrados", label: "Empotrados" },
  { id: "Arbotantes", label: "Arbotantes" },
  { id: "Reflectores", label: "Reflectores" },
  { id: "Tiras LED", label: "Tiras LED" },
] as const;

export const CATALOGO_ILUMINACION: Producto[] = CATALOGO_VALDEZ.filter((item) => item.categoria === "iluminacion");

export const MARCAS_ILUMINACION = [
  ...new Set(CATALOGO_ILUMINACION.map((item) => item.marca).filter((marca): marca is string => Boolean(marca))),
];
export const TEMPERATURAS = ["Cálida 3000K", "Neutra 4000K", "Fría 6500K"] as const;
export const USOS = ["Interior", "Exterior"] as const;

export const ORDEN_CATALOGO = [
  { id: "relevancia", label: "Relevancia" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
  { id: "descuento", label: "Mayor descuento" },
  { id: "calificacion", label: "Mejor calificados" },
] as const;

function plano(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

export function tipoDe(producto: Producto): string {
  if (producto.tipoLuminario) return producto.tipoLuminario;
  const t = plano(`${producto.nombre} ${producto.descripcion} ${producto.categoria}`);
  if (/\b(tira led|tira de led)\b/.test(t)) return "Tiras LED";
  if (/\breflector/.test(t)) return "Reflectores";
  if (/\barbotante/.test(t)) return "Arbotantes";
  if (/\b(downlight|empotrado)/.test(t)) return "Empotrados";
  if (/\bfoco/.test(t)) return "Focos LED";
  if (/\bemergenc/.test(t)) return "Lámparas de techo";
  if (/\b(lampara|plafon|candil|colgante|luminario|iluminacion)\b/.test(t)) return "Lámparas de techo";
  return "";
}

export function temperaturaDe(producto: Producto): Producto["temperatura"] | "" {
  if (producto.temperatura) return producto.temperatura;
  const t = plano(`${producto.nombre} ${producto.descripcion}`);
  if (/3000|calida/.test(t)) return "Cálida 3000K";
  if (/6500|fria/.test(t)) return "Fría 6500K";
  if (/4000|neutra/.test(t)) return "Neutra 4000K";
  return "";
}

export function usoDe(producto: Producto): Producto["uso"] | "" {
  if (producto.uso) return producto.uso;
  const t = plano(`${producto.nombre} ${producto.descripcion}`);
  if (/\b(exterior|ip65|ip67|solar|jardin|fachada|intemperie|terraza)\b/.test(t)) return "Exterior";
  if (tipoDe(producto)) return "Interior";
  return "";
}

export function descuentoDeProducto(producto: Producto): number {
  if (!producto.precioAnterior || producto.precioAnterior <= producto.precio) return 0;
  return Math.round((1 - producto.precio / producto.precioAnterior) * 100);
}

export type FiltrosCatalogo = {
  tipo: string;
  marcas: string[];
  temperaturas: string[];
  uso: string;
  maxPrice: number;
  onlyOffers: boolean;
  q: string;
  sort: string;
};

export function aplicarFiltros(productos: Producto[], filtros: FiltrosCatalogo): Producto[] {
  const texto = plano(filtros.q);
  const filtrados = productos.filter((item) => {
    const tipo = tipoDe(item);
    const marca = marcaDe(item.nombre, item.marca);
    const temp = temperaturaDe(item);
    const uso = usoDe(item);
    if (filtros.tipo !== "todas" && tipo !== filtros.tipo) return false;
    if (filtros.marcas.length && !filtros.marcas.includes(marca)) return false;
    if (filtros.temperaturas.length && (!temp || !filtros.temperaturas.includes(temp))) return false;
    if (filtros.uso !== "todos" && uso !== filtros.uso) return false;
    if (item.precio > filtros.maxPrice) return false;
    if (filtros.onlyOffers && descuentoDeProducto(item) <= 0) return false;
    if (texto && !plano(`${item.nombre} ${marca} ${item.categoria} ${tipo} ${item.descripcion}`).includes(texto)) return false;
    return true;
  });

  const sorted = [...filtrados];
  if (filtros.sort === "precio-asc") sorted.sort((a, b) => a.precio - b.precio);
  if (filtros.sort === "precio-desc") sorted.sort((a, b) => b.precio - a.precio);
  if (filtros.sort === "descuento") sorted.sort((a, b) => descuentoDeProducto(b) - descuentoDeProducto(a));
  if (filtros.sort === "calificacion") sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return sorted;
}

export function conteoTipo(productos: Producto[], tipoId: string): number {
  if (tipoId === "todas") return productos.length;
  return productos.filter((item) => tipoDe(item) === tipoId).length;
}

export function encontrarProductoLocal(sku: string): Producto | undefined {
  return CATALOGO_ILUMINACION.find((item) => item.sku.toLowerCase() === sku.toLowerCase());
}

export function mezclarCatalogo(principal: Producto[], extra: Producto[]): Producto[] {
  const vistos = new Set(principal.map((item) => item.sku.toLowerCase()));
  const nombres = new Set(principal.map((item) => plano(item.nombre)));
  const out = [...principal];
  for (const item of extra) {
    const sku = item.sku.toLowerCase();
    const nombre = plano(item.nombre);
    if (vistos.has(sku) || nombres.has(nombre)) continue;
    vistos.add(sku);
    nombres.add(nombre);
    out.push(item);
  }
  return out;
}
