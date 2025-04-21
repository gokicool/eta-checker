import { useState } from "react";

const countries = ["Canada", "Australia", "South Korea", "UK", "Sri Lanka"];
const nationalities = ["USA", "Germany", "France", "India", "Japan"];

const etaRules = {
  "Canada": ["Germany", "France", "Japan"],
  "Australia": ["USA", "UK", "Germany"],
  "South Korea": ["USA", "France", "India"],
  "UK": ["USA", "Japan", "Germany"],
  "Sri Lanka": ["India", "Germany", "France"]
};

export default function Home() {
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);

  const checkETA = () => {
    if (!nationality || !destination) return;
    const eligible = etaRules[destination]?.includes(nationality);
    setResult(
      eligible
        ? `Da, državljani ${nationality} mogu aplicirati za ETA za ${destination}.`
        : `Ne, državljani ${nationality} trenutno ne mogu dobiti ETA za ${destination}.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Proveri da li ti treba ETA za putovanje
      </h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 space-y-4">
        <div>
          <label className="font-medium">Državljanstvo</label>
          <select
            className="w-full border rounded p-2"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          >
            <option value="">Izaberi državljanstvo</option>
            {nationalities.map((nat) => (
              <option key={nat} value={nat}>{nat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-medium">Destinacija</label>
          <select
            className="w-full border rounded p-2"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Izaberi destinaciju</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={checkETA}
        >
          Proveri
        </button>
        {result && <p className="mt-4 text-lg text-gray-800">{result}</p>}
      </div>
    </div>
  );
}
