import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import DashboardLayout from "../components/DashboardLayout";
import {
    BookOpen,
    Clock,
    TrendingUp,
    Award,
    ArrowRight,
    Play,
} from "lucide-react";

export default function Dashboard() {
    const { user } = useAuth();

    // Placeholder data – these will be replaced with API calls in Phase 6
    const statsData = [
        {
            label: "Enrolled Courses",
            value: "3",
            icon: BookOpen,
            color: "from-blue-500 to-indigo-600",
            bg: "bg-blue-50",
        },
        {
            label: "Learning Hours",
            value: "24",
            icon: Clock,
            color: "from-emerald-500 to-teal-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Courses Completed",
            value: "1",
            icon: Award,
            color: "from-amber-500 to-orange-600",
            bg: "bg-amber-50",
        },
        {
            label: "Current Streak",
            value: "5 days",
            icon: TrendingUp,
            color: "from-violet-500 to-purple-600",
            bg: "bg-violet-50",
        },
    ];

    const recentCourses = [
        { title: "Web Development Masterclass", progress: 65, category: "Web Dev" },
        { title: "GenAI Fundamentals", progress: 30, category: "AI/ML" },
        { title: "Cybersecurity Essentials", progress: 10, category: "Security" },
    ];

    return (
        <DashboardLayout>
            <div className="animate-fadeIn">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-1">
                        Welcome back, {user?.name?.split(" ")[0]} 👋
                    </h1>
                    <p className="text-surface-500">
                        Here's an overview of your learning progress
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statsData.map(({ label, value, icon: Icon, color, bg }, i) => (
                        <div
                            key={label}
                            className="card p-5 animate-fadeIn"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div
                                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-surface-900">{value}</p>
                            <p className="text-sm text-surface-500 mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* My Courses */}
                <div className="card p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-surface-900">
                            Continue Learning
                        </h2>
                        <Link
                            to="/courses"
                            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                            View All <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentCourses.map(({ title, progress, category }, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
                                    <Play className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-surface-900 text-sm truncate">
                                        {title}
                                    </p>
                                    <p className="text-xs text-surface-500">{category}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <div className="w-24 bg-surface-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-surface-500 w-8">
                                        {progress}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        {
                            title: "Browse Courses",
                            desc: "Discover new courses to learn",
                            link: "/courses",
                            icon: BookOpen,
                        },
                        {
                            title: "My Notes",
                            desc: "View and manage your notes",
                            link: "/notes",
                            icon: BookOpen,
                        },
                        {
                            title: "Career Roadmaps",
                            desc: "Follow structured learning paths",
                            link: "/roadmap",
                            icon: TrendingUp,
                        },
                    ].map(({ title, desc, link, icon: Icon }) => (
                        <Link key={title} to={link} className="card-hover p-5 group">
                            <Icon className="w-8 h-8 text-primary-500 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-surface-900 mb-1">{title}</h3>
                            <p className="text-sm text-surface-500">{desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
