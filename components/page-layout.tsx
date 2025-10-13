"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Navbar as EmployeeNavbar } from "@/app/employeedashboard/components/navbar"; 

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();

  // Show employee navbar for dashboard routes
  const isEmployeeDashboard = pathname.startsWith("/employeedashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Conditionally render navbar based on path */}
      {isEmployeeDashboard ? <EmployeeNavbar /> : <Navigation />}

      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
