export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-black mb-4">Tailwind Test</h1>
        <p className="text-gray-600">If you see this styled, Tailwind is working!</p>
        <div className="mt-4 flex gap-4">
          <div className="w-20 h-20 bg-blue-500 rounded-lg"></div>
          <div className="w-20 h-20 bg-green-500 rounded-lg"></div>
          <div className="w-20 h-20 bg-yellow-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
