import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './components/Home/index.jsx';
import 'src/main/assets/css/reset.css'

const root = createRoot(document.getElementById('app'));
root.render(<Home />);


