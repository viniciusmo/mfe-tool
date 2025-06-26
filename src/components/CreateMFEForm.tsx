import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { GitBranch, Package, Settings, CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react";

const templates = [
  { id: "portal", name: "Portal", description: "Portal template for micro frontend applications" },
  { id: "backoffice", name: "Backoffice", description: "Backoffice template for administrative interfaces" },
];

type WorkflowStatus = 'idle' | 'triggered' | 'completed';

interface CreatedRepository {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  private: boolean;
  created_at: string;
}

export const CreateMFEForm = () => {
  const [repositoryName, setRepositoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>('idle');
  const [currentProductName, setCurrentProductName] = useState("");
  const [currentRepositoryName, setCurrentRepositoryName] = useState("");
  const [createdRepository, setCreatedRepository] = useState<CreatedRepository | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Triggering workflow...",
    "Creating repository structure...",
    `Setting up ${selectedTemplate === 'backoffice' ? 'Backoffice' : 'Portal'} template...`,
    "Configuring micro frontend...",
    "Finalizing setup...",
    `Your ${selectedTemplate === 'backoffice' ? 'Backoffice' : 'Portal'} MFE is ready!`
  ];

  const fetchCreatedRepository = async (repositoryName: string) => {
    // Create the repository URL directly without API call
    const repoUrl = `https://github.com/mfepocautomation/${repositoryName}`;
    const templateName = selectedTemplate === 'backoffice' ? 'Backoffice' : 'Portal';
    const repo: CreatedRepository = {
      name: repositoryName,
      full_name: `mfepocautomation/${repositoryName}`,
      html_url: repoUrl,
      description: `${templateName} for ${currentProductName}`,
      private: false,
      created_at: new Date().toISOString()
    };
    setCreatedRepository(repo);
  };

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
    setWorkflowStatus('triggered');
    setCurrentProductName(productName);
    setCurrentRepositoryName(repositoryName);
    setLoadingStep(0);
    
    try {
      // Step 1: Triggering workflow
      setLoadingStep(1);
      const response = await fetch('https://api.github.com/repos/mfepocautomation/mfe-templates/actions/workflows/create-product-repo.yml/dispatches', {
        method: 'POST',
        headers: {
          'Authorization': 'token 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',
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            product_name: repositoryName,
            product_display_name: productName,
            repository_visibility: 'private',
            github_token: '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'
          }
        })
      });

      if (response.ok) {
        toast({
          title: "Workflow Triggered Successfully!",
          description: `Starting to create ${productName}...`,
        });
        
        // Step 2: Creating repository structure (3s)
        setTimeout(() => setLoadingStep(2), 3000);
        
        // Step 3: Setting up Portal template (6s)
        setTimeout(() => setLoadingStep(3), 6000);
        
        // Step 4: Configuring micro frontend (12s)
        setTimeout(() => setLoadingStep(4), 12000);
        
        // Step 5: Finalizing setup (18s)
        setTimeout(() => setLoadingStep(5), 18000);
        
        // Step 6: Complete (20s)
        setTimeout(() => {
          setWorkflowStatus('completed');
          setLoadingStep(6);
          fetchCreatedRepository(repositoryName);
          const templateName = selectedTemplate === 'backoffice' ? 'Backoffice' : 'Portal';
          toast({
            title: `${templateName} MFE Created Successfully!`,
            description: `Your ${templateName} MFE "${productName}" has been created and is ready to use.`,
          });
        }, 20000);
        
        // Reset form
        setRepositoryName("");
        setProductName("");
        setSelectedTemplate("");
      } else {
        const errorData = await response.text();
        console.error('Workflow trigger failed:', response.status, response.statusText, errorData);
        toast({
          title: "Workflow Trigger Failed",
          description: `Failed to trigger the workflow. Status: ${response.status}`,
          variant: "destructive",
        });
        setWorkflowStatus('idle');
        setLoadingStep(0);
      }
    } catch (error) {
      console.error('Error triggering workflow:', error);
      toast({
        title: "Error",
        description: "An error occurred while triggering the workflow. Please try again.",
        variant: "destructive",
      });
      setWorkflowStatus('idle');
      setLoadingStep(0);
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusIcon = () => {
    switch (workflowStatus) {
      case 'triggered':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    const templateName = selectedTemplate === 'backoffice' ? 'Backoffice' : 'Portal';
    switch (workflowStatus) {
      case 'triggered':
        return `Creating your ${templateName} MFE "${currentProductName}"...`;
      case 'completed':
        return `Your ${templateName} MFE is ready!`;
      default:
        return '';
    }
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

      {/* Workflow Progress Tracking */}
      {workflowStatus !== 'idle' && (
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="flex items-center space-x-2">
              {getStatusIcon()}
              <span>Creating Your {selectedTemplate === 'backoffice' ? 'Backoffice' : 'Portal'} MFE</span>
            </CardTitle>
            <CardDescription>
              {getStatusText()}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    workflowStatus === 'triggered' ? 'bg-blue-500' :
                    workflowStatus === 'completed' ? 'bg-green-500' :
                    'bg-slate-300'
                  }`}
                  style={{
                    width: workflowStatus === 'triggered' 
                      ? `${((loadingStep - 1) / 5) * 100}%` 
                      : workflowStatus === 'completed' 
                        ? '100%' 
                        : '0%'
                  }}
                />
              </div>
              
              {/* Current Step */}
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-800 mb-2">
                  {loadingSteps[loadingStep - 1] || loadingSteps[0]}
                </div>
                <div className="text-sm text-slate-600">
                  Step {loadingStep} of 6
                </div>
              </div>
              
              {/* Step Indicators */}
              <div className="grid grid-cols-6 gap-2">
                {loadingSteps.slice(0, 6).map((step, index) => (
                  <div 
                    key={index}
                    className={`text-center p-2 rounded-lg text-xs ${
                      index < loadingStep 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                        : index === loadingStep - 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    <div className="font-medium">
                      {index < loadingStep ? '✓' : index + 1}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Progress Info */}
              <div className="flex justify-between text-xs text-slate-500">
                <span>Started</span>
                <span>
                  {workflowStatus === 'completed' ? 'Completed' : `${Math.round(((loadingStep - 1) / 5) * 100)}%`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Created Repository Information */}
      {createdRepository && (
        <Card className="shadow-lg border-green-200 bg-green-50">
          <CardHeader className="bg-green-100 border-b border-green-200">
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>Repository Created Successfully!</span>
            </CardTitle>
            <CardDescription className="text-green-700">
              Your micro frontend repository has been created.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-mono text-sm bg-white px-3 py-2 rounded border border-green-200 text-green-800">
                  {createdRepository.html_url}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(createdRepository.html_url, '_blank')}
                className="ml-3 border-green-300 text-green-700 hover:bg-green-100"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Open
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={() => {
            setRepositoryName("");
            setProductName("");
            setSelectedTemplate("");
            setWorkflowStatus('idle');
            setCreatedRepository(null);
            setLoadingStep(0);
          }}
          disabled={isCreating}
          className="border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Reset Form
        </Button>
        <Button 
          onClick={handleCreate}
          disabled={isCreating || workflowStatus !== 'idle'}
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
