import {
  Activity,
  ArrowUpRight,
  Bell,
  CreditCard,
  DollarSign,
  Eye,
  LayoutDashboard,
  Menu,
  Save,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";

// --- PAGE TYPE ---
type Page = "dashboard" | "customers" | "transactions" | "settings";

// --- MOCK DATA ---
const stats: {
  id: number;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}[] = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    id: 2,
    title: "Active Users",
    value: "+2350",
    change: "+180.1%",
    trend: "up",
    icon: Users,
  },
  {
    id: 3,
    title: "New Sales",
    value: "+12,234",
    change: "+19%",
    trend: "up",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Active Now",
    value: "573",
    change: "-12%",
    trend: "down",
    icon: Activity,
  },
];

const revenueData: { month: string; revenue: number }[] = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
  { month: "Jul", revenue: 7000 },
  { month: "Aug", revenue: 8500 },
  { month: "Sep", revenue: 7500 },
  { month: "Oct", revenue: 9000 },
  { month: "Nov", revenue: 8000 },
  { month: "Dec", revenue: 10500 },
];

const allTransactions: {
  id: string;
  user: string;
  email: string;
  amount: string;
  status: "Completed" | "Processing" | "Failed";
  date: string;
}[] = [
  {
    id: "TRX-001",
    user: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    status: "Completed",
    date: "Today, 2:30 PM",
  },
  {
    id: "TRX-002",
    user: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    status: "Completed",
    date: "Today, 1:15 PM",
  },
  {
    id: "TRX-003",
    user: "Isabella Nguyen",
    email: "isabella.n@email.com",
    amount: "+$299.00",
    status: "Processing",
    date: "Today, 11:00 AM",
  },
  {
    id: "TRX-004",
    user: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    status: "Completed",
    date: "Yesterday, 4:45 PM",
  },
  {
    id: "TRX-005",
    user: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    status: "Failed",
    date: "Yesterday, 2:00 PM",
  },
  {
    id: "TRX-006",
    user: "Ethan Brooks",
    email: "ethan.b@email.com",
    amount: "+$549.00",
    status: "Completed",
    date: "Apr 3, 9:00 AM",
  },
  {
    id: "TRX-007",
    user: "Mia Johnson",
    email: "mia.j@email.com",
    amount: "+$75.00",
    status: "Processing",
    date: "Apr 2, 3:20 PM",
  },
  {
    id: "TRX-008",
    user: "Liam Carter",
    email: "liam.c@email.com",
    amount: "+$199.00",
    status: "Failed",
    date: "Apr 2, 10:45 AM",
  },
  {
    id: "TRX-009",
    user: "Ava Wilson",
    email: "ava.w@email.com",
    amount: "+$2,400.00",
    status: "Completed",
    date: "Apr 1, 5:00 PM",
  },
  {
    id: "TRX-010",
    user: "Noah Harris",
    email: "noah.h@email.com",
    amount: "+$129.00",
    status: "Completed",
    date: "Mar 31, 8:30 AM",
  },
];

const recentTransactions = allTransactions.slice(0, 5);

const mockCustomers: {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  joinDate: string;
  totalSpent: string;
}[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "Active",
    joinDate: "Jan 12, 2024",
    totalSpent: "$4,280.00",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    status: "Active",
    joinDate: "Feb 5, 2024",
    totalSpent: "$1,350.00",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.n@email.com",
    status: "Inactive",
    joinDate: "Mar 18, 2024",
    totalSpent: "$899.00",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    status: "Active",
    joinDate: "Mar 20, 2024",
    totalSpent: "$2,100.00",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    status: "Active",
    joinDate: "Apr 1, 2024",
    totalSpent: "$620.00",
  },
  {
    id: 6,
    name: "Ethan Brooks",
    email: "ethan.b@email.com",
    status: "Active",
    joinDate: "Apr 3, 2024",
    totalSpent: "$3,740.00",
  },
  {
    id: 7,
    name: "Mia Johnson",
    email: "mia.j@email.com",
    status: "Inactive",
    joinDate: "Apr 10, 2024",
    totalSpent: "$250.00",
  },
  {
    id: 8,
    name: "Liam Carter",
    email: "liam.c@email.com",
    status: "Active",
    joinDate: "May 14, 2024",
    totalSpent: "$990.00",
  },
];

