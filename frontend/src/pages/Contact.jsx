import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, User, MessageSquare, Send, MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "support@elevateu.com", href: "mailto:support@elevateu.com" },
    { icon: Phone, label: "Phone", value: "+91 12345-67890", href: "tel:+911234567890" },
    { icon: MapPin, label: "Location", value: "Bangalore, India" },
    { icon: Clock, label: "Hours", value: "Mon - Fri: 9AM - 6PM IST" },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="section-heading mb-3">Get in Touch</h1>
          <p className="section-subheading mx-auto">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="space-y-4 animate-fadeIn">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-500">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-surface-900 font-medium hover:text-primary-600 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-surface-900 font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 card p-8 animate-fadeIn animate-delay-100">
            <h2 className="text-xl font-semibold text-surface-900 mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field !pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field !pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-surface-400" />
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field !pl-10 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
