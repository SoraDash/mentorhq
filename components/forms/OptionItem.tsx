// OptionItem.tsx
import { Avatar } from '@nextui-org/react';
import React from 'react';

interface OptionItemProps {
  emoji?: string;
  image?: string;
  label: string;
  prefix?: string;
}

export const OptionItem: React.FC<OptionItemProps> = ({
  emoji,
  image,
  label,
  prefix,
}) => {
  const avatarContent = emoji || (prefix ? prefix.toUpperCase() : '');

  return (
    <div className="flex gap-2 items-center">
      <Avatar
        alt={`Avatar for ${label}`}
        className="flex-shrink-0"
        color="secondary"
        name={avatarContent}
        size="sm"
        src={image ? image : undefined}
      />
      <span className="text-small">{label}</span>
    </div>
  );
};
