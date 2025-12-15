import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { ButtonProps } from "@/components/ui/Button";
import { getUser } from "@/lib/auth-server";
import { PropsWithChildren } from "react";

const navLinks = [
  { label: "Acceuil", href: "/" },
  { label: "Nos articles", href: "/articles" },
  { label: "Nos données", href: "/donnees" },
];

const footerSections = [
  {
    title: "À propos",
    links: [
      {
        label: "Présentation de C.O.R.A",
        href: "/a-propos",
      },
      {
        label: "Notre objectif",
        href: "/objectif",
      },
      {
        label: "FAQ",
        href: "/faq",
      },
    ],
  },
  {
    title: "Légals",
    links: [
      {
        label: "Mentions légales",
        href: "/legals",
      },
      {
        label: "Politique de confidentialité",
        href: "/privacy-policity",
      },
      {
        label: "Conditions d’utilisation",
        href: "/cgu",
      },
    ],
  },
  {
    title: "Nous contacter",
    links: [
      {
        label: "Par email",
        href: "mailto:mc.link34500@gmail.com",
      },
      {
        label: "Support",
        href: "/support",
      },
    ],
  },
];

export default async function Layout({ children }: PropsWithChildren) {
  const user = await getUser();
  const navButtons = [
    { href: "/", children: "Nos articles" },
    user && {
      href: "/admin",
      children: "Mon dashboard",
      variant: "outline",
    },
  ] as (ButtonProps & { href: string })[];
  return (
    <>
      <Navbar navLinks={navLinks} navButtons={navButtons} />
      <main className="flex-1">{children}</main>
      <Footer footerSections={footerSections} />
    </>
  );
}
