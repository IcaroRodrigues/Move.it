import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'
import HomeModal from '../components/HomeModal'
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
  closeLevelUpModal: () => void
  setDarkMode: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps ) {

  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState( rest.challengesCompleted ?? 0)
  const [darkModeIsActive, setDarkModeIsActive] = useState(true)

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {

    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
    
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {

    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
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
        completedChallenge,
        closeLevelUpModal
      }}
    >
      {/* <HomeModal /> */}

      {children}
      
      { isLevelUpModalOpen && <LevelUpModal /> } 
    </ChallengesContext.Provider>
  )
}
