import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, Award, CheckCircle, Clock } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  const successTraits = [
    "Analytical thinking & attention to detail",
    "Strong problem-solving skills", 
    "Curiosity and continuous learning mindset",
    "Ability to interpret legal/technical data",
    "Persistence and adaptability"
  ];

  const careers = [
    "Contract Intelligence Specialist",
    "Contract Analyst", 
    "Legal Tech Consultant",
    "Risk Manager",
    "Compliance Officer",
    "AI/Data Analyst in Legal Tech"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Professional Assessment
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Readiness & Fit Assessment for 
            <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Contract Intelligence Specialist
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Evaluate your psychological fit, technical readiness, and career alignment for a role 
            in Contract Intelligence through our scientifically-designed assessment.
          </p>
        </div>

        {/* What is Contract Intelligence */}
        <Card className="mb-8 shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-primary" />
              What is Contract Intelligence?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Contract Intelligence is the application of AI, NLP, and data analytics to extract, 
              analyze, and manage contractual data for improved decision-making, risk management, 
              and compliance. It transforms traditional contract processes through intelligent automation.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Success Traits */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="h-6 w-6 text-success" />
                Success Traits
              </CardTitle>
              <CardDescription>
                Key characteristics for thriving in this role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {successTraits.map((trait, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{trait}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Career Paths */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                Typical Career Paths
              </CardTitle>
              <CardDescription>
                Professional opportunities in this field
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {careers.map((career, index) => (
                <Badge key={index} variant="outline" className="mr-2 mb-2">
                  {career}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Assessment Overview */}
        <Card className="mb-8 shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="h-6 w-6 text-warning" />
              Assessment Overview
            </CardTitle>
            <CardDescription>
              What you'll experience during this comprehensive evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6 text-accent-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Psychometric Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Personality compatibility, motivation, and cognitive style assessment
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-accent-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Technical Readiness</h4>
                <p className="text-sm text-muted-foreground">
                  Domain knowledge, aptitude, and prerequisite skills evaluation
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-accent-foreground" />
                </div>
                <h4 className="font-semibold mb-2">WISCAR Framework</h4>
                <p className="text-sm text-muted-foreground">
                  Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world alignment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Assessment */}
        <Card className="text-center shadow-primary border-0 bg-gradient-secondary">
          <CardContent className="pt-8 pb-8">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Begin?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The assessment takes approximately 20-30 minutes to complete. 
              You'll receive detailed results and personalized recommendations.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold"
              onClick={onStartAssessment}
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentIntro;