
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-600">{description}</p>
      </div>

      <Card className="shadow-sm border-slate-200 max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Construction className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-slate-900">Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development and will be available in a future update.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-slate-500">
            Stay tuned for more updates on this exciting new feature!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
