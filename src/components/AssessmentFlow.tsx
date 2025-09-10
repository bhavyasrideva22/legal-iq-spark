import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  category: string;
  question: string;
  type: 'likert' | 'multiple_choice' | 'true_false';
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
}

interface AssessmentFlowProps {
  onComplete: (results: Record<string, string>) => void;
  onBack: () => void;
}

const questions: Question[] = [
  // Psychometric Questions
  {
    id: "interest_1",
    category: "Interest Scale",
    question: "How interested are you in working with legal documents and contracts?",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"] }
  },
  {
    id: "interest_2", 
    category: "Interest Scale",
    question: "How excited are you about using AI and technology to solve business problems?",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"] }
  },
  {
    id: "personality_1",
    category: "Personality Compatibility",
    question: "I prefer to work in a structured, organized environment with clear procedures.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },
  {
    id: "personality_2",
    category: "Personality Compatibility", 
    question: "I enjoy analyzing complex problems and finding innovative solutions.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },
  {
    id: "cognitive_1",
    category: "Cognitive Style",
    question: "When approaching a new problem, I prefer to:",
    type: "multiple_choice",
    options: [
      "Break it down systematically into smaller parts",
      "Look at the big picture first and work backwards", 
      "Try different creative approaches until something works",
      "Research similar problems and apply proven methods"
    ]
  },
  {
    id: "motivation_1",
    category: "Motivation",
    question: "I am most motivated by the opportunity to continuously learn new skills and technologies.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },
  
  // Technical Questions
  {
    id: "tech_1",
    category: "Technical Knowledge",
    question: "What is the primary purpose of Natural Language Processing (NLP) in contract analysis?",
    type: "multiple_choice",
    options: [
      "To translate contracts into different languages",
      "To extract and analyze key information from legal text",
      "To create new contracts automatically",
      "To store contracts in databases"
    ]
  },
  {
    id: "tech_2",
    category: "Technical Knowledge",
    question: "In contract lifecycle management, what does 'risk assessment' primarily involve?",
    type: "multiple_choice",
    options: [
      "Calculating the financial value of contracts",
      "Identifying potential legal and business risks in contract terms",
      "Determining contract expiration dates",
      "Managing contract storage locations"
    ]
  },
  {
    id: "aptitude_1",
    category: "Logical Reasoning",
    question: "If Contract A expires in 6 months, Contract B expires 2 months after Contract A, and Contract C expires 3 months before Contract A, in what order do the contracts expire?",
    type: "multiple_choice",
    options: [
      "C, A, B",
      "A, B, C", 
      "B, C, A",
      "C, B, A"
    ]
  },
  {
    id: "domain_1",
    category: "Domain Knowledge",
    question: "A 'force majeure' clause in a contract typically addresses:",
    type: "multiple_choice",
    options: [
      "Payment terms and conditions",
      "Unexpected events beyond parties' control",
      "Intellectual property rights",
      "Termination procedures"
    ]
  },

  // WISCAR Framework Questions
  {
    id: "will_1",
    category: "Will",
    question: "When faced with a challenging task, I tend to persist until I find a solution, even if it takes longer than expected.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  },
  {
    id: "skill_1",
    category: "Current Skills",
    question: "How would you rate your current analytical and problem-solving abilities?",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Beginner", "Developing", "Competent", "Advanced", "Expert"] }
  },
  {
    id: "learning_1",
    category: "Ability to Learn",
    question: "I actively seek feedback and use it to improve my performance.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  },
  {
    id: "alignment_1",
    category: "Real-World Alignment",
    question: "Working with detailed legal and technical documents for extended periods would be:",
    type: "multiple_choice",
    options: [
      "Very energizing and engaging for me",
      "Somewhat interesting and manageable",
      "Neutral - neither exciting nor draining",
      "Somewhat tedious but tolerable",
      "Very draining and difficult for me"
    ]
  }
];

const AssessmentFlow = ({ onComplete, onBack }: AssessmentFlowProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Contract Intelligence Assessment</h1>
            <span className="text-muted-foreground">
              {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-card border-0 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardDescription className="text-primary font-medium">
                {currentQuestion.category}
              </CardDescription>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === 'likert' && currentQuestion.scale && (
              <RadioGroup 
                value={answers[currentQuestion.id] || ""} 
                onValueChange={handleAnswer}
                className="space-y-4"
              >
                {currentQuestion.scale.labels.map((label, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <RadioGroupItem value={(index + 1).toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      <span className="font-medium">{index + 1}</span> - {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
              <RadioGroup 
                value={answers[currentQuestion.id] || ""} 
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer leading-relaxed">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentQuestionIndex === 0 ? 'Back to Intro' : 'Previous'}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-gradient-primary hover:shadow-glow"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;