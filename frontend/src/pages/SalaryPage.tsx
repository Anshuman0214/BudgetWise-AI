import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useSetSalaryMutation } from "../features/api/apiSlice";

const schema = z.object({ salary: z.coerce.number().positive(), salaryCreditDay: z.coerce.number().int().min(1).max(31), formulaRule: z.string(), resetMode: z.string() });
type FormValues = z.infer<typeof schema>;

export function SalaryPage() {
  const { register, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { formulaRule: "50_30_20", resetMode: "automatic" } });
  const [setSalary] = useSetSalaryMutation();
  return (
    <Card className="max-w-xl">
      <h2 className="mb-4 text-xl font-bold">Salary and budget reset</h2>
      <form className="grid gap-3" onSubmit={handleSubmit((values) => setSalary(values))}>
        <Input placeholder="Monthly salary" type="number" {...register("salary")} />
        <Input placeholder="Salary credit day" type="number" {...register("salaryCreditDay")} />
        <select className="h-10 rounded-md border border-border px-3" {...register("formulaRule")}>
          {["50_30_20", "70_20_10", "60_20_20", "80_20", "ZERO_BASED", "PAY_YOURSELF_FIRST", "CUSTOM"].map((rule) => <option key={rule} value={rule}>{rule}</option>)}
        </select>
        <select className="h-10 rounded-md border border-border px-3" {...register("resetMode")}><option value="automatic">Automatic</option><option value="manual">Manual</option></select>
        <Button><Save size={16} />Save salary plan</Button>
      </form>
    </Card>
  );
}
