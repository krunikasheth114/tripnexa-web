export default function BookingLoading() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] px-6 py-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-10 w-48 rounded bg-[#E3D7C9]" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="h-52 rounded-[24px] bg-white" />
            <div className="h-[540px] rounded-[24px] bg-white" />
          </div>
          <div className="h-[540px] rounded-[24px] bg-white" />
        </div>
      </div>
    </main>
  );
}
