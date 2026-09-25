function asset(carpeta: string, archivo: string): string {
  return `/${carpeta}/${encodeURIComponent(archivo)}`;
}

export const WHATSAPP_URL = "https://wa.me/526699823940";
export const FACEBOOK_URL = "https://www.facebook.com/ElectricaValdez/?locale=es_LA";
export const WHATSAPP_DISPLAY = "(669) 982-39-40";
export const TEL_LINEA = "(669) 982-39-40 / 982-08-44 / 981-55-90";
export const TEL_PRINCIPAL = "6699823940";
export const HORARIO = "Horario de sucursal: 8:00 a 18:00";
export const COBERTURA = "Matriz y Rafael Buelna en Mazatlán · Culiacán";
export const DOMICILIO_MATRIZ = "Av. Gutiérrez Nájera #805, Col. Centro, C.P. 82000, Mazatlán, Sin.";
export const MAIN_EMAIL = "";
export const MAIN_EMAILS = [] as const;
export const EMPRESA_RAZON = "Eléctrica Valdez";
export const EMPRESA_PRIORIDAD = "Calidad y servicio de primera al mejor costo.";
export const EMPRESA_DESCRIPCION =
  "En Eléctrica Valdez encuentras material eléctrico en baja, media y alta tensión, iluminación LED y ferretería para casa, comercio e industria. Atendemos en mostrador al mayoreo y menudeo, con sucursales en Mazatlán y Culiacán.";
export const ENVIO_GRATIS_DESDE = 1000;
export const LOGO_SRC = asset("brandig", "logo-ev-removebg-preview.png");
export const LOGO_MARK = asset("brandig", "ev-logo-color.png");
export const HERO_HOME = asset("principal", "home-5a-246.jpg");
export const HERO_JARDIN = asset("principal", "iluminacion-jardin-apliques-249.jpg");
export const HERO_ACENTO = asset("principal", "atraction-1-67.jpg");
export const HERO_SERVICIOS = asset("principal", "servicios-1-75.jpg");
export const HERO_ILUMINACION = HERO_HOME;
export const HERO_CONTACTOS = asset("productos", "contacto.jpg");
export const PRODUCT_SHEET = asset("productos", "luminaria.jpg");
export const SERVICIO_DOMICILIO = asset("publicidad", "489955331_1219250336874134_4692269794598637212_n.jpg");

export const TELEFONOS_PIE = [
  { label: "Matriz (669) 982-39-40", digits: "6699823940" },
  { label: "Matriz (669) 982-08-44", digits: "6699820844" },
  { label: "Culiacán (667) 716-77-30", digits: "6677167730" },
] as const;

export const VIDEOS = {
  sucursal: {
    src: "/videos/asesoria.mp4",
    title: "Asesoría en Eléctrica Valdez",
    kicker: "Asesoría",
    heading: "Te ayudamos a armar tu lista",
    text: "Material eléctrico, iluminación y ferretería con atención en mostrador.",
    cta: "Ver sucursales",
    to: "/#sucursales",
  },
  marca: {
    src: "/videos/luminaria piso.mp4",
    title: "Iluminación en Eléctrica Valdez",
    kicker: "En sucursal",
    heading: "Iluminación para cada proyecto",
    text: "Luminarios, focos LED y material de instalación en Mazatlán y Culiacán.",
    cta: "Cómo llegar",
    to: "/#sucursales",
  },
  makita: {
    src: "/videos/asesoria.mp4",
    title: "Herramienta en Eléctrica Valdez",
    kicker: "Herramienta",
    heading: "Herramienta para tu instalación",
    text: "Pinzas, desarmadores y equipo de trabajo listo en mostrador.",
    cta: "Ver herramienta",
    to: "/buscar?q=herramienta",
  },
  promocion: {
    src: asset("videos", "videoplayback (1).mp4"),
    title: "Cómo instalar Tecnolite Disque II, mini poste",
    kicker: "Tecnolite",
    heading: "Cómo instalar Disque II, mini poste",
    text: "Video de instalación del mini poste Tecnolite Disque II.",
    cta: "Ver iluminación",
    to: "/iluminacion",
  },
} as const;

