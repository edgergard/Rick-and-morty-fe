import './HistoryDrawer.scss';

import { Link } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Drawer } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../utils/hooks';
import { closeDrawer } from '../../store/slices/drawerSlice';
import { History } from '../../types/History';
import { generateUniqueId } from '../../utils/functions';

export const HistoryDrawer = () => {
  const dispatch = useDispatch();
  const isOpened = useAppSelector((state) => state.drawer.isDrawerOpened);

  const [history] = useLocalStorage<History[]>('History', []);

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      anchor="right"
      open={isOpened}
      onClose={handleClose}
      sx={{
        zIndex: 1200,
      }}
    >
      <div className="history">
        <h2 className="history__title">History</h2>
        {history.reverse().map(({
          characterName,
          id,
          action,
          filters,
        }) => (
          <div className="history__text" key={generateUniqueId()}>
            {action === 'check' ? (
              <>
                <p className="history__text-status">
                  Checked info about:
                </p>

                <Link
                  to={`/character/${id}`}
                  className="history__text-name"
                  key={id}
                  onClick={handleClose}
                >
                  {characterName}
                </Link>
              </>
            ) : (
              <>
                <p className="history__text-status">Filter</p>
                {filters?.map((filter) => (
                  <div key={filter.id} className="container-history__filter">
                    <p className="history__text-select">
                      {filter.select}
                    </p>
                    {filter.filterName.map((name, index) => (
                      <p
                        key={generateUniqueId()}
                        className="history__text-value"
                      >
                        { `${name} : ${filter.filterValue[index]}`}
                      </p>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
        <button
          type="button"
          className="history__close"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Drawer>
  );
};
