import { useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MEALS, CATEGORIES } from '../data/dummy-data';

import MealItem from '../components/MealItem';

function MealsOverviewScreen({ route, navigation }) {
   // The params object that we get here is the object that we set up when navigatin
   const catId = route.params.categoryId;

   // Will return all the meals that belongs to this category
   const displayedMeals = MEALS.filter((mealItem) => {
      // We wanna return true if we wanna keep a meal ald false if we wanna drop it
      // It will be true if a meal has this categoryId in its array of category ids
      return mealItem.categoryIds.indexOf(catId) >= 0;
   });

   useLayoutEffect(() => {
      const categoryTitle = CATEGORIES.find(
         (category) => category.id === catId
      ).title;

      // This prop also has a setOptions method
      navigation.setOptions({
         title: categoryTitle,
      });
   }, [catId, navigation]);

   // We define this function here, since we'll need to access some props later
   function renderMealItem(itemData) {
      const item = itemData.item;
      const mealItemProps = {
         id: item.id,
         title: item.title,
         imageUrl: item.imageUrl,
         affordability: item.affordability,
         complexity: item.complexity,
         duration: item.duration,
      };

      return <MealItem {...mealItemProps} />;
   }

   return (
      <View style={styles.container}>
         <FlatList
            data={displayedMeals}
            keyExtractor={(item) => item.id}
            renderItem={renderMealItem}
         />
      </View>
   );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
   },
});
