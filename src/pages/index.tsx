import Head from 'next/head'

import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import ChallengeBox from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css'
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';

export default function Home() {

  const { darkModeIsActive, setDarkMode } = useContext(ChallengesContext)
  
  return (
    <body className={`${ darkModeIsActive ? 'darkModeIsActive' : ''}`}>
      <div className={`${styles.container} `}>

        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />

        <section>
          <div >
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>


        {darkModeIsActive ? 
        
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" onClick={setDarkMode} className={styles.darkModeButton}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" ></path></svg>
        :

          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" onClick={setDarkMode} className={styles.darkModeButton}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        }
        
        <img  alt="" onClick={setDarkMode} />
      </div>
    </body>
  )
}
