import { Framework, frameworkConnections, frameworks, sampleControls } from '@/data/scfData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, BookOpen, Shield, Link2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FrameworkDetailProps {
  framework: Framework;
  onClose: () => void;
}

export const FrameworkDetail = ({ framework, onClose }: FrameworkDetailProps) => {
  const connections = frameworkConnections.filter(
    c => c.source === framework.id || c.target === framework.id
  );

  const relatedFrameworks = connections.map(c => {
    const relatedId = c.source === framework.id ? c.target : c.source;
    return {
      framework: frameworks.find(f => f.id === relatedId),
      strength: c.strength,
    };
  }).filter(r => r.framework).sort((a, b) => b.strength - a.strength);

  const mappedControls = sampleControls.filter(control =>
    control.frameworks.some(f => 
      f.framework.toLowerCase().includes(framework.shortName.toLowerCase().split(' ')[0])
    )
  );

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'international': return 'bg-info/20 text-info border-info/30';
      case 'us-federal': return 'bg-governance/20 text-governance border-governance/30';
      case 'us-state': return 'bg-warning/20 text-warning border-warning/30';
      case 'industry': return 'bg-success/20 text-success border-success/30';
      case 'regional': return 'bg-domain-privacy/20 text-domain-privacy border-domain-privacy/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="glass-strong rounded-xl h-full flex flex-col animate-slide-in-right">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className={getCategoryStyles(framework.category)}>
                {framework.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                {framework.region}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold">{framework.name}</h2>
            <p className="text-muted-foreground mt-2">{framework.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="glass rounded-lg p-4 text-center">
            <Shield className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{framework.controlCount}</p>
            <p className="text-xs text-muted-foreground">Mapped Controls</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <Link2 className="h-5 w-5 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">{relatedFrameworks.length}</p>
            <p className="text-xs text-muted-foreground">Related Frameworks</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <BookOpen className="h-5 w-5 mx-auto mb-2 text-warning" />
            <p className="text-2xl font-bold">{mappedControls.length}</p>
            <p className="text-xs text-muted-foreground">Sample Controls</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {/* Related Frameworks */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Interconnected Frameworks
            </h3>
            <div className="space-y-2">
              {relatedFrameworks.map(({ framework: related, strength }) => related && (
                <div 
                  key={related.id}
                  className="glass rounded-lg p-3 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{related.shortName}</p>
                    <p className="text-xs text-muted-foreground">{related.region}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${strength * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-10">
                      {Math.round(strength * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapped Controls */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Sample Control Mappings
            </h3>
            <div className="space-y-2">
              {mappedControls.length > 0 ? mappedControls.map(control => {
                const mapping = control.frameworks.find(f => 
                  f.framework.toLowerCase().includes(framework.shortName.toLowerCase().split(' ')[0])
                );
                return (
                  <div key={control.id} className="glass rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-xs text-primary">{control.id}</p>
                        <p className="font-medium mt-1">{control.name}</p>
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">
                        {mapping?.reference}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {control.description}
                    </p>
                  </div>
                );
              }) : (
                <p className="text-sm text-muted-foreground">
                  No sample controls available for this framework in the demo data.
                </p>
              )}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Resources
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <ExternalLink className="h-4 w-4" />
                View Official Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <BookOpen className="h-4 w-4" />
                Implementation Guide
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
