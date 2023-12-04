import './CharacterPage.scss'
import CharacterImage from '../../../public/images/page-image.png'

export const CharacterPage: React.FC = () => {
  return (
    <div className="container-character-page">
      <div className="character-page">
        <div className="character">
          <img
            src={CharacterImage}
            alt="character-image"
            className="character__image"
          />

          <div className="character__body">
            <p className="character__body-name">Aqua Rick</p>

            <div className="character__body-status">
              <div className="character__body-status-mark"></div>
              <p className="character__body-status-title">Unknown - Humanoid</p>
            </div>

            <div className="character__body-location">
              <p className="character__body-title" >Last known location:</p>
              <p className="character__body-text" >Citadel of Ricks</p>
            </div>

            <div className="character__body-appearence">
              <p className="character__body-title" >First seen in:</p>
              <p className="character__body-text">
                Close Rick-counters of the Rick Kind
              </p>
            </div>

            <div>
              <p className="character__body-title" >
                Other info
              </p>

              <div className="container-character__body-text">
                <p className="character__body-text">
                  The Mosaic Rooms are a leading non-profit arts
                  organisation and bookshop dedicated to supporting
                  and promoting contemporary culture from
                  the Arab world and beyond in London.
                </p>

                <p className="character__body-text">
                  Established in 2009, as a project of the A.M.
                  Qattan Foundation, it dedicates its work to
                  championing creative and critical voices that
                  are often underrepresented.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}