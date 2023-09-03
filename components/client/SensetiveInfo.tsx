import React, { useState } from 'react';

const SensitiveInfo: React.FC<{ value: string }> = ({ value }) => {
  const [show, setShow] = useState(false);

  // Create a string of asterisks with the same length as the value
  const hiddenValue = '*'.repeat(value.length);

  return (
    <>
      <span className="inline-flex items-center cursor-pointer" onClick={() => setShow(!show)}>{show ? value : hiddenValue}</span>
    </>
  );
};

export default SensitiveInfo;
