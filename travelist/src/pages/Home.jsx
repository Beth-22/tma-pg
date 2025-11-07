import { useState } from "react";
import Button from "../components/Button";
import DestinationCard from "../components/DestinationCard";
import FilterBar from "../components/FilterBar";
import EmptyState from "../components/EmptyState";
import AddDestinationModal from "../components/AddDestinationModal";

const Home = ({ destinations, setDestinations, likedCount }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "all", // Add status to filters
    category: "all",
  });

  // Filter destinations based on status AND category
  const filteredDestinations = destinations.filter((dest) => {
    const statusMatch =
      filters.status === "all" ||
      (filters.status === "visited" && dest.visited) ||
      (filters.status === "unvisited" && !dest.visited);

    const categoryMatch =
      filters.category === "all" || dest.category === filters.category;

    return statusMatch && categoryMatch;
  });

  const addDestination = (newDest) => {
    const destination = {
      id: Date.now().toString(),
      ...newDest,
      liked: false,
      visited: false,
      createdAt: new Date().toISOString(),
    };
    setDestinations((prev) => [...prev, destination]);
  };

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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-black">Discover Places</h2>
          <p className="text-gray-500 mt-1">
            {filteredDestinations.length} of {destinations.length} places •{" "}
            {likedCount} liked
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} size="lg">
          + Add Place
        </Button>
      </div>

      {/* Filters - Only show when there are destinations */}
      {destinations.length > 0 && (
        <FilterBar filters={filters} setFilters={setFilters} />
      )}

      {/* Destinations Grid */}
      {filteredDestinations.length === 0 ? (
        <EmptyState hasDestinations={destinations.length > 0} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredDestinations.map((destination) => (
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

      {/* Add Destination Modal */}
      {showAddModal && (
        <AddDestinationModal
          onClose={() => setShowAddModal(false)}
          onSave={addDestination}
        />
      )}
    </div>
  );
};

export default Home;
