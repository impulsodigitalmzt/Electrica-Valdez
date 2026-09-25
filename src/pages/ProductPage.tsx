import { useEffect, useMemo, useState } from "react";
import { Check, FileText, Minus, Plus, ShoppingCart } from "lucide-react";
import { CantidadInput } from "@/components/CantidadInput";
import { Header } from "@/components/Header";
import { PreFooterLeyenda, SiteFooter } from "@/components/HomeSections";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductImage } from "@/components/ProductImage";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { fetchCatalogo, fetchProducto } from "@/lib/api";
import { BrandLogo } from "@/components/BrandLogo";
import { BRANCHES, FACEBOOK_URL, descuentoDe, marcaDe } from "@/lib/brand";
import { CATALOGO_ILUMINACION, encontrarProductoLocal } from "@/lib/catalogo-iluminacion";
import { DEMO_PRODUCTOS } from "@/lib/demo-productos";
import { caracteristicasDe, textoFichaTecnica } from "@/lib/ficha-producto";
import { etiquetaCategoria, precioMx } from "@/lib/format";
import { ACCESORIOS_COMPLEMENTO, relacionadosDeProducto } from "@/lib/recomendaciones-carrito";
import { AppLink, navigate } from "@/lib/nav";
import type { Producto } from "@/types";

function encontrarProducto(sku: string): Producto | null {
  const codigo = sku.toLowerCase();
  return (
    encontrarProductoLocal(sku) ??
    DEMO_PRODUCTOS.find((item) => item.sku.toLowerCase() === codigo) ??
    ACCESORIOS_COMPLEMENTO.find((item) => item.sku.toLowerCase() === codigo) ??
    CATALOGO_ILUMINACION.find((item) => item.sku.toLowerCase() === codigo) ??
    null
  );
}

function fusionarProducto(local: Producto | null, remoto: Producto): Producto {
  if (!local) return remoto;
  return {
    ...remoto,
    descripcion: remoto.descripcion || local.descripcion,
    marca: remoto.marca || local.marca,
    pos: local.pos ?? remoto.pos,
    tipoLuminario: local.tipoLuminario ?? remoto.tipoLuminario,
    temperatura: local.temperatura ?? remoto.temperatura,
    uso: local.uso ?? remoto.uso,
    watts: local.watts ?? remoto.watts,
    rating: local.rating ?? remoto.rating,
    precioAnterior: remoto.precioAnterior ?? local.precioAnterior,
    urlImagen: remoto.urlImagen || local.urlImagen,
  };
}

