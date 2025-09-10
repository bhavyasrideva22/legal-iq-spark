import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  BookOpen,
  ArrowRight,
  RotateCcw
} from "lucide-react";

interface AssessmentResultsProps {
  answers: Record<string, string>;
  onRestart: () => void;
}

// Scoring logic
const calculateScores = (answers: Record<string, string>) => {
  // Interest Scale Score (0-100)
  const interestQuestions = ['interest_1', 'interest_2'];
  const interestTotal = interestQuestions.reduce((sum, q) => sum + (parseInt(answers[q]) || 0), 0);
  const interestScore = Math.round((interestTotal / (interestQuestions.length * 5)) * 100);

  // Personality Compatibility Score (0-100)
  const personalityQuestions = ['personality_1', 'personality_2'];
  const personalityTotal = personalityQuestions.reduce((sum, q) => sum + (parseInt(answers[q]) || 0), 0);
  const personalityScore = Math.round((personalityTotal / (personalityQuestions.length * 5)) * 100);

  // Technical Readiness Score (0-100)
  const techQuestions = ['tech_1', 'tech_2', 'aptitude_1', 'domain_1'];
  let techCorrect = 0;
  
  // Correct answers for technical questions
  const correctAnswers = {
    'tech_1': 'To extract and analyze key information from legal text',
    'tech_2': 'Identifying potential legal and business risks in contract terms',
    'aptitude_1': 'C, A, B',
    'domain_1': 'Unexpected events beyond parties\' control'
  };
  
  techQuestions.forEach(q => {
    if (answers[q] === correctAnswers[q as keyof typeof correctAnswers]) {
      techCorrect++;
    }
  });
  const techScore = Math.round((techCorrect / techQuestions.length) * 100);

  // WISCAR Scores
  const willScore = Math.round((parseInt(answers['will_1']) || 0) * 20);
  const skillScore = Math.round((parseInt(answers['skill_1']) || 0) * 20);
  const learningScore = Math.round((parseInt(answers['learning_1']) || 0) * 20);
  
  // Overall scores
  const psychometricFit = Math.round((interestScore + personalityScore) / 2);
  const technicalReadiness = techScore;
  const wiscarOverall = Math.round((willScore + skillScore + learningScore) / 3);
  const confidenceScore = Math.round((psychometricFit + technicalReadiness + wiscarOverall) / 3);

  return {
    interestScore,
    personalityScore,
    techScore,
    willScore,
    skillScore,
    learningScore,
    psychometricFit,
    technicalReadiness,
    wiscarOverall,
    confidenceScore
  };
};

const getRecommendation = (confidenceScore: number) => {
  if (confidenceScore >= 80) {
    return {
      recommendation: "Strong Yes",
      level: "success",
      description: "You show strong interest, skills & readiness for Contract Intelligence.",
      nextSteps: [
        "Start foundational courses on Contract Intelligence tools",
        "Enroll in domain-specific bootcamps",
        "Begin building a portfolio with real contract analysis projects",
        "Connect with professionals in Legal Tech industry"
      ],
      alternatives: []
    };
  } else if (confidenceScore >= 50) {
    return {
      recommendation: "Maybe - Develop Key Areas",
      level: "warning",
      description: "Moderate fit; develop key areas before full commitment to the field.",
      nextSteps: [
        "Take beginner tutorials in contract analysis",
        "Seek mentorship from industry professionals",
        "Practice with aptitude and technical skills tests",
        "Build foundational knowledge in legal terminology"
      ],
      alternatives: [
        "Compliance and Risk Management",
        "Contract Management (non-technical focus)",
        "Business Analysis in Legal sector"
      ]
    };
  } else {
    return {
      recommendation: "Not Recommended",
      level: "destructive", 
      description: "Low readiness; consider improving basics first or explore alternative paths.",
      nextSteps: [
        "Build foundational skills in data analysis",
        "Improve logical reasoning and problem-solving abilities",
        "Consider general business or legal studies first",
        "Explore your interests through informational interviews"
      ],
      alternatives: [
        "General Business Analysis",
        "Customer Success in Tech",
        "Project Management",
        "Legal Administration"
      ]
    };
  }
};

