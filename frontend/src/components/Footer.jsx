import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 h-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">ElevateU</h2>
          <p className="text-sm text-gray-400">
            Empowering careers through structured learning paths and smart
            roadmaps.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/roadmap" className="hover:text-white">
                Roadmaps
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">
            Email:{" "}
            <a href="mailto:support@elevateu.com" className="hover:text-white">
              support@elevateu.com
            </a>
            <br />
            Phone: +91-12345-67890
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              🔗
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              🐦
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              📸
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ElevateU. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
