import './Filter.scss';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocation, useSearchParams } from 'react-router-dom';
import { filterOptions, selectOptions } from '../../utils/menuOptions';
import { History } from '../../types/History';
import { getBorderRadius, getFilterHistory } from '../../utils/functions';

export const Filter: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const [history, setHistory] = useLocalStorage<History[]>('History', []);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isActive, setIsActive] = useState(false);
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [isBackgroundDark, setIsBackgroundDark] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (location.search.length > 9) {
      setIsActive(true);
    }
  }, []);

  const shownFilterOptions = filterOptions
    .filter((option) => selectedValues.includes(option.item));

  const clearSearchParams = () => {
    const currentParams = new URLSearchParams(searchParams);

    if (isActive) {
      currentParams.forEach((value, key) => {
        if (key !== 'page') {
          currentParams.delete(key);
        }
      });

      if (location.search.length > 9) {
        currentParams.set('page', '1');
      }
    }

    setSearchParams(currentParams);
  };

  const handleFilterClick = () => {
    if (isActive) {
      clearSearchParams();
    }

    setIsActive(!isActive);
  };

  const handleBackgroundClose = () => {
    setIsSelectOpened(false);
    setIsBackgroundDark(false);
    setIsFilterOpened(false);
    setSelectedValues([]);
  };

  const handleSelectOpen = () => {
    setIsSelectOpened(true);
    setIsBackgroundDark(true);
  };

  const handleSelectClose = () => {
    setIsSelectOpened(false);
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedValues(event.target.value as string[]);
    setIsFilterOpened(!isFilterOpened);
  };

  const onSubmit = (values: FieldValues) => {
    const queryParams: { [key: string]: string } = {};

    shownFilterOptions.forEach((option) => {
      const inputValue = values[option.value];

      if (inputValue !== undefined && inputValue !== '') {
        queryParams[option.value] = inputValue;
      }
    });

    setSearchParams(queryParams);
    setIsBackgroundDark(false);
    setIsSelectOpened(false);
    setIsFilterOpened(false);
    setSelectedValues([]);

    const historyFilter = getFilterHistory(values);

    if (historyFilter.length) {
      setHistory([...history, {
        id: null,
        characterName: null,
        action: 'filter',
        filters: historyFilter,
      }]);
    }
  };

  return (
    <div className="container-filter">
      <Button
        variant="contained"
        onClick={handleFilterClick}
        sx={{
          fontSize: 16,
          width: 143,
          height: 57,
          marginRight: 20,
          visibility: isBackgroundDark ? 'hidden' : 'visible',
          color: '#3C3E44',
          bgcolor: '#F5F5F5',
          ':disabled': {
            bgcolor: '#9E9E9E',
          },
          ':hover': {
            bgcolor: '#D5D5D5',
          },
          whiteSpace: 'nowrap',
        }}
      >
        {isActive ? 'Remove Filter' : 'Filter'}
      </Button>

      {isBackgroundDark && (
        <Box
          onClick={handleBackgroundClose}
          style={{
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        />
      )}

      {isActive && (
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="filter__form"
        >
          <FormControl
            sx={{
              borderRadius: 1,
              fontSize: 16,
              width: 213,
              height: 55,
              marginRight: 3.4,
              color: '#3C3E44',
              bgcolor: '#F5F5F5',
              whiteSpace: 'nowrap',
              textTransform: 'capitalize',
            }}
          >
            <Select
              disabled={isSelectOpened}
              multiple
              value={selectedValues}
              displayEmpty
              renderValue={() => 'Select Item'}
              open={isSelectOpened}
              onOpen={handleSelectOpen}
              onClose={handleSelectClose}
              onChange={handleSelectChange}
              sx={{
                bgcolor: '#F5F5F5',
                color: '#3C3E44',
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              {selectOptions.map((option, index) => (
                <MenuItem
                  value={option.value}
                  key={option.id}
                  disabled={index >= selectOptions.length - 2}
                  sx={{
                    justifyContent: 'space-between',
                    bgcolor: '#F5F5F5',
                    color: '#3C3E44',
                    fontWeight: 700,
                  }}
                >
                  {`${option.label}`}
                  <Checkbox
                    checked={selectedValues.includes(option.value)}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {!isFilterOpened ? (
            <Typography
              variant="button"
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
                paddingLeft: 1.5,
                fontSize: 16,
                width: 260,
                height: 55,
                marginRight: 3.4,
                color: '#3C3E44',
                bgcolor: '#F5F5F5',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
                zIndex: 1301,
              }}
            >
              Add keywords to find
            </Typography>
          ) : (

            <FormControl
              sx={{
                borderRadius: 1,
                fontSize: 16,
                width: 260,
                height: 55,
                marginRight: 4.9,
                color: '#3C3E44',
                bgcolor: '#F5F5F5',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
              }}
            >
              {shownFilterOptions.map((option, index) => {
                return (
                  <TextField
                    key={option.id}
                    {...register(option.value)}
                    label={option.label}
                    variant="filled"
                    className="text-field"
                    sx={{
                      position: 'relative',
                      fontSize: 16,
                      width: 260,
                      height: 55,
                      marginRight: 4.9,
                      borderRadius: getBorderRadius(index, shownFilterOptions),
                      bgcolor: '#F5F5F5',
                      whiteSpace: 'nowrap',
                      textTransform: 'capitalize',
                      '& label': {
                        color: '#3C3E44',
                        fontWeight: 500,
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                );
              })}
            </FormControl>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              fontSize: 16,
              width: 143,
              height: 57,
              color: '#3C3E44',
              bgcolor: '#F5F5F5',
              ':disabled': {
                bgcolor: '#9E9E9E',
              },
              ':hover': {
                bgcolor: '#D5D5D5',
              },
              zIndex: 1301,
              whiteSpace: 'nowrap',
            }}
          >
            Find
          </Button>
        </form>
      )}
    </div>
  );
};
