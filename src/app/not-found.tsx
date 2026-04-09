import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-[#1f3359]">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Página no encontrada</h2>
      <p className="mb-8 max-w-md text-gray-600">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#db0138] px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
