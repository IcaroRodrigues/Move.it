import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import { DarkModeContext } from '../contexts/DarkModeContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenges() {

  const { challengesCompleted } = useContext(ChallengesContext)
  const { darkModeIsActive } = useContext(DarkModeContext)

  return (
    <div className={`${styles.completedChallengesContainer} ${darkModeIsActive ? `${styles.darkModeisActive}` : ''}`}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
