import { createContext, useState, ReactNode, HTMLAttributes, useEffect } from 'react'

import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye',
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  experienceToNextLevel: number
  challengesCompleted: number
  activeChallenge: Challenge
  darkModeIsActive: boolean
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  setDarkMode: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps ) {



  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [darkModeIsActive, setDarkModeIsActive] = useState(false)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')
    if ( darkMode ) {
      setDarkModeIsActive(JSON.parse(darkMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkModeIsActive))
    
  }, [darkModeIsActive])

  function levelUp() {

    setLevel(level + 1)
  }

  function startNewChallenge() {

    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
  
    setActiveChallenge(challenge)
  }

  function resetChallenge() {

    setActiveChallenge(null)
  }

  function setDarkMode() {

    setDarkModeIsActive(!darkModeIsActive)
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        darkModeIsActive,
        setDarkMode,
      }}
    >
      {children}
    
    </ChallengesContext.Provider>
  )
}
