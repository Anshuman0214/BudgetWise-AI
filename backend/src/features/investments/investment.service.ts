export class InvestmentCalculator {
  futureValue({ principal, monthlyContribution, expectedAnnualReturn, horizonMonths }: { principal: number; monthlyContribution: number; expectedAnnualReturn: number; horizonMonths: number }) {
    const monthlyRate = expectedAnnualReturn / 100 / 12;
    const principalValue = principal * Math.pow(1 + monthlyRate, horizonMonths);
    const contributionValue = monthlyRate === 0 ? monthlyContribution * horizonMonths : monthlyContribution * ((Math.pow(1 + monthlyRate, horizonMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    return Number((principalValue + contributionValue).toFixed(2));
  }
}
