import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimeAgo from 'javascript-time-ago'
import { Provider } from 'react-redux';
import {store} from '../components/Store/store.js'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from '../components/Context/ChatProvider.jsx'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
ReactDOM.createRoot(document.getElementById('root')).render(
  
       <ChatProvider>
        
    <Provider store={store}>
      <App/>
    </Provider>
    
    </ChatProvider>
    
)
