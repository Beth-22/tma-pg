const EmptyState = ({ hasDestinations, isLikedPage = false }) => {
  if (hasDestinations && isLikedPage) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💔</div>
        <h3 className="text-xl font-bold text-black mb-2">
          No liked destinations yet
        </h3>
        <p className="text-gray-500">
          Start liking places by tapping the heart icon on destination cards
        </p>
      </div>
    );
  }

  if (hasDestinations) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-black mb-2">
          No destinations found
        </h3>
        <p className="text-gray-500">
          Try changing your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16 px-4">
      <div className="text-8xl mb-6">🌎</div>
      <h3 className="text-2xl font-bold text-black mb-4">
        Your travel collection is empty
      </h3>
      <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
        Start adding amazing places you'd love to visit and build your personal
        travel collection!
      </p>
      <div className="text-gray-500 text-sm">
        Click "Add Place" to begin your journey
      </div>
    </div>
  );
};

export default EmptyState;
