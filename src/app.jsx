import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import './styles/styles.less';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Filter/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
