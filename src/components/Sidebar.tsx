
import { Home, Plus, Settings, GitBranch, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "create-mfe", label: "Create MFE", icon: Plus },
  { id: "repositories", label: "Repositories", icon: GitBranch },
  { id: "packages", label: "Packages", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeItem, onItemClick }: SidebarProps) => {
  return (
    <div className="w-64 bg-slate-900 h-screen flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">Developer Portal</h1>
        <p className="text-slate-400 text-sm mt-1">Micro Frontend Manager</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                    activeItem === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 text-slate-400">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold">U</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300">Developer</p>
            <p className="text-xs">user@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
