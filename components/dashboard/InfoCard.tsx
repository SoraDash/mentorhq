import { getLatestStats } from '@/lib/actions/billing.actions';


export const DashboardCard: React.FC = async () => {
  const processedData = await getLatestStats()

  // const processedData = processData(data);

  return (
    <div className="flex flex-wrap">
      {processedData.map((card, idx) => (
        <div key={idx} className="w-full md:w-1/2 xl:w-1/5 p-3">
          <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
            <div className={`mb-4 max-w-max ${card.color} ${card.textColor} p-3 rounded-md`}>
              <card.icon size={24} />
            </div>
            <h2 className="font-semibold text-2xl text-coolGray-900 tracking-tighter">{card.content}</h2>
            <p className="text-xs font-medium text-coolGray-500">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
