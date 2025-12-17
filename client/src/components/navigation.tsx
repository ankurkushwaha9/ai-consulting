import { Box, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Submit Request", href: "/submit" },
  { label: "My Requests", href: "/requests" },
  { label: "Guidelines", href: "/guidelines" },
  { label: "Help", href: "/help" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 bg-[#1a2942]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 bg-[#00d9ff] rounded-md flex items-center justify-center shadow-lg shadow-[#00d9ff]/20">
            <Box className="w-5 h-5 text-[#1a2942]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white" data-testid="text-logo">AI Desk</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`text-sm font-medium transition-colors duration-200 ${
                  location === item.href 
                    ? "text-[#00d9ff] bg-white/5" 
                    : "text-gray-400 hover:text-white"
                }`}
                data-testid={`link-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div 
            className="w-9 h-9 bg-white/10 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/20 transition-all duration-200 cursor-pointer hidden md:block" 
            data-testid="button-user-avatar"
          />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-sm font-medium transition-colors duration-200 ${
                  location === item.href 
                    ? "text-[#00d9ff] bg-white/5" 
                    : "text-gray-400 hover:text-white"
                }`}
                data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
