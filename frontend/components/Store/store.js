import {configureStore} from '@reduxjs/toolkit'
import user  from '../Slices/userSlice'
import chat from '../Slices/chatSlice'

const store =  configureStore({
    reducer :{
        user,
        chat
    }
    
})
export {store} ;