export function videoDeConsulta(q: string) {
  const texto = q.toLowerCase();
  if (/\b(makita|herramienta|pinza)\b/.test(texto)) return VIDEOS.makita;
  if (/\b(luminari|foco|led|lampara)\b/.test(texto)) return VIDEOS.promocion;
  return null;
}

export function imagenDeConsulta(q: string, iluminacion = false) {
  const texto = q.toLowerCase();
  if (iluminacion) return { src: HERO_HOME, alt: "Casa iluminada con luminarios LED" };
  if (/\b(contacto|placa|apagador|interruptor)\b/.test(texto)) {
    return { src: asset("productos", "placas modus.jpg"), alt: "Placas e interruptores residenciales" };
  }
  if (/\b(abanico|ventilador|extractor)\b/.test(texto)) {
    return { src: asset("productos", "abanico-techo.jpg"), alt: "Abanicos y ventilación" };
  }
  if (/\b(tubo|tuberia|conduit|pvc)\b/.test(texto)) {
    return { src: asset("productos", "tuberia-pvc.jpg"), alt: "Tubería conduit PVC" };
  }
  if (/\b(cable|conductor|thw)\b/.test(texto)) {
    return { src: asset("productos", "cable-elec.jpg"), alt: "Cable eléctrico" };
  }
  return { src: HERO_JARDIN, alt: "Iluminación de jardín y fachada" };
}

export const HERO_SLIDES = [
  {
    image: HERO_HOME,
    kicker: "Iluminación",
    title: "Luz para cada espacio",
    text: "Luminarios, focos LED y acentos para casa, comercio y fachada.",
    cta: "Ver iluminación",
    to: "/iluminacion",
    alt: "Residencia con iluminación interior y de alberca",
  },
  {
    image: HERO_JARDIN,
    kicker: "Exterior",
    title: "Jardín y fachada",
    text: "Faroles, estacas, reflectores y lámparas solares listos en sucursal.",
    cta: "Ver exterior",
    to: "/iluminacion?q=exterior",
    alt: "Iluminación de jardín y apliques de muro",
  },
  {
    image: asset("principal", "atraction-2-68.jpg"),
    kicker: "Decoración",
    title: "Acentos que se notan",
    text: "Colgantes, spots y tiras LED para comedor, sala y local.",
    cta: "Ver lámparas",
    to: "/iluminacion?q=lampara",
    alt: "Iluminación de acento para interiores",
  },
  {
    image: asset("principal", "atraction-1-67.jpg"),
    kicker: "Proyectos",
    title: "Material para tu obra",
    text: "Cable, tubería, centros de carga y contactos de las marcas que ya instalas.",
    cta: "Ver catálogo",
    to: "/buscar",
    alt: "Proyecto de iluminación arquitectónica",
  },
  {
    image: HERO_SERVICIOS,
    kicker: "Sucursal",
    title: "Te armamos la lista",
    text: "Mayoreo y menudeo en Mazatlán y Culiacán, con asesoría en mostrador.",
    cta: "Ver sucursales",
    to: "/#sucursales",
    alt: "Servicios de Eléctrica Valdez",
  },
] as const;

export const NAV_ITEMS = [
  { id: "iluminacion", label: "Iluminación", to: "/iluminacion" },
  { id: "ventilacion", label: "Ventilación", to: "/buscar?q=abanico+ventilador+extractor" },
  { id: "contactos", label: "Contactos", to: "/buscar?q=contacto" },
  { id: "placas", label: "Placas", to: "/buscar?q=placa+apagador+dimmer" },
  { id: "tuberia", label: "Tubería", to: "/buscar?q=tubo+pvc" },
  { id: "conductores", label: "Cables", to: "/buscar?q=cable" },
  { id: "marcas", label: "Marcas", to: "/#marcas" },
  { id: "ofertas", label: "Ofertas", to: "/buscar?q=oferta", sale: true },
] as const;

export const CATEGORY_TILES = [
  { label: "Lámparas", q: "lampara", image: asset("productos", "lampara-col-int.jpg") },
  { label: "Focos LED", q: "foco", image: asset("productos", "foco-led-aten.jpg") },
  { label: "Empotrados", q: "downlight", image: asset("productos", "Downlight.jpg") },
  { label: "Faroles", q: "farol", image: asset("productos", "farol.jpg") },
  { label: "Reflectores", q: "reflector", image: asset("productos", "reflector.jpg") },
  { label: "Tiras LED", q: "tira", image: asset("productos", "tira-led.jpg") },
] as const;

