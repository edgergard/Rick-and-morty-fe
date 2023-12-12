/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Root } from './Root.tsx';
import store from './store/store.ts';
import './index.scss';
import client from './apollo.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
);
