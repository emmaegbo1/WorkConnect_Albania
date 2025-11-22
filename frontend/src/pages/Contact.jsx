export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <form className="grid gap-4 max-w-md">
        <input className="border rounded px-3 py-2" placeholder="Name" />
        <input className="border rounded px-3 py-2" placeholder="Email" />
        <textarea className="border rounded px-3 py-2" placeholder="Message" rows={4} />
        <button className="bg-primary text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}
