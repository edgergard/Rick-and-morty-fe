import './Home.scss';
import React, { useEffect } from 'react';
import { CircularProgress, Pagination, PaginationItem } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { setCharacters } from '../../store/slices/charactersSlice';
import { CardList } from '../CardList/CardList';
import { getCharacters } from '../../utils/graphql-query';
import { Filter } from '../Filter/Filter';
import { CharacterFilter } from '../../types/Filters';
import { useAppSelector } from '../../utils/hooks';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { characters } = useAppSelector(state => state.characters);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || '1');
  const charName = (searchParams.get('char-name') || '');
  const charStatus = (searchParams.get('char-status') || '');
  const charSpecies = (searchParams.get('char-species') || '');
  const charType = (searchParams.get('char-type') || '');
  const charGender = (searchParams.get('char-gender') || '');

  const characterFilter: CharacterFilter = {
    name: charName,
    status: charStatus,
    species: charSpecies,
    type: charType,
    gender: charGender,
  };

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useQuery(getCharacters(page, characterFilter));

  const isPageExist = (charactersData
  && charactersData.characters
  && charactersData.characters.info
  && page > charactersData.characters.info.pages)
  || page <= 0;

  useEffect(() => {
    if (charactersData) {
      dispatch(setCharacters(charactersData.characters.results));
    }
  }, [charactersData]);

  if (charactersError) {
    return <p>{`Error: ${charactersError.message}`}</p>;
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>, value: number,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', `${value}`);
    setSearchParams(params);
  };

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return (
    charactersLoading ? (
      <div className="container-loader">
        <CircularProgress
          style={{ color: 'white' }}
          size={100}
        />
      </div>
    ) : (
      <div className="container-home">

        {!characters.length || isPageExist ? (
          <div className="no-characters-message">
            <p>
              There is no such characters
            </p>
          </div>
        ) : (
          <>
            <Filter />
            <div className="home">
              <CardList />

              <Pagination
                count={charactersData.characters.info.pages}
                page={page}
                shape="rounded"
                variant="outlined"
                className="home-pagination"
                onChange={handlePageChange}
                renderItem={(item) => {
                  switch (item.type) {
                    case 'next':
                    case 'previous': {
                      return (
                        <PaginationItem
                          sx={{
                            color: '#3C3E44',
                            bgcolor: '#F5F5F5',
                            ':disabled': {
                              bgcolor: '#9E9E9E',
                            },
                            ':hover': {
                              bgcolor: '#D5D5D5',
                            },
                          }}
                          {...item}
                        />
                      );
                    }

                    default: {
                      return (
                        <PaginationItem
                          sx={{
                            color: '#F5F5F5',
                            '&.Mui-selected': {
                              bgcolor: '#F5F5F5',
                              color: '#3C3E44',
                              ':hover': {
                                bgcolor: '#D5D5D5',
                              },
                            },
                            bgcolor: '#3C3E44',
                            ':disabled': {
                              bgcolor: '#9E9E9E',
                            },
                            ':hover': {
                              bgcolor: '#252525',
                            },
                          }}
                          {...item}
                        />
                      );
                    }
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    )
  );
};
