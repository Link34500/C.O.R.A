import Datas from "@/components/features/admin/datas";
import { getUser } from "@/lib/auth-server";
import React from "react";

export default async function Admin() {
  const user = await getUser();
  return (
    <>
      <Datas />
    </>
  );
}
