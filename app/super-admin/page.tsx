import { getDb } from "@/lib/mongodb";

function formatRs(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString()}`;
}

export default async function DashboardPage() {
  const db = await getDb();
  const orders = db.collection("orders");

  const pendingCount = await orders.countDocuments({ status: "pending" });
  const completeCount = await orders.countDocuments({ status: "complete" });

  const pendingAmountAgg = await orders
    .aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ])
    .toArray();
  const pendingAmount = pendingAmountAgg[0]?.total ?? 0;

  const totalSaleAgg = await orders
    .aggregate([
      { $match: { status: "complete" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ])
    .toArray();
  const totalSale = totalSaleAgg[0]?.total ?? 0;

  const categoryAgg = await orders
    .aggregate([
      { $match: { status: "complete" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.category",
          total: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        },
      },
    ])
    .toArray();

  const categorySales: Record<string, number> = {};
  for (const item of categoryAgg) {
    categorySales[item._id as string] = item.total as number;
  }

  const recentPending = await orders
    .find({ status: "pending" })
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  const cards = [
    {
      label: "Pending Orders",
      value: String(pendingCount),
      sub: formatRs(pendingAmount) + " pending value",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-amber-50 border-amber-100",
      iconBg: "bg-amber-500",
      valueColor: "text-amber-700",
    },
    {
      label: "Completed Orders",
      value: String(completeCount),
      sub: formatRs(totalSale) + " total revenue",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-emerald-50 border-emerald-100",
      iconBg: "bg-emerald-500",
      valueColor: "text-emerald-700",
    },
    {
      label: "Total Revenue",
      value: formatRs(totalSale),
      sub: "From completed orders",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-[#f5ede6] border-[#e8d5c4]",
      iconBg: "bg-[#2c1a0e]",
      valueColor: "text-[#2c1a0e]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-[#2c1a0e] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-white/50">Welcome back — here&apos;s your store overview</p>
          </div>
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/10">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-2xl border p-5 ${card.bg}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">{card.label}</span>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} text-white`}>
                {card.icon}
              </div>
            </div>
            <p className={`text-3xl font-bold ${card.valueColor}`}>{card.value}</p>
            <p className="mt-1 text-xs text-gray-600">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Category Sales */}
        <div className="rounded-2xl bg-white border border-[#e8d5c4] p-5">
          <h2 className="mb-5 text-sm font-bold text-[#2c1a0e] flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-[#2c1a0e] inline-block" />
            Category Sales (Completed)
          </h2>
          <div className="space-y-4">
            {["2 Piece", "3 Piece"].map((cat) => {
              const value = categorySales[cat] ?? 0;
              const max = Math.max(
                categorySales["2 Piece"] ?? 0,
                categorySales["3 Piece"] ?? 0,
                1
              );
              const pct = Math.round((value / max) * 100);
              return (
                <div key={cat}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">{cat}</span>
                    <span className="font-bold text-[#2c1a0e]">{formatRs(value)}</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f5ede6]">
                    <div
                      className="h-full rounded-full bg-[#2c1a0e] transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Pending */}
        <div className="rounded-2xl bg-white border border-[#e8d5c4] p-5">
          <h2 className="mb-5 text-sm font-bold text-[#2c1a0e] flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-amber-500 inline-block" />
            Recent Pending Orders
          </h2>
          {recentPending.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm text-gray-600">No pending orders</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {recentPending.map((order) => (
                <li
                  key={order._id.toString()}
                  className="flex items-center justify-between rounded-xl bg-[#fdf8f5] border border-[#e8d5c4] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#2c1a0e]">{order.customerName}</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {order.items?.length ?? 0} item(s) · {order.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#2c1a0e]">{formatRs(order.totalAmount)}</span>
                    <span className="block text-[10px] font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5 mt-1">Pending</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
