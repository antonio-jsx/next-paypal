"use client";

import { useTransition } from "react";
import { payAction } from "@/app/action";

export function ButtonPay({ price }: { price: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="flex text-sm items-center p-2 rounded-md text-white hover:cursor-pointer bg-indigo-400 px-4"
      type="button"
      onClick={() => startTransition(() => payAction(price))}
      disabled={isPending}
    >
      Go pay
    </button>
  );
}
