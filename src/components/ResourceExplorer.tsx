import { useState } from 'react';
import { frameworks, scfDomains, sampleControls } from '@/data/scfData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  Shield, 
  Globe, 
  Building, 
  Building2,
  Factory,
  MapPin,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const ResourceExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const filteredFrameworks = frameworks.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDomains = scfDomains.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.principle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'international': return <Globe className="h-4 w-4" />;
      case 'us-federal': return <Building className="h-4 w-4" />;
      case 'us-state': return <MapPin className="h-4 w-4" />;
      case 'industry': return <Factory className="h-4 w-4" />;
      case 'regional': return <Building2 className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'international': return 'text-info';
      case 'us-federal': return 'text-governance';
      case 'us-state': return 'text-warning';
      case 'industry': return 'text-success';
      case 'regional': return 'text-domain-privacy';
      default: return 'text-muted-foreground';
    }
  };

  const groupedFrameworks = {
    international: filteredFrameworks.filter(f => f.category === 'international'),
    'us-federal': filteredFrameworks.filter(f => f.category === 'us-federal'),
    'us-state': filteredFrameworks.filter(f => f.category === 'us-state'),
    industry: filteredFrameworks.filter(f => f.category === 'industry'),
    regional: filteredFrameworks.filter(f => f.category === 'regional'),
  };

  const domainControlCounts: Record<string, number> = {};
  sampleControls.forEach(control => {
    const domainId = control.id.split('-')[0].toLowerCase();
    domainControlCounts[domainId] = (domainControlCounts[domainId] || 0) + 1;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Resource Explorer</h2>
            <p className="text-muted-foreground">
              Learn about frameworks, standards, and security domains
            </p>
          </div>
          <BookOpen className="h-8 w-8 text-primary" />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search frameworks, domains, or controls..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="frameworks" className="flex-1 flex flex-col">
        <div className="border-b border-border/50 px-6">
          <TabsList className="bg-transparent h-12">
            <TabsTrigger value="frameworks" className="data-[state=active]:bg-secondary">
              Frameworks ({filteredFrameworks.length})
            </TabsTrigger>
            <TabsTrigger value="domains" className="data-[state=active]:bg-secondary">
              SCF Domains ({filteredDomains.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="frameworks" className="p-6 mt-0">
            <div className="space-y-8">
              {Object.entries(groupedFrameworks).map(([category, items]) => items.length > 0 && (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={getCategoryColor(category)}>
                      {getCategoryIcon(category)}
                    </span>
                    <h3 className="text-lg font-semibold capitalize">
                      {category.replace('-', ' ')} Standards
                    </h3>
                    <Badge variant="outline">{items.length}</Badge>
                  </div>

                  <div className="grid gap-3">
                    {items.map(framework => (
                      <div 
                        key={framework.id}
                        className="glass rounded-lg p-4 hover:bg-secondary/30 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{framework.shortName}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {framework.region}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {framework.name}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              {framework.description}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-xs text-primary">
                                {framework.controlCount} mapped controls
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="domains" className="p-6 mt-0">
            <div className="grid gap-3">
              {filteredDomains.map(domain => (
                <div 
                  key={domain.id}
                  className={`glass rounded-lg p-4 hover:bg-secondary/30 transition-colors cursor-pointer ${
                    selectedDomain === domain.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/20 text-primary border-primary/30 font-mono">
                          {domain.identifier}
                        </Badge>
                        <h4 className="font-semibold">{domain.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {domain.principle}
                      </p>
                      
                      {selectedDomain === domain.id && (
                        <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
                          <h5 className="text-sm font-medium text-muted-foreground mb-2">Intent</h5>
                          <p className="text-sm">{domain.intent}</p>
                          
                          <div className="flex items-center gap-4 mt-4">
                            <Badge variant="outline">
                              {domainControlCounts[domain.id.toLowerCase()] || 0} sample controls
                            </Badge>
                            <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                              View all controls <ExternalLink className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${
                      selectedDomain === domain.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};
