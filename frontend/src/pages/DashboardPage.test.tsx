import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { store } from "../app/store";
import { DashboardPage } from "./DashboardPage";

vi.mock("../features/api/apiSlice", async (actual) => ({
  ...(await actual<typeof import("../features/api/apiSlice")>()),
  useGetDashboardQuery: () => ({
    isLoading: false,
    data: { salary: 100000, budgetAllocation: [], spendingAnalytics: [], remainingBudget: 75000, savingsProgress: 25, investmentProjectedValue: 500000, financialHealthScore: 82 }
  })
}));

describe("DashboardPage", () => {
  it("renders financial health score", () => {
    render(<Provider store={store}><DashboardPage /></Provider>);
    expect(screen.getByText("82/100")).toBeInTheDocument();
  });
});
