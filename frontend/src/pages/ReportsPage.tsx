import { Download } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export function ReportsPage() {
  return (
    <Card className="max-w-xl">
      <h2 className="mb-2 text-xl font-bold">Reports</h2>
      <p className="mb-4 text-sm text-muted-foreground">Monthly, quarterly, and annual summaries can be generated from the API and exported as PDF or Excel.</p>
      <div className="flex gap-2">
        <Button><Download size={16} />PDF export</Button>
        <Button className="bg-accent text-accent-foreground"><Download size={16} />Excel export</Button>
      </div>
    </Card>
  );
}
