import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importing eye icons from react-icons

const SensitiveInfo: React.FC<{ value: string }> = ({ value }) => {
  const [show, setShow] = useState(false);

  // Create a string of asterisks with the same length as the value
  const hiddenValue = '*'.repeat(value.length);

  return (
    <div className="inline-flex items-center cursor-pointer" onClick={() => setShow(!show)}>
      <span>{show ? value : hiddenValue}</span>
      <div className="ml-2">
        {show ? <FiEyeOff /> : <FiEye />}
      </div>
    </div>
  );
};

export default SensitiveInfo;
