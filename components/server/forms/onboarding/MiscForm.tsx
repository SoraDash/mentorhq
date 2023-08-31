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
    <div className="grid grid-cols-1 gap-4 mt-3 mb-4 space-y-5">
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
        <label className="block text-gray-700 text-sm font-bold my-5" htmlFor="ciApiKey">
          CI Api Email
          <span className='text-red-500 ml-3'>Case Sensetive</span>
        </label>
        <input
          type="email"
          id="ciEmail"
          value={ciEmail}
          onChange={(e) => updateFields({ ciEmail: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
        <div className='mt-5'>
          <input
            type="checkbox"
            id="sendWelcomeEmail"
            checked={sendWelcomeEmail}
            onChange={(e) => updateFields({ sendWelcomeEmail: e.target.checked })}
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <span className='ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Send Welcome Email to students</span>
          <p className="text-xs text-gray-500 mt-3 mb-1">
            Enable this to have the system email students when they are assigned to you?
          </p>
        </div>
      </div>

    </div>
  );
};

export default MiscForm;