export function ProductPage({ sku }: { sku: string }) {
  const { agregarProducto } = useCart();
  const [query, setQuery] = useState("");
  const [producto, setProducto] = useState<Producto | null>(null);
  const [relacionados, setRelacionados] = useState<Producto[]>([]);
  const [error, setError] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [thumb, setThumb] = useState(0);

  useEffect(() => {
    let vivo = true;
    setError("");
    setProducto(null);
    setCantidad(1);
    setThumb(0);
    const local = encontrarProducto(sku);
    if (local) setProducto(local);
    void fetchProducto(sku)
      .then((item) => {
        if (vivo) setProducto(fusionarProducto(local, item));
      })
      .catch(() => {
        if (vivo && !local) setError("No encontramos esa pieza.");
      });
    return () => {
      vivo = false;
    };
  }, [sku]);

  useEffect(() => {
    if (!producto) return;
    setRelacionados(relacionadosDeProducto(producto));
    void fetchCatalogo({ q: producto.nombre.split(/\s+/).slice(0, 3).join(" "), limit: 12 })
      .then((data) => {
        const extra = data.productos.filter((item) => item.sku !== producto.sku);
        setRelacionados(relacionadosDeProducto(producto, extra));
      })
      .catch(() => setRelacionados(relacionadosDeProducto(producto)));
  }, [producto]);

  const marca = producto ? marcaDe(producto.nombre, producto.marca) : "";
  const descuento = producto ? descuentoDe(producto.precio, producto.precioAnterior) : 0;
  const caracteristicas = useMemo(() => (producto ? caracteristicasDe(producto) : []), [producto]);
  const matriz = BRANCHES[0];
  const galeria = producto ? [producto] : [];

  function descargarFicha() {
    if (!producto) return;
    const blob = new Blob([textoFichaTecnica(producto)], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `ficha-${producto.sku}.txt`;
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header query={query} onQueryChange={setQuery} variant="inner" />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
        <nav aria-label="Ruta de navegación" className="text-xs font-semibold text-muted-foreground">
          <AppLink to="/" className="hover:text-black">
            Inicio
          </AppLink>
          <span className="px-1">/</span>
          <AppLink to={producto?.categoria === "iluminacion" ? "/iluminacion" : "/buscar"} className="hover:text-black">
            {producto ? etiquetaCategoria(producto.categoria) : "Catálogo"}
          </AppLink>
          {producto ? (
            <>
              <span className="px-1">/</span>
              <span className="text-black">{producto.nombre}</span>
            </>
          ) : null}
        </nav>

        {error ? (
          <div className="py-24 text-center">
            <h1 className="text-3xl font-extrabold text-black">{error}</h1>
            <Button className="mt-6" asChild>
              <AppLink to="/buscar">Volver al catálogo</AppLink>
            </Button>
          </div>
        ) : !producto ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="aspect-square animate-pulse bg-muted" />
            <div className="space-y-4">
              <div className="h-4 w-40 animate-pulse bg-muted" />
              <div className="h-10 w-3/4 animate-pulse bg-muted" />
              <div className="h-24 animate-pulse bg-muted" />
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <div>
                <div className="relative overflow-hidden border bg-white">
                  <ProductImage
                    producto={galeria[thumb] ?? producto}
                    sprite={Boolean(producto.pos)}
                    pos={producto.pos}
                    className="aspect-square w-full object-contain p-8 sm:p-12"
                  />
                  {descuento > 0 ? (
                    <span className="absolute left-4 top-4 bg-sale px-2 py-1 text-xs font-bold text-sale-foreground">-{descuento}%</span>
                  ) : null}
                </div>
                <div className="mt-3 flex gap-2">
                  {galeria.map((item, index) => (
                    <button
                      key={`${item.sku}-thumb-${index}`}
                      type="button"
                      onClick={() => setThumb(index)}
                      className={`size-16 overflow-hidden border bg-white ${thumb === index ? "border-primary" : "border-border"}`}
                      aria-label={`Ver imagen ${index + 1}`}
                    >
                      <ProductImage producto={item} sprite={Boolean(item.pos)} pos={item.pos} className="h-full w-full object-contain p-1" />
                    </button>
                  ))}
                </div>

                <section id="ficha-tecnica" className="mt-10 max-w-3xl">
                  <h2 className="text-lg font-extrabold uppercase text-black">
                    {producto.nombre}. Descripción:
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {producto.descripcion ||
                      "Personaliza tu espacio con este artículo original, con garantía de fabricante y existencia para recoger en sucursal o envío a todo México."}
                  </p>
                  <h3 className="mt-8 text-lg font-extrabold uppercase text-black">Características:</h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                    {caracteristicas.map((item) => (
                      <li key={item.etiqueta}>
                        <span className="font-semibold text-foreground">{item.etiqueta}:</span> {item.valor}
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={descargarFicha} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black hover:underline">
                    <FileText className="size-4" /> Ficha técnica
                  </button>
                  <div className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <p>¡Hola! Agradecemos tu compra.</p>
                    <p>
                      Si requieres <b className="text-foreground">factura</b> para tu pedido, envíanos un mensaje con tus datos fiscales
                      completos en un plazo máximo de <b className="text-foreground">7 días hábiles</b> a partir de la compra.
                    </p>
                    <p className="font-semibold text-foreground">Los datos que necesitamos son:</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>RFC</li>
                      <li>Razón social</li>
                      <li>Uso de CFDI</li>
                      <li>Domicilio fiscal completo (calle, número exterior e interior, colonia, municipio, estado y código postal)</li>
                    </ul>
                  </div>
                </section>
              </div>

              <aside className="lg:sticky lg:top-28">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <BrandLogo nombre={producto.nombre} marca={marca} className="h-6" />
                  <span className="text-border">|</span> SKU: {producto.sku}
                </p>
                <h1 className="mt-2 text-2xl font-extrabold uppercase leading-tight text-black sm:text-3xl">{producto.nombre}</h1>
                <div className="mt-5 flex flex-wrap items-baseline gap-3">
                  <b className="font-display text-4xl text-black">{precioMx(producto.precio)} MXN</b>
                  {producto.precioAnterior ? (
                    <span className="text-sm text-muted-foreground line-through">{precioMx(producto.precioAnterior)}</span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-black">Los gastos de envío se calcularán al momento de pagar.</p>

                <div className="mt-5">
                  <p className={`flex items-center gap-2 text-sm font-semibold ${producto.stock > 0 ? "text-black" : "text-sale"}`}>
                    <span className={`size-2 rounded-full ${producto.stock > 0 ? "bg-success" : "bg-sale"}`} />
                    {producto.stock > 0 ? `${producto.stock} disponibles` : "Agotado"}
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${producto.stock > 0 ? "bg-success" : "bg-sale"}`}
                      style={{ width: `${producto.stock > 0 ? Math.min(100, Math.max(12, producto.stock)) : 8}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex h-12 w-36 items-center overflow-hidden border">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-12 shrink-0 rounded-none"
                      onClick={() => setCantidad((n) => Math.max(1, n - 1))}
                      aria-label="Reducir cantidad"
                    >
                      <Minus />
                    </Button>
                    <CantidadInput
                      value={cantidad}
                      nombre={producto.nombre}
                      max={Math.max(1, producto.stock || 999)}
                      onChange={setCantidad}
                      className="h-full min-w-0 flex-1 border-x bg-transparent text-center text-base font-semibold text-foreground outline-none"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-12 shrink-0 rounded-none"
                      onClick={() => setCantidad((n) => Math.min(Math.max(producto.stock, 1), n + 1))}
                      aria-label="Aumentar cantidad"
                    >
                      <Plus />
                    </Button>
                  </div>
                  <Button
                    className="h-12 min-w-52 flex-1 rounded-none font-bold uppercase tracking-wide"
                    disabled={producto.stock <= 0}
                    onClick={() => agregarProducto(producto, cantidad)}
                  >
                    <ShoppingCart /> Añadir al carrito
                  </Button>
                </div>

                <div className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-black" />
                  <p>
                    Recogida disponible en {matriz.name}. Normalmente está listo en 4 horas.{" "}
                    <AppLink to="/#sucursales" className="text-black underline-offset-2 hover:underline">
                      Ver información de la tienda
                    </AppLink>
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                  Facebook:
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook de Eléctrica Valdez"
                    className="flex size-8 items-center justify-center border hover:text-black"
                  >
                    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
                      <path fill="currentColor" d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
                    </svg>
                  </a>
                </div>
              </aside>
            </div>

            {relacionados.length ? (
              <section className="mt-16 border-t pt-10">
                <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-black">También puede interesarte</h2>
                <div className="mt-8">
                  <ProductCarousel label="También puede interesarte">
                    {relacionados.map((item) => (
                      <article key={item.sku} className="group relative flex h-full flex-col border bg-card p-3">
                        <button type="button" className="relative block w-full" onClick={() => navigate(`/producto/${encodeURIComponent(item.sku)}`)}>
                          <ProductImage
                            producto={item}
                            sprite={Boolean(item.pos)}
                            pos={item.pos}
                            className="aspect-square w-full object-contain"
                          />
                        </button>
                        {item.stock > 0 ? (
                          <Button
                            size="icon"
                            className="absolute right-4 top-4 opacity-100 shadow-md transition sm:opacity-0 sm:group-hover:opacity-100"
                            aria-label={`Añadir ${item.nombre} al carrito`}
                            onClick={() => agregarProducto(item, 1, { abrir: false })}
                          >
                            <ShoppingCart />
                          </Button>
                        ) : null}
                        <span className="mt-3">
                          <BrandLogo nombre={item.nombre} marca={marcaDe(item.nombre, item.marca)} className="h-4" />
                        </span>
                        <button
                          type="button"
                          className="mt-1 line-clamp-3 text-left text-sm font-semibold uppercase leading-snug text-black"
                          onClick={() => navigate(`/producto/${encodeURIComponent(item.sku)}`)}
                        >
                          {item.nombre}
                        </button>
                        <b className="mt-3 font-display text-lg text-black">{precioMx(item.precio)} MXN</b>
                        <p className={`mt-2 text-xs font-semibold ${item.stock > 0 ? "text-black" : "text-sale"}`}>
                          {item.stock > 0 ? `Disponibles (${item.stock} unidades)` : "Agotado"}
                        </p>
                      </article>
                    ))}
                  </ProductCarousel>
                </div>
              </section>
            ) : null}
          </>
        )}
      </main>
      <PreFooterLeyenda />
      <SiteFooter />
    </div>
  );
}
