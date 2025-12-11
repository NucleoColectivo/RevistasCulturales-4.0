import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MOCK_GRAPH_DATA } from '../constants';
import { Network, Info, Calendar, GitGraph } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import TimelineView from './TimelineView';
import { useLanguage } from '../contexts/LanguageContext';

// Internal Network Graph Component
const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
        if(wrapperRef.current) {
            setDimensions({
                width: wrapperRef.current.clientWidth,
                height: Math.max(600, window.innerHeight - 300)
            });
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = dimensions.width;
    const height = dimensions.height;

    // Entrance Animation - Scale from 0 to 1
    svg.attr("opacity", 0)
       .transition().duration(1000)
       .attr("opacity", 1);

    const simulation = d3.forceSimulation(MOCK_GRAPH_DATA.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(MOCK_GRAPH_DATA.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(30));

    const link = svg.append("g")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(MOCK_GRAPH_DATA.links)
      .join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .selectAll("circle")
      .data(MOCK_GRAPH_DATA.nodes)
      .join("circle")
      .attr("r", (d) => d.group === 1 ? 16 : 8) // Bigger nodes for magazines
      .attr("fill", (d) => {
          if (d.group === 1) return "#d97706"; // Magazines (Amber)
          if (d.group === 2) return "#64748b"; // People (Gray)
          return "#2563eb"; // Topics (Blue)
      })
      .attr("cursor", "grab")
      .call((d3.drag() as any)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Node Hover Effect
    node.on("mouseover", function(event, d) {
        d3.select(this).transition().duration(200).attr("r", (d:any) => (d.group === 1 ? 20 : 12));
    })
    .on("mouseout", function(event, d) {
        d3.select(this).transition().duration(200).attr("r", (d:any) => (d.group === 1 ? 16 : 8));
    });

    node.append("title")
      .text((d: any) => d.label);

    const labels = svg.append("g")
        .selectAll("text")
        .data(MOCK_GRAPH_DATA.nodes)
        .join("text")
        .text((d: any) => d.label)
        .attr("font-size", "11px")
        .attr("font-family", "Inter, sans-serif")
        .attr("font-weight", "500")
        .attr("dx", 20)
        .attr("dy", 4)
        .attr("fill", "#1e293b")
        .style("pointer-events", "none")
        .style("text-shadow", "0 1px 2px rgba(255,255,255,0.8)");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
      
      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
      d3.select(event.sourceEvent.target).attr("cursor", "grabbing");
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
      d3.select(event.sourceEvent.target).attr("cursor", "grab");
    }

  }, [dimensions]);

  return (
    <div className="flex flex-col gap-8">
        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
             <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-accent block"></span>
                {t('lab.network_title')}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-2xl">
                {t('lab.network_desc')}
            </p>
             <div className="bg-blue-50 text-blue-800 text-xs px-4 py-2 rounded-full border border-blue-100 inline-flex items-center gap-2 font-medium">
                <Info size={14} /> {t('lab.network_tip')}
            </div>
        </section>

        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden relative" ref={wrapperRef}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <svg 
                ref={svgRef} 
                width={dimensions.width} 
                height={dimensions.height} 
                className="bg-slate-50/50 cursor-move"
            />
            <div className="absolute bottom-6 left-6 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-md border border-gray-100 text-xs pointer-events-none z-10">
                <div className="font-bold mb-3 text-gray-400 uppercase tracking-widest text-[10px]">{t('lab.legend')}</div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-4 h-4 rounded-full bg-amber-600 shadow-sm border border-white"></span> 
                    <span className="font-medium text-gray-700">{t('lab.legend_magazine')}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 rounded-full bg-slate-500 shadow-sm border border-white"></span> 
                    <span className="font-medium text-gray-700">{t('lab.legend_person')}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm border border-white"></span> 
                    <span className="font-medium text-gray-700">{t('lab.legend_topic')}</span>
                </div>
            </div>
        </div>
    </div>
  );
};


const VisualizationLab: React.FC = () => {
  const location = useLocation();
  const isTimeline = location.pathname.includes('/timeline');
  const { t } = useLanguage();

  return (
    <div className="bg-paper min-h-screen pt-10 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-10 animate-fade-in-up">
            <h2 className="text-4xl font-serif font-bold text-ink flex items-center gap-4 mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                    <Network className="text-accent" size={32} />
                </div>
                {t('lab.title')}
            </h2>
            <p className="text-gray-600 max-w-3xl text-lg leading-relaxed font-light pl-1">
                {t('lab.desc')}
            </p>
        </div>

        {/* Navigation Tabs - Floating Style */}
        <div className="flex gap-4 mb-8">
            <Link 
                to="/lab" 
                className={`px-8 py-3 font-bold text-sm rounded-full flex items-center gap-2 transition-all shadow-sm ${!isTimeline ? 'bg-white text-accent ring-2 ring-accent ring-offset-2' : 'bg-gray-200/50 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow-md'}`}
            >
                <GitGraph size={18} /> {t('lab.tab_network')}
            </Link>
            <Link 
                to="/lab/timeline" 
                className={`px-8 py-3 font-bold text-sm rounded-full flex items-center gap-2 transition-all shadow-sm ${isTimeline ? 'bg-white text-accent ring-2 ring-accent ring-offset-2' : 'bg-gray-200/50 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow-md'}`}
            >
                <Calendar size={18} /> {t('lab.tab_timeline')}
            </Link>
        </div>
        
        {/* Content Area with Fade Transition */}
        <div className="animate-fade-in">
            {isTimeline ? <TimelineView /> : <NetworkGraph />}
        </div>

      </div>
    </div>
  );
};

export default VisualizationLab;