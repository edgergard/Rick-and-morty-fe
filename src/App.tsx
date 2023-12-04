import './utils/normalize.scss'
import './App.scss'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Home } from './components/Home/Home'
import { CharacterPage } from './components/CharacterPage/CharacterPage'

function App() {

  return (
    <>
      <Header />
      <Home />
      <CharacterPage />
      <Footer />
    </>
  )
}

export default App
