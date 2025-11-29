import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { NetworkGraph } from '@/components/NetworkGraph';
import { FrameworkDetail } from '@/components/FrameworkDetail';
import { ComplianceTracker } from '@/components/ComplianceTracker';
import { ResourceExplorer } from '@/components/ResourceExplorer';
import { Framework, frameworks } from '@/data/scfData';
import { Badge } from '@/components/ui/badge';
import { Shield, Network, Globe, TrendingUp } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState('visualization');
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <main className="container mx-auto px-4 py-6">
        {currentView === 'visualization' && (
          <div className="space-y-6 animate-fade-in">
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,000+</p>
                  <p className="text-sm text-muted-foreground">SCF Controls</p>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-governance/20 flex items-center justify-center">
                  <Network className="h-6 w-6 text-governance" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{frameworks.length}</p>
                  <p className="text-sm text-muted-foreground">Mapped Frameworks</p>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">32</p>
                  <p className="text-sm text-muted-foreground">Security Domains</p>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2025.3.1</p>
                  <p className="text-sm text-muted-foreground">SCF Version</p>
                </div>
              </div>
            </div>

            {/* Main Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`${selectedFramework ? 'lg:col-span-2' : 'lg:col-span-3'} glass rounded-xl overflow-hidden`}>
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">Framework Interconnections</h2>
                      <p className="text-sm text-muted-foreground">
                        Click on a framework to explore its relationships and control mappings
                      </p>
                    </div>
                    {selectedFramework && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {selectedFramework.shortName} selected
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="h-[500px] md:h-[600px]">
                  <NetworkGraph 
                    onFrameworkSelect={setSelectedFramework}
                    selectedFramework={selectedFramework}
                  />
                </div>
              </div>

              {selectedFramework && (
                <div className="lg:col-span-1 h-[600px]">
                  <FrameworkDetail 
                    framework={selectedFramework}
                    onClose={() => setSelectedFramework(null)}
                  />
                </div>
              )}
            </div>

            {/* Quick Access */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {frameworks.slice(0, 12).map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFramework(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFramework?.id === f.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                    }`}
                  >
                    {f.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'compliance' && (
          <div className="glass rounded-xl overflow-hidden h-[calc(100vh-140px)] animate-fade-in">
            <ComplianceTracker />
          </div>
        )}

        {currentView === 'resources' && (
          <div className="glass rounded-xl overflow-hidden h-[calc(100vh-140px)] animate-fade-in">
            <ResourceExplorer />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
