import { CATEGORIES } from "../utils/constants";

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg border border-gray-300/30">
      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Status
        </label>
        <div className="flex space-x-2">
          {["all", "visited", "unvisited"].map((status) => (
            <button
              key={status}
              onClick={() => setFilters((prev) => ({ ...prev, status }))}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filters.status === status
                  ? "bg-telegram-button text-telegram-buttonText"
                  : "bg-gray-500/10 text-black hover:bg-gray-500/20"
              }`}
            >
              {status === "all" && "All"}
              {status === "visited" && "✅ Visited"}
              {status === "unvisited" && "🌍 To Visit"}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: "all" }))}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filters.category === "all"
                ? "bg-telegram-button text-telegram-buttonText"
                : "bg-gray-500/10 text-black hover:bg-gray-500/20"
            }`}
          >
            All Categories
          </button>
          {Object.values(CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setFilters((prev) => ({ ...prev, category }))}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filters.category === category
                  ? "bg-telegram-button text-telegram-buttonText"
                  : "bg-gray-500/10 text-black hover:bg-gray-500/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
