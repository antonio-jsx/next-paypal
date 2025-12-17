"use client";

import { useEffect } from "react";

// biome-ignore lint/suspicious/noShadowRestrictedNames: <no error>
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md p-4 border border-zinc-300 space-y-2 rounded-sm mt-10">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-red-300">{error.message}</p>
      <button
        className="px-2 py-1 border border-zinc-400 bg-red-100 rounded-sm"
        type="button"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
