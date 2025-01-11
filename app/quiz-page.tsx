import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { AnswerOption } from '../components/ui/AnswerOption';
import { ProgressDots } from '../components/ui/ProgressDots';
import { ResultScreen } from '../components/ui/ResultScreen';
import { quizzes } from './quizData';
import { modules } from './modulesData';
import type { Module, Quiz } from './types/quiz';

interface Answer {
  questionIndex: number;
  selectedAnswer: number;
}

export default function QuizPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Find both quiz and module data
  const quizData = quizzes.find((quiz) => quiz.id === id) as Quiz;
  const moduleData = modules.find((module) => module.id === id) as Module;

  if (!quizData || !moduleData) return null;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 || isComplete) {
          setIsTimeUp(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [isComplete]); 

  if (!fontsLoaded) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setAnswers(prev => {
      const newAnswers = [...prev];
      const existingAnswer = newAnswers.findIndex(a => a.questionIndex === currentQuestion);
      if (existingAnswer !== -1) {
        newAnswers[existingAnswer].selectedAnswer = index;
      } else {
        newAnswers.push({ questionIndex: currentQuestion, selectedAnswer: index });
      }
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else if (answers.length === quizData.questions.length) {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers.find(a => a.questionIndex === currentQuestion - 1);
      setSelectedAnswer(previousAnswer?.selectedAnswer ?? null);
    }
  };

  const getCorrectAnswersCount = () => {
    return answers.filter(
      (answer) => quizData.questions[answer.questionIndex].correctAnswer === answer.selectedAnswer
    ).length;
  };

  const handleBackToModule = () => {
    router.back();
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setIsComplete(false);
    setIsTimeUp(false);
    setTimeLeft(180);
  };

  const handleNextModule = () => {
    router.push('/home');
  };

  if (isTimeUp && !isComplete) {
    return (
      <ResultScreen
        type="timeout"
        title={`${moduleData.title} - Level ${moduleData.level}`}
        correctCount={getCorrectAnswersCount()}
        totalQuestions={quizData.questions.length}
        onBackToModule={handleBackToModule}
        onTryAgain={handleTryAgain}
      />
    );
  }

  if (isComplete) {
    const correctCount = getCorrectAnswersCount();
    const allCorrect = correctCount === quizData.questions.length;

    return (
      <ResultScreen
        type={allCorrect ? 'success' : 'error'}
        title={`${moduleData.title} - Level ${moduleData.level}`}
        correctCount={correctCount}
        totalQuestions={quizData.questions.length}
        onBackToModule={handleBackToModule}
        onTryAgain={!allCorrect ? handleTryAgain : undefined}
        onNextModule={allCorrect ? handleNextModule : undefined}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleBackToModule}>
          <Feather name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{moduleData.title}</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="grid" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.questionCount}>Question {currentQuestion + 1}</Text>
          <Text style={styles.questionTotal}>
            {currentQuestion + 1} of {quizData.questions.length}
          </Text>
        </View>
        <View style={styles.progressContent}>
          <ProgressDots total={quizData.questions.length} current={currentQuestion + 1} />
        </View>
      </View>

      <View style={styles.timerSection}>
        <Image source={require('../assets/quiz/1.png')} style={styles.mascot} />
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {/* Mascot and Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {quizData.questions[currentQuestion].question}
        </Text>
      </View>

      {/* Answer Options */}
      <View style={styles.answersContainer}>
        <Text style={styles.chooseText}>Choose your answer</Text>
        <View style={styles.answerGrid}>
          {quizData.questions[currentQuestion].answers.map((answer, index) => (
            <AnswerOption
              key={index}
              label={String.fromCharCode(65 + index)}
              answer={answer}
              isSelected={selectedAnswer === index}
              onSelect={() => handleAnswerSelect(index)}
            />
          ))}
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestion === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Feather name="chevron-left" size={20} color="white" />
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
          disabled={selectedAnswer === null}
        >
          <Text style={[styles.navButtonText, styles.nextButtonText]}>Next</Text>
          <Feather name="chevron-right" size={20} color="#009D60" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009D60',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSection: {
    padding: 16,
    marginBottom: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionCount: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
  },
  questionTotal: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
  },
  timerSection: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerContainer: {
    backgroundColor: '#FFB800',
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  timer: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000',
  },
  questionContainer: {
    padding: 16,
    paddingBottom: 4,
  },
  mascot: {
    width: 120,
    height: 120,
  },
  questionText: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    paddingHorizontal: 8,
    lineHeight: 40,
  },
  answersContainer: {
    padding: 16,
    flex: 1,
  },
  answerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  chooseText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
    marginLeft: 12,
    marginBottom: 16,
    opacity: 0.7,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 32,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 100,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  nextButton: {
    backgroundColor: 'white',
  },
  navButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
    marginHorizontal: 8,
  },
  nextButtonText: {
    color: '#009D60',
  },
});

