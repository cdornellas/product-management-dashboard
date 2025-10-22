import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuLayoutDashboard, LuPackage, LuMenu, LuX } from "react-icons/lu";
import Logo from "../../assets/logo";

const navItems = [
  { path: "/", label: "Dashboard", icon: <LuLayoutDashboard size={18} /> },
  { path: "/products", label: "Products", icon: <LuPackage size={18} /> },
];

export default function Navbar() {
  const { pathname } = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 z-50 w-full"
      >
        <div className="bg-white/70 backdrop-blur-lg shadow-sm border-b border-slate-200/50">
          <nav className="max-w-7xl mx-auto py-3 px-4 flex items-center justify-between">
            <Logo />

            <ul className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1 rounded-lg">
              {navItems.map((item) => (
                <li key={item.path} className="relative">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 relative z-10 ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-600 hover:text-slate-800"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>

                  {pathname === item.path && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white shadow-md rounded-md"
                      style={{ zIndex: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-slate-800 hover:bg-slate-100/80 transition-colors"
                aria-label="Abrir menu"
              >
                {isMobileMenuOpen ? <LuX size={22} /> : <LuMenu size={22} />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
              >
                <ul className="flex flex-col p-4 pt-0 gap-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 w-full px-4 py-3 text-base font-semibold rounded-lg transition-colors duration-300 ${
                            isActive
                              ? "bg-white shadow text-slate-900"
                              : "text-slate-600 hover:bg-white/50"
                          }`
                        }
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}