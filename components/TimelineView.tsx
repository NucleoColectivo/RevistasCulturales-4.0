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

    // Color Scale
    const colorScale = d3.scaleOrdinal()
        .domain(countries)
        .range(d3.schemeTableau10);

    // Grid lines (vertical)
    g.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${contentHeight})`)
        .style("stroke-dasharray", ("3,3"))
        .style("opacity", 0.1)
        .call(d3.axisBottom(xScale)
            .tickSize(-contentHeight)
            .tickFormat(() => "")
        );

    // X Axis Top
    const xAxisTop = d3.axisTop(xScale).tickFormat(d3.format("d"));
    g.append("g")
        .call(xAxisTop)
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .select(".domain").remove();

    // X Axis Bottom
    const xAxisBottom = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    g.append("g")
        .attr("transform", `translate(0,${contentHeight})`)
        .call(xAxisBottom)
        .attr("font-size", "12px")
        .select(".domain").attr("stroke", "#e2e8f0");

    // Country Group Labels (Left side)
    const yAxisGroup = g.append("g");
    
    // Magazine Bars
    g.selectAll(".bar")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.year))
        .attr("y", d => yPositions.get(d.id) || 0)
        .attr("width", d => {
            const end = d.yearEnd || (d.year + 1);
            // Min width of 4px for visibility
            return Math.max(4, xScale(end) - xScale(d.year));
        })
        .attr("height", 20)
        .attr("rx", 3)
        .attr("fill", d => colorScale(d.country) as string)
        .attr("cursor", "pointer")
        .attr("opacity", 0.85)
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("opacity", 1).attr("stroke", "#333").attr("stroke-width", 1);
            setHoveredMag(d);
        })
        .on("mouseout", (event) => {
            d3.select(event.currentTarget).attr("opacity", 0.85).attr("stroke", "none");
            setHoveredMag(null);
        })
        .on("click", (event, d) => {
            navigate(`/documento/${d.id}`);
        });

    // Magazine Labels (Next to bar)
    g.selectAll(".mag-label")
        .data(sortedData)
        .enter()
        .append("text")
        .attr("x", d => {
            const end = d.yearEnd || (d.year + 1);
            return xScale(end) + 8;
        })
        .attr("y", d => (yPositions.get(d.id) || 0) + 14)
        .text(d => d.title)
        .attr("font-size", "11px")
        .attr("fill", "#475569")
        .attr("alignment-baseline", "middle")
        .style("cursor", "pointer")
        .on("click", (event, d) => navigate(`/documento/${d.id}`));

    // Y Axis Labels (Magazines) - Left side, connected to Country
    yAxisGroup.selectAll(".country-group-label")
        .data(countryLabels)
        .enter()
        .append("text")
        .attr("x", -10)
        .attr("y", d => d.y + 14)
        .text(d => d.country)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", d => colorScale(d.country) as string);

  }, [dimensions, navigate]);

  return (
    <div className="flex flex-col gap-8">
        {/* Intro Section - Adapted from Tübingen Project content */}
        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
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
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Info size={16} className="text-accent" /> {t('timeline.data_title')}
                    </h4>
                    <ul className="list-disc list-inside space-y-2">
                        <li>{t('timeline.data_li1')}</li>
                        <li>{t('timeline.data_li2')}</li>
                        <li>{t('timeline.data_li3')}</li>
                        <li>{t('timeline.click_tooltip')}</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Visualization Wrapper */}
        <div className="bg-paper min-h-full" ref={wrapperRef}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative">
                
                {/* Canvas */}
                <div className="overflow-x-auto custom-scrollbar">
                    <svg 
                        ref={svgRef} 
                        width={dimensions.width} 
                        height={dimensions.height} 
                        className="bg-slate-50/30"
                    />
                </div>

                {/* Hover Card (Tooltip) */}
                {hoveredMag && (
                    <div 
                        className="fixed pointer-events-none z-50 bg-white p-4 rounded-lg shadow-2xl border border-gray-200 w-72 animate-fade-in ring-1 ring-black/5"
                        style={{ 
                            left: '50%', 
                            top: '50%', 
                            transform: 'translate(-50%, -50%)' 
                        }}
                    >
                        <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                            <span className="text-xs font-bold text-white bg-accent px-2 py-0.5 rounded shadow-sm">
                                {hoveredMag.country}
                            </span>
                            <span className="text-xs font-mono font-medium text-gray-500">
                                {hoveredMag.year} — {hoveredMag.yearEnd || '...'}
                            </span>
                        </div>
                        <h3 className="font-serif font-bold text-lg leading-tight mb-2 text-gray-900">{hoveredMag.title}</h3>
                        <p className="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {hoveredMag.description[language]}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-accent font-bold uppercase tracking-wide">
                            <MousePointer2 size={12} /> {t('timeline.click_tooltip')}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default TimelineView;