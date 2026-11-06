/**
 * ==============================================================================
 * Ragadhni — Indian Ethnic Apparel Size Guide Modal (`SizeGuideModal.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component provides an interactive pop-up modal showing authentic Indian
 * ethnic wear measurement charts.
 * It includes:
 * 1. An Inches ("in") vs. Centimeters ("cm") toggle button.
 * 2. Separate measurement tables for Women's Kurtas/Suits and Men's Kurtas.
 * 3. Specific garment measurements (Bust/Chest, Waist, Hip, Collar, Kurta Length).
 * 4. "How to Measure" advice explaining the standard 2-inch comfort ease in Indian ethnic tailoring.
 *
 * WHY IT EXISTS:
 * Sizing confusion is the #1 reason for returns and exchanges in Indian online fashion.
 * Standard Western sizing (like UK or US sizes) does not map cleanly onto traditional Indian
 * garments like Anarkalis, Salwar Suits, or Kurtas. Providing a detailed chart builds trust
 * and drastically reduces returns.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Opened from the Product Detail Page (`/product/[slug]`) when the customer clicks
 *   "Size Guide & Measurements" next to the size selector.
 */

"use client";

import React, { useState } from "react";
import { X, Ruler } from "lucide-react";
import { Gender } from "@/types";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: Gender;
}

export function SizeGuideModal({ isOpen, onClose, gender }: SizeGuideModalProps) {
  // Measurement unit toggle: "in" (inches) or "cm" (centimeters)
  const [unit, setUnit] = useState<"in" | "cm">("in");

  if (!isOpen) return null;

  // Multiplier to convert inches to centimeters
  const factor = unit === "cm" ? 2.54 : 1;
  const formatVal = (valInInches: number) => Math.round(valInInches * factor);

  // Women's Indian Ethnic Measurement Table (Kurtis, Anarkalis, Suits)
  const womenSizes = [
    { size: "XS", bust: 34, waist: 28, hip: 36, length: 44 },
    { size: "S", bust: 36, waist: 30, hip: 38, length: 45 },
    { size: "M", bust: 38, waist: 32, hip: 40, length: 45 },
    { size: "L", bust: 40, waist: 34, hip: 42, length: 46 },
    { size: "XL", bust: 42, waist: 36, hip: 44, length: 46 },
    { size: "XXL", bust: 44, waist: 38, hip: 46, length: 47 },
  ];

  // Men's Indian Ethnic Measurement Table (Kurtas, Shirts, Nehru Jackets)
  const menSizes = [
    { size: "S (38)", chest: 38, waist: 34, collar: 15.5, length: 40 },
    { size: "M (40)", chest: 40, waist: 36, collar: 16.0, length: 41 },
    { size: "L (42)", chest: 42, waist: 38, collar: 16.5, length: 42 },
    { size: "XL (44)", chest: 44, waist: 40, collar: 17.0, length: 42 },
  ];

  const isWomen = gender === "WOMEN";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-heritage-charcoal/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-heritage-ivory border border-[#D5C9B5] shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header with Title & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-heritage-terracotta" />
            <h3 className="font-serif text-xl sm:text-2xl text-heritage-charcoal font-normal">
              {isWomen ? "Women's Ethnic Size Guide" : "Men's Ethnic Size Guide"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-heritage-earth hover:text-heritage-charcoal rounded-full hover:bg-heritage-sand/60 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle Buttons (Inches vs Centimeters) */}
        <div className="my-5 flex items-center justify-between">
          <p className="text-xs text-heritage-earth">
            Garment body measurements shown in:
          </p>
          <div className="inline-flex border border-[#D5C9B5] p-0.5 bg-heritage-sand/40">
            <button
              type="button"
              onClick={() => setUnit("in")}
              className={`text-xs px-3 py-1 font-medium transition-colors ${
                unit === "in"
                  ? "bg-heritage-terracotta text-heritage-ivory"
                  : "text-heritage-charcoal hover:bg-heritage-ivory"
              }`}
            >
              Inches (in)
            </button>
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`text-xs px-3 py-1 font-medium transition-colors ${
                unit === "cm"
                  ? "bg-heritage-terracotta text-heritage-ivory"
                  : "text-heritage-charcoal hover:bg-heritage-ivory"
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Measurements Table */}
        <div className="overflow-x-auto border border-[#E8DFD0]">
          <table className="w-full text-left text-xs text-heritage-charcoal divide-y divide-[#E8DFD0]">
            <thead className="bg-heritage-sand/50 font-serif uppercase tracking-wider text-[11px] text-heritage-earth">
              {isWomen ? (
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Bust ({unit})</th>
                  <th className="py-2.5 px-3">Waist ({unit})</th>
                  <th className="py-2.5 px-3">Hip ({unit})</th>
                  <th className="py-2.5 px-3">Length ({unit})</th>
                </tr>
              ) : (
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Chest ({unit})</th>
                  <th className="py-2.5 px-3">Waist ({unit})</th>
                  <th className="py-2.5 px-3">Collar ({unit})</th>
                  <th className="py-2.5 px-3">Length ({unit})</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-[#EFE7D8] bg-heritage-ivory font-sans">
              {isWomen
                ? womenSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-heritage-sand/20">
                      <td className="py-2 px-3 font-semibold text-heritage-terracotta">{row.size}</td>
                      <td className="py-2 px-3">{formatVal(row.bust)}</td>
                      <td className="py-2 px-3">{formatVal(row.waist)}</td>
                      <td className="py-2 px-3">{formatVal(row.hip)}</td>
                      <td className="py-2 px-3">{formatVal(row.length)}</td>
                    </tr>
                  ))
                : menSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-heritage-sand/20">
                      <td className="py-2 px-3 font-semibold text-heritage-terracotta">{row.size}</td>
                      <td className="py-2 px-3">{formatVal(row.chest)}</td>
                      <td className="py-2 px-3">{formatVal(row.waist)}</td>
                      <td className="py-2 px-3">{formatVal(row.collar)}</td>
                      <td className="py-2 px-3">{formatVal(row.length)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Tailoring & Measurement Guidance */}
        <div className="mt-6 p-4 bg-heritage-sand/30 border border-[#E3D8C6] space-y-2 text-xs text-heritage-earth">
          <h4 className="font-serif font-semibold text-heritage-charcoal uppercase tracking-wider text-[11px]">
            The Ragadhni Tailoring Standard
          </h4>
          <p className="leading-relaxed">
            All our handcrafted kurtas and dresses are cut with a standard <strong>2-inch garment ease</strong> over
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

