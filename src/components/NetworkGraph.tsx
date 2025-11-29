import { useEffect, useRef, useState } from 'react';
import { frameworks, frameworkConnections, Framework } from '@/data/scfData';

interface NetworkGraphProps {
  onFrameworkSelect: (framework: Framework | null) => void;
  selectedFramework: Framework | null;
}

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  framework: Framework;
}

export const NetworkGraph = ({ onFrameworkSelect, selectedFramework }: NetworkGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const animationRef = useRef<number>();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'international': return '#0ea5e9';
      case 'us-federal': return '#8b5cf6';
      case 'us-state': return '#f59e0b';
      case 'industry': return '#10b981';
      case 'regional': return '#ec4899';
      default: return '#64748b';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    // Initialize nodes in a circle
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;

    const initialNodes: Node[] = frameworks.map((framework, i) => {
      const angle = (i / frameworks.length) * Math.PI * 2 - Math.PI / 2;
      return {
        id: framework.id,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        framework,
      };
    });

    setNodes(initialNodes);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodes.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scale, scale);

      // Draw connections
      frameworkConnections.forEach(({ source, target, strength }) => {
        const sourceNode = nodes.find(n => n.id === source);
        const targetNode = nodes.find(n => n.id === target);
        if (!sourceNode || !targetNode) return;

        const isHighlighted = selectedFramework && 
          (selectedFramework.id === source || selectedFramework.id === target);

        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = isHighlighted 
          ? `rgba(14, 165, 233, ${strength})` 
          : `rgba(100, 116, 139, ${strength * 0.3})`;
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        const isSelected = selectedFramework?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        const color = getCategoryColor(node.framework.category);
        const nodeRadius = isSelected ? 28 : isHovered ? 24 : 20;

        // Glow effect
        if (isSelected || isHovered) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, nodeRadius * 2
          );
          gradient.addColorStop(0, `${color}40`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fillRect(node.x - nodeRadius * 2, node.y - nodeRadius * 2, nodeRadius * 4, nodeRadius * 4);
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? color : `${color}cc`;
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#fff' : color;
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = `${isSelected ? '600' : '500'} 10px Inter`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const lines = node.framework.shortName.split(' ');
        lines.forEach((line, i) => {
          const yOffset = (i - (lines.length - 1) / 2) * 11;
          ctx.fillText(line, node.x, node.y + yOffset);
        });
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, hoveredNode, selectedFramework]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hovered = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 24;
    });

    setHoveredNode(hovered || null);
    canvas.style.cursor = hovered ? 'pointer' : 'default';
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 24;
    });

    onFrameworkSelect(clicked?.framework || null);
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={handleClick}
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-lg p-3 space-y-2">
        <p className="text-xs font-medium text-muted-foreground mb-2">Categories</p>
        {[
          { label: 'International', color: '#0ea5e9' },
          { label: 'US Federal', color: '#8b5cf6' },
          { label: 'US State', color: '#f59e0b' },
          { label: 'Industry', color: '#10b981' },
          { label: 'Regional', color: '#ec4899' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {hoveredNode && !selectedFramework && (
        <div 
          className="absolute glass-strong rounded-lg p-3 pointer-events-none animate-fade-in"
          style={{ 
            left: hoveredNode.x + 30, 
            top: hoveredNode.y - 40,
            maxWidth: 200
          }}
        >
          <p className="font-semibold text-sm">{hoveredNode.framework.name}</p>
          <p className="text-xs text-muted-foreground mt-1">{hoveredNode.framework.region}</p>
          <p className="text-xs text-muted-foreground">{hoveredNode.framework.controlCount} controls mapped</p>
        </div>
      )}
    </div>
  );
};
