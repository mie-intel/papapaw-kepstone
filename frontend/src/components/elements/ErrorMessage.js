"use client";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      className="rounded-md border-l-4 border-red-600 bg-red-50 p-3 text-red-800 shadow-sm"
      role="alert"
    >
      <p className="font-medium">Error</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
