
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Package, Users, Activity } from "lucide-react";

const stats = [
  { title: "Total MFEs", value: "12", icon: Package, color: "text-blue-600" },
  { title: "Active Repositories", value: "8", icon: GitBranch, color: "text-green-600" },
  { title: "Team Members", value: "15", icon: Users, color: "text-purple-600" },
  { title: "Deployments Today", value: "24", icon: Activity, color: "text-orange-600" },
];

const recentMFEs = [
  { name: "user-dashboard", status: "deployed", lastUpdate: "2 hours ago" },
  { name: "product-catalog", status: "building", lastUpdate: "15 minutes ago" },
  { name: "checkout-flow", status: "deployed", lastUpdate: "1 day ago" },
  { name: "auth-service", status: "deployed", lastUpdate: "3 days ago" },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Overview of your micro frontend ecosystem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle>Recent Micro Frontends</CardTitle>
          <CardDescription>Latest activity across your MFE projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMFEs.map((mfe) => (
              <div key={mfe.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="font-medium text-slate-900">{mfe.name}</p>
                    <p className="text-sm text-slate-500">Updated {mfe.lastUpdate}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  mfe.status === 'deployed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {mfe.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
