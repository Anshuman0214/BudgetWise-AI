import { InvestmentCalculator } from "../../features/investments/investment.service.js";

describe("InvestmentCalculator", () => {
  it("projects monthly SIP-style contributions", () => {
    const value = new InvestmentCalculator().futureValue({ principal: 0, monthlyContribution: 10000, expectedAnnualReturn: 12, horizonMonths: 12 });
    expect(value).toBeGreaterThan(120000);
  });
});
