import { Link } from "react-router-dom";
import {
  GraduationCap,
  Twitter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
} from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Courses", path: "/courses" },
    { name: "Roadmaps", path: "/roadmap" },
    { name: "Pricing", path: "/#pricing" },
  ],
  Company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ],
  Resources: [
    { name: "Blog", path: "/blog" },
    { name: "Community", path: "/community" },
    { name: "Help Center", path: "/help" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-surface-900 text-surface-300 relative">
      {/* Main Footer */}
      <div className="section-container pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Elevate<span className="text-primary-400">U</span>
              </span>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed max-w-sm mb-6">
              Empowering careers through structured learning paths, expert-led
              courses, and smart roadmaps. Join thousands of learners building
              their future.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <a
                href="mailto:support@elevateu.com"
                className="flex items-center gap-2 text-sm text-surface-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@elevateu.com
              </a>
              <p className="flex items-center gap-2 text-sm text-surface-400">
                <Phone className="w-4 h-4" />
                +91 12345‑67890
              </p>
              <p className="flex items-center gap-2 text-sm text-surface-400">
                <MapPin className="w-4 h-4" />
                Bangalore, India
              </p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-surface-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-700/50">
        <div className="section-container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-surface-500">
            &copy; {new Date().getFullYear()} ElevateU. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-surface-700 flex items-center justify-center text-surface-400 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-elevated transition-all duration-200 hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
