import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AnswerOption } from '../components/ui/AnswerOption';
import { ProgressDots } from '../components/ui/ProgressDots';

interface QuizPageProps {
  title?: string;
  questions?: Array<{
    question: string;
    answers: string[];
    correctAnswer: number;
  }>;
  onClose?: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  title = "Integral Quiz",
  questions = [
    {
      question: "Gunakan Teorema Dasar Kalkulus untuk menemukan turunan dasar dari fungsi F(x) = ∫ₓ sin(t²) dt.",
      answers: ["sin(x²)", "cos(x²)", "2x sin(x²)", "-sin(x²)"],
      correctAnswer: 0,
    },
    // Add more placeholder questions as needed
  ],
  onClose,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
          <Feather name="grid" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View>
          <Text style={styles.questionCount}>0{currentQuestion + 1} Question</Text>
          <ProgressDots total={7} current={currentQuestion} />
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {/* Mascot and Question */}
      <View style={styles.questionContainer}>
        <Image
          source={require('../assets/quiz/1.png')}
          style={styles.mascot}
        />
        <Text style={styles.questionText}>
          {questions[currentQuestion].question}
        </Text>
      </View>

      {/* Answer Options */}
      <View style={styles.answersContainer}>
        <Text style={styles.chooseText}>Choose your answer</Text>
        {questions[currentQuestion].answers.map((answer, index) => (
          <AnswerOption
            key={index}
            label={String.fromCharCode(65 + index)}
            answer={answer}
            isSelected={selectedAnswer === index}
            onSelect={() => setSelectedAnswer(index)}
          />
        ))}
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
          <Text style={styles.navButtonText}>Next</Text>
          <Feather name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00B074',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  questionCount: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  timerContainer: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  timer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  questionContainer: {
    padding: 16,
    marginBottom: 24,
  },
  mascot: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 32,
  },
  answersContainer: {
    padding: 16,
    flex: 1,
  },
  chooseText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
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
    fontWeight: '500',
    color: 'white',
    marginHorizontal: 8,
  },
});

