export default function DestinationLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] px-6 py-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-[320px] rounded-[24px] bg-[#D9DDD8]" />
        <div className="mt-10 rounded-[20px] bg-white p-8 shadow-sm">
          <div className="h-8 w-80 rounded bg-[#E6E1DA]" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="h-[380px] rounded-[16px] bg-[#F2EEE8]" />
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="h-[360px] rounded-[16px] bg-[#F2EEE8]" />
              <div className="h-[360px] rounded-[16px] bg-[#F2EEE8]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
