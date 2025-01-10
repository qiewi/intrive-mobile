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
            index < current ? styles.completed : styles.upcoming,
            { flex: 1 / total, marginHorizontal: total > 1 ? 2 : 0 }, // Dynamic width and spacing
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    height: 12,
    borderRadius: 36,
  },
  completed: {
    backgroundColor: 'white',
  },
  upcoming: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
