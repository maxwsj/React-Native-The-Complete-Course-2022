import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
   name: 'favorites', // and identifier that we will use
   initialState: {
      ids: [],
   },
   // Reducers are functions that are used to change our state
   reducers: {
      // Every method that we define in a reducer will automatically get the latest state as an input
      addFavorite: (state, action) => {
         // action can hold an extra payload which we can pass along when invoking this method later.
         // action is a object created and provided by redux
         // it uses a payload property to transport any extra data we might attach to this function in the future
         state.ids.push(action.payload.id);
      },
      removeFavorite: (state, action) => {
         state.ids.splice(state.ids.indexOf(action.payload.id), 1);
      },
   },
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;
