import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: 'Nos Services - Edenshuu',
  description: 'Découvrez nos services de traduction professionnelle pour sites web, vidéos et contenus éditoriaux.',
}

const services = [
  {
    title: 'Traduction de Sites Web',
    description: 'Donnez une portée internationale à votre site web avec nos services de traduction professionnelle et d\'adaptation culturelle.',
    features: [
      'Traduction professionnelle par des experts natifs',
      'Optimisation SEO multilingue',
      'Adaptation culturelle du contenu',
      'Support de plus de 50 langues',
      'Intégration technique incluse'
    ],
    icon: '🌐',
    popular: true
  },
  {
    title: 'Sous-titrage et Doublage',
    description: 'Touchez un public mondial avec nos services de sous-titrage et de doublage de haute qualité pour vos vidéos.',
    features: [
      'Sous-titres professionnels',
      'Doublage par des comédiens natifs',
      'Synchronisation labiale',
      'Adaptation culturelle',
      'Formats multiples supportés'
    ],
    icon: '🎬',
    popular: false
  },
  {
    title: 'Traduction Éditoriale',
    description: 'Des traductions précises et fluides pour vos articles, livres, documents techniques et supports marketing.',
    features: [
      'Traduction littéraire',
      'Documents techniques',
      'Contenu marketing',
      'Relecture et correction',
      'Mise en page préservée'
    ],
    icon: '📝',
    popular: false
  },
  {
    title: 'Localisation de Logiciels',
    description: 'Adaptation complète de votre application ou logiciel pour différents marchés internationaux.',
    features: [
      'Interface utilisateur localisée',
      'Documentation technique',
      'Tests de localisation',
      'Support multilingue',
      'Mises à jour continues'
    ],
    icon: '💻',
    popular: false
  },
  {
    title: 'Interprétation',
    description: 'Services d\'interprétation simultanée et consécutive pour vos événements et réunions internationales.',
    features: [
      'Interprétation simultanée',
      'Interprétation consécutive',
      'Équipement professionnel',
      'Interprètes expérimentés',
      'Support multilingue'
    ],
    icon: '🎧',
    popular: false
  },
  {
    title: 'Formation Linguistique',
    description: 'Cours de langues sur mesure pour les professionnels souhaitant améliorer leurs compétences linguistiques.',
    features: [
      'Cours personnalisés',
      'Formateurs natifs',
      'En ligne ou en présentiel',
      'Programmes intensifs',
      'Préparation aux examens'
    ],
    icon: '🎯',
    popular: false
  }
]

export default function ServicesPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 text-center">
        <div className="container relative z-10 mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Nos Services de Traduction
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Des solutions linguistiques complètes pour répondre à tous vos besoins de communication internationale.
          </p>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 to-background" />
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`relative rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md ${
                  service.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Le plus populaire
                  </div>
                )}
                <div className="mb-4 flex items-center">
                  <span className="mr-3 text-4xl">{service.icon}</span>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="mb-4 text-muted-foreground">{service.description}</p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Notre Processus en 4 Étapes
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Analyse',
                description: 'Évaluation de vos besoins et définition des objectifs du projet.'
              },
              {
                step: '2',
                title: 'Traduction',
                description: 'Rédaction et adaptation par nos experts linguistiques natifs.'
              },
              {
                step: '3',
                title: 'Révision',
                description: 'Vérification approfondie par un second linguiste pour garantir la qualité.'
              },
              {
                step: '4',
                title: 'Livraison',
                description: 'Remise des fichiers finaux dans le format de votre choix.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="rounded-xl border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Vous avez un projet spécifique ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Notre équipe est là pour vous accompagner dans la réalisation de vos projets multilingues, quelle que soit leur complexité.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Parlez-nous de votre projet</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio">Voir nos réalisations</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
