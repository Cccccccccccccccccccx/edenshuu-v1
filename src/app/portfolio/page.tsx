import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: 'Portfolio - Edenshuu',
  description: 'Découvrez nos projets de traduction et nos réalisations pour des clients du monde entier.',
}

const projects = [
  {
    id: 1,
    title: 'Site E-commerce Multilingue',
    category: 'Traduction Web',
    description: 'Traduction complète d\'une boutique en ligne vers 5 langues avec adaptation culturelle du contenu.',
    image: '/images/portfolio/ecommerce.jpg',
    languages: ['Anglais', 'Français', 'Espagnol', 'Allemand', 'Italien'],
    client: 'Mode & Style Europe',
    year: '2024',
    featured: true
  },
  {
    id: 2,
    title: 'Série Documentaire Internationale',
    category: 'Sous-titrage',
    description: 'Sous-titrage en 8 langues d\'une série documentaire diffusée sur les plateformes internationales.',
    image: '/images/portfolio/documentary.jpg',
    languages: ['Anglais', 'Français', 'Espagnol', 'Allemand', 'Japonais', 'Coréen', 'Portugais', 'Arabe'],
    client: 'Horizon Médias',
    year: '2023',
    featured: true
  },
  {
    id: 3,
    title: 'Application Mobile de Voyage',
    category: 'Localisation',
    description: 'Localisation complète d\'une application mobile de réservation de voyages en 12 langues.',
    image: '/images/portfolio/travel-app.jpg',
    languages: ['Anglais', 'Français', 'Espagnol', 'Allemand', 'Italien', 'Portugais', 'Néerlandais', 'Russe', 'Japonais', 'Coréen', 'Chinois', 'Arabe'],
    client: 'VoyageGlobal',
    year: '2023',
    featured: true
  },
  {
    id: 4,
    title: 'Roman à Succès',
    category: 'Traduction Littéraire',
    description: 'Traduction d\'un roman à succès de l\'anglais vers le français, préservant le style et les nuances de l\'auteur.',
    image: '/images/portfolio/novel.jpg',
    languages: ['Anglais → Français'],
    client: 'Éditions Littéraires',
    year: '2023',
    featured: false
  },
  {
    id: 5,
    title: 'Site Web Corporatif',
    category: 'Traduction Web',
    description: 'Traduction et adaptation culturelle du site web d\'une entreprise technologique vers 7 langues.',
    image: '/images/portfolio/corporate.jpg',
    languages: ['Anglais', 'Français', 'Espagnol', 'Allemand', 'Japonais', 'Coréen', 'Chinois'],
    client: 'TechSolutions Inc.',
    year: '2023',
    featured: false
  },
  {
    id: 6,
    title: 'Série Éducative pour Enfants',
    category: 'Doublage',
    description: 'Doublage d\'une série éducative pour enfants en 6 langues avec des comédiens natifs.',
    image: '/images/portfolio/children.jpg',
    languages: ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 'Portugais'],
    client: 'ÉduFun Médias',
    year: '2022',
    featured: false
  },
  {
    id: 7,
    title: 'Manuel Technique',
    category: 'Traduction Technique',
    description: 'Traduction d\'un manuel technique complexe de l\'industrie aérospatiale.',
    image: '/images/portfolio/technical.jpg',
    languages: ['Anglais → Français', 'Anglais → Allemand'],
    client: 'AeroTech Industries',
    year: '2022',
    featured: false
  },
  {
    id: 8,
    title: 'Campagne Publicitaire Internationale',
    category: 'Traduction Marketing',
    description: 'Adaptation culturelle d\'une campagne publicitaire pour 15 marchés internationaux.',
    image: '/images/portfolio/advertising.jpg',
    languages: ['15 langues européennes et asiatiques'],
    client: 'Global Brands Ltd',
    year: '2022',
    featured: true
  },
  {
    id: 9,
    title: 'Série Télévisée à Succès',
    category: 'Sous-titrage et Doublage',
    description: 'Sous-titrage et doublage d\'une série télévisée à succès en 10 langues.',
    image: '/images/portfolio/tv-series.jpg',
    languages: ['Anglais', 'Français', 'Espagnol', 'Allemand', 'Italien', 'Portugais', 'Russe', 'Japonais', 'Coréen', 'Arabe'],
    client: 'StreamGlobal',
    year: '2021',
    featured: false
  }
]

const categories = [
  { id: 'all', name: 'Tous les projets' },
  { id: 'web', name: 'Traduction Web' },
  { id: 'subtitling', name: 'Sous-titrage' },
  { id: 'dubbing', name: 'Doublage' },
  { id: 'literary', name: 'Traduction Littéraire' },
  { id: 'technical', name: 'Traduction Technique' },
  { id: 'marketing', name: 'Traduction Marketing' },
  { id: 'localization', name: 'Localisation' }
]

export default function PortfolioPage() {
  // In a real app, you would filter projects based on the selected category
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 text-center">
        <div className="container relative z-10 mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Notre Portfolio
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Découvrez nos réalisations et la qualité de notre travail à travers une sélection de projets récents.
          </p>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 to-background" />
      </section>

      {/* Portfolio Filter */}
      <section className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Projets en Vedette</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter(project => project.featured)
              .map((project) => (
                <div 
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-video w-full bg-muted/50">
                    {/* In a real app, you would use Next.js Image component */}
                    <div className="flex h-full items-center justify-center bg-muted/30">
                      <span className="text-4xl">{project.image ? '🖼️' : '📄'}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{project.category}</span>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                    <p className="mb-4 line-clamp-2 text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.languages.slice(0, 3).map((lang, idx) => (
                        <span 
                          key={idx} 
                          className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                      {project.languages.length > 3 && (
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                          +{project.languages.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link 
                    href={`/portfolio/${project.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Voir les détails du projet : ${project.title}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Tous les Projets</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
              >
                <div className="aspect-video w-full bg-muted/50">
                  {/* In a real app, you would use Next.js Image component */}
                  <div className="flex h-full items-center justify-center bg-muted/30">
                    <span className="text-4xl">{project.image ? '🖼️' : '📄'}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{project.category}</span>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mb-4 line-clamp-2 text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.languages.slice(0, 2).map((lang, idx) => (
                      <span 
                        key={idx} 
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                    {project.languages.length > 2 && (
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        +{project.languages.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <Link 
                  href={`/portfolio/${project.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Voir les détails du projet : ${project.title}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Prêt à donner une dimension internationale à votre projet ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
            Notre équipe est à votre disposition pour discuter de vos besoins en traduction et localisation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Demander un devis</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-primary-foreground" asChild>
              <Link href="/services">Découvrir nos services</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
