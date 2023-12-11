import './CharacterPage.scss';

import classNames from 'classnames';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCharacter } from '../../utils/graphql-query';

export const CharacterPage: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(getCharacter(+(id ?? '')));
  const character = data?.character;

  if (error) {
    return <p>{`Error: ${error.message}`}</p>;
  }

  return (
    loading ? (
      <div className="container-loader">
        <CircularProgress
          style={{ color: 'white' }}
          size={100}
        />
      </div>
    ) : (
      <div className="container-character-page">
        <div className="character-page">
          <div className="character">
            <img
              src={character?.image}
              alt="character"
              className="character__image"
            />

            <div className="character__body">
              <p className="character__body-name">{character?.name}</p>

              <div className="card__body-status">
                <div className={classNames('card__body-status-mark', {
                  'status-mark-green': character?.status === 'Alive',
                  'status-mark-red': character?.status === 'Dead',
                  'status-mark-grey': character?.status === 'unknown',
                })}
                />
                <p className="card__body-status-title">
                  {`${character?.status} - ${character?.species}`}
                </p>
              </div>

              <div className="character__body-location">
                <p className="character__body-title">Last known location:</p>
                <p className="character__body-text">
                  {character?.location.name}
                </p>
              </div>

              <div className="character__body-appearence">
                <p className="character__body-title">First seen in:</p>
                <p className="character__body-text">
                  {character?.episode[0].name}
                </p>
              </div>

              <div className="character__body-info">
                <p className="character__body-title">Other info</p>

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
    )
  );
};