export const IMAGEN_OFERTA = asset("productos", "foco-led-aten.jpg");

export const PROMO_TILES = [
  { label: "Focos LED", to: "/iluminacion?q=foco", image: asset("productos", "foco-led-aten.jpg") },
  { label: "Plafones LED", to: "/iluminacion?q=plafon", image: asset("productos", "plafones led.jpg") },
  { label: "Abanicos", to: "/buscar?q=abanico", image: asset("productos", "abanico-techo.jpg") },
  { label: "Centros de carga", to: "/buscar?q=centro", image: asset("productos", "centro-carga.jpg") },
] as const;

export const SECTORES_TIENDA = [
  {
    id: "electricidad",
    label: "Material eléctrico",
    text: "Cable, tubería, contactos, placas y centros de carga.",
    to: "/buscar?q=cable",
    image: asset("productos", "cable-elec.jpg"),
    alt: "Cable eléctrico y material de instalación",
  },
  {
    id: "iluminacion",
    label: "Iluminación",
    text: "Focos LED, luminarios, reflectores y tiras.",
    to: "/iluminacion",
    image: asset("productos", "plafones led.jpg"),
    alt: "Plafones y luminarios LED",
  },
  {
    id: "ferreteria",
    label: "Ferretería",
    text: "Herramienta, soportes, abanicos y extractores.",
    to: "/buscar?q=herramienta",
    image: asset("productos", "herram.jpg"),
    alt: "Herramienta y ferretería eléctrica",
  },
] as const;

export const COLLECTION_CARDS = [
  { label: "Iluminación", to: "/iluminacion", image: asset("productos", "luminario.jpg") },
  { label: "Ventilación", to: "/buscar?q=abanico", image: asset("productos", "ventilador-techo.jpg") },
  { label: "Contactos", to: "/buscar?q=contacto", image: asset("productos", "contacto.jpg") },
  { label: "Placas", to: "/buscar?q=placa", image: asset("productos", "placas Modus PRO.jpg") },
  { label: "Cables", to: "/buscar?q=cable", image: asset("productos", "cable-elec.jpg") },
  { label: "Ofertas", to: "/buscar?q=oferta", image: asset("productos", "foco-led-aten.jpg") },
] as const;

export const MARCAS_CATALOGO = [
  { label: "TECNOLITE", q: "tecnolite", logo: asset("marcas", "image-removebg-preview.png") },
  { label: "BTICINO", q: "bticino", logo: asset("marcas", "image-removebg-preview (1).png") },
  { label: "CONDULAC", q: "condulac", logo: asset("marcas", "image-removebg-preview (2).png") },
  { label: "CONDUMEX", q: "condumex", logo: asset("marcas", "image-removebg-preview (3).png") },
  { label: "IUSA", q: "iusa", logo: asset("marcas", "image-removebg-preview (4).png") },
  { label: "MAGG", q: "magg", logo: asset("marcas", "image-removebg-preview (5).png") },
  { label: "MAKITA", q: "makita", logo: asset("marcas", "image-removebg-preview (6).png") },
  { label: "OSRAM", q: "osram", logo: asset("marcas", "image-removebg-preview (7).png") },
  { label: "RAWELT", q: "rawelt", logo: asset("marcas", "image-removebg-preview (8).png") },
  { label: "SIEMENS", q: "siemens", logo: asset("marcas", "image-removebg-preview (9).png") },
  { label: "VOLTECK", q: "volteck", logo: asset("marcas", "image-removebg-preview (10).png") },
  { label: "PHILIPS", q: "philips", logo: asset("marcas", "image-removebg-preview (12).png") },
  { label: "3M", q: "3M", logo: asset("marcas", "image-removebg-preview (13).png") },
  { label: "SOLA BASIC", q: "sola basic", logo: asset("marcas", "solabasic-removebg-preview.png") },
] as const;

export const MARCAS = MARCAS_CATALOGO.map((item) => item.label);

