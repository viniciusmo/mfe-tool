
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { GitBranch, Package, Settings } from "lucide-react";

const templates = [
  { id: "react-typescript", name: "React + TypeScript", description: "Modern React with TypeScript support" },
  { id: "vue-composition", name: "Vue 3 + Composition API", description: "Vue 3 with Composition API and TypeScript" },
  { id: "angular-standalone", name: "Angular Standalone", description: "Angular with standalone components" },
  { id: "vanilla-js", name: "Vanilla JavaScript", description: "Pure JavaScript with module federation" },
  { id: "react-native", name: "React Native", description: "Cross-platform mobile MFE" },
];

export const CreateMFEForm = () => {
  const [repositoryName, setRepositoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!repositoryName || !productName || !selectedTemplate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before creating the MFE.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "MFE Created Successfully!",
        description: `${productName} has been created with ${templates.find(t => t.id === selectedTemplate)?.name} template.`,
      });
      
      // Reset form
      setRepositoryName("");
      setProductName("");
      setSelectedTemplate("");
      setIsCreating(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Micro Frontend</h1>
        <p className="text-slate-600">Set up a new micro frontend application with your preferred template and configuration.</p>
      </div>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span>Project Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure your new micro frontend project details and template selection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="repository-name" className="text-sm font-semibold text-slate-700">
                Repository Name *
              </Label>
              <Input
                id="repository-name"
                placeholder="my-awesome-mfe"
                value={repositoryName}
                onChange={(e) => setRepositoryName(e.target.value)}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-500">
                Repository name should be lowercase with hyphens
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-name" className="text-sm font-semibold text-slate-700">
                Product Name *
              </Label>
              <Input
                id="product-name"
                placeholder="My Awesome MFE"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-500">
                Display name for your micro frontend
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-semibold text-slate-700">
              Template *
            </Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select a template for your MFE" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 shadow-lg">
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id} className="cursor-pointer hover:bg-slate-50">
                    <div className="flex flex-col">
                      <span className="font-medium">{template.name}</span>
                      <span className="text-xs text-slate-500">{template.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTemplate && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">
                    {templates.find(t => t.id === selectedTemplate)?.name}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {templates.find(t => t.id === selectedTemplate)?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={() => {
            setRepositoryName("");
            setProductName("");
            setSelectedTemplate("");
          }}
          disabled={isCreating}
          className="border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Reset Form
        </Button>
        <Button 
          onClick={handleCreate}
          disabled={isCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
        >
          {isCreating ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>Create MFE</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
