import { ButtonPay } from "@/components/button-pay";
import { formatPrice } from "@/utils/price";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-md mt-10 border border-zinc-300 rounded-sm p-4 space-y-2">
        {/** biome-ignore lint/a11y/noLabelWithoutControl: <no form> */}
        <label className="p-1 text-xs bg-zinc-300 rounded-full px-4 inline-block">
          SandBox
        </label>
        <h1 className="text-2xl">Product test 01</h1>
        <h2 className="text-xl font-bold">{formatPrice(20)}</h2>
        <p className=" text-zinc-500 text-sm text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          luctus cursus libero eu mattis. Phasellus rhoncus dui turpis, ac
          varius felis pretium quis. Suspendisse non diam est. Morbi tempor
          tortor.
        </p>

        <ButtonPay price={20} />
      </section>

      <section className="max-w-md mx-auto mt-4 bg-amber-50 border border-zinc-200 rounded-lg p-4">
        <strong className="inline-block">Use these test accounts to pay</strong>
        <p>email: sb-cmybw1985739@personal.example.com</p>
        <p>password: Eydeu*T$8mt9z$U</p>
      </section>
    </>
  );
}
