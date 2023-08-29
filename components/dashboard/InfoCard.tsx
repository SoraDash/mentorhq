import { getLatestStats } from '@/lib/actions/billing.actions';

export const DashboardCard: React.FC = async () => {

  const processedData = await getLatestStats(new Date("2022-10-01"))

  if (!processedData) return null

  return (
    <div className="flex flex-row space-x-4 overflow-x-auto lg:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 lg:space-x-0 lg:overflow-visible">
      {processedData.map((card, idx) => (
        <div
          key={idx}
          className="flex p-3"
        >
          <div className="flex p-4 bg-light-white border border-coolGray-100 rounded-md shadow-dashboard w-full">
            <div className={`flex-shrink-0 ${card.color} ${card.textColor} p-3 rounded-md`}>
              <card.icon size={24} />
            </div>
            <div className="flex flex-col ml-4">
              <h2 className="font-semibold text-xl text-gray-900 dark:text-white tracking-tighter">{card.content}</h2>
              <p className="text-xs font-medium text-coolGray-500 mt-1">{card.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
