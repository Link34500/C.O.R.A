// Liste des shémas
import { z } from "zod";

export const passwordShem = z
  .string()
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
  .max(64, { message: "Le mot de passe ne peut pas dépasser 64 caractères." })
  .regex(/[A-Z]+/, {
    message: "Doit contenir au moins une lettre majuscule.",
  })
  .regex(/[a-z]+/, {
    message: "Doit contenir au moins une lettre minuscule.",
  })
  .regex(/[0-9]+/, { message: "Doit contenir au moins un chiffre." })
  .regex(/[^A-Za-z0-9\s]+/, {
    message: "Doit contenir au moins un caractère spécial (ex: #, !, $, %, &).",
  })
  .regex(/^\S*$/, {
    message: "Le mot de passe ne doit contenir aucun espace.",
  });

export const usernameShem = z
  .string()
  .min(3, { message: "Doit contenir au moins 3 caractères." })
  .max(32, { message: "Ne peut pas dépasser 32 caractères." })
  .regex(/^[a-z0-9]+$/, {
    message:
      "Seuls les caractères alphanumériques en minuscules (a-z, 0-9) sont autorisés, sans espace.",
  });
