import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-6">
      <h1 className="font-display-xl text-[#FF5722] text-6xl lg:text-8xl mb-4">404</h1>
      <h2 className="font-headline-lg text-white text-2xl lg:text-3xl mb-4">
        PAGE NOT FOUND
      </h2>
      <p className="font-body-md text-zinc-400 text-center max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/"
          className="bg-[#FF5722] text-black px-6 py-3 font-label-caps text-sm tracking-wider hover:bg-[#ff6a3d] transition-all"
        >
          GO HOME
        </Link>
        <Link 
          href="/shop"
          className="border border-[#2E2E2E] text-white px-6 py-3 font-label-caps text-sm tracking-wider hover:border-[#FF5722] hover:text-[#FF5722] transition-all"
        >
          SHOP
        </Link>
      </div>
    </div>
  );
}