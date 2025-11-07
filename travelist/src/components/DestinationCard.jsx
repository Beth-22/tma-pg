import { CATEGORY_COLORS, CATEGORY_ICONS } from "../utils/constants";

const DestinationCard = ({
  destination,
  onToggleVisited,
  onToggleLike,
  onDelete,
}) => {
  const { id, name, image, note, category, visited, liked } = destination;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300/30 overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gray-500/20">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-4xl">🌍</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
              CATEGORY_COLORS[category] || "bg-gray-500"
            }`}
          >
            {CATEGORY_ICONS[category]} {category}
          </span>
        </div>

        {/* Visited Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              visited
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {visited ? "✅ Visited" : "🌍 To Visit"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-black mb-2">{name}</h3>

        {note && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{note}</p>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => onToggleVisited(id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                visited
                  ? "bg-gray-500/10 text-black hover:bg-gray-500/20"
                  : "bg-telegram-button text-telegram-buttonText hover:opacity-90"
              }`}
            >
              {visited ? "Mark Unvisited" : "Mark Visited"}
            </button>

            <button
              onClick={() => onToggleLike(id)}
              className={`p-1.5 rounded-lg transition-all ${
                liked
                  ? "bg-red-100 text-red-500 hover:bg-red-200"
                  : "bg-gray-500/10 text-black hover:bg-gray-500/20"
              }`}
              title={liked ? "Remove from liked" : "Add to liked"}
            >
              {liked ? "❤️" : "🤍"}
            </button>
          </div>

          <button
            onClick={() => onDelete(id)}
            className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
            title="Delete destination"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
