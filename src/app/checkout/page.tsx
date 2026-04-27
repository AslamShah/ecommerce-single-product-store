"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, Link } from "next/navigation";
import { paymentsApi, ordersApi } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

function CheckoutContent() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<{ stripePublicKey?: string; currency?: string } | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");

  const loadConfig = useCallback(async () => {
    setLoading(true);
    try {
      const configData = await paymentsApi.getConfig();
      setConfig(configData);
      
      if (configData.stripePublicKey) {
        const totalAmount = subtotal + (shippingMethod === "express" ? 25 : 0) + Math.round(subtotal * 0.08 * 100) / 100;
        const { clientSecret } = await paymentsApi.createIntent(
          totalAmount,
          formData.email || "customer@example.com"
        );
        setClientSecret(clientSecret);
      }
    } catch (err) {
      console.warn("Failed to load payment config:", err);
    } finally {
      setLoading(false);
    }
  }, [subtotal, shippingMethod, formData.email]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.street || !formData.city || !formData.state || !formData.zipCode) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }
    
    setError("");
    setCurrentStep(2);
  };

  const handleConfirmOrder = async () => {
    try {
      const shippingCost = shippingMethod === "express" ? 25 : 0;
      const tax = Math.round(subtotal * 0.08 * 100) / 100;
      const total = subtotal + shippingCost + tax;

      const order = await ordersApi.create({
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        items: items.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shippingCost,
        total,
      });

      setOrderNumber(order.orderNumber);
      clearCart();
      setCurrentStep(3);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "Failed to create order");
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-[#FF5722] font-technical-data">LOADING...</div>
      </div>
    );
  }

  if (items.length === 0 && currentStep !== 3) {
    return (
      <div className="pt-20 min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display-xl text-white text-2xl mb-4">YOUR CART IS EMPTY</h1>
          <button onClick={() => router.push('/shop')} className="text-[#FF5722] hover:underline">
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  const shipping = shippingMethod === "express" ? 25 : 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  return (
    <div className="pt-20">
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <div className="flex justify-between max-w-2xl lg:max-w-3xl mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2E2E2E] -z-10" />
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center gap-2 lg:gap-3">
                <div
                  className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center font-bold text-xs lg:text-sm ${
                    currentStep >= step
                      ? "bg-[#FF5722] border border-[#FF5722] text-[#0F0F0F]"
                      : "bg-[#1A1A1A] border border-[#2E2E2E] text-white/40"
                  }`}
                >
                  {currentStep > step ? "✓" : step}
                </div>
                <span className={`font-label-caps text-[10px] lg:text-xs ${
                  currentStep >= step ? "text-[#FF5722]" : "text-white/40"
                }`}>
                  {step === 1 ? "SHIPPING" : step === 2 ? "PAYMENT" : "CONFIRM"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-10 lg:space-y-12">
            {error && (
              <div className="bg-red-500/10 border border-red-500 p-4 text-red-500 font-technical-data text-sm">
                {error}
              </div>
            )}

            {currentStep === 1 && (
              <form onSubmit={handleSubmitShipping} className="space-y-8 lg:space-y-10">
                <div>
                  <h1 className="font-headline-lg mb-4 text-white text-xl lg:text-headline-lg">
                    SECURE CHECKOUT
                  </h1>
                  <p className="font-body-md text-zinc-400 text-sm lg:text-body-md">
                    ENTER YOUR DISPATCH DETAILS BELOW.
                  </p>
                </div>

                <div className="space-y-5 lg:space-y-6">
                  <h2 className="font-label-caps text-[#FF5722] border-b border-[#2E2E2E] pb-2 text-xs">
                    01. RECIPIENT INFORMATION
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <label className="font-label-caps text-[10px] text-zinc-500 block">
                        FIRST NAME *
                      </label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-3 lg:p-4 text-white font-technical-data focus:border-[#FF5722] focus:ring-0 outline-none transition-all text-sm"
                        placeholder="FIRST NAME"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-caps text-[10px] text-zinc-500 block">
                        LAST NAME *
                      </label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-3 lg:p-4 text-white font-technical-data focus:border-[#FF5722] focus:ring-0 outline-none transition-all text-sm"
                        placeholder="LAST NAME"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <label className="font-label-caps text-[10px] text-zinc-500 block">
                        EMAIL *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-3 lg:p-4 text-white font-technical-data focus:border-[#FF5722] focus:ring-0 outline-none transition-all text-sm"
                        placeholder="EMAIL@EXAMPLE.COM"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-caps text-[10px] text-zinc-500 block">
                        PHONE
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-3 lg:p-4 text-white font-technical-data focus:border-[#FF5722] focus:ring-0 outline-none transition-all text-sm"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-5 lg:space-y-6">
                  <h2 className="font-label-caps text-[#FF5722] border-b border-[#2E2E2E] pb-2 text-xs">
                    02. DISPATCH ADDRESS
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="font-label-caps text-[10px] text-zinc-500 block">
                        STREET ADDRESS *
                      </label>
                      <input
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-3 lg:p-4 text-white font-technical-data focus:border-[#FF5722] focus:ring-0 outline-none transition-all text-sm"
                        placeholder="STREET ADDRESS"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      <div className="col-span-1 space-y-2">
                        <label className="font-label-caps text-[10px] text-zinc-500 block">
                          CITY *
                        </label>
                        <input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-3 lg:p-4 text-white font-technical-data focus:border-[#FF5722] focus:ring-0 outline-none transition-all text-sm"
                          placeholder="CITY"
                          required
                        />
                      </div>
                      <div className="col-span-1 space-y-2">
                        <label className="font-label-caps text-[10px] text-zinc-500 block">
                          STATE *
                        </label>
                        <input
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-3 lg:p-4 text-white font-technical-data focus:border-[#FF5722] focus:ring-0 outline-none transition-all text-sm"
                          placeholder="STATE"
                          required
                        />
                      </div>
                      <div className="col-span-2 lg:col-span-1 space-y-2">
                        <label className="font-label-caps text-[10px] text-zinc-500 block">
                          ZIP CODE *
                        </label>
                        <input
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full bg-[#1A1A1A] border border-[#2E2E2E] p-3 lg:p-4 text-white font-technical-data focus:border-[#FF5722] focus:ring-0 outline-none transition-all text-sm"
                          placeholder="00000"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 lg:space-y-6">
                  <h2 className="font-label-caps text-[#FF5722] border-b border-[#2E2E2E] pb-2 text-xs">
                    03. LOGISTICS METHOD
                  </h2>
                  <div className="grid grid-cols-1 gap-3 lg:gap-4">
                    {[
                      { id: "standard", label: "STANDARD EXPEDITED", time: "3-5 BUSINESS DAYS", price: "FREE" },
                      { id: "express", label: "NEXT-DAY PRECISION", time: "GUARANTEED BY 10AM", price: "$25.00" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 lg:p-6 bg-[#1A1A1A] border cursor-pointer transition-all ${
                          shippingMethod === method.id
                            ? "border-[#FF5722]"
                            : "border-[#2E2E2E] hover:border-[#FF5722]"
                        }`}
                      >
                        <div className="flex items-center gap-3 lg:gap-4">
                          <input
                            checked={shippingMethod === method.id}
                            onChange={() => setShippingMethod(method.id)}
                            className="text-[#FF5722] focus:ring-0 bg-transparent border-[#2E2E2E]"
                            name="shipping"
                            type="radio"
                          />
                          <div>
                            <div className="font-bold text-white text-sm">{method.label}</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                              {method.time}
                            </div>
                          </div>
                        </div>
                        <div className="font-technical-data text-white text-sm">{method.price}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 lg:py-6 bg-[#FF5722] text-[#0F0F0F] font-label-caps text-xs lg:text-sm tracking-[0.2em] hover:bg-[#FF7043] transition-all"
                >
                  CONTINUE TO PAYMENT
                </button>
              </form>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h1 className="font-headline-lg mb-4 text-white text-xl lg:text-headline-lg">
                    PAYMENT SECURE
                  </h1>
                  <p className="font-body-md text-zinc-400 text-sm">
                    SECURE PAYMENT VIA STRIPE (CARDS & PAYPAL)
                  </p>
                </div>

                <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6">
                  {clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <PaymentForm onSuccess={handleConfirmOrder} />
                    </Elements>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-zinc-500 font-technical-data mb-4">
                        {!config?.stripePublicKey 
                          ? "Stripe is not configured. Please contact admin."
                          : "Loading payment form..."}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-zinc-500 hover:text-white font-label-caps text-xs"
                >
                  ← BACK TO SHIPPING
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="font-display-xl text-white text-3xl mb-4">
                  ORDER CONFIRMED
                </h1>
                <p className="font-body-md text-zinc-400 mb-8">
                  Thank you for your order.
                </p>
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 max-w-md mx-auto">
                  <p className="font-label-caps text-zinc-500 text-xs mb-2">ORDER NUMBER</p>
                  <p className="font-display-xl text-[#FF5722] text-2xl">{orderNumber}</p>
                </div>
                <Link
                  href="/"
                  className="inline-block mt-8 bg-[#FF5722] text-black px-8 py-4 font-label-caps text-sm tracking-wider"
                >
                  RETURN TO HOME
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 lg:p-10 sticky top-32">
              <h2 className="font-label-caps text-white mb-6 lg:mb-8 border-b border-[#2E2E2E] pb-4 text-xs">
                ORDER SPECIFICATIONS
              </h2>

              <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-10">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-4 lg:gap-6">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#0F0F0F] border border-[#2E2E2E] flex-shrink-0 p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale brightness-75"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-white text-xs uppercase tracking-wider">
                          {item.name}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] text-zinc-500 font-label-caps">
                          QTY: {item.quantity.toString().padStart(2, '0')}
                        </span>
                        <span className="font-technical-data text-white text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 lg:space-y-4 pt-6 lg:pt-8 border-t border-[#2E2E2E]">
                <div className="flex justify-between">
                  <span className="text-[10px] text-zinc-500 font-label-caps">SUBTOTAL</span>
                  <span className="font-technical-data text-white text-sm">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-zinc-500 font-label-caps">LOGISTICS</span>
                  <span className="font-technical-data text-white text-sm">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-zinc-500 font-label-caps">TAX (EST.)</span>
                  <span className="font-technical-data text-white text-sm">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#2E2E2E]">
                  <span className="font-label-caps text-white text-sm">TOTAL AMOUNT</span>
                  <span className="text-lg lg:text-xl font-bold text-[#FF5722]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-8 lg:mt-12 p-4 lg:p-6 bg-[#0F0F0F] border border-[#2E2E2E] flex items-center gap-3 lg:gap-4">
                <svg className="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div className="text-[10px] text-zinc-500 font-label-caps leading-relaxed">
                  ENCRYPTED VIA 256-BIT SSL PROTOCOL. ACCEPTS VISA, MASTERCARD, AMEX & PAYPAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (!error) {
      onSuccess();
    } else {
      console.error("Payment error:", error.message);
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full mt-6 py-4 bg-[#FF5722] text-black font-label-caps text-sm tracking-wider hover:bg-[#FF7043] disabled:opacity-50"
      >
        {processing ? "PROCESSING..." : "PAY NOW"}
      </button>
      <div className="mt-4 flex items-center justify-center gap-4">
        <span className="text-zinc-500 text-xs">Powered by</span>
        <span className="font-bold text-white">Stripe</span>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  return <CheckoutContent />;
}