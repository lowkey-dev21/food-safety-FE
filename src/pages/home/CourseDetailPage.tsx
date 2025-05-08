import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Play, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Module {
  id: string;
  course_id: string;
  course_title: string;
  course_description: string;
  module_id: string;
  module_title: string;
  module_description: string;
  module_content: string;
  module_file_content: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  moduleId: string;
  questions: QuizQuestion[];
}

interface RouteParams {
  id: string;
}

const mockModulesData: Record<string, Module[]> = {
  "1": [
    {
      id: "1",
      course_id: "1",
      course_title: "Food Safety Basics",
      course_description: "Learn the fundamental principles of food safety and handling",
      module_id: "1",
      module_title: "Food Safety Fundamentals",
      module_description: "Learn about basic food safety principles",
      module_content: "<p>This module covers essential food safety concepts including:</p><ul><li>Temperature control</li><li>Cross-contamination prevention</li><li>Personal hygiene</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1635321593217-40050ad13c74"
    },
    {
      id: "2",
      course_id: "1",
      course_title: "Food Safety Basics",
      course_description: "Learn the fundamental principles of food safety and handling",
      module_id: "2",
      module_title: "Foodborne Illnesses",
      module_description: "Understanding foodborne pathogens and prevention",
      module_content: "<p>Learn about common foodborne illnesses:</p><ul><li>Types of bacteria</li><li>Prevention methods</li><li>Symptoms recognition</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
    },
    {
      id: "3",
      course_id: "1",
      course_title: "Food Safety Basics",
      course_description: "Learn the fundamental principles of food safety and handling",
      module_id: "3",
      module_title: "Safe Food Handling",
      module_description: "Proper food handling techniques",
      module_content: "<p>Master safe food handling practices:</p><ul><li>Storage methods</li><li>Temperature monitoring</li><li>Safe preparation</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1466637574441-749b8f19452f"
    }
  ],
  "2": [
    {
      id: "4",
      course_id: "2",
      course_title: "Advanced Food Handling",
      course_description: "Master advanced techniques in food handling and storage",
      module_id: "1",
      module_title: "Advanced Sanitation",
      module_description: "Professional sanitation techniques",
      module_content: "<p>This module covers advanced sanitation including:</p><ul><li>HACCP principles</li><li>Professional cleaning methods</li><li>Sanitization protocols</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5"
    },
    {
      id: "5",
      course_id: "2",
      course_title: "Advanced Food Handling",
      course_description: "Master advanced techniques in food handling and storage",
      module_id: "2",
      module_title: "Temperature Control",
      module_description: "Advanced temperature management",
      module_content: "<p>Master temperature control:</p><ul><li>Critical control points</li><li>Monitoring systems</li><li>Documentation</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1576671081837-49b1a2a269ca"
    },
    {
      id: "6",
      course_id: "2",
      course_title: "Advanced Food Handling",
      course_description: "Master advanced techniques in food handling and storage",
      module_id: "3",
      module_title: "Quality Assurance",
      module_description: "Quality control and documentation",
      module_content: "<p>Implement quality control measures:</p><ul><li>Inspection procedures</li><li>Record keeping</li><li>Compliance standards</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
    }
  ],
  "3": [
    {
      id: "7",
      course_id: "3",
      course_title: "Kitchen Hygiene",
      course_description: "Essential practices for maintaining kitchen hygiene",
      module_id: "1",
      module_title: "Personal Hygiene",
      module_description: "Essential personal hygiene practices",
      module_content: "<p>Learn about personal hygiene:</p><ul><li>Hand washing</li><li>Protective equipment</li><li>Health monitoring</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c"
    },
    {
      id: "8",
      course_id: "3",
      course_title: "Kitchen Hygiene",
      course_description: "Essential practices for maintaining kitchen hygiene",
      module_id: "2",
      module_title: "Kitchen Sanitization",
      module_description: "Proper cleaning and sanitization",
      module_content: "<p>Master kitchen sanitization:</p><ul><li>Cleaning schedules</li><li>Chemical safety</li><li>Equipment maintenance</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4"
    },
    {
      id: "9",
      course_id: "3",
      course_title: "Kitchen Hygiene",
      course_description: "Essential practices for maintaining kitchen hygiene",
      module_id: "3",
      module_title: "Pest Control",
      module_description: "Pest prevention and management",
      module_content: "<p>Implement pest control measures:</p><ul><li>Prevention methods</li><li>Monitoring systems</li><li>Response procedures</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1585338107529-13afc5f02586"
    }
  ],
  "4": [
    {
      id: "10",
      course_id: "4",
      course_title: "Food Storage Guidelines",
      course_description: "Learn proper food storage techniques and temperature control",
      module_id: "1",
      module_title: "Storage Basics",
      module_description: "Fundamental storage principles",
      module_content: "<p>Master food storage basics:</p><ul><li>Storage zones</li><li>Organization methods</li><li>Rotation systems</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9"
    },
    {
      id: "11",
      course_id: "4",
      course_title: "Food Storage Guidelines",
      course_description: "Learn proper food storage techniques and temperature control",
      module_id: "2",
      module_title: "Temperature Zones",
      module_description: "Understanding storage temperatures",
      module_content: "<p>Learn about temperature zones:</p><ul><li>Freezer storage</li><li>Refrigeration</li><li>Dry storage</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1591688515527-f7b20bd9d116"
    },
    {
      id: "12",
      course_id: "4",
      course_title: "Food Storage Guidelines",
      course_description: "Learn proper food storage techniques and temperature control",
      module_id: "3",
      module_title: "Inventory Management",
      module_description: "Effective inventory control",
      module_content: "<p>Master inventory management:</p><ul><li>Stock rotation</li><li>Inventory tracking</li><li>Waste reduction</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1542838132-92c53300491e"
    }
  ],
  "5": [
    {
      id: "13",
      course_id: "5",
      course_title: "Contamination Prevention",
      course_description: "Strategies to prevent food contamination in professional settings",
      module_id: "1",
      module_title: "Types of Contamination",
      module_description: "Understanding contamination types",
      module_content: "<p>Learn about contamination:</p><ul><li>Physical contamination</li><li>Chemical contamination</li><li>Biological contamination</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1585338107529-13afc5f02586"
    },
    {
      id: "14",
      course_id: "5",
      course_title: "Contamination Prevention",
      course_description: "Strategies to prevent food contamination in professional settings",
      module_id: "2",
      module_title: "Prevention Methods",
      module_description: "Contamination prevention strategies",
      module_content: "<p>Master prevention techniques:</p><ul><li>Safe handling</li><li>Storage practices</li><li>Cross-contamination prevention</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1616824421015-456b55bd4118"
    },
    {
      id: "15",
      course_id: "5",
      course_title: "Contamination Prevention",
      course_description: "Strategies to prevent food contamination in professional settings",
      module_id: "3",
      module_title: "Emergency Response",
      module_description: "Handling contamination incidents",
      module_content: "<p>Learn emergency procedures:</p><ul><li>Incident reporting</li><li>Containment methods</li><li>Corrective actions</li></ul>",
      module_file_content: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa"
    }
  ]
};

