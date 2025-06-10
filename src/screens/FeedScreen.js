import React, { useRef, useReducer } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import CounterScreen from './CounterScreen'
import { counterReducer, initialState } from '../utils/CounterReducer';

function FeedScreen() {
 const [state, dispatch] = useReducer(counterReducer, initialState);
  const inputRef = useRef(null);
  const counterRef = useRef(null);

  const setCountFromInput = () => {
    const value = parseInt(inputRef.current?.value || inputRef.current?._lastNativeText || '0', 10);
    if (!isNaN(value)) {
      dispatch({ type: 'set', payload: value });
    }
  };

  const resetCounter = () => {
    counterRef.current?.resetCounter();
  };

  return (
    <View style={styles.container}>
      <CounterScreen ref={counterRef} count={state.count} dispatch={dispatch} />

      <TextInput
        ref={inputRef}
        placeholder="Enter number"
        onChangeText={(text) => {
          inputRef.current._lastNativeText = text; // Store last native text for compatibility
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Set Count" onPress={setCountFromInput} />
      <Button title="Reset Count (via useImperativeHandle)" onPress={resetCounter} />
    </View>
  );
}
export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 200,
    padding: 10,
    marginVertical: 10,
  },
});

