import {configureStore} from '@reduxjs/toolkit'
import user  from '../userSlice/userSlice'


const store =  configureStore({
    reducer :{
        user
    }
    
})
export {store} ;