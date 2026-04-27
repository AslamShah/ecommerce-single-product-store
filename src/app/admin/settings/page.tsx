"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi, settingsApi } from "@/lib/api";
import Link from "next/link";

interface Settings {
  storeName?: string;
  storeEmail?: string;
  stripePublicKey?: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  currency?: string;
  shippingCost?: number;
  freeShippingThreshold?: number;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<Settings>({});

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await settingsApi.get();
      setSettings(data);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    loadSettings();
  }, [router, loadSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await settingsApi.update(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    router.push("/admin/login");
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
      <header className="bg-[#1A1A1A] border-b border-[#2E2E2E] px-6 py-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <h1 className="font-display-xl text-white text-xl">APEX ADMIN</h1>
            <p className="font-label-caps text-zinc-500 text-xs">SETTINGS</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="font-technical-data text-zinc-500 text-sm hover:text-white">
              DASHBOARD
            </Link>
            <Link href="/admin/products" className="font-technical-data text-zinc-500 text-sm hover:text-white">
              PRODUCTS
            </Link>
            <button onClick={handleLogout} className="font-label-caps text-xs text-[#FF5722] hover:text-white">
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="font-headline-lg text-white text-2xl mb-8">PAYMENT SETTINGS</h2>
        
        {saved && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 mb-6 font-technical-data text-sm">
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6">
            <h3 className="font-label-caps text-[#FF5722] text-xs mb-6 border-b border-[#2E2E2E] pb-2">
              STRIPE CONFIGURATION
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">
                  STRIPE PUBLISHABLE KEY
                </label>
                <input
                  type="text"
                  value={settings.stripePublicKey || ""}
                  onChange={(e) => setSettings({ ...settings, stripePublicKey: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                  placeholder="pk_test_..."
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  Public key starts with pk_test_ or pk_live_
                </p>
              </div>

              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">
                  STRIPE SECRET KEY
                </label>
                <input
                  type="password"
                  value={settings.stripeSecretKey || ""}
                  onChange={(e) => setSettings({ ...settings, stripeSecretKey: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                  placeholder="sk_test_..."
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  Secret key starts with sk_test_ or sk_live_
                </p>
              </div>

              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">
                  STRIPE WEBHOOK SECRET (OPTIONAL)
                </label>
                <input
                  type="password"
                  value={settings.stripeWebhookSecret || ""}
                  onChange={(e) => setSettings({ ...settings, stripeWebhookSecret: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                  placeholder="whsec_..."
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  Required for receiving payment events
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6">
            <h3 className="font-label-caps text-[#FF5722] text-xs mb-6 border-b border-[#2E2E2E] pb-2">
              STORE SETTINGS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">
                  STORE NAME
                </label>
                <input
                  type="text"
                  value={settings.storeName || ""}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                  placeholder="APEX PRECISION"
                />
              </div>

              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">
                  STORE EMAIL
                </label>
                <input
                  type="email"
                  value={settings.storeEmail || ""}
                  onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                  placeholder="store@example.com"
                />
              </div>

              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">
                  CURRENCY
                </label>
                <select
                  value={settings.currency || "usd"}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                >
                  <option value="usd">USD - US Dollar</option>
                  <option value="eur">EUR - Euro</option>
                  <option value="gbp">GBP - British Pound</option>
                  <option value="cad">CAD - Canadian Dollar</option>
                  <option value="aud">AUD - Australian Dollar</option>
                </select>
              </div>

              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">
                  FREE SHIPPING THRESHOLD ($)
                </label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold || 100}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0F0F0F] border border-[#2E2E2E] p-4">
            <h4 className="font-label-caps text-zinc-500 text-xs mb-2">PAYMENT METHODS SUPPORTED</h4>
            <div className="flex gap-4 text-white text-sm font-technical-data">
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Visa
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Mastercard
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span> American Express
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span> PayPal
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">
              PayPal will appear automatically when Stripe account has PayPal enabled in Stripe Dashboard
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#FF5722] text-black py-4 font-label-caps text-sm tracking-wider hover:bg-[#FF7043] disabled:opacity-50"
          >
            {saving ? "SAVING..." : "SAVE SETTINGS"}
          </button>
        </form>
      </div>
    </div>
  );
}