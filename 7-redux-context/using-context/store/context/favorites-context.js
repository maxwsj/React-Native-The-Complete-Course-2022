import { createContext, useState } from 'react';

// We add this dummy functions, because that will help us with auto completion in other parts of the app in the IDE.
export const FavoritesContext = createContext({
   ids: [],
   addFavorite: (id) => {},
   removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
   const [favoriteMealsIds, setFavoriteMealsIds] = useState([]);

   function addFavorite(id) {
      setFavoriteMealsIds((currentFavIds) => [...currentFavIds, id]);
   }
   function removeFavorite(id) {
      setFavoriteMealsIds((currentFavIds) =>
         currentFavIds.filter((mealId) => mealId !== id)
      );
   }

   const value = {
      ids: favoriteMealsIds,
      addFavorite: addFavorite, // refers to the function
      removeFavorite: removeFavorite,
   };

   return (
      <FavoritesContext.Provider value={value}>
         {children}
      </FavoritesContext.Provider>
   );
}

export default FavoritesContextProvider;
