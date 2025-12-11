import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MOCK_MAGAZINES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Info, MousePointer2 } from 'lucide-react';
import { Magazine } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const TimelineView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [hoveredMag, setHoveredMag] = useState<Magazine | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { language, t } = useLanguage();

  // Group magazines by country for better visualization structure
  const magazinesByCountry = d3.group(MOCK_MAGAZINES, d => d.country);
  const countries = Array.from(magazinesByCountry.keys()).sort();

  useEffect(() => {
    const handleResize = () => {
        if(wrapperRef.current) {
            // Calculate height based on number of items plus padding for groups
            const totalItems = MOCK_MAGAZINES.length;
            const groups = countries.length;
            const dynamicHeight = Math.max(600, (totalItems * 35) + (groups * 50) + 100);
            
            setDimensions({
                width: wrapperRef.current.clientWidth,
                height: dynamicHeight
            });
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update mouse position for tooltip
  const handleMouseMove = (e: React.MouseEvent) => {
      if (wrapperRef.current) {
          const rect = wrapperRef.current.getBoundingClientRect();
          setMousePos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
          });
      }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 60, right: 50, bottom: 50, left: 180 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Sort data: Country alphabetical, then Year Start
    const sortedData = [...MOCK_MAGAZINES].sort((a, b) => {
        if (a.country === b.country) return a.year - b.year;
        return a.country.localeCompare(b.country);
    });

    // Create a mapping for Y position allowing for gaps between countries
    let currentY = 0;
    const yPositions = new Map<string, number>();
    const countryLabels: {country: string, y: number}[] = [];
    let lastCountry = "";

    sortedData.forEach((mag) => {
        if (mag.country !== lastCountry) {
            if (lastCountry !== "") currentY += 40; // Gap between countries
            countryLabels.push({ country: mag.country, y: currentY });
            lastCountry = mag.country;
        }
        yPositions.set(mag.id, currentY);
        currentY += 30; // Height per bar
    });
    
    const contentHeight = currentY;

    // X Scale (Time)
    const minYear = 1890;
    const maxYear = 1970;
    const xScale = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([0, width]);

    // Color Scale - Muted Professional Palette
    const colorScale = d3.scaleOrdinal()
        .domain(countries)
        .range([
            "#d97706", "#2563eb", "#db2777", "#ea580c", 
            "#059669", "#7c3aed", "#0891b2", "#be123c",
            "#4b5563", "#4f46e5"
        ]);

    // Grid lines (vertical)
    g.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${contentHeight})`)
        .style("stroke-dasharray", ("4,6"))
        .style("opacity", 0.15)
        .call(d3.axisBottom(xScale)
            .tickSize(-contentHeight)
            .tickFormat(() => "")
        )
        .select(".domain").remove();

    // X Axis Top
    const xAxisTop = d3.axisTop(xScale).tickFormat(d3.format("d"));
    g.append("g")
        .call(xAxisTop)
        .attr("font-size", "11px")
        .attr("font-family", "Inter, sans-serif")
        .attr("font-weight", "600")
        .attr("color", "#64748b")
        .select(".domain").remove();

    // X Axis Bottom
    const xAxisBottom = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    g.append("g")
        .attr("transform", `translate(0,${contentHeight})`)
        .call(xAxisBottom)
        .attr("font-size", "11px")
        .attr("font-family", "Inter, sans-serif")
        .attr("color", "#94a3b8")
        .select(".domain").attr("stroke", "#e2e8f0");

    // Y Axis Group
    const yAxisGroup = g.append("g");
    
    // Magazine Bars with Animation
    const bars = g.selectAll(".bar")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.year))
        .attr("y", d => yPositions.get(d.id) || 0)
        .attr("width", 0) // Start at 0 for animation
        .attr("height", 18)
        .attr("rx", 4)
        .attr("fill", d => colorScale(d.country) as string)
        .attr("cursor", "pointer")
        .attr("opacity", 0.8)
        .style("filter", "drop-shadow(0px 1px 2px rgba(0,0,0,0.1))")
        .on("mouseenter", (event, d) => {
            d3.select(event.currentTarget)
                .transition().duration(200)
                .attr("opacity", 1)
                .attr("height", 22)
                .attr("y", (yPositions.get(d.id) || 0) - 2)
                .style("filter", "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))");
            setHoveredMag(d);
        })
        .on("mouseleave", (event, d) => {
            d3.select(event.currentTarget)
                .transition().duration(200)
                .attr("opacity", 0.8)
                .attr("height", 18)
                .attr("y", yPositions.get(d.id) || 0)
                .style("filter", "drop-shadow(0px 1px 2px rgba(0,0,0,0.1))");
            setHoveredMag(null);
        })
        .on("click", (event, d) => {
            navigate(`/documento/${d.id}`);
        });

    // Animation transition
    bars.transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .delay((d, i) => i * 30) // Staggered delay
        .attr("width", d => {
            const end = d.yearEnd || (d.year + 1);
            return Math.max(8, xScale(end) - xScale(d.year));
        });

    // Magazine Labels (Next to bar)
    const labels = g.selectAll(".mag-label")
        .data(sortedData)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.year) - 10) // Start slightly offset
        .attr("y", d => (yPositions.get(d.id) || 0) + 13)
        .text(d => d.title)
        .attr("font-size", "11px")
        .attr("font-family", "Merriweather, serif")
        .attr("fill", "#334155")
        .attr("alignment-baseline", "middle")
        .attr("opacity", 0)
        .style("cursor", "pointer")
        .on("click", (event, d) => navigate(`/documento/${d.id}`));

    // Animate Labels sliding in
    labels.transition()
        .duration(800)
        .delay((d, i) => i * 30 + 400)
        .attr("x", d => {
            const end = d.yearEnd || (d.year + 1);
            return xScale(end) + 12;
        })
        .attr("opacity", 1);

    // Connecting Lines (Country to First Bar) - decorative
    yAxisGroup.selectAll(".country-line")
        .data(countryLabels)
        .enter()
        .append("line")
        .attr("x1", -15)
        .attr("x2", 0)
        .attr("y1", d => d.y + 13)
        .attr("y2", d => d.y + 13)
        .attr("stroke", d => colorScale(d.country) as string)
        .attr("stroke-width", 2)
        .attr("opacity", 0.5);

    // Y Axis Labels (Countries)
    yAxisGroup.selectAll(".country-group-label")
        .data(countryLabels)
        .enter()
        .append("text")
        .attr("x", -25)
        .attr("y", d => d.y + 14)
        .text(d => d.country)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("font-family", "Inter, sans-serif")
        .attr("font-weight", "700")
        .attr("letter-spacing", "0.05em")
        .attr("fill", d => colorScale(d.country) as string)
        .attr("opacity", 0)
        .transition().duration(1000).attr("opacity", 1);

  }, [dimensions, navigate]);

  return (
    <div className="flex flex-col gap-8">
        {/* Intro Section */}
        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-accent block"></span>
                {t('timeline.title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
                <div>
                    <p className="mb-4">
                        {t('timeline.desc_p1')}
                    </p>
                    <p>
                        {t('timeline.desc_p2')}
                    </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 shadow-inner">
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-xs uppercase tracking-wide">
                        <Info size={14} className="text-accent" /> {t('timeline.data_title')}
                    </h4>
                    <ul className="space-y-2 text-xs">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                            {t('timeline.data_li1')}
                        </li>
                        <li className="flex items-start gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                             {t('timeline.data_li2')}
                        </li>
                        <li className="flex items-start gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                             {t('timeline.data_li3')}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Visualization Wrapper */}
        <div className="bg-white min-h-full rounded-xl shadow-xl border border-gray-200 overflow-hidden relative" ref={wrapperRef} onMouseMove={handleMouseMove}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
            
            {/* Canvas */}
            <div className="overflow-x-auto custom-scrollbar bg-slate-50/30">
                <svg 
                    ref={svgRef} 
                    width={dimensions.width} 
                    height={dimensions.height} 
                />
            </div>

            {/* Premium Hover Card (Tooltip) - Positioned dynamically near mouse or fixed */}
            {hoveredMag && (
                <div 
                    className="fixed pointer-events-none z-50 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-2xl border border-white/20 w-80 animate-fade-in-up"
                    style={{ 
                        left: Math.min(window.innerWidth - 340, mousePos.x + 40), // Prevent going off screen
                        top: Math.min(window.innerHeight - 200, mousePos.y + 100),
                        transform: 'translateY(-50%)' 
                    }}
                >
                    <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-3">
                        <span className="text-[10px] font-bold text-white bg-accent px-2 py-1 rounded shadow-sm tracking-wide uppercase">
                            {hoveredMag.country}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {hoveredMag.year} — {hoveredMag.yearEnd || '...'}
                        </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl leading-tight mb-2 text-slate-900">{hoveredMag.title}</h3>
                    <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                        {hoveredMag.description[language]}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-accent font-bold uppercase tracking-wide border-t border-dashed border-gray-200 pt-2">
                        <MousePointer2 size={12} className="animate-bounce-horizontal" /> {t('timeline.click_tooltip')}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default TimelineView;