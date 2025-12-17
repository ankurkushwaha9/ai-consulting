import { Box, Menu, X, LogOut, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const baseNavItems = [
  { label: "Dashboard", href: "/" },
  { label: "Submit Request", href: "/submit" },
  { label: "My Requests", href: "/requests" },
  { label: "Guidelines", href: "/guidelines" },
  { label: "Help", href: "/help" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();

  const navItems = user?.role === "admin" 
    ? [...baseNavItems, { label: "Admin", href: "/admin" }]
    : baseNavItems;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate("/auth"),
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "reviewer": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/30";
    }
  };

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
          
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="hidden md:flex items-center gap-2 text-white hover:bg-white/10"
                  data-testid="button-user-menu"
                >
                  <div className="w-8 h-8 bg-[#00d9ff]/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#00d9ff]" />
                  </div>
                  <span className="text-sm font-medium">{user.username}</span>
                  <Badge variant="outline" className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1a2942] border-white/10">
                <DropdownMenuLabel className="text-gray-400">
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-medium">{user.username}</span>
                    <span className="text-xs font-normal">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {user.role === "admin" && (
                  <DropdownMenuItem 
                    className="text-gray-300 hover:text-white focus:text-white cursor-pointer"
                    onClick={() => navigate("/admin")}
                    data-testid="menu-item-admin"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  className="text-red-400 hover:text-red-300 focus:text-red-300 cursor-pointer"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  data-testid="menu-item-logout"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
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
          {user && (
            <>
              <div className="border-t border-white/10 my-2" />
              <div className="px-4 py-2 flex items-center gap-2">
                <User className="w-4 h-4 text-[#00d9ff]" />
                <span className="text-white text-sm">{user.username}</span>
                <Badge variant="outline" className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </Badge>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                data-testid="button-mobile-logout"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
