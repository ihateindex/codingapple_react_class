import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

// * 리액트 라우터 돔 import
// * import할때 from 뒤에 경로가 없이 이름만 있다면 라이브러리임
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';

const queryClient = new QueryClient();

ReactDOM.render(
    // <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
