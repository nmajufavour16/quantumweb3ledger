export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--foreground)] mb-4">404</h1>
        <p className="text-[var(--muted)] mb-8">The page you are looking for does not exist.</p>
        <a href="/" className="px-6 py-3 rounded-full bg-[var(--accent)] text-black">Go Home</a>
      </div>
    </div>
  );
}
