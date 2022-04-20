import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from './favorites';

export const store = configureStore({
   // We pass an object where we add a reducer key
   reducer: {
      favoriteMeals: favoritesReducer,
   },
});
