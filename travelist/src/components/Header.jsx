const Header = ({ currentPage, onPageChange, likedCount }) => {
  return (
    <header className="bg-white border-b border-gray-300/30 sticky top-0 z-10 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <button
            onClick={() => onPageChange("home")}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-telegram-button rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-telegram-buttonText text-xl">✈️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">Travel Explorer</h1>
            </div>
          </button>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            {/* Liked Page Button */}
            <button
              onClick={() => onPageChange("liked")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === "liked"
                  ? "bg-telegram-button text-telegram-buttonText"
                  : "text-black hover:bg-gray-500/10"
              }`}
            >
              <span>❤️</span>
              <span>Liked {likedCount > 0 && `(${likedCount})`}</span>
            </button>

            {/* Profile Button */}
            <button
              onClick={() => onPageChange("profile")}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentPage === "profile"
                  ? "bg-telegram-button text-telegram-buttonText"
                  : "text-black hover:bg-gray-500/10"
              }`}
            >
              <span className="text-lg">👤</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
