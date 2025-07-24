import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center">
        <div className="container relative z-10 mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Des mots qui voyagent, des idées qui se partagent
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Services de traduction professionnelle pour donner une portée internationale à votre contenu.
            Précision, rapidité et sens du détail pour chaque projet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Demander un devis</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">Nos services</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 to-background" />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Nos domaines d'expertise
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Sites Web',
                description: 'Traductions professionnelles pour une présence internationale optimale.',
                icon: '🌐',
              },
              {
                title: 'Vidéos',
                description: 'Sous-titrage et doublage de qualité pour toucher un public mondial.',
                icon: '🎥',
              },
              {
                title: 'Contenus éditoriaux',
                description: 'Adaptation culturelle et linguistique pour vos articles et publications.',
                icon: '📝',
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Prêt à élargir votre audience ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Contactez-nous dès aujourd'hui pour discuter de votre projet de traduction.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
