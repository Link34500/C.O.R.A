import React from "react";
import { SubTitle, Paragraph } from "@/components/ui/text";
import { Card, CardBody } from "@/components/ui/card";

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <Card className="mb-8 w-full bg-base-100 shadow-sm border border-base-200">
      <CardBody>
        <SubTitle className="mb-4 text-primary">{title}</SubTitle>
        <div className="prose max-w-none text-base-content/80">
          {children}
        </div>
      </CardBody>
    </Card>
  );
}
