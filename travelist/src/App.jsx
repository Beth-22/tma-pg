import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LikedPage from "./pages/LikedPage";
import ProfilePage from "./pages/ProfilePage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const [destinations, setDestinations] = useLocalStorage(
    "travelDestinations",
    []
  );
  const [currentPage, setCurrentPage] = useState("home");
  const { user } = useTelegram();

  // Get liked destinations count for the header
  const likedCount = destinations.filter((dest) => dest.liked).length;

  const renderPage = () => {
    switch (currentPage) {
      case "liked":
        return (
          <LikedPage
            destinations={destinations}
            setDestinations={setDestinations}
          />
        );
      case "profile":
        return <ProfilePage user={user} />;
      default:
        return (
          <Home
            destinations={destinations}
            setDestinations={setDestinations}
            likedCount={likedCount}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        likedCount={likedCount}
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
