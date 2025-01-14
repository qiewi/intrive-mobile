import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { AnswerOption } from '../components/ui/AnswerOption';
import { ProgressDots } from '../components/ui/ProgressDots';
import { ResultScreen } from '../components/ui/ResultScreen';
import { firestore, auth } from './firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { integralModules } from './data/integralModules';
import { derivativeModules } from './data/derivativeModules';
import { integralQuizzes } from './data/integralQuizzes';
import { derivativeQuizzes } from './data/derivativeQuizzes';

interface Answer {
  questionIndex: number;
  selectedAnswer: number;
}

export default function QuizPage() {
  const router = useRouter();
  const { id, type } = useLocalSearchParams();

  const moduleData =
    type === 'integralModules'
      ? integralModules.find((module) => module.id === id)
      : derivativeModules.find((module) => module.id === id);

  const quizData =
    type === 'integralModules'
      ? integralQuizzes.find((quiz) => quiz.id === id)
      : derivativeQuizzes.find((quiz) => quiz.id === id);

  if (!quizData || !moduleData) return null;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(180);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setAnswers((prev) => {
      const newAnswers = [...prev];
      const existingAnswer = newAnswers.findIndex((a) => a.questionIndex === currentQuestion);
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
      const previousAnswer = answers.find((a) => a.questionIndex === currentQuestion - 1);
      setSelectedAnswer(previousAnswer?.selectedAnswer ?? null);
    }
  };

  const calculatePoints = (correctCount: number) => {
    const totalQuestions = quizData.questions.length;
    const levelBonus = moduleData.level;
    const timeBonus = timeLeft;
    const points = Math.abs((correctCount / totalQuestions) * 100) + levelBonus * 5 + Math.abs(timeBonus * 0.1);
    return Math.round(points);
  };

  const getCorrectAnswersCount = () => {
    return answers.filter(
      (answer) => quizData.questions[answer.questionIndex].correctAnswer === answer.selectedAnswer
    ).length;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 ) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0; 
        } else if (isComplete) {
          clearInterval(timer);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [isComplete]);
  
  const storeProgress = async () => {
    try {
      const correctCount = getCorrectAnswersCount();
      const points = calculatePoints(correctCount);
      const elapsedTime = 180 - timeLeft;
  
      const loggedInUser = auth.currentUser;
      if (!loggedInUser) {
        Alert.alert('Error', 'You must be logged in to save progress.');
        router.push('/signin');
        return;
      }
  
      const userId = loggedInUser.uid;
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userModules = userData.modules || {};
        const moduleKey = type === 'integralModules' ? 'integralModule' : 'derivativeModule';
  
        const moduleId = parseInt(id as string, 10);
        const allCorrect = correctCount === quizData.questions.length;
  
        const updatedModule = {
          ...userModules[moduleKey]?.[moduleId],
          points,
          elapsedTime,
          quizCompleted: allCorrect,
          status: allCorrect ? 'Completed' : 'Incomplete',
          quizScore: correctCount,
        };
  
        await setDoc(
          userDocRef,
          {
            modules: {
              [moduleKey]: {
                [moduleId]: updatedModule,
              },
            },
          },
          { merge: true }
        );
  
        // Update badges
        const updatedBadges = [...(userData.badges || [])];
  
        if (type === 'integralModules') {
          const integralModules = userData.modules?.integralModule || {};

          const isModule13Completed = integralModules[12]?.status === 'Completed';
  
          if (isModule13Completed) {
            updatedBadges.forEach((badge) => {
              if (badge.title === 'Number Ninja') {
                badge.unlocked = true;
              }
            });
          }
  
          const isModule17Completed = integralModules[16]?.status === 'Completed';
  
          if (isModule17Completed) {
            updatedBadges.forEach((badge) => {
              if (badge.title === 'Equation Explorer') {
                badge.unlocked = true;
              }
            });
          }
  
          const isModule19Completed = integralModules[18]?.status === 'Completed';
  
          if (isModule19Completed) {
            updatedBadges.forEach((badge) => {
              if (badge.title === 'Math Wiz Kid') {
                badge.unlocked = true;
              }
            });
          }

          const isModule20Completed = integralModules[19]?.status === 'Completed';
  
          if (isModule20Completed) {
            updatedBadges.forEach((badge) => {
              if (badge.title === 'Integral Innovator') {
                badge.unlocked = true;
              }
            });
          }
        }
  
        if (type === 'derivativeModules') {
          const derivativeModules = userData.modules?.derivativeModule || {};
  
          const isModule23Completed = derivativeModules[22]?.status === 'Completed';
          
          if (isModule23Completed) {
            updatedBadges.forEach((badge) => {
              if (badge.title === 'Function Finder') {
                badge.unlocked = true;
              }
            });
          }

          const isModule25Completed = derivativeModules[24]?.status === 'Completed';
          
          if (isModule25Completed) {
            updatedBadges.forEach((badge) => {
              if (badge.title === 'Slope Specialist') {
                badge.unlocked = true;
              }
            });
          }
  
          const isModule28Completed = derivativeModules[27]?.status === 'Completed';
  
          if (isModule28Completed) {
            updatedBadges.forEach((badge) => {
              if (badge.title === 'Problem Solver') {
                badge.unlocked = true;
              }
            });
          }
  
          const isModule30Completed = derivativeModules[29]?.status === 'Completed';
  
          if (isModule30Completed) {
            updatedBadges.forEach((badge) => {
              if (badge.title === 'Area Analyzer') {
                badge.unlocked = true;
              }
            });
          }
        }
  
        await updateDoc(userDocRef, { badges: updatedBadges });
  
        Alert.alert('Success', allCorrect ? 'Quiz completed successfully!' : 'Progress saved!');
      } else {
        Alert.alert('Error', 'User data not found.');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      Alert.alert('Error', 'Could not save progress.');
    }
  };
  
  // Call `storeProgress` when the quiz is complete or the timer runs out
  useEffect(() => {
    if (isComplete || isTimeUp) {
      storeProgress();
    }
  }, [isComplete, isTimeUp]);
  

  const handleBackToModule = () => {
    router.push(`/module-detail?id=${moduleData.id}&type=${type}`);
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
