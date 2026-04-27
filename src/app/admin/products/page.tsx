"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi, productsApi } from "@/lib/api";
import { type Product } from "@/lib/types";
import Link from "next/link";

const API_BASE = '/api/proxy';

async function uploadImage(file: File, token: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE}?path=files/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Upload error:', response.status, errorText);
    throw new Error(`Upload failed: ${response.status}`);
  }
  const data = await response.json();
  return data.path;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    category: "",
    sku: "",
    isActive: true,
    images: [""],
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    loadProducts();
  }, [router, loadProducts]);

  const handleLogout = () => {
    authApi.logout();
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productsApi.update(editingProduct._id, formData);
      } else {
        await productsApi.create(formData);
      }
      setShowModal(false);
      setEditingProduct(null);
      loadProducts();
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error("Failed to save product:", err?.message || error);
      if (err?.message?.includes('401')) {
        alert('Session expired. Please login again.');
        authApi.logout();
        router.push("/admin/login");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productsApi.delete(id);
      loadProducts();
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error("Failed to delete product:", err?.message || error);
      if (err?.message?.includes('401')) {
        alert('Session expired. Please login again.');
        authApi.logout();
        router.push("/admin/login");
      }
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: product.price,
      category: product.category || "",
      sku: product.sku || "",
      isActive: product.isActive,
      images: product.images || [""],
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      price: 0,
      category: "",
      sku: "",
      isActive: true,
      images: [""],
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('Not authenticated');
      
      const imageUrl = await uploadImage(file, token);
      setFormData(prev => ({
        ...prev,
        images: [imageUrl, ...prev.images.filter(img => img)],
      }));
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="font-display-xl text-white text-xl">APEX ADMIN</h1>
            <p className="font-label-caps text-zinc-500 text-xs">PRODUCTS</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="font-technical-data text-zinc-500 text-sm hover:text-white">
              DASHBOARD
            </Link>
            <button onClick={handleLogout} className="font-label-caps text-xs text-[#FF5722] hover:text-white">
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline-lg text-white text-2xl">PRODUCT MANAGEMENT</h2>
          <button
            onClick={openAddModal}
            className="bg-[#FF5722] text-black px-6 py-3 font-label-caps text-xs tracking-wider hover:bg-[#ff6a3d]"
          >
            + ADD PRODUCT
          </button>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2E2E2E] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0F0F0F]">
              <tr>
                <th className="font-label-caps text-zinc-500 text-xs text-left p-4">IMAGE</th>
                <th className="font-label-caps text-zinc-500 text-xs text-left p-4">PRODUCT</th>
                <th className="font-label-caps text-zinc-500 text-xs text-left p-4">SKU</th>
                <th className="font-label-caps text-zinc-500 text-xs text-left p-4">PRICE</th>
                <th className="font-label-caps text-zinc-500 text-xs text-left p-4">STATUS</th>
                <th className="font-label-caps text-zinc-500 text-xs text-left p-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500 font-technical-data">
                    NO PRODUCTS FOUND
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-t border-[#2E2E2E]">
                    <td className="p-4">
                      <div className="w-16 h-16 bg-[#0F0F0F] border border-[#2E2E2E]">
                        {product.images?.[0] && (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-technical-data text-white text-sm">{product.name}</p>
                      <p className="font-technical-data text-zinc-500 text-xs">{product.slug}</p>
                    </td>
                    <td className="p-4 font-technical-data text-white text-sm">{product.sku}</td>
                    <td className="p-4 font-technical-data text-white text-sm">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`font-label-caps text-xs px-3 py-1 ${
                          product.isActive ? "bg-green-500/20 text-green-500" : "bg-zinc-500/20 text-zinc-500"
                        }`}
                      >
                        {product.isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-[#FF5722] hover:text-white font-label-caps text-xs"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:text-white font-label-caps text-xs"
                        >
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline-lg text-white text-xl mb-6">
              {editingProduct ? "EDIT PRODUCT" : "ADD PRODUCT"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                  required
                />
              </div>
              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">SLUG</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                  required
                />
              </div>
              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">DESCRIPTION</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-zinc-500 text-xs block mb-2">PRICE</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="font-label-caps text-zinc-500 text-xs block mb-2">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">CATEGORY</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2E2E2E] p-3 text-white font-technical-data text-sm"
                />
              </div>
              <div>
                <label className="font-label-caps text-zinc-500 text-xs block mb-2">IMAGES</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full bg-[#2E2E2E] text-white p-3 font-technical-data text-sm hover:bg-[#3E3E3E] mb-2"
                >
                  {uploading ? "UPLOADING..." : "+ UPLOAD IMAGE"}
                </button>
                {formData.images?.filter(img => img).map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-2">
                    <img src={img} alt="" className="w-12 h-12 object-cover border border-[#2E2E2E]" />
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[idx] = e.target.value;
                        setFormData({ ...formData, images: newImages });
                      }}
                      className="flex-1 bg-[#0F0F0F] border border-[#2E2E2E] p-2 text-white font-technical-data text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="text-red-500 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="bg-[#0F0F0F] border border-[#2E2E2E]"
                />
                <label htmlFor="isActive" className="font-label-caps text-white text-xs">ACTIVE</label>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-[#2E2E2E] text-white py-3 font-label-caps text-xs tracking-wider hover:bg-[#2E2E2E]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#FF5722] text-black py-3 font-label-caps text-xs tracking-wider hover:bg-[#ff6a3d]"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}