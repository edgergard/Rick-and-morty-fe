import './Card.scss'

import CardImage from '../../../public/images/card-image.png'

export const Card: React.FC = () => {
  return (
    <div className="card">
      <img
        src={CardImage}
        alt="card-image"
        className="card__image"
      />

      <div className="card__body">
        <p className="card__body-name">Aqua Rick</p>

        <div className="card__body-status">
          <div className="card__body-status-mark"></div>
          <p className="card__body-status-title">Unknown - Humanoid</p>
        </div>

        <div className="card__body-location">
          <p className="card__body-title" >Last known location:</p>
          <p className="card__body-text" >Citadel of Ricks</p>
        </div>

        <div className="card__body-appearence">
          <p className="card__body-title" >First seen in:</p>
          <p className="card__body-text">
            Close Rick-counters of the Rick Kind
          </p>
        </div>

      </div>
    </div>
  );
}