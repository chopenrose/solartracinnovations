import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

// === THEME & TRANSLATIONS ===
const theme = {
  primary: "#4CAF50",
  accent: "#FFB703",
  dark: "#2E7D32",
  light: "#F6FFF1",
};

const translations = {
  en: {
    title: "SolarTrac Innovations",
    tagline: "Your Farm, Your Power",
    heroTitle: "From Traditional to Solar-powered Tractors",
    heroText:
      "Cut fuel costs, reduce pollution, and achieve true farm independence with our solar-hybrid retrofit kits.",
    explore: "Explore Products",
    demo: "Book a Demo",
    brochure: "Download Brochure",
    about: "About",
    products: "Products",
    roi: "ROI Calculator",
    team: "Team",
    contact: "Contact",
    dieselPrice: "Diesel Price (₹/L)",
    annualUsage: "Annual Fuel (L)",
    kitCost: "Kit Cost (₹)",
    annualMaint: "Annual Maintenance (₹)",
    otherSavings: "Other Savings (₹)",
  },
  hi: {
    title: "सोलरट्रैक इनोवेशन्स",
    tagline: "आपका खेत, आपकी शक्ति",
    heroTitle: "पारंपरिक से सौर ऊर्जा वाले ट्रैक्टर तक",
    heroText:
      "ईंधन की लागत घटाएं, प्रदूषण कम करें, और हमारे सोलर-हाइब्रिड किट्स से खेतों को आत्मनिर्भर बनाएं।",
    explore: "उत्पाद देखें",
    demo: "डेमो बुक करें",
    brochure: "ब्रॉशर डाउनलोड करें",
    about: "हमारे बारे में",
    products: "उत्पाद",
    roi: "आरओआई कैलकुलेटर",
    team: "टीम",
    contact: "संपर्क करें",
    dieselPrice: "डीज़ल कीमत (₹/लीटर)",
    annualUsage: "वार्षिक उपयोग (लीटर)",
    kitCost: "किट लागत (₹)",
    annualMaint: "वार्षिक रखरखाव (₹)",
    otherSavings: "अन्य बचत (₹)",
  },
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [dieselPrice, setDieselPrice] = useState(92);
  const [dieselAnnualL, setDieselAnnualL] = useState(1500);
  const [kitCost, setKitCost] = useState(119500);
  const [annualMaint, setAnnualMaint] = useState(15000);
  const [otherSavings, setOtherSavings] = useState(0);

  const baselineFuelCost = dieselPrice * dieselAnnualL;
  const solarSavings = Math.max(
    0,
    baselineFuelCost - (kitCost * 0.04 + annualMaint * 0.2) - otherSavings
  );
  const annualNetSavings = Math.round(solarSavings);
  const paybackYears = kitCost / (annualNetSavings || 1);
  const paybackMonths = Math.round(paybackYears * 12);

  const roiData = Array.from({ length: 6 }, (_, i) => ({
    year: `Year ${i}`,
    Baseline: baselineFuelCost + annualMaint,
    SolarTrac: Math.max(
      0,
      baselineFuelCost + annualMaint - i * annualNetSavings
    ),
  }));

  const t = translations[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F6FFF1] via-[#E8F6E7] to-[#E3F2E1] text-gray-900 font-sans">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold" style={{ color: theme.dark }}>
          {t.title}
        </h1>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-3 py-1 bg-white border rounded text-sm"
        >
          {lang === "en" ? "हिन्दी" : "EN"}
        </button>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2
          className="text-4xl font-extrabold leading-tight"
          style={{ color: theme.dark }}
        >
          {t.heroTitle}
        </h2>
        <p className="mt-4 text-lg text-gray-700">{t.heroText}</p>
      </section>

      {/* ROI SECTION */}
      <section
        id="roi"
        className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-md"
      >
        <h3
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: theme.dark }}
        >
          {t.roi}
        </h3>

        {/* INPUT SLIDERS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              label: t.dieselPrice,
              value: dieselPrice,
              setValue: setDieselPrice,
              min: 70,
              max: 130,
            },
            {
              label: t.annualUsage,
              value: dieselAnnualL,
              setValue: setDieselAnnualL,
              min: 500,
              max: 4000,
            },
            {
              label: t.kitCost,
              value: kitCost,
              setValue: setKitCost,
              min: 50000,
              max: 200000,
            },
            {
              label: t.annualMaint,
              value: annualMaint,
              setValue: setAnnualMaint,
              min: 5000,
              max: 30000,
            },
            {
              label: t.otherSavings,
              value: otherSavings,
              setValue: setOtherSavings,
              min: 0,
              max: 50000,
            },
          ].map((input) => (
            <div key={input.label}>
              <label className="block text-sm font-medium mb-1">
                {input.label}:{" "}
                <span className="font-semibold">{input.value}</span>
              </label>
              <input
                type="range"
                min={input.min}
                max={input.max}
                value={input.value}
                onChange={(e) => input.setValue(Number(e.target.value))}
                className="w-full accent-green-600"
              />
            </div>
          ))}
        </div>

        {/* CHART */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Baseline"
                stroke={theme.dark}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="SolarTrac"
                stroke={theme.primary}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-6 text-center text-gray-700">
          Estimated payback:{" "}
          <strong>
            {paybackMonths} months ({paybackYears.toFixed(1)} years)
          </strong>
        </p>
      </section>
    </main>
  );
}
