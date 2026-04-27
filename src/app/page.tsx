import Link from "next/link";
import { heroImages, testimonials, techSpecs } from "@/lib/products";
import { SpecBar } from "@/components/SpecBar";

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages.hero}
            alt="Professional Hair Clipper"
            className="w-full h-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-20">
          <div className="max-w-3xl">
            <span className="font-label-caps text-[#FF5722] tracking-[0.3em] block mb-4 lg:mb-6 text-xs">
              SERIES 01 // PRECISION ENGINEERED
            </span>
            <h1 className="font-display-xl text-white mb-6 lg:mb-8 text-4xl sm:text-5xl lg:text-7xl leading-[1.1]">
              THE ARCHITECT OF PERFORMANCE.
            </h1>
            <p className="font-body-lg text-secondary mb-8 lg:mb-12 max-w-xl text-base lg:text-lg">
              Military-grade internals meet aerospace aesthetics. Built for the modern barber who demands zero-gap precision and surgical reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Link href="/shop">
                <button className="btn-primary w-full sm:w-auto">ACQUIRE NOW</button>
              </Link>
              <Link href="/#specs">
                <button className="btn-secondary w-full sm:w-auto">VIEW SPECIFICATIONS</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 lg:bottom-12 left-6 lg:left-12 flex flex-col items-center gap-4 opacity-50">
          <div className="w-[1px] h-12 lg:h-20 bg-gradient-to-b from-[#FF5722] to-transparent" />
          <span className="font-label-caps text-[10px] tracking-widest uppercase hidden lg:block">
            SCROLL TO EXPLORE
          </span>
        </div>
      </section>

      {/* Technical Engineering Section */}
      <section id="specs" className="py-24 lg:py-section-gap bg-[#0F0F0F] border-b border-[#2E2E2E]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24">
            <div className="lg:col-span-5">
              <span className="font-label-caps text-[#FF5722] block mb-4 text-xs">
                SPECIFICATION // 001
              </span>
              <h2 className="font-headline-lg text-white mb-6 lg:mb-8 text-2xl lg:text-4xl leading-tight">
                RE-ENGINEERED FROM THE CORE.
              </h2>
              <p className="font-body-md text-secondary/70 mb-10 lg:mb-12 text-sm lg:text-base leading-relaxed">
                Every component in the Apex Series 01 is stress-tested to exceed industrial standards. Our custom digital motor delivers constant torque, regardless of battery level.
              </p>
              <div className="space-y-4 lg:space-y-6">
                <SpecBar label="TORQUE OUTPUT" value="9,200 RPM" percentage={92} />
                <SpecBar label="BLADE TEMPERATURE" value="-15% VS STANDARD" percentage={35} />
                <SpecBar label="BATTERY EFFICIENCY" value="98% RETENTION" percentage={98} />
              </div>
            </div>
            <div className="lg:col-span-7 relative h-[350px] sm:h-[450px] lg:h-[600px]">
              <img
                src={heroImages.internal}
                alt="Technical Internal View"
                className="w-full h-full object-cover technical-border grayscale"
              />
              <div className="absolute top-1/4 right-1/4 crosshair">
                <div className="bg-[#FF5722] w-2 h-2 rounded-full mb-2" />
                <span className="font-technical-data text-[10px] text-white uppercase bg-black/80 px-2 py-1">
                  TITANIUM DLC BLADE
                </span>
              </div>
              <div className="absolute bottom-1/3 left-1/4 crosshair">
                <div className="bg-[#FF5722] w-2 h-2 rounded-full mb-2" />
                <span className="font-technical-data text-[10px] text-white uppercase bg-black/80 px-2 py-1">
                  ULTRA-QUIET DIGITAL MOTOR
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section id="features" className="py-24 lg:py-section-gap bg-[#131313]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="font-display-xl text-2xl lg:text-5xl mb-12 lg:mb-20 text-center">
            ELITE COMPONENTRY
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-[700px] lg:min-h-[800px]">
            {/* Carbon Fiber - Large */}
            <div className="lg:col-span-8 technical-border bg-[#1A1A1A] relative overflow-hidden group min-h-[350px] lg:min-h-0">
              <img
                src={heroImages.carbonFiber}
                alt="Carbon Fiber Textures"
                className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
              <div className="absolute bottom-8 lg:bottom-12 left-8 lg:left-12">
                <span className="font-label-caps text-[#FF5722] block mb-3 text-xs">MATERIALS</span>
                <h3 className="font-headline-md text-white mb-3 text-xl lg:text-2xl">
                  CARBON FIBER HOUSING
                </h3>
                <p className="font-technical-data text-secondary max-w-sm text-sm">
                  Reduces weight by 40% while increasing structural rigidity for long-shift comfort.
                </p>
              </div>
            </div>
            
            {/* Runtime - Accent */}
            <div className="lg:col-span-4 technical-border bg-[#FF5722] flex flex-col justify-end p-8 lg:p-12 min-h-[250px] lg:min-h-0">
              <span className="material-symbols-filled text-black text-5xl lg:text-7xl mb-6 lg:mb-8">
                bolt
              </span>
              <h3 className="font-headline-md text-black mb-3 text-xl lg:text-2xl">
                300 MIN RUNTIME
              </h3>
              <p className="font-technical-data text-black/80 text-sm">
                Lithium-Ion energy density optimized for zero-power-drop performance.
              </p>
            </div>
            
            {/* Ergonomics */}
            <div className="lg:col-span-4 technical-border bg-[#1A1A1A] p-8 lg:p-12 flex flex-col justify-between min-h-[250px] lg:min-h-0">
              <div>
                <span className="font-label-caps text-[#FF5722] block mb-3 text-xs">ERGONOMICS</span>
                <h3 className="font-headline-md text-white text-xl lg:text-2xl">CONTOURED GRIP</h3>
              </div>
              <p className="font-technical-data text-secondary text-sm">
                Anti-slip texturing inspired by high-performance steering wheels.
              </p>
            </div>
            
            {/* Acoustics - Large */}
            <div className="lg:col-span-8 technical-border bg-[#1A1A1A] relative flex items-center justify-center min-h-[300px] lg:min-h-0">
              <div className="text-center z-10 px-8">
                <span className="font-label-caps text-[#FF5722] mb-4 block text-xs">ACOUSTICS</span>
                <h3 className="font-display-xl text-4xl lg:text-6xl text-white mb-4">
                  55dB SILENCE
                </h3>
                <p className="font-body-md text-secondary text-sm lg:text-base">
                  Precision-tuned motor frequencies for a focused shop environment.
                </p>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF5722]/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-section-gap bg-[#0F0F0F]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 lg:mb-20 gap-6">
            <div>
              <span className="font-label-caps text-[#FF5722] mb-4 block text-xs">FIELD TESTED</span>
              <h2 className="font-headline-lg text-white text-2xl lg:text-4xl">
                VOICES OF THE CRAFT.
              </h2>
            </div>
            <div className="flex gap-3">
              <button className="w-12 h-12 border border-[#2E2E2E] flex items-center justify-center text-white hover:border-[#FF5722] hover:text-[#FF5722] transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 border border-[#2E2E2E] flex items-center justify-center text-white hover:border-[#FF5722] hover:text-[#FF5722] transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="lg:col-span-4 technical-border bg-[#1A1A1A] p-8 lg:p-12 group hover:bg-[#1f1f1f] transition-colors">
                <div className="flex gap-1 mb-6 lg:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#FF5722]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="font-body-lg text-white italic mb-8 text-base lg:text-lg leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center text-[#FF5722] font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-label-caps block text-white text-xs">{testimonial.author}</span>
                    <span className="font-technical-data text-[#FF5722] text-[10px]">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Now Section (CTA) */}
      <section id="purchase" className="py-24 lg:py-section-gap bg-[#1A1A1A] border-t border-[#2E2E2E]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="font-label-caps text-[#FF5722] mb-4 block text-xs">LIMITED EDITION</span>
              <h2 className="font-display-xl text-white mb-6 text-3xl lg:text-6xl leading-[1.1]">
                OWN THE PRECISION.
              </h2>
              <p className="font-body-lg text-secondary mb-10 text-base lg:text-lg">
                The Apex Series 01 includes the Professional Charging Dock, 8 Magnetic Guards, and the Precision Blade Kit.
              </p>
              <div className="flex items-end gap-6 mb-10 flex-wrap">
                <span className="font-display-xl text-[#FF5722] text-4xl lg:text-6xl">$299</span>
                <span className="font-label-caps text-secondary line-through mb-2 text-lg">$349</span>
              </div>
              <div className="space-y-4">
                <Link href="/shop" className="block">
                  <button className="w-full bg-[#FF5722] text-black py-5 font-label-caps text-sm hover:bg-[#ff6a3d] transition-all tracking-wider">
                    ADD TO ARSENAL
                  </button>
                </Link>
                <div className="flex flex-col sm:flex-row justify-between font-label-caps text-[10px] text-secondary gap-2">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    IN STOCK // READY TO SHIP
                  </span>
                  <span>FREE GLOBAL EXPRESS DELIVERY</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="aspect-square technical-border bg-[#0F0F0F] p-12 lg:p-20 flex items-center justify-center relative overflow-hidden">
                <img
                  src={heroImages.productKit}
                  alt="Full Product Kit"
                  className="w-full grayscale brightness-125 scale-110"
                />
                <div className="absolute top-8 left-8 blueprint-line-diagonal w-20 h-20" />
                <div className="absolute bottom-8 right-8 blueprint-line-diagonal w-20 h-20 rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs Editorial Break */}
      <section className="bg-[#131313] py-20 lg:py-32 border-y border-[#2E2E2E] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="font-label-caps text-[#FF5722] mb-6 block text-xs">ENGINEERING EXCELLENCE</span>
            <h2 className="font-headline-lg text-white uppercase mb-8 leading-tight text-2xl lg:text-4xl">
              The Anatomy of Precision.
            </h2>
            <div className="space-y-8">
              {techSpecs.map((spec, index) => (
                <div key={spec.label} className="flex gap-6">
                  <div className="font-display-xl text-white/10 text-4xl lg:text-5xl leading-none">
                    0{index + 1}
                  </div>
                  <div>
                    <h4 className="font-label-caps text-white mb-2 text-xs">{spec.label}</h4>
                    <p className="font-technical-data text-zinc-500 text-sm">{spec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-12 blueprint-line opacity-5 rotate-12 hidden lg:block" />
            <img
              src={heroImages.technicalDiagram}
              alt="Technical Diagram"
              className="w-full grayscale brightness-50 contrast-125"
            />
            <div className="absolute top-1/4 right-1/4 border-l-2 border-[#FF5722] pl-4">
              <div className="font-label-caps text-[10px] text-[#FF5722]">RPM SENSOR</div>
              <div className="w-2 h-2 bg-[#FF5722] rounded-full absolute -left-[5px] top-0" />
            </div>
            <div className="absolute bottom-1/3 left-1/4 border-r-2 border-[#FF5722] pr-4 text-right">
              <div className="font-label-caps text-[10px] text-[#FF5722]">LITHIUM CORE</div>
              <div className="w-2 h-2 bg-[#FF5722] rounded-full absolute -right-[5px] top-0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}