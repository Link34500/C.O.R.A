import React from "react";
import Section from "@/components/ui/section";
import { Title, Paragraph } from "@/components/ui/text";
import LegalSection from "@/components/features/legal/legal-section";

export default function Legals() {
  return (
    <Section className="py-16">
      <div className="max-w-4xl mx-auto">
        <Title className="text-center mb-12">Mentions Légales</Title>
        
        <Paragraph className="text-center mb-12 text-lg text-muted-foreground">
          Merci de lire attentivement les présentes modalités d'utilisation du présent site avant de le parcourir. En vous connectant sur ce site, vous acceptez sans réserve les présentes modalités.
        </Paragraph>

        <LegalSection title="1. Éditeur du site">
          <Paragraph>
            <strong>Nom du site :</strong> C.O.R.A (Classification des Oiseaux par Reconnaissance Acoustique)<br />
            <strong>Responsable de publication :</strong> Frédéric Guiose<br />
            <strong>Email de contact :</strong> fredi.guiose@gmail.com<br />
            <strong>Adresse :</strong> 15 rue l'allouette, 97300 Cayenne
          </Paragraph>
        </LegalSection>

        <LegalSection title="2. Hébergement">
          <Paragraph>
            Le site est hébergé par :<br />
            <strong>Nom de l'hébergeur :</strong>OVH<br />
            <strong>Adresse :</strong> 16, avenue Montaigne, 75008 Paris<br />
            <strong>Site web :</strong> https://www.ovh.com/
          </Paragraph>
        </LegalSection>

        <LegalSection title="3. Propriété intellectuelle">
          <Paragraph>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </Paragraph>
          <Paragraph>
            La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
          </Paragraph>
        </LegalSection>

        <LegalSection title="4. Données personnelles">
          <Paragraph>
            Conformément à la loi « Informatique et Libertés », vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent.
          </Paragraph>
          <Paragraph>
            Pour exercer ce droit, vous pouvez nous contacter par email à l'adresse : fredi.guiose@gmail.com
          </Paragraph>
        </LegalSection>

        <LegalSection title="5. Cookies">
          <Paragraph>
            Le site de C.O.R.A possède des cookies nécessaire au bon fonctionement du site.
          </Paragraph>
        </LegalSection>
        
        <LegalSection title="6. Limitation de responsabilité">
          <Paragraph>
            Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible (page posant problème, action déclenchante, type d’ordinateur et de navigateur utilisé, ...).
          </Paragraph>
        </LegalSection>
      </div>
    </Section>
  );
}
