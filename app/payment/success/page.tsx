import { handlePaypalSuccess } from "@/app/data";
import { Confetti } from "@/components/confetti";

export default async function Success({
  searchParams,
}: PageProps<"/payment/success">) {
  const { token } = await searchParams;
  await handlePaypalSuccess(token as string);

  return (
    <div className="mx-auto max-w-xl py-10 text-center">
      <Confetti />
      <h1 className="text-3xl font-bold">Thank you for your purchase</h1>
    </div>
  );
}
