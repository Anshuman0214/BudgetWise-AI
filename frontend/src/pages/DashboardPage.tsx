import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Card } from "../components/ui/card";
import { useGetDashboardQuery } from "../features/api/apiSlice";
import { money } from "../lib/utils";

const colors = ["#16877f", "#f3a822", "#3867d6", "#ef4444", "#6b7280"];

export function DashboardPage() {
  const { data, isLoading } = useGetDashboardQuery();
  if (isLoading) return <p>Loading dashboard...</p>;
  const dashboard = data ?? { salary: 0, budgetAllocation: [], spendingAnalytics: [], remainingBudget: 0, savingsProgress: 0, investmentProjectedValue: 0, financialHealthScore: 0 };
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial dashboard</h2>
        <p className="text-sm text-muted-foreground">Salary, spending, budget utilization, and investment outlook.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-muted-foreground">Salary</p><strong className="text-2xl">{money(dashboard.salary)}</strong></Card>
        <Card><p className="text-sm text-muted-foreground">Remaining</p><strong className="text-2xl">{money(dashboard.remainingBudget)}</strong></Card>
        <Card><p className="text-sm text-muted-foreground">Savings</p><strong className="text-2xl">{dashboard.savingsProgress}%</strong></Card>
        <Card><p className="text-sm text-muted-foreground">Health score</p><strong className="text-2xl">{dashboard.financialHealthScore}/100</strong></Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-80">
          <h3 className="mb-4 font-semibold">Budget allocation</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={dashboard.budgetAllocation} dataKey="amount" nameKey="label" outerRadius={95}>
                {dashboard.budgetAllocation.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => money(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="h-80">
          <h3 className="mb-4 font-semibold">Spending analytics</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={dashboard.spendingAnalytics}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => money(Number(value))} />
              <Bar dataKey="amount" fill="#16877f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card><p className="text-sm text-muted-foreground">Investment projected value</p><strong className="text-2xl">{money(dashboard.investmentProjectedValue)}</strong></Card>
    </section>
  );
}
