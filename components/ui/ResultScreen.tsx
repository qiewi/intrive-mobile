import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

type ResultType = 'success' | 'error' | 'timeout';

interface ResultScreenProps {
  type: ResultType;
  title: string;
  correctCount: number;
  totalQuestions: number;
  onBackToModule: () => void;
  onTryAgain?: () => void;
  onNextModule?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  type,
  title,
  correctCount,
  totalQuestions,
  onBackToModule,
  onTryAgain,
  onNextModule,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#009D60';
      case 'error':
        return '#FF4B4B';
      case 'timeout':
        return '#FFB800';
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'success':
        return 'CONGRATS!';
      case 'error':
        return 'OOPS!';
      case 'timeout':
        return "TIME'S UP!";
    }
  };

  const getDescription = () => {
    if (type === 'success') {
      return 'You answered all questions correctly!';
    }
    return `You only answered\n${correctCount} out of ${totalQuestions}\nquestions correctly!`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.content}>
        <Image
          source={require('../../assets/quiz/1.png')}
          style={styles.mascot}
        />
        <Text style={styles.message}>{getMessage()}</Text>
        <Text style={styles.description}>{getDescription()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={onBackToModule}
        >
            <View style={styles.buttonContent}>
                <Feather name="chevron-left" size={20} color="white" />
                <Text style={styles.buttonText}>Back to Module</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={type === 'success' ? onNextModule : onTryAgain}
        >
          <View style={styles.buttonContent}>
            <Text style={[styles.buttonText, styles.nextButtonText]}>
              {type === 'success' ? 'Next Module' : 'Try Again'}
            </Text>
            {type === 'success' && <Feather name="chevron-right" size={20} color="#000000" />}
            {type !== 'success' && <Feather name="rotate-ccw" size={20} color="#000000" />}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascot: {
    width: 220,
    height: 220,
    marginBottom: 32,
  },
  message: {
    fontSize: 54,
    color: 'white',
    fontFamily: 'Poppins_700Bold'
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    lineHeight: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 32,
    paddingHorizontal: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '42%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginHorizontal: 16
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: 'white',
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    marginHorizontal: 8,
    fontFamily: 'Poppins_400Regular',
  },
  nextButtonText: {
    color: '#000000',
  },
});

