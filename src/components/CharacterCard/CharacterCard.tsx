import './CharacterCard.scss';
import classNames from 'classnames';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';
import { Character } from '../../types/Character';
import { History } from '../../types/History';

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

  const [history, setHistory] = useLocalStorage<History[]>('History', []);

  const handleClick = () => {
    const offset = 200;

    window.scrollTo({ top: offset, behavior: 'smooth' });
    setHistory([...history, {
      id,
      characterName: name,
      action: 'check',
      filters: null,
    }]);
  };

  return (
    <div className="card">
      <img
        src={image}
        alt="card"
        className="card__image"
      />

      <div className="card__body">
        <Link
          to={`/character/${id}`}
          className="card__body-name"
          onClick={handleClick}
        >
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