const mockQuizzes: Record<string, Quiz> = {
  "1": {
    moduleId: "1",
    questions: [
      {
        id: 1,
        question: "What is the safe temperature range for storing cold food?",
        options: ["0°F to 32°F", "33°F to 40°F", "41°F to 50°F", "51°F to 60°F"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which practice helps prevent cross-contamination?",
        options: [
          "Using the same cutting board for raw meat and vegetables",
          "Washing hands between handling different foods",
          "Storing cooked meat below raw meat",
          "Using the same utensils for all foods"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "How often should food handlers wash their hands?",
        options: [
          "Only at the start of their shift",
          "Once every hour",
          "After using the restroom only",
          "After any activity that could contaminate hands"
        ],
        correctAnswer: 3
      },
      {
        id: 4,
        question: "What is the minimum internal cooking temperature for poultry?",
        options: [
          "145°F (63°C)",
          "155°F (68°C)",
          "165°F (74°C)",
          "175°F (79°C)"
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "Which of the following is NOT a proper way to thaw frozen food?",
        options: [
          "In the refrigerator",
          "Under cold running water",
          "On the counter at room temperature",
          "In the microwave"
        ],
        correctAnswer: 2
      }
    ]
  },
  "2": {
    moduleId: "2",
    questions: [
      {
        id: 1,
        question: "Which bacteria is commonly associated with raw chicken?",
        options: ["E. coli", "Salmonella", "Listeria", "Botulism"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What is the 'danger zone' temperature range for bacterial growth?",
        options: [
          "0°F to 32°F",
          "40°F to 140°F",
          "140°F to 165°F",
          "165°F to 212°F"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "How long can food be left in the danger zone before becoming unsafe?",
        options: [
          "30 minutes",
          "1 hour",
          "2 hours",
          "4 hours"
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "Which symptom is NOT typically associated with food poisoning?",
        options: [
          "Nausea",
          "Diarrhea",
          "Rash",
          "Vomiting"
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "What should you do if you suspect food poisoning?",
        options: [
          "Continue working normally",
          "Take medicine and keep hydrated",
          "Report the incident and seek medical attention",
          "Ignore the symptoms"
        ],
        correctAnswer: 2
      }
    ]
  }
};

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<keyof RouteParams>();
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  useEffect(() => {
    const loadMockModules = (): void => {
      setIsLoading(true);
      setTimeout(() => {
        if (!id) {
          setError("Course ID is required");
          setIsLoading(false);
          return;
        }

        const mockModules = mockModulesData[id];
        if (mockModules) {
          setModules(mockModules);
          setError(null);
        } else {
          setError("Course not found");
        }
        setIsLoading(false);
      }, 500);
    };

    loadMockModules();
  }, [id]);

  const handleEnroll = (moduleId: string): void => {
    console.log(`Enrolled in module: ${moduleId}`);
  };

  const handleStartQuiz = (moduleId: string): void => {
    setCurrentModuleId(moduleId);
    setShowQuiz(true);
    setQuizAnswers([]);
    setQuizSubmitted(false);
    setQuizScore(0);
    setCurrentQuestion(0);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number): void => {
    setQuizAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleQuizSubmit = (): void => {
    if (!currentModuleId) return;

    const currentQuiz = mockQuizzes[currentModuleId];
    if (!currentQuiz) return;

    const score = currentQuiz.questions.reduce((acc, question, index) => {
      return acc + (quizAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    const percentage = (score / currentQuiz.questions.length) * 100;
    setQuizScore(percentage);
    setQuizSubmitted(true);
  };

  const QuizModal: React.FC = () => {
    if (!currentModuleId) return null;
    const currentQuiz = mockQuizzes[currentModuleId];
    if (!currentQuiz) return null;

    const totalQuestions = currentQuiz.questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
          {!quizSubmitted ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">Module Quiz</h2>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* Show only current question */}
                <div className="p-6 border rounded-lg bg-gray-50">
                  <h3 className="text-xl font-medium mb-6">
                    {currentQuiz.questions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {currentQuiz.questions[currentQuestion].options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswerSelect(currentQuestion, oIndex)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 
                          ${quizAnswers[currentQuestion] === oIndex 
                            ? 'bg-blue-100 border-blue-500 border-2' 
                            : 'bg-white border hover:bg-gray-50 border-gray-200'}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3
                            ${quizAnswers[currentQuestion] === oIndex 
                              ? 'border-blue-500 bg-blue-500 text-white' 
                              : 'border-gray-300'}`}
                          >
                            {quizAnswers[currentQuestion] === oIndex && '✓'}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  type="button"
                >
                  Previous
                </button>
                {currentQuestion < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={quizAnswers[currentQuestion] === undefined}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                      disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    type="button"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={quizAnswers.length !== totalQuestions}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                      disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    type="button"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4
                ${quizScore >= 70 ? 'bg-green-100' : 'bg-red-100'}`}
              >
                {quizScore >= 70 ? (
                  <span className="text-green-600 text-4xl">✓</span>
                ) : (
                  <span className="text-red-600 text-4xl">×</span>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
              <div className="text-5xl font-bold mb-4 
                ${quizScore >= 70 ? 'text-green-600' : 'text-red-600'}">
                {quizScore}%
              </div>
              <p className="text-gray-600 mb-8">
                {quizScore >= 70 
                  ? "Congratulations! You've passed the quiz!" 
                  : "Try again to achieve a passing score of 70% or higher."}
              </p>
              <div className="flex gap-4 justify-center">
                {quizScore < 70 && (
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers([]);
                      setCurrentQuestion(0);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    type="button"
                  >
                    Try Again
                  </button>
                )}
                <button
                  onClick={() => setShowQuiz(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{error}</h2>
        <Link
          to="/training"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Back to courses
        </Link>
      </div>
    );
  }

  if (!modules.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Module not found</h2>
        <Link
          to="/training"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white  py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/training"
          className="group inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {modules.map((module) => {
              console.log('Module image URL:', module.module_file_content);
              return (
                <div
                  key={module.module_id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden mb-8"
                >
                  <div
                    className="relative h-48 sm:h-72 md:h-96"
                    style={{
                      backgroundImage: `url(${module.module_file_content})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <button className="bg-white/20 hover:bg-white/30 rounded-full p-4">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-sm text-gray-500 mb-2 block">
                      {module.course_title}
                    </span>
                    <h1 className="text-2xl font-bold mb-4">{module.module_title}</h1>
                    <p className="text-gray-600 mb-6">{module.module_description}</p>

                    <div className="border-t pt-6">
                      <h2 className="text-lg font-semibold mb-4">Module Content</h2>
                      <div className="prose prose-sm max-w-none mb-6">
                        {module.module_content ? (
                          <div dangerouslySetInnerHTML={{ __html: module.module_content }} />
                        ) : (
                          <p className="text-gray-500 italic">No content available for this module</p>
                        )}
                      </div>

                      <div className="flex gap-4 mt-4">
                        <button
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
                          onClick={() => {
                            handleEnroll(module.module_id);
                            console.log(`Starting module: ${module.module_id}`);
                          }}
                        >
                          Start Course
                        </button>
                        <button
                          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                          onClick={() => handleStartQuiz(module.module_id)}
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-medium mb-4">About this Course</h3>
              <p className="text-sm text-gray-600">
                {modules[0]?.course_description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {showQuiz && <QuizModal />}
    </div>
  );
};

export default CourseDetailPage;
