// src/pages/Jobs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);

        const featuredRes = await fetch("/api/jobs/featured");
        const featuredData = await featuredRes.json();
        setFeatured(featuredData);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">Loading jobs...</p>
    );
  }

  // Example jobs (fallback/demo content)
  const exampleJobs = [
    { _id: "example1", title: "Frontend Developer", company: "Tech Solutions", location: "Tirana", role: "developer" },
    { _id: "example2", title: "Marketing Specialist", company: "Creative Agency", location: "Durres", role: "marketing" },
    { _id: "example3", title: "Project Manager", company: "Global Consulting", location: "Shkoder", role: "manager" },
    { _id: "example4", title: "Data Analyst", company: "FinTech Group", location: "Vlore", role: "analyst" },
  ];

  const jobsToDisplay = jobs.length > 0 ? jobs : exampleJobs;

  // Filtering logic
  const filteredJobs = jobsToDisplay.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "" || job.location === locationFilter;

    const matchesRole =
      roleFilter === "" || job.role === roleFilter;

    return matchesSearch && matchesLocation && matchesRole;
  });

  return (
    <div className="pt-24 bg-gray-50 min-h-screen px-6">
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Available <span className="text-red-600">Jobs</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
          Explore opportunities with WorkConnect ALBANIA. Use the search and filters to find your ideal role.
        </p>

        {/* Search & Filters */}
        <div className="max-w-3xl mx-auto mb-12 grid gap-4 md:grid-cols-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {/* Location Dropdown */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">All Locations</option>
            <option value="Tirana">Tirana</option>
            <option value="Durres">Durres</option>
            <option value="Vlore">Vlore</option>
            <option value="Shkoder">Shkoder</option>
          </select>

          {/* Role Dropdown */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">All Roles</option>
            <option value="developer">Developer</option>
            <option value="marketing">Marketing</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
          </select>
        </div>

        {/* Featured Jobs */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Featured <span className="text-red-600">Jobs</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {featured.map((job) => (
                <Link
                  key={job._id}
                  to={`/jobs/${job._id}`}
                  className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
                >
                  <h4 className="text-xl font-semibold text-red-600 mb-2">
                    {job.title}
                  </h4>
                  <p className="text-gray-700">{job.company}</p>
                  <p className="text-gray-500">{job.location}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Jobs */}
        <div className="text-left">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            All <span className="text-red-600">Jobs</span>
          </h3>
          {filteredJobs.length === 0 ? (
            <p className="text-gray-500">No jobs match your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Link
                  key={job._id}
                  to={`/jobs/${job._id}`}
                  className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
                >
                  <h4 className="text-xl font-semibold text-red-600 mb-2">
                    {job.title}
                  </h4>
                  <p className="text-gray-700">{job.company}</p>
                  <p className="text-gray-500">{job.location}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}









// // src/pages/Jobs.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Jobs() {
//   const [jobs, setJobs] = useState([]);
//   const [featured, setFeatured] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch("/api/jobs");
//         const data = await res.json();
//         setJobs(data);

//         const featuredRes = await fetch("/api/jobs/featured");
//         const featuredData = await featuredRes.json();
//         setFeatured(featuredData);
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   if (loading) {
//     return (
//       <p className="text-center py-20 text-gray-500">Loading jobs...</p>
//     );
//   }

//   return (
//     <div className="pt-24 bg-gray-50 min-h-screen px-6">
//       <section className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//           Available <span className="text-red-600">Jobs</span>
//         </h2>
//         <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
//           Explore opportunities with WorkConnect ALBANIA. Browse featured roles or search all available positions.
//         </p>

//         {/* Featured Jobs */}
//         {featured.length > 0 && (
//           <div className="mb-16">
//             <h3 className="text-2xl font-semibold text-gray-900 mb-6">
//               Featured <span className="text-red-600">Jobs</span>
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
//               {featured.map((job) => (
//                 <Link
//                   key={job._id}
//                   to={`/jobs/${job._id}`}
//                   className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
//                 >
//                   <h4 className="text-xl font-semibold text-red-600 mb-2">
//                     {job.title}
//                   </h4>
//                   <p className="text-gray-700">{job.company}</p>
//                   <p className="text-gray-500">{job.location}</p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* All Jobs */}
//         <div className="text-left">
//           <h3 className="text-2xl font-semibold text-gray-900 mb-6">
//             All <span className="text-red-600">Jobs</span>
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {jobs.map((job) => (
//               <Link
//                 key={job._id}
//                 to={`/jobs/${job._id}`}
//                 className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
//               >
//                 <h4 className="text-xl font-semibold text-red-600 mb-2">
//                   {job.title}
//                 </h4>
//                 <p className="text-gray-700">{job.company}</p>
//                 <p className="text-gray-500">{job.location}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }









// // src/pages/Jobs.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [featured, setFeatured] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch("/api/jobs");
//         const data = await res.json();
//         setJobs(data);

//         const featuredRes = await fetch("/api/jobs/featured");
//         const featuredData = await featuredRes.json();
//         setFeatured(featuredData);
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   if (loading) return <p className="text-center py-20 text-gray-500">Loading jobs...</p>;

//   return (
//     <div className="pt-20 max-w-6xl mx-auto px-6">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Jobs</h1>

//       {/* Featured Jobs */}
//       {featured.length > 0 && (
//         <div className="mb-12">
//           <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {featured.map((job) => (
//               <Link
//                 key={job._id}
//                 to={`/jobs/${job._id}`}
//                 className="p-6 bg-white shadow rounded hover:shadow-lg transition"
//               >
//                 <h3 className="text-xl font-semibold text-red-600">{job.title}</h3>
//                 <p className="text-gray-700">{job.company}</p>
//                 <p className="text-gray-500">{job.location}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* All Jobs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {jobs.map((job) => (
//           <Link
//             key={job._id}
//             to={`/jobs/${job._id}`}
//             className="p-6 bg-white shadow rounded hover:shadow-lg transition"
//           >
//             <h3 className="text-xl font-semibold text-red-600">{job.title}</h3>
//             <p className="text-gray-700">{job.company}</p>
//             <p className="text-gray-500">{job.location}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Jobs;
