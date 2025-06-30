import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CounterScreen = forwardRef(({ count, dispatch }, ref) => {
  // Expose internal methods
  useImperativeHandle(ref, () => ({
    resetCounter: () => dispatch({ type: 'reset' })

  }));

  return (
    <View style={styles.counter}>
      <Text style={styles.text}>Count: {count}</Text>
      <Button title="+" onPress={() => dispatch({ type: 'increment' })} />
      <Button title="-" onPress={() => dispatch({ type: 'decrement' })} />
    </View>
  );
});

const styles = StyleSheet.create({
  counter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 22,
    marginBottom: 10,
  },
});

export default CounterScreen;
