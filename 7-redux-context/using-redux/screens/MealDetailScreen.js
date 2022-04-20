import { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }) {
   // This hook can be used to get data out of our Redux store.
   // Reading actions
   const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids); // We can get them by passing a function to useSelector

   const dispatch = useDispatch(); // Returns a dispatch function which we can execute to dispatch an action

   const mealId = route.params.mealId;

   const selectedMeal = MEALS.find((meal) => meal.id === mealId);

   // This will return true or false so we can use in our button to set it conditionally
   const mealIsFavorite = favoriteMealIds.includes(mealId); // includes is perfect for primitive values

   // Dispatching actions
   function changeFavoriteStatusHandler() {
      if (mealIsFavorite) {
         // Will create an action object which is then dispatched
         dispatch(removeFavorite({ id: mealId })); // To removeFavorite we can pass the data that we would like to have in our action payload
      } else {
         dispatch(addFavorite({ id: mealId }));
      }
   }

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => {
            return (
               <IconButton
                  icon={mealIsFavorite ? 'star' : 'star-outline'}
                  color='white'
                  onPress={changeFavoriteStatusHandler}
               />
            );
         },
      });
   }, [navigation, changeFavoriteStatusHandler]);

   return (
      <ScrollView style={styles.rootContainer}>
         <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
         <Text style={styles.title}>{selectedMeal.title}</Text>
         <MealDetails
            duration={selectedMeal.duration}
            complexity={selectedMeal.complexity}
            affordability={selectedMeal.affordability}
            textStyle={styles.detailText}
         />
         <View style={styles.listOuterContainer}>
            <View style={styles.listContainer}>
               <Subtitle>Ingredients</Subtitle>
               <List data={selectedMeal.ingredients} />
               <Subtitle>Steps</Subtitle>
               <List data={selectedMeal.steps} />
            </View>
         </View>
      </ScrollView>
   );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
   rootContainer: {
      marginBottom: 32,
   },
   image: {
      width: '100%',
      height: 350,
   },
   title: {
      fontWeight: 'bold',
      fontSize: 24,
      margin: 8,
      textAlign: 'center',
      color: 'white',
   },
   detailText: {
      color: 'white',
   },
   listOuterContainer: {
      alignItems: 'center',
   },
   listContainer: {
      width: '80%',
   },
});
