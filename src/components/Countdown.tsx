import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css'


export default function Countdown() {

  const { darkModeIsActive } = useContext(ChallengesContext)
  const { 
    minutes,
    seconds, 
    isActive, 
    startCountdown, 
    resetCountdown, 
    hasFinished
   } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={`${styles.countdownContainer} ${darkModeIsActive ? `${styles.darkModeIsActive}` : '' }`}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={`${styles.countdownButton} ${darkModeIsActive ? `${styles.darkModeIsActive}` : ''}`}
        >
          Ciclo encerrado
        </button>

      ) : (
          <>
            {isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive} ${darkModeIsActive ? `${styles.darkModeIsActive}` : ''}`}
                onClick={resetCountdown}
              >
                Abadonar ciclo
              </button>

            ) : (

              <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
              >
                Iniciar um ciclo

              </button>

              )}
          </>
        )}
    </div>
  )
}
