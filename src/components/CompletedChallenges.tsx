import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenges() {

  const { challengesCompleted, darkModeIsActive } = useContext(ChallengesContext)

  return (
    <div className={`${styles.completedChallengesContainer} ${darkModeIsActive ? `${styles.darkModeisActive}` : ''}`}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
