import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals((metric: any) => {
    //console.log(metric)
    //const body = JSON.stringify(metric);
    //const url = 'https://example.com/analytics';
    //if (navigator.sendBeacon) {
    //    navigator.sendBeacon(url, body);
    //} else {
    //    fetch(url, { body, method: 'POST', keepalive: true });
    //}
});
