"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi, ordersApi, settingsApi } from "@/lib/api";
import Link from "next/link";

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

interface Order {
  _id: string;
  status: string;
  total: number;
  createdAt?: string;
  orderNumber?: string;
  customerName?: string;
  customerEmail?: string;
  items?: Array<{ name: string; quantity: number; price: number }>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({ totalOrders: 0, pendingOrders: 0, totalRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "settings">("orders");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const orders = await ordersApi.getAll();
      const pending = orders.filter((o: Order) => o.status === "pending");
      const revenue = orders.reduce((sum: number, o: Order) => sum + (o.status === "paid" ? o.total : 0), 0);

      setStats({
        totalOrders: orders.length,
        pendingOrders: pending.length,
        totalRevenue: revenue,
      });
      setRecentOrders(orders.slice(0, 10));
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    loadDashboard();
  }, [router, loadDashboard]);

  const handleLogout = () => {
    authApi.logout();
    router.push("/admin/login");
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await ordersApi.updateStatus(orderId, status);
      loadDashboard();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-[#FF5722] font-technical-data">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <header className="bg-[#1A1A1A] border-b border-[#2E2E2E] px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="font-display-xl text-white text-xl">APEX ADMIN</h1>
            <p className="font-label-caps text-zinc-500 text-xs">DASHBOARD</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-technical-data text-zinc-500 text-sm hover:text-white">
              VIEW STORE
            </Link>
            <button
              onClick={handleLogout}
              className="font-label-caps text-xs text-[#FF5722] hover:text-white transition-colors"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6">
            <p className="font-label-caps text-zinc-500 text-xs mb-2">TOTAL ORDERS</p>
            <p className="font-display-xl text-white text-3xl">{stats.totalOrders}</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6">
            <p className="font-label-caps text-zinc-500 text-xs mb-2">PENDING</p>
            <p className="font-display-xl text-yellow-500 text-3xl">{stats.pendingOrders}</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6">
            <p className="font-label-caps text-zinc-500 text-xs mb-2">REVENUE</p>
            <p className="font-display-xl text-[#FF5722] text-3xl">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[#1A1A1A] p-1">
          {(["orders", "products", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-label-caps text-xs tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-[#FF5722] text-black"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0F0F0F]">
                <tr>
                  <th className="font-label-caps text-zinc-500 text-xs text-left p-4">ORDER</th>
                  <th className="font-label-caps text-zinc-500 text-xs text-left p-4">CUSTOMER</th>
                  <th className="font-label-caps text-zinc-500 text-xs text-left p-4">TOTAL</th>
                  <th className="font-label-caps text-zinc-500 text-xs text-left p-4">STATUS</th>
                  <th className="font-label-caps text-zinc-500 text-xs text-left p-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-500 font-technical-data">
                      NO ORDERS YET
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order: Order) => (
                    <tr key={order._id} className="border-t border-[#2E2E2E]">
                      <td className="p-4 font-technical-data text-white text-sm">
                        {order.orderNumber}
                      </td>
                      <td className="p-4">
                        <p className="font-technical-data text-white text-sm">{order.customerName}</p>
                        <p className="font-technical-data text-zinc-500 text-xs">{order.customerEmail}</p>
                      </td>
                      <td className="p-4 font-technical-data text-white text-sm">
                        ${order.total?.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-label-caps text-xs px-3 py-1 ${
                            order.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : order.status === "paid"
                              ? "bg-green-500/20 text-green-500"
                              : order.status === "shipped"
                              ? "bg-blue-500/20 text-blue-500"
                              : "bg-zinc-500/20 text-zinc-500"
                          }`}
                        >
                          {order.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="bg-[#0F0F0F] border border-[#2E2E2E] text-white text-xs p-2 font-technical-data"
                        >
                          <option value="pending">PENDING</option>
                          <option value="paid">PAID</option>
                          <option value="processing">PROCESSING</option>
                          <option value="shipped">SHIPPED</option>
                          <option value="delivered">DELIVERED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-8 text-center">
            <p className="font-technical-data text-zinc-500 mb-4">
              Product management available in full version
            </p>
            <Link
              href="/admin/products"
              className="inline-block bg-[#FF5722] text-black px-6 py-3 font-label-caps text-xs tracking-wider"
            >
              MANAGE PRODUCTS
            </Link>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <SettingsTab />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2E2E2E] px-6 py-4 mt-8">
        <p className="text-center font-label-caps text-zinc-600 text-xs">
          © {new Date().getFullYear()} APEX STORE ADMIN
        </p>
      </footer>
    </div>
  );
}

function SettingsTab() {
  const [stripePublicKey, setStripePublicKey] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await settingsApi.get();
      setStripePublicKey(data.stripePublicKey || "");
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await settingsApi.update({
        stripePublicKey,
        stripeSecretKey,
      });
      setMessage("Settings saved successfully");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setMessage(err.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8 text-zinc-500">Loading...</div>;
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6">
      <h3 className="font-label-caps text-white text-xs mb-6">PAYMENT SETTINGS</h3>

      {message && (
        <div
          className={`p-4 mb-6 ${
            message.includes("success")
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="font-label-caps text-zinc-500 text-xs block mb-2">
            STRIPE PUBLIC KEY
          </label>
          <input
            type="text"
            value={stripePublicKey}
            onChange={(e) => setStripePublicKey(e.target.value)}
            className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
            placeholder="pk_test_..."
          />
        </div>

        <div>
          <label className="font-label-caps text-zinc-500 text-xs block mb-2">
            STRIPE SECRET KEY
          </label>
          <input
            type="password"
            value={stripeSecretKey}
            onChange={(e) => setStripeSecretKey(e.target.value)}
            className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
            placeholder="sk_test_..."
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-[#FF5722] text-black py-3 font-label-caps text-xs tracking-wider hover:bg-[#ff6a3d] disabled:opacity-50"
        >
          {saving ? "SAVING..." : "SAVE SETTINGS"}
        </button>
      </div>
    </div>
  );
}