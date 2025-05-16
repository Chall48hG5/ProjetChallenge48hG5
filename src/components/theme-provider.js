"use client"

import { createContext, useContext } from "react"

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => null,
})

export const ThemeProvider = ({ children, ...props }) => {
  return (
    <ThemeContext.Provider value={{ theme: "dark", setTheme: () => null }} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
