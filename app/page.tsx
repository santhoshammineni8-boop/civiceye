export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-black text-3xl font-bold mb-4">
          AI-Powered Civic Platform
        </h1>
        <p className="text-black mb-6">
          A prototype connecting citizens and government using AI
        </p>
        <a
          href="/login"
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
