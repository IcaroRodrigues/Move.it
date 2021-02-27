import { DarkModeProvider } from "../contexts/DarkModeContext"
import "../styles/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
    </DarkModeProvider>
  )
}

export default MyApp
