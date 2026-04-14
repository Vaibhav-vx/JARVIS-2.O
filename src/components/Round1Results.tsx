import { useState } from "react";
import { Search } from "lucide-react";

const shortlistedTeams = [
  "Snake",
  "Team Straw Hat",
  "CODE KNIGHTS",
  "TRON",
  "Team Quantum",
  "Akatsuki",
  "JUPYTER",
  "CtrlFreaks",
  "Team Diamond",
  "CODE CREW",
  "Idea Ignitors",
  "Quantmaniat",
  "Elevate",
  "Team Legion",
  "Team TARS",
  "Shiksha Shastra",
  "Beta Coders",
  "Hacku",
  "Team Volt",
  "Jugaad coder",
  "3 idiots",
  "NEURON NEXUS",
  "GlitchWave",
  "Hustlers",
  "DiagnoX",
  "Hexagon",
  "200_Ok",
  "TeamErrorists",
  "Tech Dynamites",
  "MOTION MASTER",
  "AlchemyX",
  "Brain Bots",
  "Procoders",
  "Byte_Conqueror",
  "Ghost coders",
  "AlgoMasters",
  "SYNTAX_BUILDER_SQUAD",
  "Team Elevate",
  "Quad squad",
  "Team Prodigy",
  "Team Crocodile 🐊",
  "Visionary Minds",
  "Logicloop",
  "Error08",
  "Tech coders",
  "mercury mind",
  "Team_Clutch",
  "CubicCube",
  "NeuralX",
  "Ramsethi",
];

const Round1Results = () => {
  const [search, setSearch] = useState("");

  const filteredTeams = shortlistedTeams.filter((team) =>
    team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto mt-12 sm:mt-16 tracking-wide">
      <div className="relative jarvis-panel p-4 sm:p-6 mb-4">
        {/* Header */}
        <h3 className="font-orbitron text-lg sm:text-xl font-bold text-center text-primary mb-4">
          ROUND 1 SHORTLIST
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
                  <span className="font-mono text-[10px] text-muted-foreground w-6 text-right shrink-0">
                    {String(shortlistedTeams.indexOf(team) + 1).padStart(2, '0')}.
                  </span>
                  <span className={team.includes("🐊") ? "text-green-400" : ""}>{team}</span>
                  {/* Verified tick for successfully finding their team */}
                  <span className="ml-auto text-primary text-xs opacity-70">CONFIRMED</span>
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

export default Round1Results;
