
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { type Project } from "@/lib/notion-api";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  return (
    <Card className={`project-card ${featured ? 'h-full' : ''}`}>
      <div className="relative">
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className={`w-full object-cover ${featured ? 'h-52' : 'h-48'}`}
        />
        {project.featured && (
          <Badge className="absolute top-3 right-3 bg-teal text-white">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="pt-6">
        <h3 className={`font-bold ${featured ? 'text-xl' : 'text-lg'} mb-2`}>
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Link
          to={`/projects/${project.slug}`}
          className="text-sm text-teal hover:text-teal/80 font-medium"
        >
          View details
        </Link>
        
        <div className="flex space-x-3">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <Github size={18} />
            </a>
          )}
          
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
              aria-label={`External link to ${project.title}`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