const MARCAS_DETECT = [
  "SOLA BASIC",
  "TECNOLITE",
  "BTICINO",
  "CONDULAC",
  "CONDUMEX",
  "PHILIPS",
  "SIEMENS",
  "VOLTECK",
  "OSRAM",
  "RAWELT",
  "MAKITA",
  "MAGG",
  "IUSA",
  "LUCEK",
  "ROYER",
  "ESTEVEZ",
  "INDIANA",
  "3M",
  "CONSTRULITA",
  "LION TOOLS",
  "MASTERFAN",
  "POLIFLEX",
  "SQUARE D",
  "SUPPLIER",
  "SUNLEAF",
  "STANLEY",
  "TECNOLED",
  "BEGHELLI",
  "FULGORE",
  "TL APPS",
  "ALCODM",
  "KOBREX",
  "TULMEX",
  "PHILCO",
  "CALUX",
  "COOPER",
  "EATON",
  "ARGOS",
  "MODUS",
  "ZAPA",
  "CEISA",
  "VENTO",
  "TORK",
  "IPSA",
  "TMT",
  "KDK",
] as const;

export function marcaDe(nombre: string, marca?: string): string {
  if (marca?.trim()) {
    const pedida = marca.trim().toUpperCase();
    if (pedida === "ISB" || pedida === "ISB SOLA BASIC") return "SOLA BASIC";
    const conocida = MARCAS_CATALOGO.find((item) => item.label.toUpperCase() === pedida);
    return conocida?.label ?? marca.trim().toUpperCase();
  }
  const upper = nombre.toUpperCase();
  return MARCAS_DETECT.find((item) => upper.includes(item)) ?? "VALDEZ";
}

export function logoDeMarca(nombre: string, marca?: string): string {
  const key = marcaDe(nombre, marca).toUpperCase();
  return MARCAS_CATALOGO.find((item) => item.label.toUpperCase() === key)?.logo ?? "";
}

export function descuentoDe(precio: number, anterior?: number): number {
  if (!anterior || anterior <= precio) return 0;
  return Math.round((1 - precio / anterior) * 100);
}

export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+52${digits}`;
}

export type Branch = {
  id: string;
  name: string;
  city: string;
  address: string;
  note?: string;
  phones: string[];
  emails: string[];
  oficial?: boolean;
  mapEmbed: string;
};

function mapa(consulta: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(consulta)}&z=16&output=embed`;
}

export const BRANCHES: Branch[] = [
  {
    id: "mzt-matriz",
    name: "Mazatlán · Matriz",
    city: "Mazatlán, Sin.",
    address: "Av. Gutiérrez Nájera #805, Col. Centro, C.P. 82000, Mazatlán, Sin.",
    note: "Horario: 8:00 a 18:00",
    phones: ["(669) 982-39-40", "(669) 982-08-44", "(669) 981-55-90", "(669) 985-03-43"],
    emails: [],
    oficial: true,
    mapEmbed: mapa("Eléctrica Valdez Gutiérrez Nájera 805 Mazatlán"),
  },
  {
    id: "mzt-buelna",
    name: "Mazatlán · Rafael Buelna",
    city: "Mazatlán, Sin.",
    address: "Rafael Buelna #310-I, Fracc. Hacienda Las Cruces, Mazatlán, Sin.",
    note: "Horario: 8:00 a 18:00",
    phones: ["(669) 112-02-12", "(669) 112-03-55"],
    emails: [],
    mapEmbed: mapa("Eléctrica Valdez Rafael Buelna 310 Mazatlán"),
  },
  {
    id: "culiacan",
    name: "Culiacán",
    city: "Culiacán, Sin.",
    address: "Calle Constitución #243, Col. Jorge Almada, C.P. 80200, Culiacán, Sin.",
    note: "Horario: 8:00 a 18:00",
    phones: ["(667) 716-77-30", "(667) 716-77-38", "(667) 716-77-33"],
    emails: [],
    oficial: true,
    mapEmbed: mapa("Eléctrica Valdez Constitución 243 Culiacán"),
  },
];

export function emailDe(branch: Branch): string {
  return branch.emails[0] ?? MAIN_EMAIL;
}

export function mapsDirHref(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
