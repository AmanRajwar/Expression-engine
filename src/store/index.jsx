import {configureStore} from '@reduxjs/toolkit'
import  fieldSlice  from './slices/form.slice.jsx'

const store =configureStore({
    reducer:{
        field:fieldSlice,
    }
})

export default store;