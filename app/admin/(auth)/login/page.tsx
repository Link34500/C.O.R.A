"use client";
import { FormField } from "@/components/shared/Fields";
import { Button } from "@/components/ui/Button";
import { signIn, signUp } from "@/lib/auth-client";

import { passwordShem, usernameShem } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { FieldError, useForm } from "react-hook-form";

import { z } from "zod";

type RegisterFormValues = z.infer<typeof LoginSchema>;

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const loginFields = [
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
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
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
      <h1 className="card-title">Se connecter</h1>

      <div className="flex flex-col gap-4">
        <p className="text-red"></p>
        {loginFields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            register={register}
            error={(errors.root as FieldError | null) || errors[field.name]}
          ></FormField>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </Button>
        <button className="btn bg-[#7289da] text-white border-[#7289da]">
          <img src="/socials/discord.svg" width={24} alt="Logo Discord" />
          Se connecter via discord
        </button>
      </div>
    </form>
  );
}
