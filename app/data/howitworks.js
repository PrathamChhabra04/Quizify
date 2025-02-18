import { FileEdit, Users, UserPlus, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Create Your Quiz",
    description: "Design engaging quizzes using our intuitive quiz builder.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Attempt Quizzes",
    description: "Test your knowledge with a wide range of quizzes available.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Get AI Explanations",
    description:
      "Receive instant AI-powered explanations for detailed insights.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "View Leaderboard",
    description: "Compare scores with other users and track your progress.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
