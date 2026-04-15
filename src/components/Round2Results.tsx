import { useState } from "react";
import { Search } from "lucide-react";

const round2Teams = [
  "Team Elevate",
  "Hacku",
  "DiagnoX",
  "Jugaad coder",
  "Hexagon",
  "TeamErrorists",
  "Team Volt",
  "Team Crocodile 🐊",
  "Snake",
  "CtrlFreaks",
  "GlitchWave",
  "NeuralX",
  "CODE KNIGHTS",
  "Ghost coders",
  "Team Straw Hat",
  "Team Diamond",
  "CODE CREW",
  "200_Ok",
  "Tech Dynamites",
  "Elevate",
  "AlchemyX",
  "Quad squad",
  "NEURON NEXUS",
  "Brain Bots",
  "Team Prodigy",
  "JUPYTER",
  "Idea Ignitors",
  "Team TARS",
  "Logicloop",
  "Beta Coders",
  "Team_Clutch",
];

const Round2Results = () => {
  const [search, setSearch] = useState("");

  const filteredTeams = round2Teams.filter((team) =>
    team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto mt-8 sm:mt-12 tracking-wide">
      <div className="relative jarvis-panel p-4 sm:p-6 mb-4">
        {/* Header */}
        <h3 className="font-orbitron text-lg sm:text-xl font-bold text-center text-primary mb-4">
          ROUND 2 SHORTLIST
        </h3>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-primary/70" />
          </div>
          <input
            type="text"
            className="w-full bg-black/50 border border-primary/40 rounded py-2 pl-10 pr-4 text-sm font-mono text-primary placeholder-primary/50 focus:outline-none focus:border-primary transition-colors"
            placeholder="Search Team Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Scrollable Slider Container */}
        <div className="relative h-64 overflow-y-auto pr-2 custom-scrollbar jarvis-scrollbar">
          {filteredTeams.length > 0 ? (
            <ul className="space-y-2">
              {filteredTeams.map((team, idx) => (
                <li
                  key={idx}
                  className="font-rajdhani text-sm sm:text-base py-2 border-b border-primary/20 text-foreground flex items-center gap-3 hover:bg-primary/5 transition-colors px-2 rounded"
                >
                  <span className={team.includes("🐊") ? "text-green-400 font-bold" : "font-bold text-primary"}>{team}</span>
                  <span className="ml-auto text-primary text-xs opacity-70 border border-primary/50 px-2 py-0.5 rounded">QUALIFIED</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm font-mono">
              <span className="mb-2 opacity-50">NO MATCHES FOUND</span>
              <span className="text-[10px]">VERIFY TARGET DESIGNATION</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Round2Results;
