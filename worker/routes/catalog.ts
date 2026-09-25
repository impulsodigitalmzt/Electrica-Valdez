import { Hono } from "hono";
import { AppError } from "../lib/errors";
import { groqVisionQuery } from "../lib/groq";
import {
  buscarCatalogoLocal,
  listarCategoriasLocal,
  obtenerProductoLocal,
} from "../../src/lib/catalogo-valdez";

type AppEnv = { Bindings: Env };

export const catalogRoutes = new Hono<AppEnv>();

catalogRoutes.get("/", (c) => {
  const q = String(c.req.query("q") ?? "").trim();
  const categoria = String(c.req.query("categoria") ?? "").trim();
  const page = Math.max(Number.parseInt(String(c.req.query("page") ?? "1"), 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(String(c.req.query("limit") ?? "24"), 10) || 24, 1), 90);
  const { productos, total } = buscarCatalogoLocal({
    q,
    categoria,
    limit,
    offset: (page - 1) * limit,
  });
  return c.json({
    ok: true,
    q,
    categoria,
    page,
    limit,
    total,
    productos,
  });
});

catalogRoutes.post("/imagen", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as { image?: string };
  const image = String(body.image ?? "").trim();
  if (!image.startsWith("data:image/")) {
    throw new AppError(400, "Sube una foto del material.", "BAD_IMAGE");
  }
  if (image.length > 1_400_000) {
    throw new AppError(400, "La foto es demasiado pesada. Prueba con otra más cercana.", "IMAGE_TOO_LARGE");
  }
  const q = await groqVisionQuery(c.env, image);
  let { productos, total } = buscarCatalogoLocal({ q, limit: 16, offset: 0 });
  if (!productos.length) {
    const corto = q.split(/\s+/).slice(0, 2).join(" ");
    if (corto && corto !== q) {
      const segundo = buscarCatalogoLocal({ q: corto, limit: 16, offset: 0 });
      productos = segundo.productos;
      total = segundo.total;
    }
  }
  if (!productos.length) {
    const primero = q.split(/\s+/).find((token) => token.length >= 4) ?? "";
    if (primero) {
      const tercero = buscarCatalogoLocal({ q: primero, limit: 16, offset: 0 });
      productos = tercero.productos;
      total = tercero.total;
    }
  }
  return c.json({ ok: true, q, total, page: 1, productos });
});

catalogRoutes.get("/categorias", (c) => {
  return c.json({ ok: true, categorias: listarCategoriasLocal() });
});

catalogRoutes.get("/:sku", (c) => {
  const producto = obtenerProductoLocal(c.req.param("sku"));
  if (!producto) throw new AppError(404, "Producto no encontrado.", "NOT_FOUND");
  return c.json({ ok: true, producto });
});
