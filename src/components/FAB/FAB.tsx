/* eslint-disable import/no-extraneous-dependencies */

import Papa from 'papaparse';
import { Fab } from '@mui/material';
import { useDispatch } from 'react-redux';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { closeDrawer, openDrawer } from '../../store/slices/DrawerSlice';
import { Character } from '../../types/Character';

const convertToCSV = (data : Character[]) => {
  const csv = Papa.unparse(data);

  return csv;
};

export const FAB: React.FC = () => {
  const [isOpened, setIsOpened] = useState((false));

  const dispatch = useDispatch();
  const isDrawerOpened = useAppSelector((state) => state.drawer.isDrawerOpened);

  const { characters } = useAppSelector(state => state.characters);

  const handleFabChange = () => {
    setIsOpened(!isOpened);
  };

  const handleDrawerChange = () => {
    if (isDrawerOpened) {
      dispatch(closeDrawer());
    } else {
      dispatch(openDrawer());
    }
  };

  const handleDownload = () => {
    const csvData = convertToCSV(characters);

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'characters.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Fab
        aria-label="add"
        onClick={handleFabChange}
        sx={{
          width: 56,
          height: 56,
          bgcolor: '#F5F5F5',
          position: 'fixed',
          bottom: 70,
          right: 70,
          ':hover': {
            bgcolor: '#9E9E9E',
          },
          zIndex: 1050,
        }}
      >
        {isOpened ? <CloseIcon /> : <MoreVertIcon />}
      </Fab>

      {isOpened && (
        <>
          <Fab
            aria-label="option1"
            onClick={handleDownload}
            sx={{
              width: 40,
              height: 40,
              marginBottom: 1,
              bgcolor: '#F5F5F5',
              position: 'fixed',
              bottom: 140,
              right: 77.8,
              ':hover': {
                bgcolor: '#9E9E9E',
              },
              zIndex: 1050,
            }}
          >
            <DownloadRoundedIcon />
          </Fab>

          <Fab
            aria-label="option2"
            onClick={handleDrawerChange}
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#F5F5F5',
              position: 'fixed',
              bottom: 210,
              right: 77.8,
              ':hover': {
                bgcolor: '#9E9E9E',
              },
              zIndex: 1050,
            }}
          >
            <ErrorOutlineRoundedIcon />
          </Fab>
        </>
      )}
    </div>
  );
};
