import DummyBtnsWrapper from "@/components/dummy-btns-wrapper";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="font-bold text-6xl">Dynamic input</h1>
      <h4 className="font-bold text-2xl">
        Navigate between tags with keyboard arrows.
      </h4>
      <h4 className="font-bold text-2xl">
        Remove tags either by &apos;Backspace&apos; or pressing &apos;x&apos; on
        tag.
      </h4>
      <main className="flex flex-col justify-center items-center w-1/2 min-w-[360px]">
        <DummyBtnsWrapper />
      </main>
    </div>
  );
}
