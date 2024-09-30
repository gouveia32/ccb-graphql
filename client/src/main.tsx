import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/Home/index.tsx'
import './index.css'

import { ApolloProvider } from '@apollo/client';
import client from './services/apolloClient.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);