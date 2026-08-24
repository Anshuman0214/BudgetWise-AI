import { BarChart3, CreditCard, FileText, Landmark, LogOut, Wallet } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { Button } from "./ui/button";

const links = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/salary", label: "Salary", icon: Wallet },
  { to: "/expenses", label: "Expenses", icon: CreditCard },
  { to: "/investments", label: "Investments", icon: Landmark },
  { to: "/reports", label: "Reports", icon: FileText }
];

export function AppShell() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-white p-4 md:block">
        <div className="mb-8">
          <h1 className="text-xl font-bold">BudgetWise AI</h1>
          <p className="text-sm text-muted-foreground">{user?.name}</p>
        </div>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `flex h-10 items-center gap-3 rounded-md px-3 text-sm ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <Button className="absolute bottom-4 left-4 right-4 bg-destructive" onClick={() => dispatch(logout())}><LogOut size={16} />Logout</Button>
      </aside>
      <main className="p-4 md:ml-64 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
