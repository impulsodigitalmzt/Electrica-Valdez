import type { Producto } from "../types";

type Luz = {
  tipo: string;
  temp?: Producto["temperatura"];
  uso?: Producto["uso"];
  watts?: number;
  rating?: number;
};

type Seed = {
  file: string;
  nombre: string;
  categoria: string;
  marca: string;
  precio: number;
  antes?: number;
  stock: number;
  descripcion: string;
  luz?: Luz;
};

const SEEDS: Seed[] = [
  { file: "abanico.jpg", nombre: "Ventilador industrial Tifón 56", categoria: "ventilacion", marca: "MASTERFAN", precio: 1890, antes: 2140, stock: 16, descripcion: "Ventilador industrial de techo Masterfan Tifón 56 pulgadas. En oferta de temporada." },
  { file: "abanico-ped.jpg", nombre: "Ventilador de muro KDK", categoria: "ventilacion", marca: "ESTEVEZ", precio: 980, stock: 14, descripcion: "Ventilador de muro Estevez, modelo KDK UU45X, 3 aspas." },
  { file: "abanico-techo.jpg", nombre: "Ventilador de techo TMT", categoria: "ventilacion", marca: "TMT", precio: 2450, antes: 2790, stock: 11, descripcion: "Ventilador de techo TMT modelo C-50601 LBN. En oferta de temporada." },
  { file: "abanico-tmt.jpg", nombre: "Abanico de techo TMT", categoria: "ventilacion", marca: "TMT", precio: 1690, stock: 18, descripcion: "Abanico de techo línea TMT para recámara y sala." },
  { file: "ventilador.jpg", nombre: "Ventilador de techo orbital", categoria: "ventilacion", marca: "VENTO", precio: 1290, stock: 20, descripcion: "Ventilador de techo orbital Vento, modelo V-OF20." },
  { file: "ventilador-piso.jpg", nombre: "Ventilador industrial de piso", categoria: "ventilacion", marca: "VENTO", precio: 870, stock: 15, descripcion: "Ventilador industrial de piso Vento." },
  { file: "ventilador-techo.jpg", nombre: "Ventilador de techo Marín 52", categoria: "ventilacion", marca: "ESTEVEZ", precio: 2100, stock: 12, descripcion: "Ventilador de techo Estevez Marín 52 pulgadas, modelo 51903." },
  { file: "ventilador-ind.jpg", nombre: "Ventilador industrial KDK", categoria: "ventilacion", marca: "KDK", precio: 4680, stock: 6, descripcion: "Ventilador industrial de techo KDK, modelo M56LG." },
  { file: "extractor.jpg", nombre: "Extractor de aire", categoria: "ventilacion", marca: "ESTEVEZ", precio: 740, stock: 22, descripcion: "Extractor de aire para cocina, baño y áreas de servicio." },
  { file: "extractor-baño.jpg", nombre: "Extractor de baño", categoria: "ventilacion", marca: "ESTEVEZ", precio: 620, stock: 24, descripcion: "Extractor compacto para baño y medio baño." },
  { file: "base-med.jpg", nombre: "Base para medidor Eaton", categoria: "proteccion", marca: "EATON", precio: 310, stock: 40, descripcion: "Base socket para medidor, marca Eaton." },
  { file: "base-medi.jpg", nombre: "Base de medición integral", categoria: "proteccion", marca: "VALDEZ", precio: 345, stock: 28, descripcion: "Base de medición integral para acometida." },
  { file: "base-medidor.jpg", nombre: "Base para medidores", categoria: "proteccion", marca: "VALDEZ", precio: 390, stock: 26, descripcion: "Bases socket para medidor, en varias capacidades." },
  { file: "centro de carga.jpg", nombre: "Centro de carga QO Square D", categoria: "proteccion", marca: "SQUARE D", precio: 1890, antes: 2190, stock: 9, descripcion: "Centros de carga QO Square D. En oferta de temporada." },
  { file: "centro-carga.jpg", nombre: "Centro de carga", categoria: "proteccion", marca: "VALDEZ", precio: 2460, stock: 8, descripcion: "Centro de carga para casa. Variedad de marcas en sucursal." },
  { file: "Gabinete.jpg", nombre: "Gabinete eléctrico Alcodm", categoria: "proteccion", marca: "ALCODM", precio: 980, stock: 13, descripcion: "Gabinete eléctrico Alcodm para usos generales." },
  { file: "caja eelectrica.jpg", nombre: "Cajas eléctricas de PVC", categoria: "proteccion", marca: "VALDEZ", precio: 42, stock: 120, descripcion: "Cajas eléctricas de PVC para conexiones y registros." },
  { file: "detector-humo.jpg", nombre: "Detector de humo fotoeléctrico", categoria: "proteccion", marca: "TECNOLITE", precio: 420, stock: 18, descripcion: "Detector de humo fotoeléctrico Tecnolite, modelo DH-98A." },
  { file: "regulador.jpg", nombre: "Regulador de voltaje", categoria: "proteccion", marca: "SOLA BASIC", precio: 3290, stock: 7, descripcion: "Regulador para proteger equipos sensibles." },
  { file: "cable.jpg", nombre: "Conductores eléctricos", categoria: "conductores", marca: "VALDEZ", precio: 18.5, stock: 200, descripcion: "Conductores eléctricos para instalaciones residenciales y comerciales." },
  { file: "cable-elec.jpg", nombre: "Conductor eléctrico IUSA calibre 12", categoria: "conductores", marca: "IUSA", precio: 24, antes: 29, stock: 160, descripcion: "Conductor eléctrico IUSA calibre 12, color negro. En oferta de temporada." },
  { file: "cable-cobre-desn.jpg", nombre: "Cable de cobre desnudo Kobrex", categoria: "conductores", marca: "KOBREX", precio: 32, stock: 90, descripcion: "Cable de cobre desnudo Kobrex para tierras y líneas aéreas." },
  { file: "cinta aislante.jpg", nombre: "Cinta aislante", categoria: "conductores", marca: "3M", precio: 28, stock: 150, descripcion: "Cinta aislante para empalmes y identificaciones." },
  { file: "clavijas.jpg", nombre: "Clavijas y contactos Cooper", categoria: "contactos", marca: "COOPER", precio: 36, stock: 80, descripcion: "Placas, contactos, clavijas y accesorios Cooper Wiring Devices." },
  { file: "clavoija-blindado.jpg", nombre: "Clavijas vinyl blindadas", categoria: "contactos", marca: "VALDEZ", precio: 68, stock: 45, descripcion: "Clavijas y contactos vinyl blindados, modelos 2866 y 2299." },
  { file: "contacto.jpg", nombre: "Placa decorativa con contacto Modus PRO", categoria: "contactos", marca: "BTICINO", precio: 48, stock: 110, descripcion: "Placa decorativa Modus PRO color Flamingo, con contacto." },
  { file: "contactos Lucek.jpg", nombre: "Contactos Lucek", categoria: "contactos", marca: "LUCEK", precio: 92, stock: 40, descripcion: "Contactos línea Lucek para interiores." },
  { file: "multicontactos.jpg", nombre: "Multicontactos Fulgore", categoria: "contactos", marca: "FULGORE", precio: 210, stock: 30, descripcion: "Multicontactos Fulgore, con protección y puertos USB." },
  { file: "entrada-tel.jpg", nombre: "Entrada telefónica IUSA", categoria: "contactos", marca: "IUSA", precio: 54, stock: 36, descripcion: "Entrada telefónica IUSA, retardante a la flama." },
  { file: "placas modus.jpg", nombre: "Placas Modus", categoria: "placas", marca: "MODUS", precio: 186, stock: 48, descripcion: "Placas e interruptores línea Modus." },
  { file: "placas Modus PRO.jpg", nombre: "Placas Modus PRO", categoria: "placas", marca: "BTICINO", precio: 248, antes: 289, stock: 32, descripcion: "Placas Modus PRO con apagador. En oferta de temporada." },
  { file: "placas-lucek.jpg", nombre: "Placas Lucek", categoria: "placas", marca: "LUCEK", precio: 132, stock: 44, descripcion: "Placas y apagadores línea Lucek." },
  { file: "placas-royer.jpg", nombre: "Placas Royer 100", categoria: "placas", marca: "EATON", precio: 118, stock: 38, descripcion: "Placas armadas Royer 100, marca Eaton." },
  { file: "placas cristal templ.jpg", nombre: "Placas de cristal templado Eaton", categoria: "placas", marca: "EATON", precio: 340, stock: 16, descripcion: "Placas Eaton de cristal templado, en acero cepillado y negro cepillado." },
  { file: "atenuador.jpg", nombre: "Atenuador de luz Ipsa", categoria: "placas", marca: "IPSA", precio: 265, stock: 20, descripcion: "Atenuador de luz Ipsa con placa vertical, modelo DIMM/STD." },
  { file: "dimmer.jpg", nombre: "Dimmer LED Ipsa", categoria: "placas", marca: "IPSA", precio: 310, stock: 18, descripcion: "Dimmer LED Ipsa para regular la intensidad de la luz." },
  { file: "timbre.jpg", nombre: "Timbre alámbrico ST-Venecia", categoria: "placas", marca: "SUPPLIER", precio: 145, stock: 25, descripcion: "Timbre alámbrico Supplier, clave ST-Venecia, sonido ding-dong." },
  { file: "interfon.jpg", nombre: "Interfón Bticino 2 hilos", categoria: "placas", marca: "BTICINO", precio: 890, stock: 10, descripcion: "Interfón Bticino, sistema 2 hilos E, con control de cerradura eléctrica." },
  { file: "tuberia-pvc.jpg", nombre: "Tubería PVC", categoria: "tuberia", marca: "VALDEZ", precio: 38, stock: 180, descripcion: "Tubería de PVC para instalaciones domésticas." },
  { file: "tuberia-liquid.jpg", nombre: "Tubería liquid tight", categoria: "tuberia", marca: "VALDEZ", precio: 96, stock: 40, descripcion: "Tubería flexible liquid tight para equipos y motores." },
  { file: "tubo flexible.jpg", nombre: "Tubo flexible Zapa", categoria: "tuberia", marca: "ZAPA", precio: 22, stock: 140, descripcion: "Tubo flexible Zapa para instalaciones de difícil acceso." },
  { file: "tubo galv.jpg", nombre: "Tubería galvanizada", categoria: "tuberia", marca: "VALDEZ", precio: 145, stock: 50, descripcion: "Tubería conduit galvanizada para obra e industria." },
  { file: "manguera-flex.jpg", nombre: "Poliflex naranja", categoria: "tuberia", marca: "POLIFLEX", precio: 27, stock: 70, descripcion: "Manguera corrugada Poliflex naranja para canalizar conductores." },
  { file: "mangueraflex.jpg", nombre: "Poliflex en rollo", categoria: "tuberia", marca: "POLIFLEX", precio: 34, stock: 60, descripcion: "Manguera corrugada Poliflex en varios colores y medidas." },
  { file: "unicanal.jpg", nombre: "Unicanal", categoria: "ferreteria", marca: "VALDEZ", precio: 86, stock: 55, descripcion: "Unicanal ranurado para soportería eléctrica." },
  { file: "varilla-rosc.jpg", nombre: "Varilla roscada", categoria: "ferreteria", marca: "VALDEZ", precio: 42, stock: 80, descripcion: "Varilla roscada para colgar charolas y luminarios." },
  { file: "soportes elec.jpg", nombre: "Soportes eléctricos", categoria: "ferreteria", marca: "VALDEZ", precio: 18, stock: 100, descripcion: "Soportes y abrazaderas para tubería y cableado." },
  { file: "pinzas.jpg", nombre: "Pinzas aisladas Tulmex", categoria: "ferreteria", marca: "TULMEX", precio: 265, stock: 22, descripcion: "Pinzas aisladas Tulmex para sistemas de hasta 1000 V." },
  { file: "sarmadores.jpg", nombre: "Juego de desarmadores Stanley", categoria: "ferreteria", marca: "STANLEY", precio: 189, stock: 24, descripcion: "Juego de 6 desarmadores Stanley para tableros y contactos." },
  { file: "herram.jpg", nombre: "Herramienta para instalación", categoria: "ferreteria", marca: "VALDEZ", precio: 2480, antes: 2790, stock: 8, descripcion: "Pinzas y desarmadores para obra y mantenimiento. En oferta de temporada." },
  { file: "flotador.jpg", nombre: "Control de nivel tipo flotador Ceisa", categoria: "accesorios", marca: "CEISA", precio: 210, stock: 19, descripcion: "Flotador eléctrico Ceisa para tinaco y cisterna." },
  { file: "fotoelectico.jpg", nombre: "Control fotoeléctrico Tork", categoria: "accesorios", marca: "TORK", precio: 95, stock: 34, descripcion: "Control fotoeléctrico Tork para encendido automático de luminarios exteriores." },
  { file: "sensor-mov.jpg", nombre: "Sensor de movimiento para muro", categoria: "accesorios", marca: "TECNOLITE", precio: 175, stock: 27, descripcion: "Sensor de movimiento Tecnolite para muro, modelo LXT18B." },
  { file: "sensor inal.jpg", nombre: "Sensor de puerta y ventana", categoria: "accesorios", marca: "TL APPS", precio: 240, stock: 14, descripcion: "Sensor inalámbrico TL Apps para puerta y ventana, modelo ZD-2102US-5." },
  { file: "termostato-intel.jpg", nombre: "Termostato inteligente Tecnolite", categoria: "accesorios", marca: "TECNOLITE", precio: 1890, stock: 6, descripcion: "Termostato inteligente Tecnolite, modelo HSC6-HP-US." },
  { file: "bombillas.jpg", nombre: "Bombillas vintage", categoria: "iluminacion", marca: "VALDEZ", precio: 45, stock: 140, descripcion: "Bombillas decorativas de filamento para iluminación de acento.", luz: { tipo: "Focos LED", temp: "Cálida 3000K", uso: "Interior", watts: 9, rating: 4.7 } },
  { file: "foco-led-aten.jpg", nombre: "Foco LED atenuable Osram A19", categoria: "iluminacion", marca: "OSRAM", precio: 89, antes: 119, stock: 80, descripcion: "Foco LED atenuable Osram Superstar A19. En oferta de temporada.", luz: { tipo: "Focos LED", temp: "Cálida 3000K", uso: "Interior", watts: 10, rating: 4.8 } },
  { file: "focos-vintage.jpg", nombre: "Serie de 24 focos vintage LED", categoria: "iluminacion", marca: "TECNOLITE", precio: 129, stock: 36, descripcion: "Serie Tecnolite con 24 focos vintage LED para exterior. Cada bombilla consume 1 W.", luz: { tipo: "Focos LED", temp: "Cálida 3000K", uso: "Exterior", watts: 1, rating: 4.6 } },
  { file: "focos-vintage1.jpg", nombre: "Focos vintage Ipsa LEDFLEX", categoria: "iluminacion", marca: "IPSA", precio: 149, stock: 28, descripcion: "Focos vintage Ipsa LEDFLEX, modelos T30, ST64, VE26 y G45.", luz: { tipo: "Focos LED", temp: "Cálida 3000K", uso: "Interior", watts: 6, rating: 4.5 } },
  { file: "Downlight.jpg", nombre: "Downlight sobreponer Tecnoled", categoria: "iluminacion", marca: "TECNOLED", precio: 385, antes: 449, stock: 42, descripcion: "Downlight de sobreponer Tecnoled. En oferta de temporada.", luz: { tipo: "Lámparas de techo", temp: "Neutra 4000K", uso: "Interior", watts: 13, rating: 4.7 } },
  { file: "lampara.emp.jpg", nombre: "Lámpara empotrada", categoria: "iluminacion", marca: "TECNOLITE", precio: 320, stock: 30, descripcion: "Luminario empotrado para plafón.", luz: { tipo: "Empotrados", temp: "Neutra 4000K", uso: "Interior", watts: 12, rating: 4.6 } },
  { file: "lampara spot.jpg", nombre: "Lámpara spot", categoria: "iluminacion", marca: "TECNOLITE", precio: 275, stock: 26, descripcion: "Spot dirigible para acentuar muros y estantes.", luz: { tipo: "Empotrados", temp: "Cálida 3000K", uso: "Interior", watts: 7, rating: 4.5 } },
  { file: "plafones led.jpg", nombre: "Plafones LED Drum Square", categoria: "iluminacion", marca: "ESTEVEZ", precio: 749, antes: 890, stock: 22, descripcion: "Plafones LED Estevez Drum Square, acabados cromo, bronce y negro. En oferta de temporada.", luz: { tipo: "Lámparas de techo", temp: "Neutra 4000K", uso: "Interior", watts: 24, rating: 4.8 } },
  { file: "lampara led.jpg", nombre: "Lámpara LED Osram PAR16", categoria: "iluminacion", marca: "OSRAM", precio: 690, stock: 18, descripcion: "Lámpara LED Osram PAR16 Superstar.", luz: { tipo: "Focos LED", temp: "Neutra 4000K", uso: "Interior", watts: 18, rating: 4.6 } },
  { file: "lampara-col-int.jpg", nombre: "Lámpara colgante interior Calux", categoria: "iluminacion", marca: "CALUX", precio: 1290, stock: 12, descripcion: "Lámpara colgante interior Calux, modelo TH1710/C N, metálica negro y cobre.", luz: { tipo: "Lámparas de techo", temp: "Cálida 3000K", uso: "Interior", watts: 24, rating: 4.8 } },
  { file: "lampara-int.jpg", nombre: "Lámpara interior Inomost", categoria: "iluminacion", marca: "TECNOLITE", precio: 840, stock: 14, descripcion: "Lámpara de interior Tecnolite Inomost, modelo 120PTL1011MVC.", luz: { tipo: "Lámparas de techo", temp: "Neutra 4000K", uso: "Interior", watts: 18, rating: 4.4 } },
  { file: "lap-globo-led.jpg", nombre: "Lámpara LED de globo Ipsa", categoria: "iluminacion", marca: "IPSA", precio: 560, stock: 16, descripcion: "Lámpara LED de globo Ipsa, modelo LED-G45.", luz: { tipo: "Focos LED", temp: "Cálida 3000K", uso: "Interior", watts: 15, rating: 4.5 } },
  { file: "luminario techo.jpg", nombre: "Luminaria de techo Calux", categoria: "iluminacion", marca: "CALUX", precio: 980, stock: 15, descripcion: "Luminaria de techo Calux, modelo C2029-5/GR.", luz: { tipo: "Lámparas de techo", temp: "Cálida 3000K", uso: "Interior", watts: 36, rating: 4.7 } },
  { file: "luminarioa-techo.jpg", nombre: "Luminario para techo Calux", categoria: "iluminacion", marca: "CALUX", precio: 1640, stock: 9, descripcion: "Luminario colgante Calux, modelo C095/S.", luz: { tipo: "Lámparas de techo", temp: "Cálida 3000K", uso: "Interior", watts: 40, rating: 4.6 } },
  { file: "luminario.jpg", nombre: "Luminario Acciaio LED", categoria: "iluminacion", marca: "BEGHELLI", precio: 1120, stock: 17, descripcion: "Luminario hermético Beghelli Acciaio LED, con difusor de vidrio templado.", luz: { tipo: "Lámparas de techo", temp: "Fría 6500K", uso: "Interior", watts: 32, rating: 4.5 } },
  { file: "luminario1.jpg", nombre: "Luminario Sunleaf de empotrar", categoria: "iluminacion", marca: "SUNLEAF", precio: 860, stock: 19, descripcion: "Luminario Sunleaf de empotrar LED, 15 W.", luz: { tipo: "Empotrados", temp: "Neutra 4000K", uso: "Interior", watts: 15, rating: 4.4 } },
  { file: "luminario2.jpg", nombre: "Luminario para techo Calux", categoria: "iluminacion", marca: "CALUX", precio: 790, stock: 21, descripcion: "Luminario para techo Calux, modelo C2038-6/CR, cuerpo de acero.", luz: { tipo: "Lámparas de techo", temp: "Cálida 3000K", uso: "Interior", watts: 22, rating: 4.5 } },
  { file: "luminaria.jpg", nombre: "Luminaria dirigible Calux", categoria: "iluminacion", marca: "CALUX", precio: 1340, stock: 11, descripcion: "Luminaria dirigible de acero inoxidable Calux.", luz: { tipo: "Arbotantes", temp: "Cálida 3000K", uso: "Exterior", watts: 40, rating: 4.6 } },
  { file: "lmapara-led-luminaria.jpg", nombre: "Lámpara LED de empotrar Magg", categoria: "iluminacion", marca: "MAGG", precio: 1580, stock: 10, descripcion: "Lámpara LED de empotrar Magg, modelo L7302-919.", luz: { tipo: "Empotrados", temp: "Neutra 4000K", uso: "Exterior", watts: 48, rating: 4.7 } },
  { file: "lampara-id.jpg", nombre: "Lámpara de taller Argos", categoria: "iluminacion", marca: "ARGOS", precio: 980, stock: 14, descripcion: "Lámpara de taller Argos, con cable y clavija.", luz: { tipo: "Reflectores", temp: "Cálida 3000K", uso: "Interior", watts: 50, rating: 4.5 } },
  { file: "luminario ind.jpg", nombre: "Luminario industrial LED Construlita", categoria: "iluminacion", marca: "CONSTRULITA", precio: 1420, stock: 8, descripcion: "Luminario industrial LED Construlita, con argolla para montaje suspendido.", luz: { tipo: "Reflectores", temp: "Fría 6500K", uso: "Interior", watts: 100, rating: 4.6 } },
  { file: "reflector.jpg", nombre: "Reflector exterior con sensor Philco", categoria: "iluminacion", marca: "PHILCO", precio: 419, antes: 499, stock: 36, descripcion: "Luminario exterior Philco con sensor, modelo 51696. En oferta de temporada.", luz: { tipo: "Reflectores", temp: "Fría 6500K", uso: "Exterior", watts: 20, rating: 4.8 } },
  { file: "lampara pared.jpg", nombre: "Arbotante Tecnolite Tucson", categoria: "iluminacion", marca: "TECNOLITE", precio: 540, stock: 18, descripcion: "Arbotante Tecnolite serie Tucson, modelo TH3018/1 N.", luz: { tipo: "Arbotantes", temp: "Cálida 3000K", uso: "Interior", watts: 60, rating: 4.6 } },
  { file: "lampara-exterior.jpg", nombre: "Lámpara exterior Tecnolite Toledo", categoria: "iluminacion", marca: "TECNOLITE", precio: 690, stock: 16, descripcion: "Lámpara exterior Tecnolite Toledo, código H-1075/AN.", luz: { tipo: "Arbotantes", temp: "Cálida 3000K", uso: "Exterior", watts: 100, rating: 4.5 } },
  { file: "farol.jpg", nombre: "Farol exterior", categoria: "iluminacion", marca: "TECNOLITE", precio: 780, stock: 12, descripcion: "Farol decorativo para jardín y entrada.", luz: { tipo: "Arbotantes", temp: "Cálida 3000K", uso: "Exterior", watts: 12, rating: 4.7 } },
  { file: "farol1.jpg", nombre: "Farol Tecnolite Rabata", categoria: "iluminacion", marca: "TECNOLITE", precio: 640, stock: 14, descripcion: "Farol de muro Tecnolite Rabata, modelo FTL-LED/002/11W/N.", luz: { tipo: "Arbotantes", temp: "Cálida 3000K", uso: "Exterior", watts: 11, rating: 4.4 } },
  { file: "estaca luz.jpg", nombre: "Estaca de luz Estevez", categoria: "iluminacion", marca: "ESTEVEZ", precio: 260, stock: 30, descripcion: "Estaca de luz Estevez para jardín y andadores.", luz: { tipo: "Reflectores", temp: "Cálida 3000K", uso: "Exterior", watts: 7, rating: 4.3 } },
  { file: "lampara solar led.jpg", nombre: "Lámpara solar de pared Lion Tools", categoria: "iluminacion", marca: "LION TOOLS", precio: 890, antes: 1050, stock: 18, descripcion: "Lámpara LED solar de pared Lion Tools, con sensor de movimiento. En oferta de temporada.", luz: { tipo: "Arbotantes", temp: "Neutra 4000K", uso: "Exterior", watts: 8, rating: 4.5 } },
  { file: "luminaria satelite.jpg", nombre: "Luminario Tecnolite Satelite II", categoria: "iluminacion", marca: "TECNOLITE", precio: 2100, stock: 7, descripcion: "Luminario Tecnolite Satelite II, modelo PTLLED-005/30/N, 25 W y 1800 lm.", luz: { tipo: "Lámparas de techo", temp: "Neutra 4000K", uso: "Interior", watts: 25, rating: 4.6 } },
  { file: "luminaria alberca.jpg", nombre: "Luminario sumergible para piscinas", categoria: "iluminacion", marca: "TL APPS", precio: 760, stock: 11, descripcion: "Luminario sumergible TL Apps para piscinas PAR56 COB, 12 V y 25 W.", luz: { tipo: "Reflectores", temp: "Fría 6500K", uso: "Exterior", watts: 25, rating: 4.4 } },
  { file: "tira-led.jpg", nombre: "Tira LED 12 V", categoria: "iluminacion", marca: "VALDEZ", precio: 429, antes: 499, stock: 28, descripcion: "Tira LED de 12 V con adhesivo. En oferta de temporada.", luz: { tipo: "Tiras LED", temp: "Cálida 3000K", uso: "Interior", watts: 36, rating: 4.8 } },
  { file: "manguera plana led.jpg", nombre: "Manguera plana LED Tecnolite", categoria: "iluminacion", marca: "TECNOLITE", precio: 510, stock: 16, descripcion: "Manguera plana LED Tecnolite, 2635 SMD.", luz: { tipo: "Tiras LED", temp: "Neutra 4000K", uso: "Exterior", watts: 40, rating: 4.3 } },
  { file: "luz-emergencia.jpg", nombre: "Luminario de emergencia Ipsa", categoria: "iluminacion", marca: "IPSA", precio: 349, stock: 22, descripcion: "Luminario de emergencia Ipsa, modelo LE-3360L.", luz: { tipo: "Lámparas de techo", temp: "Fría 6500K", uso: "Interior", watts: 8, rating: 4.6 } },
  { file: "luminaria emerg.jpg", nombre: "Luminaria LED de emergencia Philco", categoria: "iluminacion", marca: "PHILCO", precio: 410, stock: 18, descripcion: "Luminaria LED de emergencia Philco, de dos lámparas.", luz: { tipo: "Lámparas de techo", temp: "Fría 6500K", uso: "Interior", watts: 10, rating: 4.5 } },
  { file: "luminario-emerg.jpg", nombre: "Luminario de emergencia Philco", categoria: "iluminacion", marca: "PHILCO", precio: 390, stock: 20, descripcion: "Luminario de emergencia Philco, modelo LEDLE-2WA, 6500 K.", luz: { tipo: "Lámparas de techo", temp: "Fría 6500K", uso: "Interior", watts: 8, rating: 4.4 } },
];

