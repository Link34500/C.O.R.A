"use client";
import { FormField } from "@/components/ui/fields";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";

import { passwordShem, usernameShem } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Title } from "@/components/ui/text";

type RegisterFormValues = z.infer<typeof RegisterShema>;

const RegisterShema = z.object({
  name: usernameShem,
  email: z.email("Veuillez entrer une adresse e-mail valide."),
  password: passwordShem,
});

const registerFields = [
  {
    type: "text",
    name: "name",
    placeholder: "Nom d'utilisateur...",
  },
  { type: "email", name: "email", placeholder: "Email..." },
  {
    type: "password",
    name: "password",
    placeholder: "Mot de passe...",
  },
] as const;

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterShema),
    defaultValues: {},
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          router.push("/admin");
        },
        onError: (ctx) => {
          setError("root", { message: ctx.error.message });
        },
      }
    );
  };

  return (
    <form className="card-body gap-8" onSubmit={handleSubmit(onSubmit)}>
      <Title className="card-title">Créer un compte</Title>

      <div className="flex flex-col gap-4">
        {registerFields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            register={register}
            error={errors[field.name]}
          ></FormField>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Création en cours..." : "Crée son compte"}
        </Button>
      </div>
    </form>
  );
}
