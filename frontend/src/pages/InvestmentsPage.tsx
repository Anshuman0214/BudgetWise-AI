import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useCalculateInvestmentMutation } from "../features/api/apiSlice";
import { money } from "../lib/utils";

const schema = z.object({ type: z.string(), name: z.string(), principal: z.coerce.number().min(0), monthlyContribution: z.coerce.number().min(0), expectedAnnualReturn: z.coerce.number().min(0), horizonMonths: z.coerce.number().int().positive() });
type FormValues = z.infer<typeof schema>;

export function InvestmentsPage() {
  const [projection, setProjection] = useState<number | null>(null);
  const { register, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { type: "sip", name: "SIP Plan", principal: 0, monthlyContribution: 10000, expectedAnnualReturn: 12, horizonMonths: 120 } });
  const [calculate] = useCalculateInvestmentMutation();
  return (
    <Card className="max-w-xl">
      <h2 className="mb-4 text-xl font-bold">Investment calculators</h2>
      <form className="grid gap-3" onSubmit={handleSubmit(async (values) => setProjection((await calculate(values).unwrap()).projectedValue))}>
        <select className="h-10 rounded-md border border-border px-3" {...register("type")}>{["sip", "mutual_fund", "stock", "fixed_deposit", "real_estate", "emergency_fund", "retirement"].map((type) => <option key={type} value={type}>{type}</option>)}</select>
        <Input {...register("name")} />
        <Input placeholder="Principal" type="number" {...register("principal")} />
        <Input placeholder="Monthly contribution" type="number" {...register("monthlyContribution")} />
        <Input placeholder="Expected annual return %" type="number" {...register("expectedAnnualReturn")} />
        <Input placeholder="Horizon months" type="number" {...register("horizonMonths")} />
        <Button><Calculator size={16} />Calculate</Button>
      </form>
      {projection !== null && <p className="mt-4 text-lg font-semibold">Projected value: {money(projection)}</p>}
    </Card>
  );
}
