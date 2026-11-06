/**
 * ==============================================================================
 * Ragadhni — Indian Ethnic Apparel Size Guide Modal (`SizeGuideModal.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component provides an interactive pop-up modal showing authentic Indian
 * women's ethnic wear measurement charts.
 * It includes:
 * 1. An Inches ("in") vs. Centimeters ("cm") toggle button.
 * 2. Measurement table for Women's Kurtis, Anarkalis, Suits, and Ethnic Dresses.
 * 3. Specific garment measurements (Bust, Waist, Hip, Length).
 * 4. "How to Measure" advice explaining the standard 2-inch comfort ease in Indian ethnic tailoring.
 *
 * WHY IT EXISTS:
 * Sizing confusion is the #1 reason for returns and exchanges in Indian online fashion.
 * Standard Western sizing (like UK or US sizes) does not map cleanly onto traditional Indian
 * garments like Anarkalis, Salwar Suits, or Kurtis. Providing a detailed chart builds trust
 * and drastically reduces returns.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Opened from the Product Detail Page (`/product/[slug]`) when the customer clicks
 *   "Size Guide & Measurements" next to the size selector.
 */

"use client";

import React, { useState } from "react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender?: string;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  // Measurement unit toggle: "in" (inches) or "cm" (centimeters)
  const [unit, setUnit] = useState<"in" | "cm">("in");

  if (!isOpen) return null;

  // Multiplier to convert inches to centimeters
  const factor = unit === "cm" ? 2.54 : 1;
  const formatVal = (valInInches: number) => Math.round(valInInches * factor);

  // Women's Indian Ethnic Measurement Table (Kurtis, Anarkalis, Suits, Dresses)
  const womenSizes = [
    { size: "XS", bust: 34, waist: 28, hip: 36, length: 44 },
    { size: "S", bust: 36, waist: 30, hip: 38, length: 45 },
    { size: "M", bust: 38, waist: 32, hip: 40, length: 45 },
    { size: "L", bust: 40, waist: 34, hip: 42, length: 46 },
    { size: "XL", bust: 42, waist: 36, hip: 44, length: 46 },
    { size: "XXL", bust: 44, waist: 38, hip: 46, length: 47 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-heritage-espresso/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-heritage-warm-ivory border border-heritage-antique-gold/40 shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header with Title & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-heritage-antique-gold/30">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-heritage-burgundy" />
            <h3 className="font-serif text-xl sm:text-2xl text-heritage-espresso font-normal">
              Women&apos;s Ethnic Size Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-heritage-espresso/60 hover:text-heritage-espresso rounded-full hover:bg-heritage-sand/60 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle Buttons (Inches vs Centimeters) */}
        <div className="my-5 flex items-center justify-between">
          <p className="text-xs text-heritage-espresso/70">
            Garment body measurements shown in:
          </p>
          <div className="inline-flex border border-heritage-antique-gold/40 p-0.5 bg-heritage-sand/40">
            <button
              type="button"
              onClick={() => setUnit("in")}
              className={`text-xs px-3 py-1 font-medium transition-colors ${
                unit === "in"
                  ? "bg-heritage-burgundy text-heritage-warm-ivory"
                  : "text-heritage-espresso hover:bg-heritage-warm-ivory"
              }`}
            >
              Inches (in)
            </button>
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`text-xs px-3 py-1 font-medium transition-colors ${
                unit === "cm"
                  ? "bg-heritage-burgundy text-heritage-warm-ivory"
                  : "text-heritage-espresso hover:bg-heritage-warm-ivory"
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Measurements Table */}
        <div className="overflow-x-auto border border-heritage-antique-gold/30">
          <table className="w-full text-left text-xs text-heritage-espresso divide-y divide-heritage-antique-gold/25">
            <thead className="bg-heritage-sand/50 font-serif uppercase tracking-wider text-[11px] text-heritage-espresso/80">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Bust ({unit})</th>
                <th className="py-2.5 px-3">Waist ({unit})</th>
                <th className="py-2.5 px-3">Hip ({unit})</th>
                <th className="py-2.5 px-3">Length ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE7D8] bg-heritage-warm-ivory font-sans">
              {womenSizes.map((row) => (
                <tr key={row.size} className="hover:bg-heritage-sand/20">
                  <td className="py-2 px-3 font-semibold text-heritage-burgundy">{row.size}</td>
                  <td className="py-2 px-3">{formatVal(row.bust)}</td>
                  <td className="py-2 px-3">{formatVal(row.waist)}</td>
                  <td className="py-2 px-3">{formatVal(row.hip)}</td>
                  <td className="py-2 px-3">{formatVal(row.length)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tailoring & Measurement Guidance */}
        <div className="mt-6 p-4 bg-heritage-sand/30 border border-heritage-antique-gold/30 space-y-2 text-xs text-heritage-espresso/80">
          <h4 className="font-serif font-semibold text-heritage-espresso uppercase tracking-wider text-[11px]">
            The Ragadhni Tailoring Standard
          </h4>
          <p className="leading-relaxed">
            All our handcrafted kurtis and dresses are cut with a standard <strong>2-inch garment ease</strong> over
            natural body measurements to allow graceful drape and all-day breathable comfort in Indian weather.
          </p>
          <p className="leading-relaxed">
            If you fall between two sizes, we recommend selecting the larger size for a relaxed traditional silhouette.
          </p>
        </div>
      </div>
    </div>
  );
}

