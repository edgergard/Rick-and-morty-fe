import '../../utils/normalize.scss'
import './Header.scss'
import Logo from '../../../public/images/logo.svg'
import BackgroundImage from '../../../public/images/rick-and-morty-image.svg'

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__top">
        <img
          src={Logo}
          alt="logo"
          className="header__top-logo"
        />
      </div>

      <div className="header__bottom">
        <img
          src={BackgroundImage}
          alt="background-image"
          className="header__bottom-background-image"
        />

        <h1 className="header__bottom-title">
          The Rick and Morty API
        </h1>
      </div>
    </header>
  )
}