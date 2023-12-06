import './Home.scss';
import React, { useEffect } from 'react';
import { CircularProgress, Pagination, PaginationItem } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { setCharacters } from '../../store/reducers/charactersSlice';
import { CardList } from '../CardList/CardList';
import { getCharacters } from '../../utils/graphql-query';

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || '1');

  const { data, loading, error } = useQuery(getCharacters(page));
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data.characters.results));
    }
  }, [data]);

  if (error) {
    return <p>{`Error: ${error.message}`}</p>;
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>, value: number,
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
    loading ? (
      <div className="container-loader">
        <CircularProgress
          style={{ color: 'white' }}
          size={100}
        />
      </div>
    ) : (
      <div className="container-home">
        <div className="home">
          <CardList />

          <Pagination
            count={data.characters.info.pages}
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
      </div>
    )
  );
};
