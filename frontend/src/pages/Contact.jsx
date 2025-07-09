export default function Contact() {
  return (
    <div className="pt-12 px-6 md:px-16 py-12 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-12">
        📬 Contact Us
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6 border border-blue-100">
        <p className="text-gray-700 text-lg text-center">
          Got a question, suggestion, or need support? Fill out the form below
          and we'll get back to you soon.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
