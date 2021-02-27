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
  completedChallenge: () => void
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

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp() {

    setLevel(level + 1)
  }

  function startNewChallenge() {

    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
  
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play

    if ( Notification.permission === 'granted' ) {

      new Notification('Novo desafio 🎉',  {

        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {

    setActiveChallenge(null)
  }

  function setDarkMode() {

    setDarkModeIsActive(!darkModeIsActive)
  }

  function completedChallenge() {

    if ( !activeChallenge ) {

      return;
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if ( finalExperience >= experienceToNextLevel ) {
      
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
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
        completedChallenge
      }}
    >
      {children}
    
    </ChallengesContext.Provider>
  )
}
