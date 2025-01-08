import React from 'react';
import { Text, TextInput, TextProps, TextInputProps } from 'react-native';

// Custom Global Text Component
export const GlobalText: React.FC<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'Poppins_400Regular' },
        props.style, // Merge user-provided styles
      ]}
    />
  );
};

// Custom Global TextInput Component
export const GlobalTextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      style={[
        { fontFamily: 'Poppins_400Regular' },
        props.style, // Merge user-provided styles
      ]}
    />
  );
};