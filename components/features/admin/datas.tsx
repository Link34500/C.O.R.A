import { prisma } from "@/lib/prisma";
import {
  BirdIcon,
  FileTextIcon,
  HeadphonesIcon,
  LucideIcon,
  UserCheck,
} from "lucide-react";
import React, { ReactNode } from "react";

const iconProps = { size: 36, className: "text-primary" };

export default async function Datas() {
  const dataCards: DataCardProps[] = [
    {
      description: "Administrateur en attente",
      data: await prisma.user.count({
        where: { isActive: false },
      }),
      icon: <UserCheck {...iconProps} />,
    },
    {
      description: "Nombre d'espèces",
      data: await prisma.bird.count(),
      icon: <BirdIcon {...iconProps} />,
    },
    {
      description: "Nombre d'enregistrement",
      data: await prisma.record.count(),
      icon: <HeadphonesIcon {...iconProps} />,
    },
    {
      description: "Articles publiées",
      data: await prisma.article.count({ where: { published: true } }),
      icon: <FileTextIcon {...iconProps} />,
    },
  ];

  return (
    <div className="flex gap-8 flex-wrap">
      {dataCards.map((dataCard, idx) => (
        <DataCard key={idx} {...dataCard} />
      ))}
    </div>
  );
}

interface DataCardProps {
  description: string;
  data: number;
  icon: React.ReactNode;
}

function DataCard({ description, data, icon }: DataCardProps) {
  return (
    <div className="card flex flex-row justify-between items-center bg-base-300 p-5 min-w-xs flex-1">
      <div className="flex flex-col gap-3">
        <h1 className="text-md">{description}</h1>
        <p className="text-4xl text-primary font-semibold">{data}</p>
      </div>
      {icon}
    </div>
  );
}
