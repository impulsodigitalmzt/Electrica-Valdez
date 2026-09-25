function foto(file: string): string {
  return `/productos/${encodeURIComponent(file)}`;
}

export const FOTO = {
  foco: foto("foco-led-aten.jpg"),
  downlight: foto("Downlight.jpg"),
  colgante: foto("lampara-col-int.jpg"),
  lampara: foto("lampara led.jpg"),
  lamparaPie: foto("lampara-int.jpg"),
  lamparasMesa: foto("lampara led.jpg"),
  lamparaPiso: foto("lampara-int.jpg"),
  arbotante: foto("lampara pared.jpg"),
  arbotante2: foto("lampara-exterior.jpg"),
  arbotante3: foto("farol.jpg"),
  reflector: foto("reflector.jpg"),
  tira: foto("tira-led.jpg"),
  emergencia: foto("luz-emergencia.jpg"),
  emergencia2: foto("luminaria emerg.jpg"),
  contacto: foto("contacto.jpg"),
  placaPlata: foto("placas cristal templ.jpg"),
  tresApagadores: foto("placas modus.jpg"),
  apagadorContacto: foto("contactos Lucek.jpg"),
  dobleApagador: foto("placas-lucek.jpg"),
  cableNegro: foto("cable-elec.jpg"),
  cables: foto("cable.jpg"),
  tubo: foto("tuberia-pvc.jpg"),
  timbre: foto("timbre.jpg"),
  promoTira: foto("tira-led.jpg"),
  promoPlafones: foto("plafones led.jpg"),
  promoLineal: foto("luminario techo.jpg"),
  promoSolar: foto("lampara solar led.jpg"),
  promoEspiral: foto("bombillas.jpg"),
  promoSpot: foto("lampara spot.jpg"),
  promoOferta: foto("foco-led-aten.jpg"),
  promoQuinzi: foto("placas-royer.jpg"),
} as const;

function plano(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

export function imagenLocalDe(nombre: string, categoria = ""): string {
  const t = plano(`${nombre} ${categoria}`);
  if (/\b(abanico|ventilador)\b/.test(t)) return foto("abanico-techo.jpg");
  if (/\bextractor\b/.test(t)) return foto("extractor.jpg");
  if (/\b(base).*(medidor)|medidor\b/.test(t)) return foto("base-medidor.jpg");
  if (/\bcentro de carga|centro-carga\b/.test(t)) return foto("centro-carga.jpg");
  if (/\b(apagador|interruptor).*(contacto)|contacto.*apagador|placa/.test(t)) return FOTO.tresApagadores;
  if (/\b(timbre)\b/.test(t)) return FOTO.timbre;
  if (/\b(contacto|tomacorriente|duplex|enchufe|clavija)\b/.test(t)) return FOTO.contacto;
  if (/\b(dimmer|atenuador)\b/.test(t)) return foto("dimmer.jpg");
  if (/\b(tira led|tira de led|manguera plana)\b/.test(t)) return FOTO.tira;
  if (/\bsolar\b/.test(t)) return FOTO.promoSolar;
  if (/\breflector\b/.test(t)) return FOTO.reflector;
  if (/\b(arbotante|farol|pared)\b/.test(t)) return FOTO.arbotante3;
  if (/\b(downlight|empotrado|spot)\b/.test(t)) return FOTO.downlight;
  if (/\b(foco|bombilla|vintage)\b/.test(t)) return FOTO.foco;
  if (/\b(emergenc)\b/.test(t)) return FOTO.emergencia;
  if (/\b(plafon)\b/.test(t)) return FOTO.promoPlafones;
  if (/\b(colgante)\b/.test(t)) return FOTO.colgante;
  if (/\b(lampara|luminari)\b/.test(t)) return FOTO.lampara;
  if (/\b(cable|thw|conductor|cinta)\b/.test(t)) return FOTO.cableNegro;
  if (/\b(tubo|conduit|pvc|manguera)\b/.test(t)) return FOTO.tubo;
  if (/\b(fotocelda|sensor)\b/.test(t)) return foto("fotoelectico.jpg");
  if (/\b(pinza|desarmador|herramienta)\b/.test(t)) return foto("herram.jpg");
  if (/\biluminacion\b/.test(t)) return FOTO.colgante;
  return "";
}

export function esImagenDebil(url?: string): boolean {
  if (!url) return true;
  return url.endsWith(".svg") || url.startsWith("data:");
}
