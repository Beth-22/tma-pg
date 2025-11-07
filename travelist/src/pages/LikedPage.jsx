import DestinationCard from "../components/DestinationCard";
import EmptyState from "../components/EmptyState";

const LikedPage = ({ destinations, setDestinations }) => {
  const likedDestinations = destinations.filter((dest) => dest.liked);

  const toggleVisited = (id) => {
    setDestinations((prev) =>
      prev.map((dest) =>
        dest.id === id ? { ...dest, visited: !dest.visited } : dest
      )
    );
  };

  const toggleLike = (id) => {
    setDestinations((prev) =>
      prev.map((dest) =>
        dest.id === id ? { ...dest, liked: !dest.liked } : dest
      )
    );
  };

  const deleteDestination = (id) => {
    setDestinations((prev) => prev.filter((dest) => dest.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black">❤️ Liked Places</h2>
        <p className="text-gray-500 mt-1">
          {likedDestinations.length} loved destinations
        </p>
      </div>

      {likedDestinations.length === 0 ? (
        <EmptyState
          hasDestinations={destinations.length > 0}
          isLikedPage={true}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {likedDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onToggleVisited={toggleVisited}
              onToggleLike={toggleLike}
              onDelete={deleteDestination}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedPage;
