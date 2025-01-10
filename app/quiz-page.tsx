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
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { AnswerOption } from '../components/ui/AnswerOption';
import { ProgressDots } from '../components/ui/ProgressDots';

// Types
interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

// Placeholder data
const placeholderQuestions: Question[] = [
  {
    question: "Gunakan Teorema Dasar Kalkulus untuk menemukan turunan dasar dari fungsi F(x) = ∫ₓ sin(t²) dt.",
    answers: ["sin(x²)", "cos(x²)", "2x sin(x²)", "-sin(x²)"],
    correctAnswer: 0,
  },
  {
    question: "Gunakan Teorema Dasar Kalkulus untuk menemukan turunan dasar dari fungsi F(x) = ∫ₓ sin(t²) dt.",
    answers: ["sin(x²)", "cos(x²)", "2x sin(x²)", "-sin(x²)"],
    correctAnswer: 0,
  },
  // Add more placeholder questions as needed
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!fontsLoaded) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const handleNext = () => {
    if (currentQuestion < placeholderQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleClose}>
            <Feather name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Integral Quiz</Text>
        <TouchableOpacity style={styles.iconButton}>
            <Feather name="grid" size={20} color="white" />
        </TouchableOpacity>
      </View>


      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.questionCount}>Question {currentQuestion + 1}</Text>
          <Text style={styles.questionTotal}>{currentQuestion + 1} of {placeholderQuestions.length}</Text>
        </View>
        <View style={styles.progressContent}>
          <ProgressDots total={placeholderQuestions.length} current={currentQuestion + 1} />
          
        </View>
      </View>

      <View style={styles.timerSection}>
        <Image
          source={require('../assets/quiz/1.png')}
          style={styles.mascot}
        />
        <View style={styles.timerContainer}>
                <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        </View>
      </View>
      
      {/* Mascot and Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {placeholderQuestions[currentQuestion].question}
        </Text>
      </View>

      {/* Answer Options */}
      <View style={styles.answersContainer}>
        <Text style={styles.chooseText}>Choose your answer</Text>
        <View style={styles.answerGrid}>
          {placeholderQuestions[currentQuestion].answers.map((answer, index) => (
            <AnswerOption
              key={index}
              label={String.fromCharCode(65 + index)}
              answer={answer}
              isSelected={selectedAnswer === index}
              onSelect={() => setSelectedAnswer(index)}
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
        >
          <Text style={[styles.navButtonText, styles.nextButtonText]}>Next</Text>
          <Feather name="chevron-right" size={20} color="#00B074" />
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
    marginTop: 32,
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
    borderRadius: 20, // Ensures circular shape
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure it occupies the full width
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
    paddingTop: 40,
    marginBottom: 8,
  },
  mascot: {
    width: 120,
    height: 120,
    position: 'relative',
    left: 16,
    top: 0,
  },
  questionText: {
    fontSize: 30,
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
    marginBottom: 24,
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

