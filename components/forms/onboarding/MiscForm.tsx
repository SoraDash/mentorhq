import { Label } from '@/components/ui/label';
import { MiscFormData } from '@/types/FormDataTypes';

type MiscFormProps = MiscFormData & {
  updateFields: (fields: Partial<MiscFormData>) => void;
};

const MiscForm: React.FC<MiscFormProps> = ({
  paidPerHour,
  ciApiKey,
  ciEmail,
  updateFields,
  sendWelcomeEmail,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-3 mb-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paidPerHour">
          Paid Per Hour
        </label>
        <input
          type="number"
          id="paidPerHour"
          value={paidPerHour}
          onChange={(e) => updateFields({ paidPerHour: +e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="sendWelcomeEmail" className="block text-gray-700 text-sm font-bold mb-1">
          Send Welcome Email
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Enable this to have the system email students when they are assigned to you?
        </p>
        <label htmlFor="sendWelcomeEmail" className="inline-flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            id="sendWelcomeEmail"
            checked={sendWelcomeEmail}
            onChange={(e) => updateFields({ sendWelcomeEmail: e.target.checked })}
            className="peer h-6 w-6 border-gray-300 transition-colors focus:ring focus:ring-indigo-300 focus:outline-none"
          />
          <span className="text-sm">Send Welcome Email</span>
        </label>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciApiKey">
          CI API Key
        </label>
        <input
          type="password"
          id="ciApiKey"
          value={ciApiKey}
          onChange={(e) => updateFields({ ciApiKey: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciEmail">
          CI Email
        </label>
        <input
          type="email"
          id="ciEmail"
          value={ciEmail}
          onChange={(e) => updateFields({ ciEmail: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default MiscForm;
