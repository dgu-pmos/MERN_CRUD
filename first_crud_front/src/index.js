import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // browserRouter로 App 컴포넌트를 감싸서 라우팅이 가능하도록 한다.
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
