import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { IconType } from "react-icons/lib";

interface EmptyStateProps {
  icon: IconType;
  title: string;
  description: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <main className="flex flex-col items-center justify-center mt-40 px-4 text-center">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="px-4 py-6 text-2xl font-bold">
          {title}
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center px-4 py-8 space-y-6">
          <Icon className="w-16 h-16 text-gray-400" />
          <p className="text-gray-500">{description}</p>
        </CardBody>
      </Card>
    </main>
  );
}
