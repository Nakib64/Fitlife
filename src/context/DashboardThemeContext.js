"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DashboardThemeContext = createContext();

export function DashboardThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("dashboard-theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Save whenever it changes
  useEffect(() => {
    localStorage.setItem("dashboard-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <DashboardThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DashboardThemeContext.Provider>
  );
}

export const useDashboardTheme = () => useContext(DashboardThemeContext);
