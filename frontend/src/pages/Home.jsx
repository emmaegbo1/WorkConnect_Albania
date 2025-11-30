import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Example featured jobs (later you can fetch dynamically from your backend)
  const featuredJobs = [
    {
      title: "Software Engineer",
      company: "Tech Solutions Albania",
      location: "Tirana",
      description: "Join a growing IT team building modern web applications.",
    },
    {
      title: "Hospitality Staff",
      company: "Albania Resorts",
      location: "Saranda",
      description: "Work in a vibrant seaside resort with international guests.",
    },
    {
      title: "Construction Worker",
      company: "BuildCo Albania",
      location: "Durres",
      description: "Support infrastructure projects with housing provided.",
    },
  ];

  return (
    <div className="pt-20"> {/* Offset for fixed Navbar */}
      
      {/* Hero Section */}
      <section className="bg-white text-center py-24 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Connecting <span className="text-red-600">Global Talent</span> to Albanian Opportunity
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          WorkConnect ALBANIA helps foreign workers find trusted opportunities, guidance, and community support.
        </p>
        <Link
          to="/jobs"
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
        >
          Find a Job
        </Link>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-red-600">Job Matching</h3>
            <p className="text-gray-600">
              Connect with Albanian recruiters seeking global talent.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-red-600">Visa Assistance</h3>
            <p className="text-gray-600">
              Guidance through visa and permit processes.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-red-600">Cultural Orientation</h3>
            <p className="text-gray-600">
              Resources to help you integrate and thrive in Albania.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
          Featured Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2 text-red-600">{job.title}</h3>
                <p className="text-gray-700 font-medium">{job.company}</p>
                <p className="text-gray-500 text-sm mb-4">{job.location}</p>
                <p className="text-gray-600">{job.description}</p>
              </div>
              <Link
                to="/jobs"
                className="mt-6 inline-block bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;