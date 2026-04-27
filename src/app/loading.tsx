export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#2E2E2E] border-t-[#FF5722] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-technical-data text-[#FF5722] text-sm">LOADING...</p>
      </div>
    </div>
  );
}