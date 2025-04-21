import { useState } from "react";

const countries = ["Sri Lanka", "South Korea", "Seychelles", "Australia", "Canada", "New Zealand", "United Kingdom", "Morocco", "Mexico", "Thailand"].sort();

const etaRules = {
  "Sri Lanka": ["India", "Germany", "France"],
  "South Korea": ["USA", "France", "India"],
  "Seychelles": ["Germany", "France", "Japan"],
  "Australia": ["USA", "UK", "Germany"],
  "Canada": ["Germany", "France", "Japan"],
  "New Zealand": ["USA", "Germany", "Japan"],
  "United Kingdom": ["USA", "Japan", "Germany"],
  "Morocco": ["France", "Germany"],
  "Mexico": ["USA", "Germany", "France"],
  "Thailand": ["USA", "Japan", "Germany"]
};

const etaDocuments = {
  "Sri Lanka": ["Pasoš važeći najmanje 6 meseci", "Fotografija pasoša", "Povratna avionska karta"],
  "South Korea": ["Pasoš", "Dokaz o smeštaju", "Izjava o sredstvima"],
  "Seychelles": ["Pasoš", "Dokaz o boravku", "Dokaz o finansijama"],
  "Australia": ["Pasoš", "Digitalna fotografija", "Dokaz o zaposlenju ili studijama"],
  "Canada": ["Pasoš", "Digitalna fotografija", "Dokaz o sredstvima"],
  "New Zealand": ["Pasoš", "Itinerer putovanja", "Dokaz o sredstvima"],
  "United Kingdom": ["Pasoš", "Adresa boravka u UK", "Povratna karta"],
  "Morocco": ["Pasoš", "Fotografija", "Dokaz o rezervaciji smeštaja"],
  "Mexico": ["Pasoš", "Povratna karta", "Potvrda o smeštaju"],
  "Thailand": ["Pasoš", "Fotografija", "Dokaz o sredstvima"]
};

// Create a unique list of all nationalities mentioned in etaRules
const nationalities = Array.from(
  new Set(Object.values(etaRules).flat())
).sort();

export default function Home() {
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);
  const [documents, setDocuments] = useState([]);

  const checkETA = () => {
    if (!nationality || !destination) return;
    const eligible = etaRules[destination]?.includes(nationality);
    if (eligible) {
      setResult(`Da, državljani ${nationality} mogu aplicirati za ETA za ${destination}.`);
      setDocuments(etaDocuments[destination] || []);
    } else {
      setResult(`Ne, državljani ${nationality} trenutno ne mogu dobiti ETA za ${destination}.`);
      setDocuments([]);
    }
  };

  const downloadInstructions = () => {
    const blob = new Blob([
      `Instrukcije za ETA vizu za ${destination}\n\n` +
      `Državljanstvo: ${nationality}\n\n` +
      `Potrebna dokumentacija:\n` +
      documents.map((d, i) => `${i + 1}. ${d}`).join("\n")
    ], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ETA_instrukcije_${destination}.txt`;
    link.click();
    URL.revokeObjectURL(url);
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
        {result && <div className="mt-4 text-lg text-gray-800">
          <p>{result}</p>
          {documents.length > 0 && (
            <>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
              <button
                onClick={downloadInstructions}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Preuzmi instrukcije (PDF)
              </button>
            </>
          )}
        </div>}
      </div>
    </div>
  );
}
