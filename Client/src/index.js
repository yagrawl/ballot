import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import * as serviceWorker from './serviceWorker';

render((
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
