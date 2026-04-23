import React, { useState } from 'react';
import { Newspaper, Search, ArrowLeft, ShieldCheck, Sparkles, Loader2, BookOpen } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // SIMULATING THE SEARCH: In a real app, this calls your Python Backend
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    setIsLoading(true);
    
    setTimeout(() => {
      // Generating 10 hot articles for the demo
      const mockResults = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `${query.charAt(0).toUpperCase() + query.slice(1)}: ${[
          "The Looming Crisis in Modern Systems",
          "A New Era of Innovation and Growth",
          "Why Traditional Models are Failing",
          "The Impact of AI on Future Policy",
          "Global Trends Shaping the Next Decade",
          "Case Study: Lessons from the Frontline",
          "The Economic Shift Nobody is Talking About",
          "Equity and Access in the Digital Age",
          "Policy Reform: What You Need to Know",
          "The Road Ahead: Predictions for 2027"
        ][i]}`,
        source: ["The Guardian", "WSJ", "Reuters", "The Atlantic", "AP News"][i % 5],
        bias: i % 2 === 0 ? "Left" : "Right",
        hotScore: 90 - (i * 5)
      }));
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  const openArticle = (article) => {
    // This creates the 30-40 line "Detailed Perspective" for the demo
    const detailedContent = `The current landscape of ${query} is undergoing a seismic shift that few experts predicted only a decade ago. Historically, the approach to ${query} was defined by centralized institutional control and rigid frameworks that left little room for individual agency or technological disruption. However, as global connectivity increases, the cracks in this old system are becoming impossible to ignore. Critics argue that the current model is failing to keep pace with the rapid evolution of digital infrastructure, leaving marginalized communities further behind while rewarding those already at the top of the economic ladder.

    Furthermore, the integration of artificial intelligence into the ${query} sector has created a paradox: while efficiency has reached an all-time high, the human element—the core of why we care about ${query}—is being eroded by algorithmic decision-making. We see this play out in policy debates across the globe, where the push for "data-driven results" often ignores the qualitative experiences of the people on the ground. In many regions, the focus has shifted entirely toward short-term gains, sacrificing the long-term sustainability of the ${query} ecosystem for immediate political or financial optics.

    The 30-40 lines of detail continue here, highlighting that without a fundamental rethink of how we value human input in ${query}, we risk creating a future that is technically perfect but socially hollow. This is the central tension of our time: how do we balance the undeniable benefits of technological progress with the essential need for human-centric ethics? As we look toward the next fiscal year, the decisions made today regarding ${query} will echo for generations. We must choose between a path of inclusive, transparent growth or one of opaque, consolidated power that serves the few at the expense of the many. The data suggests we are at a tipping point, and the window for meaningful intervention is closing faster than most are willing to admit...`;

    setSelectedArticle({
      ...article,
      fullText: detailedContent,
      opposingTitle: `The Case for Deregulated ${query}: Why Markets Solve Problems Better Than Governments`,
      opposingSource: "The National Review",
      opposingText: `While the mainstream alarmism regarding ${query} suggests a need for more oversight, the reality is that market-driven competition has always been the most effective engine for progress. Centralized planning in the ${query} sector historically leads to stagnation and bureaucratic bloat. Instead of fearing technological disruption, we should be embracing the efficiency that comes from private sector innovation.

      The argument that ${query} is a 'human-centric' field that cannot be quantified is often a shield used by failing institutions to avoid accountability. When we introduce competitive pressure, we force ${query} providers to actually deliver results. The future of ${query} doesn't belong to regulators; it belongs to the entrepreneurs and disruptors who are willing to take risks and challenge the status quo...`
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <header className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-2">
          <Sparkles className="text-blue-600"/> ECHO-BREAKER
        </h1>
        
        {/* THE SEARCH BAR */}
        <form onSubmit={handleSearch} className="relative w-full max-w-xl">
          <input 
            type="text" 
            className="w-full p-4 pl-12 bg-white rounded-2xl shadow-sm border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Search topic (e.g. Education)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
        </form>
      </header>

      <main className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <h2 className="text-xl font-bold">Fetching 10 Hot Articles...</h2>
          </div>
        ) : !selectedArticle ? (
          
          /* VIEW 1: SEARCH RESULTS (10 Articles) */
          <div className="grid grid-cols-1 gap-4 animate-in fade-in duration-500">
            {results ? (
              <>
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Trending News: {query}</h2>
                {results.map((article) => (
                  <div 
                    key={article.id} 
                    onClick={() => openArticle(article)}
                    className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 cursor-pointer shadow-sm transition-all flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-black px-2 py-1 rounded ${article.bias === 'Left' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                          {article.bias}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{article.source}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{article.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-blue-500">{article.hotScore}% Hot</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Enter a topic above to break the filter bubble.</p>
              </div>
            )}
          </div>
        ) : (
          
          /* VIEW 2: THE 40-LINE DEEP DIVE BRIDGE */
          <div className="animate-in slide-in-from-bottom-8 duration-500 pb-20">
            <button onClick={() => setSelectedArticle(null)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
              <ArrowLeft size={20}/> Back to Results
            </button>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600"><ShieldCheck size={20}/></div>
                <span className="text-sm font-bold text-slate-600 tracking-tight">AI Verified Perspective Bridge Active (89% Semantic Alignment)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* SIDE A: THE DEEP DETAIL (30-40 LINES) */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-t-[12px] border-blue-500">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen size={16} className="text-blue-600"/>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{selectedArticle.source} (Deep Dive)</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-800 leading-tight">{selectedArticle.title}</h3>
                <div className="text-slate-600 leading-[1.8] space-y-4 whitespace-pre-line font-medium text-lg">
                  {selectedArticle.fullText}
                </div>
              </div>

              {/* SIDE B: THE OPPOSING BRIDGE */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-[12px] border-red-500 relative">
                <div className="absolute -top-4 right-8 bg-amber-400 text-white px-4 py-1 rounded-full text-xs font-black tracking-tighter flex items-center gap-1 shadow-md">
                   <Sparkles size={12}/> BUBBLE BREAKER
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400 mb-2 block">{selectedArticle.opposingSource}</span>
                <h3 className="text-2xl font-bold mb-6 text-slate-800 leading-tight">{selectedArticle.opposingTitle}</h3>
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-slate-700 leading-relaxed italic text-lg">
                   {selectedArticle.opposingText}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;