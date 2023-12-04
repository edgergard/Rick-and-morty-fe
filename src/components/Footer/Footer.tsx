import '../../utils/normalize.scss'
import './Footer.scss'
import IncodeLogo from '../../../public/images/incode-logo.svg'
import IncodeLogoGlow from '../../../public/images/incode-logo-glow.svg'
import GithubIcon from '../../../public/images/github-icon.svg'
import TwitterIcon from '../../../public/images/twitter-icon.svg'
import HeartIcon from '../../../public/images/heart-icon.svg'

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

      <div className="footer__links">
        <a href="https://github.com/MaksLitus/demo-app" target="_blank">
        <img
          src={GithubIcon}
          alt="github-icon"
          className=""
        />
        </a>

        <a href="https://twitter.com/rickandmortyapi" target="_blank">
        <img
          src={TwitterIcon}
          alt="twitter-icon"
          className=""
        />
        </a>

        <a href="https://rickandmortyapi.com/support-us/" target="_blank">
        <img
          src={HeartIcon}
          alt="heart-icon"
          className=""
        />
        </a>

      </div>

      <p className="footer__year">2023</p>
    </div>
  )
}