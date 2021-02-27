import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile() {

  const { darkModeIsActive, level } = useContext(ChallengesContext)

  return (
    <div className={`${styles.profileContainer} ${darkModeIsActive ? `${styles.darkModeisActive}` : '' }`}>
      <img src="https://github.com/IcaroRodrigues.png" alt="Icaro Rodrigues" />
      <div>
        <strong>Icaro Rodrigues</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
            Level { level }
        </p>
      </div>
    </div>
  )
}
