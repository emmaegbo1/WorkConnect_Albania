import React from "react";

export default function AboutUs() {
  const team = [
    {
      name: "Emmanuel",
      role: "Founder & Technical Architect",
      bio: "Leads platform vision, architecture, and branding to empower foreign workers in Albania.",
    },
    {
      name: "Ardita",
      role: "Community Manager",
      bio: "Supports workers with guidance, cultural integration, and community-building initiatives.",
    },
    {
      name: "Besnik",
      role: "Recruiter Relations",
      bio: "Builds partnerships with Albanian employers to connect them with global talent.",
    },
    {
      name: "Elira",
      role: "Legal Advisor",
      bio: "Ensures compliance with Albanian labor laws and visa regulations.",
    },
  ];

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <section className="text-center mb-16 px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          About <span className="text-red-600">Us</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          WorkConnect ALBANIA is dedicated to connecting global talent with trusted opportunities in Albania. 
          We empower foreign workers with guidance, community, and resources to thrive.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4 text-red-600">Our Mission</h3>
          <p className="text-gray-600">
            To build a trustworthy platform that bridges international talent with Albanian recruiters, 
            ensuring inclusivity, transparency, and professional growth.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4 text-red-600">Our Vision</h3>
          <p className="text-gray-600">
            To become the leading employment agency for foreigners in Albania, 
            recognized for community support, innovation, and technical excellence.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
          Meet Our <span className="text-red-600">Team</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition text-center flex flex-col items-center"
            >
              {/* Placeholder Avatar */}
              <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-red-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}