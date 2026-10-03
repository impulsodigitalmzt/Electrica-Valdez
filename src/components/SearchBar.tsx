import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, Mic, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ProductImage } from "@/components/ProductImage";
import { useCart } from "@/context/CartContext";
import { fetchCatalogo, preguntarAsistente } from "@/lib/api";
import { marcaDe } from "@/lib/brand";
import { sugerenciasLocales } from "@/lib/demo-productos";
import { precioMx, sessionId } from "@/lib/format";
import { navigate } from "@/lib/nav";
import type { PaqueteBom, Producto, RespuestaAsistente } from "@/types";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPath?: string;
};

function textoPlano(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function puntuacion(item: Producto, q: string): number {
  const n = textoPlano(q);
  const nombre = textoPlano(item.nombre);
  const marca = textoPlano(marcaDe(item.nombre, item.marca));
  const categoria = textoPlano(item.categoria);
  if (nombre.includes(n)) return 30;
  if (marca.includes(n) || categoria.includes(n)) return 18;
  return 8;
}

function mezclarSugerencias(catalogo: Producto[], locales: Producto[], q: string, limite = 6): Producto[] {
  const vistos = new Set<string>();
  const out: Producto[] = [];
  for (const item of [...catalogo, ...locales]) {
    const clave = item.sku.trim().toLowerCase();
    if (!clave || vistos.has(clave)) continue;
    vistos.add(clave);
    out.push(item);
  }
  return out.sort((a, b) => puntuacion(b, q) - puntuacion(a, q) || a.nombre.localeCompare(b.nombre, "es")).slice(0, limite);
}

export function SearchBar({
  value,
  onChange,
  placeholder = "¿Qué estás buscando?",
  searchPath = "/buscar",
}: Props) {
  const { lineas, agregarProducto, agregarPaquete, sincronizar } = useCart();
  const [abierto, setAbierto] = useState(false);
  const [sugerencias, setSugerencias] = useState<Producto[]>([]);
  const [turno, setTurno] = useState<RespuestaAsistente | null>(null);
  const [cargando, setCargando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [error, setError] = useState("");
  const box = useRef<HTMLFormElement>(null);
  const reconocimiento = useRef<SpeechRecognitionLike | null>(null);
  const consulta = value.trim();
  const locales = useMemo(() => sugerenciasLocales(consulta), [consulta]);

  useEffect(() => {
    const onDoc = (ev: MouseEvent) => {
      if (box.current && !box.current.contains(ev.target as Node)) setAbierto(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (consulta.length < 2) {
      setSugerencias([]);
      setCargando(false);
      return;
    }
    setAbierto(true);
    setSugerencias(locales);
    const handle = window.setTimeout(() => {
      setCargando(true);
      void fetchCatalogo({ q: consulta, limit: 8 })
        .then((data) => {
          setSugerencias(mezclarSugerencias(data.productos, locales, consulta));
        })
        .catch(() => {
          setSugerencias(locales.length ? locales : sugerenciasLocales(consulta, 6));
        })
        .finally(() => setCargando(false));
    }, 120);
    return () => window.clearTimeout(handle);
  }, [consulta, locales]);

  function irABuscar(q: string) {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    navigate(`${searchPath}${params.toString() ? `?${params}` : ""}`);
    setAbierto(false);
  }

  async function enviar(event?: FormEvent) {
    event?.preventDefault();
    const mensaje = value.trim();
    irABuscar(mensaje);
    if (!mensaje) return;
    const pareceFrase = mensaje.split(/\s+/).length >= 4;
    if (!pareceFrase) return;
    setCargando(true);
    setError("");
    setAbierto(true);
    try {
      const data = await preguntarAsistente(mensaje, sessionId(), lineas);
      setTurno(data);
      if (data.pedido?.length) sincronizar(data.pedido);
    } catch (err) {
      setError(err instanceof Error ? err.message : "El mostrador no pudo responder.");
    } finally {
      setCargando(false);
    }
  }

  function hablar() {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      setError("Tu navegador no admite búsqueda por voz. Prueba Chrome o Edge.");
      setAbierto(true);
      return;
    }
    if (escuchando) {
      reconocimiento.current?.stop();
      setEscuchando(false);
      return;
    }
    reconocimiento.current?.stop();
    const rec = new Ctor();
    rec.lang = "es-MX";
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (event) => {
      const texto = String(event.results[0]?.[0]?.transcript ?? "").trim();
      if (!texto) return;
      setError("");
      setTurno(null);
      onChange(texto);
      setAbierto(true);
    };
    rec.onerror = () => {
      setEscuchando(false);
      setError("No se escuchó el audio. Permite el micrófono e inténtalo de nuevo.");
      setAbierto(true);
    };
    rec.onend = () => setEscuchando(false);
    reconocimiento.current = rec;
    setError("");
    setEscuchando(true);
    rec.start();
  }

  const mostrarPanel =
    abierto &&
    (consulta.length >= 2 || escuchando || Boolean(error) || Boolean(turno) || cargando);

  return (
    <form ref={box} onSubmit={enviar} className="relative w-full">
      <div className="group relative flex h-[3.25rem] w-full items-center overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-gradient-to-r from-white via-slate-50 to-white shadow-[0_12px_28px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 transition-all duration-200 focus-within:border-primary/50 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.12),0_18px_40px_rgba(15,23,42,0.12)]">
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setTurno(null);
            setError("");
            setAbierto(true);
          }}
          onFocus={() => {
            if (consulta.length >= 2 || sugerencias.length) setAbierto(true);
          }}
          aria-label="Buscar productos"
          aria-expanded={mostrarPanel}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 rounded-[1.6rem] bg-transparent py-2 pl-5 pr-2 text-[15px] font-medium text-slate-900 outline-none placeholder:text-slate-500"
        />
        <div className="mr-2 flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 p-1.5 shadow-sm backdrop-blur-sm">
          {value ? (
            <>
              <button
                type="button"
                aria-label="Limpiar búsqueda"
                onClick={() => {
                  onChange("");
                  setSugerencias([]);
                  setTurno(null);
                  setError("");
                  setAbierto(false);
                }}
                className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="size-[18px]" strokeWidth={2} />
              </button>
              <span className="hidden h-5 w-px bg-slate-200 sm:block" aria-hidden="true" />
            </>
          ) : null}
          <button
            type="button"
            aria-label={escuchando ? "Detener voz" : "Buscar por voz"}
            title="Buscar por voz"
            onClick={hablar}
            className={`rounded-full p-2.5 transition-all duration-200 ${
              escuchando
                ? "bg-amber-100 text-amber-700 shadow-inner"
                : "bg-slate-100 text-slate-700 hover:bg-primary hover:text-white hover:shadow-md"
            }`}
          >
            {escuchando ? <LoaderCircle className="size-5 animate-spin" /> : <Mic className="size-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {mostrarPanel ? (
        <div
          role="listbox"
          aria-label="Sugerencias de productos"
          className="absolute left-0 right-0 top-[3.5rem] z-50 max-h-[70vh] overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-white/95 p-2 shadow-[0_20px_50px_rgba(15,23,42,0.15)] backdrop-blur-sm"
        >
          {escuchando ? (
            <p className="px-2 py-3 text-sm text-muted-foreground">Escuchando… di el material que necesitas.</p>
          ) : null}
          {cargando ? <p className="px-2 py-3 text-sm text-muted-foreground">Buscando en el inventario…</p> : null}
          {error ? <p className="px-2 py-2 text-sm text-sale">{error}</p> : null}
          {!cargando && !escuchando && consulta.length >= 2 && sugerencias.length === 0 && !error ? (
            <p className="px-2 py-3 text-sm text-muted-foreground">
              No encontramos piezas para “{consulta}”. Prueba con el nombre o la categoría.
            </p>
          ) : null}
          {sugerencias.map((item) => (
            <button
              key={item.sku}
              type="button"
              role="option"
              onClick={() => {
                setAbierto(false);
                navigate(`/producto/${encodeURIComponent(item.sku)}`);
              }}
              className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted"
            >
              <ProductImage producto={item} className="size-12 shrink-0 bg-muted object-contain" />
              <span className="min-w-0 flex-1">
                <strong className="block truncate text-sm">{item.nombre}</strong>
                <BrandLogo nombre={item.nombre} marca={marcaDe(item.nombre, item.marca)} className="h-3.5" />
              </span>
              <b className="text-sm text-black">{precioMx(item.precio)}</b>
            </button>
          ))}
          {consulta.length >= 2 ? (
            <button
              type="button"
              onClick={() => irABuscar(consulta)}
              className="mt-1 w-full rounded-xl px-2 py-2 text-left text-sm font-semibold text-accent hover:bg-muted"
            >
              Ver todos los resultados de “{consulta}”
            </button>
          ) : null}
          {turno ? (
            <div className="mt-2 space-y-3 border-t p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black">Asesor de mostrador</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{turno.respuesta}</p>
              {turno.paquete?.lineas.length ? <PaquetePreview paquete={turno.paquete} onAdd={agregarPaquete} /> : null}
              {turno.productos.slice(0, 4).map((producto) => (
                <button
                  key={producto.sku}
                  type="button"
                  onClick={() => agregarProducto(producto)}
                  className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-left hover:bg-muted"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{producto.nombre}</span>
                    <span className="text-xs text-muted-foreground">
                      {precioMx(producto.precio)} · {producto.stock} pza
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-accent">Añadir</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function PaquetePreview({ paquete, onAdd }: { paquete: PaqueteBom; onAdd: (p: PaqueteBom) => void }) {
  const total = paquete.lineas.reduce((acc, l) => acc + l.precio * l.cantidad, 0);
  return (
    <div className="rounded-md bg-muted p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-semibold">{paquete.titulo}</p>
        <button type="button" onClick={() => onAdd(paquete)} className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
          Meter paquete · {precioMx(total)}
        </button>
      </div>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {paquete.lineas.map((linea) => (
          <li key={linea.sku}>
            {linea.cantidad} × {linea.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