export const CATALOGO_VALDEZ: Producto[] = SEEDS.map((seed, index) => ({
  sku: `EV-${String(index + 1).padStart(3, "0")}`,
  nombre: seed.nombre,
  categoria: seed.categoria,
  marca: seed.marca,
  precio: seed.precio,
  precioAnterior: seed.antes,
  stock: seed.stock,
  descripcion: seed.descripcion,
  urlImagen: `/productos/${encodeURIComponent(seed.file)}`,
  ubicacion: "Mostrador",
  tipoLuminario: seed.luz?.tipo,
  temperatura: seed.luz?.temp,
  uso: seed.luz?.uso,
  watts: seed.luz?.watts,
  rating: seed.luz?.rating,
}));

function normalizar(valor: string): string {
  return valor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filtrarCatalogo(productos: Producto[], q: string, categoria = ""): Producto[] {
  const cat = normalizar(categoria);
  const tokens = normalizar(q)
    .split(/\s+/)
    .filter(Boolean);

  return productos.filter((producto) => {
    if (cat && normalizar(producto.categoria) !== cat) return false;
    if (!tokens.length) return true;
    const haystack = normalizar(
      [producto.nombre, producto.marca, producto.categoria, producto.descripcion, producto.sku, producto.tipoLuminario].join(" ")
    );
    return tokens.some((token) => haystack.includes(token));
  });
}

export function sugerenciasLocales(q: string, limite = 6): Producto[] {
  const n = normalizar(q);
  if (n.length < 2) return [];
  return CATALOGO_VALDEZ.filter((producto) =>
    normalizar(
      [producto.nombre, producto.marca, producto.categoria, producto.descripcion, producto.sku].join(" ")
    ).includes(n)
  ).slice(0, limite);
}

export function buscarCatalogoLocal(opciones: {
  q?: string;
  categoria?: string;
  limit?: number;
  offset?: number;
}): { productos: Producto[]; total: number } {
  const filtrados = filtrarCatalogo(CATALOGO_VALDEZ, opciones.q ?? "", opciones.categoria ?? "");
  const offset = Math.max(opciones.offset ?? 0, 0);
  const limit = Math.min(Math.max(opciones.limit ?? 24, 1), 90);
  return { total: filtrados.length, productos: filtrados.slice(offset, offset + limit) };
}

export function obtenerProductoLocal(sku: string): Producto | null {
  const codigo = sku.trim().toLowerCase();
  return CATALOGO_VALDEZ.find((item) => item.sku.toLowerCase() === codigo) ?? null;
}

export function listarCategoriasLocal(): { categoria: string; total: number }[] {
  const conteo = new Map<string, number>();
  for (const producto of CATALOGO_VALDEZ) {
    conteo.set(producto.categoria, (conteo.get(producto.categoria) ?? 0) + 1);
  }
  return [...conteo.entries()]
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => a.categoria.localeCompare(b.categoria, "es"));
}