// --- COMPONENTS ---

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  activePage,
  onNavigate,
}) => {
  const navItems: { name: string; page: Page; icon: LucideIcon }[] = [
    { name: "Dashboard", page: "dashboard", icon: LayoutDashboard },
    { name: "Customers", page: "customers", icon: Users },
    { name: "Transactions", page: "transactions", icon: CreditCard },
    { name: "Settings", page: "settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close navigation"
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden"
          onClick={toggleSidebar}
          onKeyDown={(e) => e.key === "Escape" && toggleSidebar()}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200
          transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <Activity className="h-6 w-6" />
              <span>DataFlow</span>
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="ml-auto lg:hidden text-slate-500"
              data-ocid="sidebar.close_button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  type="button"
                  key={item.page}
                  data-ocid={`nav.${item.page}.link`}
                  onClick={() => {
                    onNavigate(item.page);
                    toggleSidebar();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-indigo-600" : "text-slate-400"
                    }`}
                  />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Bottom Profile Area */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                JD
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">
                  John Doe
                </span>
                <span className="text-xs text-slate-500">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface SimpleBarChartProps {
  data: { month: string; revenue: number }[];
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="h-64 flex items-end gap-2 sm:gap-4 pt-4">
      {data.map((item, index) => {
        const heightPercentage = (item.revenue / maxRevenue) * 100;
        return (
          <div
            key={item.month}
            className="flex-1 flex flex-col items-center group relative"
            data-ocid={`chart.bar.item.${index + 1}`}
          >
            {/* Tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity whitespace-nowrap z-10">
              ${item.revenue.toLocaleString()}
            </div>

            {/* The Bar */}
            <div className="w-full relative flex justify-center items-end h-full">
              <div
                className="w-full bg-indigo-100 hover:bg-indigo-500 rounded-t-sm transition-all duration-300 ease-out"
                style={{ height: `${heightPercentage}%` }}
              />
            </div>

            {/* X-Axis Label */}
            <span className="text-xs text-slate-500 mt-2 hidden sm:block">
              {item.month}
            </span>
            <span className="text-xs text-slate-500 mt-2 block sm:hidden">
              {item.month.charAt(0)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// --- PAGE COMPONENTS ---

const DashboardPage: React.FC = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    {/* Welcome Message */}
    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        Welcome back, John! 👋
      </h2>
      <p className="text-slate-500 mt-1">
        Here is what&apos;s happening with your projects today.
      </p>
    </div>

    {/* KPI Cards Grid */}
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      data-ocid="stats.card.list"
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          data-ocid={`stats.card.item.${stat.id}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              {stat.title}
            </span>
            <stat.icon className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm">
            {stat.trend === "up" ? (
              <span className="flex items-center text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change}
              </span>
            ) : (
              <span className="flex items-center text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-medium">
                <TrendingDown className="h-3 w-3 mr-1" />
                {stat.change}
              </span>
            )}
            <span className="text-slate-500 text-xs ml-1">from last month</span>
          </div>
        </div>
      ))}
    </div>

    {/* Main Charts & Tables Area */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Revenue Overview
            </h3>
            <p className="text-sm text-slate-500">
              Monthly revenue for the current year
            </p>
          </div>
          <button
            type="button"
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
            data-ocid="revenue.view_report.button"
          >
            View Report <ArrowUpRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <SimpleBarChart data={revenueData} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>
        </div>

        <div className="flex-1 space-y-5">
          {recentTransactions.map((trx, idx) => (
            <div
              key={trx.id}
              className="flex items-center gap-4"
              data-ocid={`activity.item.${idx + 1}`}
            >
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium">
                {trx.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {trx.user}
                </p>
                <p className="text-xs text-slate-500 truncate">{trx.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  {trx.amount}
                </p>
                <p
                  className={`text-xs font-medium mt-0.5 ${
                    trx.status === "Completed"
                      ? "text-emerald-600"
                      : trx.status === "Processing"
                        ? "text-amber-600"
                        : "text-rose-600"
                  }`}
                >
                  {trx.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          data-ocid="activity.view_all.button"
        >
          View All Transactions
        </button>
      </div>
    </div>

    {/* Latest Invoices Table */}
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      data-ocid="invoices.table"
    >
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">
          Latest Invoices
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium">
            <tr>
              <th className="px-6 py-3">Invoice ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {recentTransactions.map((trx, idx) => (
              <tr
                key={trx.id}
                className="hover:bg-slate-50 transition-colors"
                data-ocid={`invoices.row.item.${idx + 1}`}
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {trx.id}
                </td>
                <td className="px-6 py-4 text-slate-600">{trx.user}</td>
                <td className="px-6 py-4 text-slate-500">{trx.date}</td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {trx.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      trx.status === "Completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : trx.status === "Processing"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {trx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const CustomersPage: React.FC = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900">Customers</h2>
      <p className="text-slate-500 mt-1">
        Manage and view all customer accounts.
      </p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        data-ocid="customers.total.card"
      >
        <p className="text-sm font-medium text-slate-500">Total Customers</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">2,350</p>
        <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> +12% this month
        </p>
      </div>
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        data-ocid="customers.active.card"
      >
        <p className="text-sm font-medium text-slate-500">Active</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">1,891</p>
        <p className="text-xs text-slate-500 mt-1">80.5% of total</p>
      </div>
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        data-ocid="customers.inactive.card"
      >
        <p className="text-sm font-medium text-slate-500">Inactive</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">459</p>
        <p className="text-xs text-slate-500 mt-1">19.5% of total</p>
      </div>
    </div>

    {/* Customers Table */}
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      data-ocid="customers.table"
    >
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">All Customers</h3>
        <span className="text-sm text-slate-500">
          {mockCustomers.length} records
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Join Date</th>
              <th className="px-6 py-3">Total Spent</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mockCustomers.map((customer, idx) => (
              <tr
                key={customer.id}
                className="hover:bg-slate-50 transition-colors"
                data-ocid={`customers.row.item.${idx + 1}`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs">
                      {customer.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900">
                      {customer.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{customer.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {customer.joinDate}
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {customer.totalSpent}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                    data-ocid={`customers.view.button.${idx + 1}`}
                  >
                    <Eye className="h-4 w-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

type TxFilter = "All" | "Completed" | "Processing" | "Failed";

const TransactionsPage: React.FC = () => {
  const [filter, setFilter] = useState<TxFilter>("All");

  const filtered =
    filter === "All"
      ? allTransactions
      : allTransactions.filter((t) => t.status === filter);

  const filters: TxFilter[] = ["All", "Completed", "Processing", "Failed"];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
        <p className="text-slate-500 mt-1">
          Full history of all payment transactions.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          data-ocid="transactions.total.card"
        >
          <p className="text-sm font-medium text-slate-500">Total Volume</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">$11,616.00</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +8.2% this month
          </p>
        </div>
        <div
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          data-ocid="transactions.completed.card"
        >
          <p className="text-sm font-medium text-slate-500">Completed</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {allTransactions.filter((t) => t.status === "Completed").length}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            of {allTransactions.length} total
          </p>
        </div>
        <div
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          data-ocid="transactions.failed.card"
        >
          <p className="text-sm font-medium text-slate-500">Failed / Pending</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {allTransactions.filter((t) => t.status !== "Completed").length}
          </p>
          <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
            <TrendingDown className="h-3 w-3" /> Needs attention
          </p>
        </div>
      </div>

      {/* Transactions Table with Filter */}
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        data-ocid="transactions.table"
      >
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            All Transactions
          </h3>
          {/* Filter Tabs */}
          <div
            className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit"
            data-ocid="transactions.filter.tab"
          >
            {filters.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                data-ocid={`transactions.${f.toLowerCase()}.tab`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-medium">
              <tr>
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-slate-400"
                    data-ocid="transactions.empty_state"
                  >
                    No transactions found for this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((trx, idx) => (
                  <tr
                    key={trx.id}
                    className="hover:bg-slate-50 transition-colors"
                    data-ocid={`transactions.row.item.${idx + 1}`}
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {trx.id}
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-medium">
                      {trx.user}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{trx.email}</td>
                    <td className="px-6 py-4 text-slate-500">{trx.date}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {trx.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          trx.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : trx.status === "Processing"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 mt-1">Manage your account preferences.</p>
      </div>

      {/* Profile Section */}
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        data-ocid="settings.profile.card"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
          <p className="text-sm text-slate-500 mt-1">
            Update your personal information.
          </p>
        </div>

        <div className="space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
              JD
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                Profile Photo
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              data-ocid="settings.name.input"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              data-ocid="settings.email.input"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
              data-ocid="settings.save.button"
            >
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        data-ocid="settings.notifications.card"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Notifications
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Choose how you receive updates.
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Notifications Toggle */}
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Email Notifications
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Receive alerts for account activity and transactions.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={emailNotifications}
              onClick={() => setEmailNotifications((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                emailNotifications ? "bg-indigo-600" : "bg-slate-200"
              }`}
              data-ocid="settings.email_notifications.switch"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Weekly Reports Toggle */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Weekly Reports
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Get a weekly summary of your dashboard metrics.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={weeklyReports}
              onClick={() => setWeeklyReports((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                weeklyReports ? "bg-indigo-600" : "bg-slate-200"
              }`}
              data-ocid="settings.weekly_reports.switch"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                  weeklyReports ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PAGE TITLE MAP ---
const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard Overview",
  customers: "Customers",
  transactions: "Transactions",
  settings: "Settings",
};

// --- MAIN APPLICATION ---
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>("dashboard");

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-700"
              data-ocid="header.menu.button"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">
              {pageTitles[activePage]}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                data-ocid="header.search_input"
                className="pl-9 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            {/* Notifications */}
            <button
              type="button"
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
              data-ocid="header.notifications.button"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "customers" && <CustomersPage />}
          {activePage === "transactions" && <TransactionsPage />}
          {activePage === "settings" && <SettingsPage />}

          {/* Footer */}
          <footer className="text-center text-xs text-slate-400 py-6 mt-6">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600 transition-colors"
            >
              caffeine.ai
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
