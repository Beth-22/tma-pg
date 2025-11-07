import { useState, useEffect } from "react";

export const useTelegram = () => {
  const [user, setUser] = useState(null);
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    // Only initialize if Telegram WebApp is available
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Initialize Telegram WebApp
      tg.ready();
      tg.expand(); // Expand to full screen

      setWebApp(tg);
      setUser(tg.initDataUnsafe?.user);

      console.log("Telegram WebApp initialized:", tg.initDataUnsafe?.user);
    } else {
      console.log("Not in Telegram environment - running in standalone mode");
    }
  }, []);

  const closeApp = () => {
    webApp?.close();
  };

  return {
    user,
    webApp,
    closeApp,
    isTelegram: !!window.Telegram?.WebApp,
  };
};
