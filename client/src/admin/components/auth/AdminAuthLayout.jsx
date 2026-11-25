import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

export default function AdminAuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5ECE0] px-4 py-8 text-[#34332C] sm:px-6 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E9D8C5] bg-[#FFF9F1] p-3 shadow-soft lg:grid-cols-12 lg:p-4"
      >
        {/* Left Form Column */}
        <main className="flex flex-col justify-between px-4 py-6 sm:px-8 sm:py-8 lg:col-span-6 lg:px-10">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#E9D8C5] bg-white px-4 py-1.5 shadow-sm transition hover:border-[#B93627]"
            >
              <img
                src="/logo/gramiyam-logo.jpg"
                alt="GRAMIYAM"
                className="h-7 w-auto object-contain"
              />
              <span className="font-serif text-sm font-semibold tracking-wider text-[#B93627]">
                GRAMIYAM ADMIN
              </span>
            </Link>

            <Link
              to="/"
              aria-label="Return to storefront"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E9D8C5] bg-white text-[#34332C] lg:hidden"
            >
              <X className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto my-8 w-full max-w-sm">{children}</div>

          <div className="flex items-center justify-between text-xs text-[#77736B]">
            <span>Siddha & Ayurveda • Admin Portal</span>
            <Link to="/terms" className="underline underline-offset-4 hover:text-[#B93627]">
              Terms & Conditions
            </Link>
          </div>
        </main>

        {/* Right Brand Visual Column */}
        <aside className="relative hidden min-h-[580px] overflow-hidden rounded-2xl bg-[#34332C] lg:col-span-6 lg:block">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
            alt="GRAMIYAM Admin Portal"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#241E1B]/80 via-[#241E1B]/25 to-transparent"
            aria-hidden="true"
          />

          <Link
            to="/"
            aria-label="Return to storefront"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF9F1]/95 text-[#34332C] shadow-md transition hover:bg-white hover:text-[#B93627]"
          >
            <X className="h-4 w-4" />
          </Link>

          <div className="absolute left-6 top-8 max-w-[260px] rounded-2xl bg-[#B93627] px-4 py-3 text-[#FFF9F1] shadow-lg">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E9D8C5]">
              Tradition Renown
            </p>
            <p className="mt-1 font-serif text-lg font-medium leading-snug">
              Welcome to the GRAMIYAM Admin Portal
            </p>
          </div>

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/25 bg-[#FFF9F1]/95 p-4 text-[#34332C] shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B93627]">
                  Role-Based Control
                </p>
                <p className="mt-0.5 text-xs text-[#34332C]/80">
                  Manage products, orders, customers & the GRAMIYAM digital experience.
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5ECE0] text-[#B93627]">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
          </div>
        </aside>
      </motion.div>
    </div>
  );
}
