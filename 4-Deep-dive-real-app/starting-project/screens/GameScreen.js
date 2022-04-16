import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
   const rndNum = Math.floor(Math.random() * (max - min)) + min;

   if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
   } else {
      return rndNum;
   }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber, onGameOver }) {
   const initialGuess = generateRandomBetween(1, 100, userNumber);
   const [currentGuess, setCurrentGuess] = useState(initialGuess);
   const [guessRounds, setGuessRounds] = useState([initialGuess]);

   useEffect(() => {
      // Checks if the game is over, so it can send a message through props and change the screen
      if (currentGuess === userNumber) {
         onGameOver(guessRounds.length);
      }
   }, [currentGuess, userNumber, onGameOver]); // Whenever the currentGuess, userNumber or onGameOver changes, this effect will be re-executed and we will check if the game is over

   useEffect(() => {
      // This effect will be executed whenever the gameScreen component is rendered for the first time. So whenever it was not part of the rendered user interface and now became part of the interface (this can be achieved by adding an empty array of dependecies).

      // This will only happen when GameScreen is rendered for the first time again
      minBoundry = 1;
      maxBoundry = 100;
   }, []);

   function nextGuessHandler(direction) {
      // The job of this function is to derive a new number
      if (
         (direction === 'lower' && currentGuess < userNumber) ||
         (direction === 'greater' && currentGuess > userNumber)
      ) {
         Alert.alert("Don't lie", 'You know that this is wrong...', [
            { text: 'Sorry !!', style: 'cancel' },
         ]);
         return;
      }

      if (direction === 'lower') {
         maxBoundry = currentGuess;
      } else {
         minBoundry = currentGuess + 1;
      }
      const newRandomNumber = generateRandomBetween(
         minBoundry,
         maxBoundry,
         currentGuess
      );
      setCurrentGuess(newRandomNumber);
      setGuessRounds((prevGuessRounds) => {
         // Lembre-se que prevGuessRounds é uma array, então temos de usar o spread
         return [...prevGuessRounds, newRandomNumber];
      });
   }

   const guessRoundsListLenght = guessRounds.length;

   return (
      <View style={styles.screen}>
         <Title>Opponent's Guest</Title>
         <NumberContainer>{currentGuess}</NumberContainer>
         <Card>
            <InstructionText style={styles.instructionText}>
               Higher or lower?
            </InstructionText>
            <View style={styles.buttonsContainer}>
               <View style={styles.buttonContainer}>
                  <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                     <Ionicons name='md-remove' size={24} color='white' />
                  </PrimaryButton>
               </View>
               <View style={styles.buttonContainer}>
                  <PrimaryButton
                     onPress={nextGuessHandler.bind(this, 'greater')}
                  >
                     <Ionicons name='md-add' size={24} color='white' />
                  </PrimaryButton>
               </View>
            </View>
         </Card>
         <View style={styles.listContainer}>
            <FlatList
               data={guessRounds}
               renderItem={(itemData) => {
                  return (
                     <GuessLogItem
                        roundNumber={guessRoundsListLenght - itemData.index}
                        guess={itemData.item}
                     />
                  );
               }}
               keyExtractor={(item) => item}
            />
         </View>
      </View>
   );
}

export default GameScreen;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 24,
      marginTop: 16,
   },
   instructionText: {
      marginBottom: 12,
   },
   buttonsContainer: {
      flexDirection: 'row',
   },
   buttonContainer: {
      flex: 1,
   },
   listContainer: {
      flex: 1,
      padding: 16,
   },
});
