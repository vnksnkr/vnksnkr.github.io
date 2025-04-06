
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug } from "@/lib/notion-api";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug || ""),
    enabled: !!slug,
  });

  useEffect(() => {
    if (error) {
      navigate("/not-found", { replace: true });
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="h-80 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <div className="h-10 bg-gray-200 animate-pulse mb-4 w-3/4"></div>
          <div className="h-6 bg-gray-200 animate-pulse mb-8 w-1/2"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-gray-200 animate-pulse w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Button>
          <Link to="/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Link 
          to="/projects" 
          className="inline-flex items-center text-teal hover:text-teal/80 mb-6"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to projects
        </Link>
        
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="w-full h-auto aspect-video object-cover rounded-lg mb-8 shadow-md"
        />
        
        <div className="flex items-center gap-4 mb-2 flex-wrap">
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar size={16} className="mr-1" />
            {new Date(project.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long'
            })}
          </div>
          
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          {project.description}
        </p>
        
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-teal hover:text-teal/80 font-medium mb-8"
          >
            View live project <ExternalLink size={16} className="ml-1" />
          </a>
        )}
        
        <div className="prose prose-lg max-w-none">
          {/* In a real app, we would use a markdown parser here */}
          <div className="space-y-4">
            {project.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8">{paragraph.substring(2)}</h2>;
              } else if (paragraph.startsWith('## ')) {
                return <h3 key={index} className="text-xl font-bold mt-6">{paragraph.substring(3)}</h3>;
              } else if (paragraph.trim()) {
                return <p key={index}>{paragraph}</p>;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
