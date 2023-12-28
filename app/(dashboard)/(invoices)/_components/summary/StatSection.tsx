import React from 'react';

interface StatSectionProps {
  label: string;
  value: string;
}
const StatSection = ({ label, value }: StatSectionProps) =>
  value && (
    <div className="flex justify-between my-2">
      <span>{label}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );

export default StatSection;
