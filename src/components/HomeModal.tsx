import { AiOutlineArrowRight } from 'react-icons/ai'

import styles from '../styles/components/HomeModal.module.css'

export default function HomeModal() {
  return (
      <div className={styles.homeModalContainer}>
        <div className={styles.container}>
          <img src="Simbolo.svg" alt="LogoBanner"/>
          <div className={styles.login}>
            <img src="Logo.svg"  alt=""/>
            <h1>Bem Vindo</h1>
            <span>
              <img src="GithubLogo.svg"width="38.33rem" alt=""/>
              Faça login com seu Github para começar
            </span>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="Digite seu username" />
              <button><AiOutlineArrowRight fontSize={'1.56rem'} color="#FFF" /></button>
            </div>
          </div>
        </div>
      </div>
  )
}
