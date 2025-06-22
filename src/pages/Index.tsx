
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { CreateMFEForm } from "@/components/CreateMFEForm";
import { Dashboard } from "@/components/Dashboard";
import { ComingSoon } from "@/components/ComingSoon";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "create-mfe":
        return <CreateMFEForm />;
      case "repositories":
        return <ComingSoon title="Repositories" description="Manage and monitor your micro frontend repositories" />;
      case "packages":
        return <ComingSoon title="Packages" description="View and manage your published packages and dependencies" />;
      case "settings":
        return <ComingSoon title="Settings" description="Configure your developer portal preferences and team settings" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <Sidebar activeItem={activeView} onItemClick={setActiveView} />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
