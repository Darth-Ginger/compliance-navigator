import { useState } from 'react';
import { frameworks, sampleControls, scfDomains } from '@/data/scfData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Clock,
  Filter,
  Download,
  BarChart3
} from 'lucide-react';

interface ComplianceStatus {
  controlId: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'not-assessed';
  lastAssessed?: string;
  notes?: string;
}

export const ComplianceTracker = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>('');
  const [complianceStatuses, setComplianceStatuses] = useState<ComplianceStatus[]>(
    sampleControls.map(control => ({
      controlId: control.id,
      status: Math.random() > 0.7 ? 'compliant' : 
              Math.random() > 0.5 ? 'partial' : 
              Math.random() > 0.3 ? 'non-compliant' : 'not-assessed',
      lastAssessed: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }))
  );
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredControls = sampleControls.filter(control => {
    if (selectedFramework) {
      const hasFramework = control.frameworks.some(f => 
        f.framework.toLowerCase().includes(selectedFramework.toLowerCase())
      );
      if (!hasFramework) return false;
    }
    
    if (filterStatus !== 'all') {
      const status = complianceStatuses.find(s => s.controlId === control.id);
      if (status?.status !== filterStatus) return false;
    }
    
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'partial': return <Clock className="h-5 w-5 text-warning" />;
      case 'non-compliant': return <AlertCircle className="h-5 w-5 text-destructive" />;
      default: return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge className="bg-success/20 text-success border-success/30">Compliant</Badge>;
      case 'partial': return <Badge className="bg-warning/20 text-warning border-warning/30">Partial</Badge>;
      case 'non-compliant': return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Non-Compliant</Badge>;
      default: return <Badge variant="outline">Not Assessed</Badge>;
    }
  };

  const toggleStatus = (controlId: string) => {
    setComplianceStatuses(prev => prev.map(s => {
      if (s.controlId === controlId) {
        const statuses: Array<'compliant' | 'partial' | 'non-compliant' | 'not-assessed'> = 
          ['not-assessed', 'non-compliant', 'partial', 'compliant'];
        const currentIndex = statuses.indexOf(s.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        return { ...s, status: statuses[nextIndex], lastAssessed: new Date().toISOString().split('T')[0] };
      }
      return s;
    }));
  };

  const stats = {
    total: sampleControls.length,
    compliant: complianceStatuses.filter(s => s.status === 'compliant').length,
    partial: complianceStatuses.filter(s => s.status === 'partial').length,
    nonCompliant: complianceStatuses.filter(s => s.status === 'non-compliant').length,
    notAssessed: complianceStatuses.filter(s => s.status === 'not-assessed').length,
  };

  const complianceScore = Math.round(
    ((stats.compliant + stats.partial * 0.5) / stats.total) * 100
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header Stats */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Compliance Tracker</h2>
            <p className="text-muted-foreground">Track and manage your regulatory compliance status</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="glass rounded-lg p-4 col-span-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Compliance Score</span>
              <span className="text-3xl font-bold text-gradient">{complianceScore}%</span>
            </div>
            <Progress value={complianceScore} className="h-2" />
          </div>
          
          <div className="glass rounded-lg p-4 text-center">
            <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-success" />
            <p className="text-xl font-bold">{stats.compliant}</p>
            <p className="text-xs text-muted-foreground">Compliant</p>
          </div>
          
          <div className="glass rounded-lg p-4 text-center">
            <Clock className="h-5 w-5 mx-auto mb-1 text-warning" />
            <p className="text-xl font-bold">{stats.partial}</p>
            <p className="text-xs text-muted-foreground">Partial</p>
          </div>
          
          <div className="glass rounded-lg p-4 text-center">
            <AlertCircle className="h-5 w-5 mx-auto mb-1 text-destructive" />
            <p className="text-xl font-bold">{stats.nonCompliant}</p>
            <p className="text-xs text-muted-foreground">Non-Compliant</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-border/50 flex items-center gap-4">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={selectedFramework} onValueChange={(val) => setSelectedFramework(val === 'all' ? '' : val)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Frameworks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Frameworks</SelectItem>
            {frameworks.slice(0, 10).map(f => (
              <SelectItem key={f.id} value={f.shortName}>{f.shortName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="compliant">Compliant</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="non-compliant">Non-Compliant</SelectItem>
            <SelectItem value="not-assessed">Not Assessed</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground ml-auto">
          Showing {filteredControls.length} of {sampleControls.length} controls
        </span>
      </div>

      {/* Controls List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredControls.map(control => {
            const status = complianceStatuses.find(s => s.controlId === control.id);
            return (
              <div 
                key={control.id}
                className="glass rounded-lg p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleStatus(control.id)}
                    className="mt-1 hover:scale-110 transition-transform"
                  >
                    {getStatusIcon(status?.status || 'not-assessed')}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm text-primary">{control.id}</span>
                      <Badge variant="outline" className="text-xs">
                        {control.cadence}
                      </Badge>
                    </div>
                    <h4 className="font-medium">{control.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {control.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {control.frameworks.slice(0, 4).map(f => (
                        <Badge key={f.framework} variant="secondary" className="text-xs">
                          {f.framework}
                        </Badge>
                      ))}
                      {control.frameworks.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{control.frameworks.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    {getStatusBadge(status?.status || 'not-assessed')}
                    {status?.lastAssessed && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Last: {status.lastAssessed}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
