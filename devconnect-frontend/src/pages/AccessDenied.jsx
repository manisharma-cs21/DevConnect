export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        
        <h1 className="text-3xl font-bold text-red-500 mb-3">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>

        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go Home
        </a>

      </div>

    </div>
  );
}