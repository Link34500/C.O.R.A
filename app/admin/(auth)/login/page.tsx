"use client";
import { FormField } from "@/components/ui/fields";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/lib/auth-client";

import { passwordShem, usernameShem } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { FieldError, useForm } from "react-hook-form";

import { z } from "zod";
import { Title } from "@/components/ui/text";
import { CardActions, CardBody } from "@/components/ui/card";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardBody className="gap-8">
        <Title className="card-title">Se connecter</Title>

        <div className="flex flex-col gap-4">
          <p className="text-red"></p>
          {loginFields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              register={register}
              error={(errors.root as FieldError | null) || errors[field.name]}
            />
          ))}
        </div>

        <CardActions>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </CardActions>
      </CardBody>
    </form>
  );
}
