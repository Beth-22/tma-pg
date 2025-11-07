const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300/30 mt-8">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-3 text-center">
          {/* Quick Stats */}
          <div className="flex space-x-6 text-sm text-gray-500">
            <span>✨ Discover</span>
            <span>❤️ Save</span>
            <span>🌎 Explore</span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            Made for travelers • Powered by Telegram
          </div>

          {/* Mini App Indicator */}
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span>Mini App Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
