"use server";

import { redirect } from "next/navigation";
import { generateAccessToken } from "@/app/data";

export type PaypalOrder = {
  links: Array<{
    href: string;
    rel: "approve" | "self" | "update" | string;
  }>;
};

const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export async function payAction(amount: number) {
  const token = await generateAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: Number(amount).toFixed(2),
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: "http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/cancel",
      },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`PayPal order error: ${error}`);
  }

  const result = (await res.json()) as PaypalOrder;

  const urlApprove = result.links.find((link) => link.rel === "approve")?.href;

  redirect(urlApprove || "");
}
