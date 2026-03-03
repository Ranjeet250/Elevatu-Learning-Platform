import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Map,
  TrendingUp,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Brain,
  Code2,
  BarChart3,
  Award,
  Clock,
  Play,
} from "lucide-react";

/* ───── Animated Counter ───── */
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ───── Data ───── */
const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    desc: "Learn from industry professionals with structured, hands-on courses across Tech and Non-Tech domains.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Map,
    title: "Career Roadmaps",
    desc: "Follow step-by-step learning paths in Web Dev, AI, Cybersecurity, Data Analysis, and more.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    desc: "Track your learning journey with visual progress bars, stats, and achievement milestones.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    desc: "Get personalized roadmaps and course recommendations powered by advanced AI models.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data is protected with industry-standard encryption and JWT-based authentication.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Zap,
    title: "Learn Anywhere",
    desc: "Fully responsive platform — learn on your desktop, tablet, or phone anytime.",
    color: "from-cyan-500 to-blue-600",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    text: "ElevateU's web development roadmap helped me land my first developer job within 6 months. The structured approach made all the difference.",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Data Analyst",
    text: "The data analysis course was incredibly well-structured. I went from zero to confident with real-world projects and clear milestones.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    role: "ML Engineer",
    text: "Best platform for transitioning into AI/ML. The roadmaps gave me clarity on what to learn first and the courses delivered depth.",
    rating: 5,
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Active Learners" },
  { value: 50, suffix: "+", label: "Expert Courses" },
  { value: 5, suffix: "", label: "Career Paths" },
  { value: 95, suffix: "%", label: "Completion Rate" },
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    desc: "Get started with free courses and roadmaps",
    features: [
      "Access to free courses",
      "Career roadmaps",
      "Community access",
      "Basic progress tracking",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "499",
    period: "/mo",
    desc: "Unlock all courses and premium features",
    features: [
      "All free features",
      "All premium courses",
      "AI-powered recommendations",
      "Course notes & bookmarks",
      "Certificate of completion",
      "Priority support",
    ],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For teams and organizations",
    features: [
      "All Pro features",
      "Team management dashboard",
      "Custom learning paths",
      "Analytics & reporting",
      "Dedicated account manager",
      "SSO integration",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

/* ───── PAGE ───── */
export default function Home() {
  const { user } = useAuth();

  return (
    <div className="overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-surface-50 via-primary-50/30 to-surface-50 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-float animate-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl" />

        <div className="section-container relative z-10 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>New: AI-Powered Learning Paths</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 leading-[1.1] tracking-tight mb-6">
                Elevate Your{" "}
                <span className="text-gradient-accent">Career</span>
                <br />
                with Structured Learning
              </h1>

              <p className="text-lg sm:text-xl text-surface-500 leading-relaxed max-w-lg mb-8">
                Master in-demand skills through expert-led courses, step-by-step
                roadmaps, and personalized learning paths in tech and beyond.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="btn-primary text-center flex items-center justify-center gap-2 text-base"
                >
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {!user && (
                  <Link
                    to="/register"
                    className="btn-secondary text-center text-base"
                  >
                    Start Free →
                  </Link>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex items-center gap-6 text-sm text-surface-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  Free to start
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-500" />
                  Cancel anytime
                </span>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:block relative animate-slideUp">
              <div className="relative">
                {/* Main card */}
                <div className="card p-6 w-full max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-surface-900">
                        Web Development
                      </p>
                      <p className="text-sm text-surface-500">12 modules · 48 hours</p>
                    </div>
                  </div>
                  <div className="w-full bg-surface-100 rounded-full h-2 mb-3">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full w-[65%]" />
                  </div>
                  <p className="text-sm text-surface-500">65% complete</p>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-8 card p-3 shadow-elevated animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                      <Award className="w-4 h-4 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-surface-900">
                        Achievement!
                      </p>
                      <p className="text-xs text-surface-500">Course completed</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-8 card p-3 shadow-elevated animate-float animate-delay-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-surface-900">
                        24h streak
                      </p>
                      <p className="text-xs text-surface-500">Keep it up! 🔥</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="py-16 bg-white border-y border-surface-100">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, suffix, label }, i) => (
              <div key={label} className="text-center animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                <p className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">
                  <Counter end={value} suffix={suffix} />
                </p>
                <p className="text-sm text-surface-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="py-20 lg:py-28 bg-surface-50" id="features">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Everything you need to{" "}
              <span className="text-gradient">succeed</span>
            </h2>
            <p className="section-subheading mx-auto">
              From curated courses to AI-powered roadmaps, we have the tools to
              accelerate your career growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <div
                key={title}
                className="card-hover p-6 group animate-fadeIn"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-surface-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Loved by <span className="text-gradient">learners</span>
            </h2>
            <p className="section-subheading mx-auto">
              See what our community members have to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }, i) => (
              <div
                key={name}
                className="card p-6 animate-fadeIn"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-surface-600 text-sm leading-relaxed mb-6">
                  "{text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900">
                      {name}
                    </p>
                    <p className="text-xs text-surface-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section
        className="py-20 lg:py-28 bg-gradient-to-b from-surface-50 to-white"
        id="pricing"
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Simple, transparent{" "}
              <span className="text-gradient">pricing</span>
            </h2>
            <p className="section-subheading mx-auto">
              Start free and upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map(
              ({ name, price, period, desc, features: planFeatures, cta, popular }, i) => (
                <div
                  key={name}
                  className={`card p-8 relative animate-fadeIn ${popular
                      ? "border-2 border-primary-500 shadow-glow scale-[1.03]"
                      : ""
                    }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="badge-primary !text-xs">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-surface-900 mb-1">
                    {name}
                  </h3>
                  <p className="text-sm text-surface-500 mb-5">{desc}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-surface-900">
                      {price === "Custom" ? "" : "₹"}
                      {price}
                    </span>
                    {period && (
                      <span className="text-surface-500 text-sm">{period}</span>
                    )}
                  </div>

                  <Link
                    to={name === "Enterprise" ? "/contact" : "/register"}
                    className={`block text-center w-full rounded-xl py-3 font-semibold text-sm transition-all duration-200 mb-6 ${popular
                        ? "bg-primary-600 text-white hover:bg-primary-700 shadow-soft"
                        : "bg-surface-100 text-surface-700 hover:bg-surface-200"
                      }`}
                  >
                    {cta}
                  </Link>

                  <ul className="space-y-3">
                    {planFeatures.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-surface-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
        <div className="section-container text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to elevate your career?
          </h2>
          <p className="text-primary-200 text-lg max-w-xl mx-auto mb-8">
            Join thousands of learners who are building their future with
            ElevateU. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-elevated text-center"
            >
              Get Started Free
            </Link>
            <Link
              to="/courses"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-center"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
