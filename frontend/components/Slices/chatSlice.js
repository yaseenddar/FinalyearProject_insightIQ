import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState:{
        chats: ["Default"]
    },
    reducers:{
        setChat:(state,action)=>{
            state.chats = action.payload;
        },

    },
})

export const {setChat} = chatSlice.actions;
export default chatSlice.reducer;