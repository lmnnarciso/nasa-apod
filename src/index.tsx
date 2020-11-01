import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import './App.css'
import {data} from './defaultData'
// import reportWebVitals from './reportWebVitals'
if (process.env.REACT_APP_DEFAULT_DATA === 'TRUE') {
  localStorage.setItem('favorites', data)
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
