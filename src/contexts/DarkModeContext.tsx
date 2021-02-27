import { createContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextData {
  darkModeIsActive: Boolean
  setDarkMode: () => void
}

interface DarkModeProviderProps {
  children: ReactNode
}

export const DarkModeContext = createContext({} as DarkModeContextData)

export function DarkModeProvider({ children }: DarkModeProviderProps) {

  const [darkModeIsActive, setDarkModeIsActive] = useState(false)

  function setDarkMode() {
    setDarkModeIsActive(!darkModeIsActive)
  }

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')
    if ( darkMode ) {
      setDarkModeIsActive(JSON.parse(darkMode))
    }
  }, [])

  useEffect(() => {
    
    localStorage.setItem('darkMode', JSON.stringify(darkModeIsActive))

  }, [darkModeIsActive])

  return (
    <DarkModeContext.Provider value={{
      darkModeIsActive,
      setDarkMode
    }}>
      {children}
    </DarkModeContext.Provider>
  )
}
