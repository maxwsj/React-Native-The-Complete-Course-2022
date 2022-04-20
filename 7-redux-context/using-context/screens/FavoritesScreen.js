import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';
import { FavoritesContext } from '../store/context/favorites-context';

function FavoritesScreen() {
   const favoriteMealsCtx = useContext(FavoritesContext); // To get our favorite meals

   const favoriteMeals = MEALS.filter((meal) =>
      favoriteMealsCtx.ids.includes(meal.id)
   ); // We filter out all the meals from the raw data that have a fiting ID, if an id is equal tha's part of our favoriteMealsCtx.id we wanna keep it

   // Outputting a message if we don't have favorite meals
   if (favoriteMeals.length === 0) {
      return (
         <View style={styles.rootContainer}>
            <Text style={styles.text}>You have no favorite meals yet.</Text>
         </View>
      );
   }

   return <MealsList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
   rootContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
   },
});
