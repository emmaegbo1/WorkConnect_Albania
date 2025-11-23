import React from "react";

export default function Contact() {
  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Contact <span className="text-red-600">Us</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
          Have questions or need support? Get in touch with WorkConnect ALBANIA and our team will assist you.
        </p>

        {/* Contact Form */}
        <form className="grid gap-4 max-w-md mx-auto text-left">
          <input
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Name"
          />
          <input
            type="email"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Email"
          />
          <textarea
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Message"
            rows={4}
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

