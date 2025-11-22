import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

export default function Home() {
  return (
    <main>
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Connecting Global Talent to Albanian Opportunity
          </h1>
          <p className="text-gray-700 mb-8">
            Find roles, navigate permits, and thrive in Albania with trusted support.
          </p>
          <Link to="/services" className="inline-block bg-primary text-white px-6 py-3 rounded">
            Find a Job
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard
            title="Job Matching"
            description="Connect with Albanian recruiters seeking global talent."
          />
          <ServiceCard
            title="Visa Assistance"
            description="Guidance through visa and permit processes."
          />
          <ServiceCard
            title="Cultural Orientation"
            description="Resources to help you integrate and thrive in Albania."
          />
        </div>
      </section>
    </main>
  );
}
