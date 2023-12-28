import React from 'react';

interface DiscrepancySectionProps {
  label: string;
  value: string;
}
const DiscrepancySection = ({ label, value }: DiscrepancySectionProps) =>
  value && (
    <div className="flex justify-between my-2">
      <span>{label}</span>
      <span
        className={`text-xl font-bold ${
          value !== '€0.00' ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {value}
      </span>
    </div>
  );

export default DiscrepancySection;
