import { Clock, CheckCircle2, AlertCircle, FileText, Video, Globe, FileCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type ProjectStatus = 'pending' | 'in_progress' | 'completed' | 'needs_review'

interface Project {
  id: string
  title: string
  type: 'video' | 'website' | 'document'
  status: ProjectStatus
  progress: number
  deadline: string
  client: string
  words: number
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Sous-titrage vidéo YouTube',
    type: 'video',
    status: 'in_progress',
    progress: 65,
    deadline: '2023-12-15',
    client: 'Acme Corp',
    words: 1245
  },
  {
    id: '2',
    title: 'Traduction site web',
    type: 'website',
    status: 'pending',
    progress: 0,
    deadline: '2023-12-20',
    client: 'Startup XYZ',
    words: 3560
  },
  {
    id: '3',
    title: 'Article de blog technique',
    type: 'document',
    status: 'completed',
    progress: 100,
    deadline: '2023-12-05',
    client: 'Tech Insights',
    words: 850
  },
]

const statusIcons = {
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  in_progress: <div className="h-2 w-2 rounded-full bg-blue-500" />,
  completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  needs_review: <AlertCircle className="h-4 w-4 text-rose-500" />
}

const typeIcons = {
  video: <Video className="h-4 w-4 text-blue-500" />,
  website: <Globe className="h-4 w-4 text-green-500" />,
  document: <FileText className="h-4 w-4 text-amber-500" />
}

const statusLabels = {
  pending: 'En attente',
  in_progress: 'En cours',
  completed: 'Terminé',
  needs_review: 'À réviser'
}

export function RecentProjects() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-md bg-primary/10 p-2">
              {typeIcons[project.type]}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {project.title}
              </p>
              <p className="text-sm text-muted-foreground">{project.client}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden w-[100px] md:block">
              <div className="flex items-center">
                {statusIcons[project.status]}
                <span className="ml-2 text-sm text-muted-foreground">
                  {statusLabels[project.status]}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-in-out"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
            
            <div className="hidden md:block">
              <Badge variant="outline" className="flex items-center space-x-1">
                <FileCheck className="h-3 w-3" />
                <span>{project.words} mots</span>
              </Badge>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium">
                {new Date(project.deadline).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
              <p className="text-xs text-muted-foreground">Échéance</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
