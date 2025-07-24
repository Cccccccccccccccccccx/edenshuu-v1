import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: 'À Propos - Edenshuu',
  description: 'Découvrez notre passion pour la traduction et notre engagement envers l\'excellence linguistique.',
}

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 text-center">
        <div className="container relative z-10 mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Notre histoire et notre mission
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Fondée avec passion, Edenshuu s'engage à briser les barrières linguistiques avec précision et créativité.
          </p>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 to-background" />
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold md:text-4xl">Notre histoire</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground">
                Fondée en 2025, Edenshuu est née de la passion pour les langues et la communication interculturelle. Notre équipe de traducteurs professionnels partage une vision commune : faciliter les échanges à l'ère de la mondialisation tout en préservant la richesse culturelle de chaque langue.
              </p>
              <p className="text-muted-foreground">
                Au fil des années, nous avons élargi nos services pour répondre aux besoins variés de nos clients, des petites entreprises aux grandes entreprises internationales, en passant par les créateurs de contenu indépendants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Nos valeurs
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Excellence',
                description: 'Nous nous engageons à fournir des traductions de la plus haute qualité, avec une attention particulière aux détails et à la précision.',
                icon: '✨',
              },
              {
                title: 'Créativité',
                description: 'Nous abordons chaque projet avec une perspective fraîche et créative pour capturer l\'essence de votre message.',
                icon: '🎨',
              },
              {
                title: 'Intégrité',
                description: 'Nous maintenons les normes éthiques les plus élevées dans toutes nos interactions et transactions commerciales.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <div 
                key={index}
                className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm"
              >
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Notre équipe
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Jean Dupont',
                role: 'Fondateur & Traducteur Principal',
                bio: 'Avec plus de 15 ans d\'expérience en traduction, Jean est spécialisé dans les domaines technique et juridique.',
                languages: ['Français', 'Anglais', 'Espagnol'],
              },
              {
                name: 'Marie Laurent',
                role: 'Traductrice Littéraire',
                bio: 'Marie apporte sa sensibilité littéraire à nos projets de traduction créative et éditoriale.',
                languages: ['Français', 'Italien', 'Japonais'],
              },
              {
                name: 'Thomas Martin',
                role: 'Spécialiste Audiovisuel',
                bio: 'Thomas se charge du sous-titrage et du doublage, avec une oreille fine pour les nuances linguistiques.',
                languages: ['Français', 'Anglais', 'Allemand', 'Chinois'],
              },
            ].map((member, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
              >
                <div className="h-48 bg-muted/50" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="mb-3 text-primary">{member.role}</p>
                  <p className="mb-4 text-muted-foreground">{member.bio}</p>
                  <div>
                    <p className="text-sm font-medium">Langues :</p>
                    <p className="text-sm text-muted-foreground">{member.languages.join(' • ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Prêt à commencer votre projet ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
            Notre équipe est prête à vous accompagner dans la réalisation de vos projets multilingues.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
