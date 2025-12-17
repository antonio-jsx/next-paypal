export default async function Cancel(_: PageProps<"/payment/cancel">) {
  return (
    <div className="mx-auto max-w-xl py-10 text-center">
      <h1 className="text-3xl font-bold">
        There was an error while trying to process the payment.
      </h1>
      <p>Your purchase was cancelled</p>
    </div>
  );
}
