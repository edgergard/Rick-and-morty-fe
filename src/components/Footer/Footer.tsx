/* eslint-disable jsx-a11y/control-has-associated-label */
import '../../utils/normalize.scss';
import './Footer.scss';
import IncodeLogo from '../../images/incode-logo.svg';
import IncodeLogoGlow from '../../images/incode-logo-glow.svg';
import { IconGithub } from '../Icons/IconsLink/IconGithub';
import { IconTwitter } from '../Icons/IconsLink/IconTwitter';
import { IconHeart } from '../Icons/IconsLink/IconHeart';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__text">
        <p>PERFORMED AS A PART OF A TEST</p>
        <p>CASE FOR THE COMPANY</p>
      </div>

      <div className="footer__logo">
        <a
          href="https://www.incode-group.com/"
          className="footer__logo-image"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={IncodeLogo}
            alt="incode-logo"
          />
        </a>

        <img
          src={IncodeLogoGlow}
          alt="incode-logo-glow"
          className="footer__logo-glow"
        />
      </div>

      <div className="footer__link">
        <a
          href="https://github.com/edgergard/Rick-and-morty-fe"
          target="_blank"
          rel="noreferrer"
        >
          <IconGithub />
        </a>

        <a
          href="https://twitter.com/rickandmortyapi"
          target="_blank"
          rel="noreferrer"
        >
          <IconTwitter />
        </a>

        <a
          href="https://rickandmortyapi.com/support-us/"
          target="_blank"
          rel="noreferrer"
        >
          <IconHeart />
        </a>

      </div>

      <p className="footer__year">2023</p>
    </div>
  );
};
