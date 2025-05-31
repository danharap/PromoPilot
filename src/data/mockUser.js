import { PlusCircle, Users, Heart, Zap } from 'lucide-react';

export const mockUser = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  initials: "SJ",
  businessName: "Bloom Coffee Co."
};

export const mockStats = [
  { title: "Posts This Week", value: "12", icon: PlusCircle, change: "+3 from last week" },
  { title: "Followers Gained", value: "284", icon: Users, change: "+12% this month" },
  { title: "Engagement Rate", value: "4.2%", icon: Heart, change: "+0.8% from last month" },
  { title: "AI Suggestions", value: "8", icon: Zap, change: "Ready to use" }
];
