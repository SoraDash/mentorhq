import React from 'react';

interface TimeUsageCardProps {
  averageTimeInMinutes: number;
}

export const TimeUsageCard: React.FC<TimeUsageCardProps> = ({
  averageTimeInMinutes,
}) => {
  const maxTime = 50;
  const usagePercentage = (averageTimeInMinutes / maxTime) * 100;

  let bgColor, textColor;

  if (usagePercentage <= 50) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-500';
  } else if (usagePercentage <= 75) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-500';
  } else {
    bgColor = 'bg-red-100';
    textColor = 'text-red-500';
  }

  return (
    <div className="w-full lg:w-2/4 px-3 mb-6">
      <div className="relative h-full max-w-sm md:max-w-none mx-auto p-6 bg-gray-500 rounded-xl">
        <div className="flex flex-wrap items-center justify-between -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-12 md:mb-0">
            <div className="max-w-xxs pr-12">
              <div
                className={`flex flex-shrink-0 w-12 h-12 mb-9 items-center justify-center ${bgColor} ${textColor} bg-opacity-20 rounded-xl`}
              >
                {/* ... your SVG icon ... */}
              </div>
              <h5 className="text-lg text-gray-100 font-semibold mb-1">
                Used percentage
              </h5>
              <p className="text-sm text-gray-300 font-semibold">
                Check your usage against 50 minutes
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <div
              className={`chart px-2 ${textColor}`}
              data-type="radial-bar-part"
              style={{ minHeight: '120px' }}
            >
              {/* You might want to integrate the chart rendering here based on usagePercentage */}
            </div>
            <div className="flex items-end justify-center -mt-12">
              <span
                className={`text-3xl leading-none ${textColor} font-semibold`}
              >
                {usagePercentage.toFixed(2)}
              </span>
              <span className="text-2xl leading-none text-gray-400 font-semibold">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeUsageCard;
