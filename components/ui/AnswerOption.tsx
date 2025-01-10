import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AnswerOptionProps {
  label: string;
  answer: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  label,
  answer,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={onSelect}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {label}. {answer}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 16,
    marginBottom: 12,
    width: '100%',
  },
  selected: {
    backgroundColor: '#FFB800',
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  selectedText: {
    color: '#000',
  },
});

