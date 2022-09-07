import '@atlaskit/css-reset';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';
import initialData from './initial-data';

const root = createRoot(document.getElementById('root'));
root.render(<App initialState={initialData} />);

