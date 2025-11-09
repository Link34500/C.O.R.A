"use server";
import { HTTP_METHOD } from "next/dist/server/web/http";

export async function fetchWithFormApi(
  formData: FormData,
  method: HTTP_METHOD,
  endPoint: string
) {
  const response = await fetch("/api/form", {
    method,
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
}
