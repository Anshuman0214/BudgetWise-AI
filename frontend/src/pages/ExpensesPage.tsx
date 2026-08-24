import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useCreateExpenseMutation } from "../features/api/apiSlice";

const schema = z.object({ cycleId: z.string().min(1), category: z.string().min(2), amount: z.coerce.number().positive(), merchant: z.string().optional() });
type FormValues = z.infer<typeof schema>;

export function ExpensesPage() {
  const { register, handleSubmit, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [createExpense] = useCreateExpenseMutation();
  return (
    <Card className="max-w-xl">
      <h2 className="mb-4 text-xl font-bold">Expense tracking</h2>
      <form className="grid gap-3" onSubmit={handleSubmit(async (values) => { await createExpense(values); reset(); })}>
        <Input placeholder="Active cycle id" {...register("cycleId")} />
        <Input placeholder="Category key, e.g. needs" {...register("category")} />
        <Input placeholder="Amount" type="number" {...register("amount")} />
        <Input placeholder="Merchant" {...register("merchant")} />
        <Button><Plus size={16} />Add expense</Button>
      </form>
    </Card>
  );
}
