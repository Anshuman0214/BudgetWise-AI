import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch } from "../app/hooks";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useRegisterMutation } from "../features/api/apiSlice";
import { setCredentials } from "../features/auth/authSlice";

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) });
type FormValues = z.infer<typeof schema>;

export function RegisterPage() {
  const { register, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [createAccount] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values: FormValues) => {
    const result = await createAccount(values).unwrap();
    dispatch(setCredentials({ accessToken: result.accessToken, user: result.user }));
    navigate("/");
  };
  return (
    <div className="grid min-h-screen place-items-center p-4">
      <Card className="w-full max-w-sm">
        <h1 className="mb-1 text-2xl font-bold">Create account</h1>
        <p className="mb-6 text-sm text-muted-foreground">Start planning salary, spend, and investments.</p>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Name" {...register("name")} />
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Password" type="password" {...register("password")} />
          <Button className="w-full"><UserPlus size={16} />Register</Button>
        </form>
        <Link className="mt-4 block text-sm text-primary" to="/login">Already have an account?</Link>
      </Card>
    </div>
  );
}
