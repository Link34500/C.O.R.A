import { fetchWithFormApi } from "@/actions/fetch";
import { HTTP_METHOD } from "next/dist/server/web/http";

interface FormProps {
  children: React.ReactNode;
  method?: HTTP_METHOD;
  endPoint: string;
  props?: React.ComponentProps<"form">;
}

export function Form<T>({
  children,
  method = "GET",
  endPoint,
  ...props
}: FormProps) {
  const ref = useR;
  return (
    <form
      method={method}
      action={
        typeof endPoint === "string"
          ? async (formData) => {
              "use server";
              const response = await fetchWithFormApi(
                formData,
                method,
                endPoint
              );
            }
          : undefined
      }
      {...props}
    >
      {children}
    </form>
  );
}
