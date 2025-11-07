const ProfilePage = ({ user }) => {
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-center py-12">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-2xl font-bold text-black mb-2">
            Telegram User Data
          </h2>
          <p className="text-gray-500">
            User data will appear here when opened in Telegram
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="text-center py-8">
        {/* User Avatar */}
        {user.photo_url && (
          <img
            src={user.photo_url}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-telegram-button"
          />
        )}

        {/* User Info */}
        <h2 className="text-2xl font-bold text-black mb-2">
          {user.first_name} {user.last_name || ""}
        </h2>

        {user.username && (
          <p className="text-gray-500 mb-4">@{user.username}</p>
        )}

        {/* User Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md mx-auto text-left">
          <h3 className="font-semibold text-black mb-4">Profile Information</h3>

          <div className="space-y-3">
            <div>
              <span className="text-gray-500 text-sm">User ID:</span>
              <p className="text-black font-mono">{user.id}</p>
            </div>

            {user.language_code && (
              <div>
                <span className="text-gray-500 text-sm">Language:</span>
                <p className="text-black">{user.language_code}</p>
              </div>
            )}

            <div>
              <span className="text-gray-500 text-sm">Platform:</span>
              <p className="text-black">Telegram Mini App</p>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="mt-6 p-4 bg-telegram-button/10 rounded-lg max-w-md mx-auto">
          <p className="text-gray-500 text-sm">
            This app is running as a Telegram Mini App with secure user
            authentication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
