import { useState } from "react";
import AssessmentIntro from "@/components/AssessmentIntro";
import AssessmentFlow from "@/components/AssessmentFlow";
import AssessmentResults from "@/components/AssessmentResults";

type AppState = 'intro' | 'assessment' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('intro');
  const [assessmentResults, setAssessmentResults] = useState<Record<string, string>>({});

  const handleStartAssessment = () => {
    setCurrentState('assessment');
  };

  const handleAssessmentComplete = (results: Record<string, string>) => {
    setAssessmentResults(results);
    setCurrentState('results');
  };

  const handleBackToIntro = () => {
    setCurrentState('intro');
  };

  const handleRestart = () => {
    setAssessmentResults({});
    setCurrentState('intro');
  };

  switch (currentState) {
    case 'intro':
      return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
    case 'assessment':
      return (
        <AssessmentFlow 
          onComplete={handleAssessmentComplete}
          onBack={handleBackToIntro}
        />
      );
    case 'results':
      return (
        <AssessmentResults 
          answers={assessmentResults}
          onRestart={handleRestart}
        />
      );
    default:
      return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
  }
};

export default Index;
