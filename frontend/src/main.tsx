import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { AppShell } from "./components/AppShell";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SalaryPage } from "./pages/SalaryPage";
import { ExpensesPage } from "./pages/ExpensesPage";
import { InvestmentsPage } from "./pages/InvestmentsPage";
import { ReportsPage } from "./pages/ReportsPage";
import "./index.css";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.accessToken);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Protected><AppShell /></Protected>}>
            <Route index element={<DashboardPage />} />
            <Route path="salary" element={<SalaryPage />} />
            <Route path="expenses" element={<ExpensesPage />} />
            <Route path="investments" element={<InvestmentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
