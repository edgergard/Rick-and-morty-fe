import '../../utils/normalize.scss';
import './Header.scss';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../../public/images/rick-and-morty-image.svg';
import { IconLogo } from '../Icons/IconLogo/IconLogo';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="header__top">
        <IconLogo />
      </Link>

      <div className="header__bottom">
        <img
          src={BackgroundImage}
          alt="background"
          className="header__bottom-background-image"
        />

        <h1 className="header__bottom-title">
          The Rick and Morty API
        </h1>
      </div>
    </header>
  );
};
