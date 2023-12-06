import './CharacterCard.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Character } from '../../types/Character';

type Props = {
  character: Character;
};

export const CharacterCard: React.FC<Props> = ({ character }) => {
  const {
    name,
    status,
    species,
    image,
    location,
    episode,
    id,
  } = character;

  return (
    <div className="card">
      <Link to={`/character/${id}`}>
        <img
          src={image}
          alt="card"
          className="card__image"
        />
      </Link>

      <div className="card__body">
        <Link to="/character" className="card__body-name">
          {name}
        </Link>

        <div className="card__body-status">
          <div className={classNames('card__body-status-mark', {
            'status-mark-green': status === 'Alive',
            'status-mark-red': status === 'Dead',
            'status-mark-grey': status === 'unknown',
          })}
          />
          <p className="card__body-status-title">
            {`${status} - ${species}`}
          </p>
        </div>

        <div className="card__body-location">
          <p className="card__body-title">Last known location:</p>
          <p className="card__body-text">{location.name}</p>
        </div>

        <div className="card__body-appearence">
          <p className="card__body-title">First seen in:</p>
          <p className="card__body-text">
            {episode[0].name}
          </p>
        </div>

      </div>
    </div>
  );
};
