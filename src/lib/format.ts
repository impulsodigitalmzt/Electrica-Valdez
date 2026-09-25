export function precioMx(valor: number): string {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(valor);
}

export function etiquetaCategoria(categoria: string): string {
  const mapa: Record<string, string> = {
    electricidad: "Electricidad",
    ferreteria: "Ferretería",
    plomeria: "Plomería",
    herramientas: "Herramientas",
    otro: "Más materiales",
    iluminacion: "Iluminación",
    ventilacion: "Ventilación",
    contactos: "Contactos",
    placas: "Placas e interruptores",
    conductores: "Cables",
    tuberia: "Tubería",
    proteccion: "Protecciones",
    accesorios: "Accesorios",
  };
  return mapa[categoria.toLowerCase()] ?? categoria;
}

export const NAV_CATEGORIAS = [
  { id: "iluminacion", label: "Iluminación", q: "foco led lampara" },
  { id: "contactos", label: "Contactos Residenciales", q: "contacto" },
  { id: "placas", label: "Placas e Interruptores", q: "apagador placa interruptor" },
  { id: "tuberia", label: "Tubería", q: "tubo pvc conduit" },
  { id: "conductores", label: "Conductores", q: "cable thw" },
  { id: "marcas", label: "Marcas", href: "#marcas" },
  { id: "ofertas", label: "Ofertas", href: "#catalogo" },
] as const;

export const ESPACIOS = [
  {
    id: "techo",
    label: "Lámparas de techo",
    q: "lampara",
    imagen:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "focos",
    label: "Focos LED",
    q: "foco led",
    imagen:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "empotrados",
    label: "Empotrados",
    q: "lampara foco",
    imagen:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "arbotantes",
    label: "Arbotantes",
    q: "apagador placa",
    imagen:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "reflectores",
    label: "Reflectores",
    q: "cable",
    imagen:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "tiras",
    label: "Tiras LED",
    q: "foco",
    imagen:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=70",
  },
] as const;

export const MARCAS = ["TECNOLITE", "SIEMENS", "bticino", "PHILIPS", "VOLTECK", "MAGG", "CONDULAC"] as const;

export const SUCURSALES = [
  {
    id: "matriz",
    ciudad: "Mazatlán, Sin.",
    titulo: "Mazatlán · Matriz",
    direccion: "Av. Gutiérrez Nájera #805, Col. Centro, C.P. 82000, Mazatlán, Sin.",
    tels: ["(669) 982-39-40", "(669) 982-08-44", "(669) 981-55-90", "(669) 985-03-43"],
    email: "",
  },
  {
    id: "buelna",
    ciudad: "Mazatlán, Sin.",
    titulo: "Mazatlán · Rafael Buelna",
    direccion: "Rafael Buelna #310-I, Fracc. Hacienda Las Cruces, Mazatlán, Sin.",
    tels: ["(669) 112-02-12", "(669) 112-03-55"],
    email: "",
  },
  {
    id: "culiacan",
    ciudad: "Culiacán, Sin.",
    titulo: "Culiacán",
    direccion: "Calle Constitución #243, Col. Jorge Almada, C.P. 80200, Culiacán, Sin.",
    tels: ["(667) 716-77-30", "(667) 716-77-38", "(667) 716-77-33"],
    email: "",
  },
] as const;

export function sessionId(): string {
  const key = "ev-session";
  const actual = localStorage.getItem(key);
  if (actual) return actual;
  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
}
