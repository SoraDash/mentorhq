// OptionItem.tsx
import React from "react";
import { Avatar } from "@nextui-org/react";

interface OptionItemProps {
  label: string;
  emoji?: string;
  prefix?: string;
}

export const OptionItem: React.FC<OptionItemProps> = ({
  label,
  emoji,
  prefix,
}) => {
  const avatarContent = emoji || (prefix ? prefix.toUpperCase() : "");
  return (
    <div className="flex gap-2 items-center">
      <Avatar
        name={avatarContent}
        color="secondary"
        alt={`Avatar for ${label}`}
        className="flex-shrink-0"
        size="sm"
      />
      <span className="text-small">{label}</span>
    </div>
  );
};
