import { Card, CardBody } from "@/components/ui/card";
import Section from "@/components/ui/section";
import { Title } from "@/components/ui/text";
import { User } from "@/generated/prisma/client";
import { UserIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default async function AdminsPage() {
  const users = await prisma.user.findMany({
    where: {
      isActive: false,
    },
  });
  return (
    <Section>
      <Title>Admins en attente</Title>
      <p className="mb-12">Liste des demandes en attentes :</p>
      <div className="flex flex-col gap-4">
        {users.length === 0 ? (
          <p className="text-center text-muted-foreground text-2xl">
            Aucune demande en attente
          </p>
        ) : (
          users.map((user) => (
            <DemandAdminPendingCard key={user.id} user={user} />
          ))
        )}
      </div>
    </Section>
  );
}

function DemandAdminPendingCard({ user }: { user: User }) {
  return (
    <Card>
      <CardBody className="flex-row justify-between items-center">
        <UserIcon size={48} className="text-primary" />
        <div className="flex flex-col gap-1">
          <p>Username : {user.name}</p>
          <p>Email : {user.email}</p>
        </div>
        <form
          className="flex gap-2"
          action={async (formData) => {
            "use server";
            const demand = formData.get("demand") as string;
            const userId = formData.get("userId") as string;
            if (demand === "accept") {
              await prisma.user.update({
                where: {
                  id: userId,
                },
                data: {
                  isActive: true,
                },
              });
            } else if (demand === "reject") {
              await prisma.user.delete({
                where: {
                  id: userId,
                },
              });
            }
            revalidatePath("/admin/admins");
          }}
        >
          <input type="hidden" name="userId" value={user.id} />
          <Button name="demand" value="accept">
            Accepter
          </Button>
          <Button variant="error" name="demand" value="reject">
            Refuser
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
