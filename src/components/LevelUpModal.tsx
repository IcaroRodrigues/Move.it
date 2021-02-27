import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import { DarkModeContext } from '../contexts/DarkModeContext'
import styles from '../styles/components/LevelUpModal.module.css'

export default function LevelUpModal() {

  const { level, closeLevelUpModal } = useContext(ChallengesContext)
  const { darkModeIsActive } = useContext(DarkModeContext)

  return (
    <div className={`${styles.overlay} ${darkModeIsActive ? styles.darkModeIsActive : ''}`}>
      <div className={`${styles.container} ${darkModeIsActive ? styles.darkModeIsActive : ''}`}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fecar Modal"/>
        </button>
      </div>
    </div>
  )
}
