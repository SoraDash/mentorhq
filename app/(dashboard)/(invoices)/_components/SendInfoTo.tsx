import { BillingInfo } from '@prisma/client';

interface SentToInfoProps {
  sentToInfo: BillingInfo;
}

const SentToInfo = ({ sentToInfo }: SentToInfoProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Sent To</h3>
      <p className="text-gray-800">{sentToInfo.company}</p>
      <p className="text-gray-600">{sentToInfo.address_1}</p>
      <p className="text-gray-600">{sentToInfo.city}</p>
      <p className="text-gray-600">{sentToInfo.postcode}</p>
      <p className="text-gray-600">{sentToInfo.country}</p>
      <p className="text-gray-600">{sentToInfo.email}</p>
    </>
  );
};

export default SentToInfo;
