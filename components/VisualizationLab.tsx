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

    const simulation = d3.forceSimulation(MOCK_GRAPH_DATA.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(MOCK_GRAPH_DATA.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(MOCK_GRAPH_DATA.links)
      .join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(MOCK_GRAPH_DATA.nodes)
      .join("circle")
      .attr("r", (d) => d.group === 1 ? 12 : 8) // Bigger nodes for magazines
      .attr("fill", (d) => {
          if (d.group === 1) return "#d97706"; // Magazines (Amber)
          if (d.group === 2) return "#4b5563"; // People (Gray)
          return "#2563eb"; // Topics (Blue)
      })
      .call((d3.drag() as any)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title")
      .text((d: any) => d.label);

    const labels = svg.append("g")
        .selectAll("text")
        .data(MOCK_GRAPH_DATA.nodes)
        .join("text")
        .text((d: any) => d.label)
        .attr("font-size", "10px")
        .attr("dx", 15)
        .attr("dy", 4)
        .attr("fill", "#333");

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
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

  }, [dimensions]);

  return (
    <div className="flex flex-col gap-8">
        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
             <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
                {t('lab.network_title')}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {t('lab.network_desc')}
            </p>
             <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded border border-blue-100 inline-block">
                <strong>{t('lab.network_tip')}</strong>
            </div>
        </section>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative" ref={wrapperRef}>
            <svg 
                ref={svgRef} 
                width={dimensions.width} 
                height={dimensions.height} 
                className="bg-slate-50 cursor-move"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded shadow backdrop-blur-sm border border-gray-200 text-xs pointer-events-none">
                <div className="font-bold mb-1">{t('lab.legend')}</div>
                <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-amber-600"></span> {t('lab.legend_magazine')}</div>
                <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-gray-600"></span> {t('lab.legend_person')}</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600"></span> {t('lab.legend_topic')}</div>
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
    <div className="bg-paper min-h-screen pt-6 pb-12">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-ink flex items-center gap-3">
                <Network className="text-accent" />
                {t('lab.title')}
            </h2>
            <p className="text-gray-600 mt-2 max-w-3xl text-lg leading-relaxed">
                {t('lab.desc')}
            </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-0 border-b border-gray-200">
            <Link 
                to="/lab" 
                className={`px-6 py-3 font-medium text-sm rounded-t-lg flex items-center gap-2 transition-colors relative top-[1px] ${!isTimeline ? 'bg-white text-accent border border-gray-200 border-b-white shadow-sm z-10' : 'bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 border-transparent'}`}
            >
                <GitGraph size={18} /> {t('lab.tab_network')}
            </Link>
            <Link 
                to="/lab/timeline" 
                className={`px-6 py-3 font-medium text-sm rounded-t-lg flex items-center gap-2 transition-colors relative top-[1px] ${isTimeline ? 'bg-white text-accent border border-gray-200 border-b-white shadow-sm z-10' : 'bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 border-transparent'}`}
            >
                <Calendar size={18} /> {t('lab.tab_timeline')}
            </Link>
        </div>
        
        {/* Content Area */}
        <div className="animate-fade-in bg-white/50 pt-8 rounded-b-lg">
            {isTimeline ? <TimelineView /> : <NetworkGraph />}
        </div>

      </div>
    </div>
  );
};

export default VisualizationLab;