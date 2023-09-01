import { User } from '@prisma/client';
import React from 'react';

interface EditMentorFormProps {
  mentor: User
}

export const EditMentorForm: React.FC<EditMentorFormProps> = async ({ mentor }) => {
  if (!mentor) return null
  return (
    <form>
      <div className="grid grid-cols-1 gap-4 mt-3 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={mentor.firstName}
          onChange={(e) => updateFields({ firstName: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => updateFields({ lastName: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
    </form>
  );
}