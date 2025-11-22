export default function ServiceCard({ title, description }) {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
