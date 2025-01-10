import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressDotsProps {
  total: number;
  current: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index < current ? styles.completed : index === current ? styles.current : styles.upcoming,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 32,
    height: 4,
    borderRadius: 2,
  },
  completed: {
    backgroundColor: 'white',
  },
  current: {
    backgroundColor: 'white',
  },
  upcoming: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

