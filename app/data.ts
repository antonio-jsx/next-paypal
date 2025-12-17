import "server-only";

const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export async function generateAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
  ).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`PayPal token error: ${error}`);
  }

  const data: {
    access_token: string;
    expires_in: number;
  } = await res.json();

  return data.access_token;
}

export async function capturePaypalOrder(token: string) {
  const accessToken = await generateAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const raw = await res.text();

  // biome-ignore lint/suspicious/noImplicitAnyLet: <no>
  let data;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = raw;
  }

  if (!res.ok) {
    console.error("PayPal error:", data);
    throw new Error(
      typeof data === "string" ? data : (data?.message ?? "Error PayPal"),
    );
  }

  return data;
}

export async function handlePaypalSuccess(token: string) {
  const accessToken = await generateAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${token}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const order = await res.json();

  if (order.status === "APPROVED") {
    return await capturePaypalOrder(token);
  }

  if (order.status === "COMPLETED") {
    return order;
  }

  throw new Error(`Orden inválida: ${order.status}`);
}
