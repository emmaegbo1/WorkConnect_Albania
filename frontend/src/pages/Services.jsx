import React from "react";
import {
  BriefcaseIcon,
  GlobeAltIcon,
  IdentificationIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function Services() {
  const services = [
    {
      title: "Job Matching",
      description: "Connect with Albanian recruiters seeking global talent.",
      icon: BriefcaseIcon,
    },
    {
      title: "Visa Assistance",
      description: "Guidance through visa and permit processes.",
      icon: IdentificationIcon,
    },
    {
      title: "Cultural Orientation",
      description: "Resources to help you integrate and thrive in Albania.",
      icon: GlobeAltIcon,
    },
    {
      title: "Community Support",
      description: "Join a welcoming network of foreign workers in Albania.",
      icon: UsersIcon,
    },
  ];

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <section className="text-center mb-16 px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Our <span className="text-red-600">Services</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          WorkConnect ALBANIA provides trusted guidance and opportunities to help foreign workers succeed.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
          >
            <service.icon className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-red-600">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}