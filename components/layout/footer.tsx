import Link from "next/link";

interface footerSection {
  title: React.ReactNode;
  links: { label: React.ReactNode; href: string }[];
}

interface FooterProps {
  footerSections: footerSection[];
}

export function Footer({ footerSections }: FooterProps) {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 border-t border-base-100">
      <aside className="flex flex-col gap-3">
        <img src="/logo.svg" className="w-20 h-20 rounded-full" />
        <p>
          © 2025–2026 C.O.R.A
          <br /> Tous droits réservés.
        </p>
      </aside>
      {footerSections?.map((section, idx) => (
        <nav key={idx}>
          <h6 className="footer-title">{section.title}</h6>
          {section.links?.map((link) => (
            <Link key={link.href} className="link link-hover" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      ))}
    </footer>
  );
}
