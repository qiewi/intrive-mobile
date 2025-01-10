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
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 100,
    padding: 16,
    width: '48%', // Changed to allow 2 items per row with gap
    marginBottom: 12,
  },
  selected: {
    backgroundColor: '#FFB800',
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center', // Center the text
  },
  selectedText: {
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
  },
});