const AssessmentResults = ({ answers, onRestart }: AssessmentResultsProps) => {
  const scores = calculateScores(answers);
  const recommendation = getRecommendation(scores.confidenceScore);

  const topRoles = [
    { title: "Contract Intelligence Specialist", match: scores.confidenceScore },
    { title: "Contract Analyst", match: Math.max(scores.confidenceScore - 10, 0) },
    { title: "Legal Tech Consultant", match: Math.max(scores.confidenceScore - 15, 0) },
    { title: "Risk Manager", match: Math.max(scores.confidenceScore - 20, 0) },
    { title: "Compliance Officer", match: Math.max(scores.confidenceScore - 25, 0) }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-success" />;
    if (score >= 50) return <AlertCircle className="h-5 w-5 text-warning" />;
    return <AlertCircle className="h-5 w-5 text-destructive" />;
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based on your responses, here's your comprehensive evaluation for Contract Intelligence roles.
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`mb-8 shadow-card border-2 ${
          recommendation.level === 'success' ? 'border-success' : 
          recommendation.level === 'warning' ? 'border-warning' : 'border-destructive'
        }`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              {getScoreIcon(scores.confidenceScore)}
              <div>
                <CardTitle className="text-2xl">
                  {recommendation.recommendation}
                </CardTitle>
                <CardDescription className="text-lg mt-1">
                  Confidence Score: <span className={`font-bold ${getScoreColor(scores.confidenceScore)}`}>
                    {scores.confidenceScore}%
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{recommendation.description}</p>
            <Progress value={scores.confidenceScore} className="h-3" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Detailed Scores */}
          <div className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-primary" />
                  Psychometric Fit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Interest Scale</span>
                    <span className={`font-bold ${getScoreColor(scores.interestScore)}`}>
                      {scores.interestScore}%
                    </span>
                  </div>
                  <Progress value={scores.interestScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Personality Compatibility</span>
                    <span className={`font-bold ${getScoreColor(scores.personalityScore)}`}>
                      {scores.personalityScore}%
                    </span>
                  </div>
                  <Progress value={scores.personalityScore} className="h-2" />
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Overall Psychometric Fit</span>
                    <span className={`font-bold text-lg ${getScoreColor(scores.psychometricFit)}`}>
                      {scores.psychometricFit}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Technical Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span>Knowledge & Aptitude Score</span>
                  <span className={`font-bold text-lg ${getScoreColor(scores.technicalReadiness)}`}>
                    {scores.technicalReadiness}%
                  </span>
                </div>
                <Progress value={scores.technicalReadiness} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  Based on domain knowledge and logical reasoning assessment
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-primary" />
                  WISCAR Framework
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Will</span>
                      <span className={`font-bold ${getScoreColor(scores.willScore)}`}>
                        {scores.willScore}%
                      </span>
                    </div>
                    <Progress value={scores.willScore} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Skill</span>
                      <span className={`font-bold ${getScoreColor(scores.skillScore)}`}>
                        {scores.skillScore}%
                      </span>
                    </div>
                    <Progress value={scores.skillScore} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Learning Ability</span>
                      <span className={`font-bold ${getScoreColor(scores.learningScore)}`}>
                        {scores.learningScore}%
                      </span>
                    </div>
                    <Progress value={scores.learningScore} className="h-1.5" />
                  </div>
                  <div className="pt-2 border-t col-span-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">WISCAR Overall</span>
                      <span className={`font-bold ${getScoreColor(scores.wiscarOverall)}`}>
                        {scores.wiscarOverall}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations and Career Guidance */}
          <div className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recommendation.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  Role Compatibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topRoles.map((role, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{role.title}</span>
                        <span className={`text-sm font-bold ${getScoreColor(role.match)}`}>
                          {role.match}%
                        </span>
                      </div>
                      <Progress value={role.match} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {recommendation.alternatives.length > 0 && (
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle>Alternative Career Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.alternatives.map((alt, index) => (
                      <Badge key={index} variant="outline">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <Button 
            onClick={onRestart}
            variant="outline"
            className="flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;