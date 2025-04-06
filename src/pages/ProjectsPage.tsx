
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/notion-api";
import ProjectCard from "@/components/ProjectCard";

const ProjectsPage = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse through my portfolio of firmware and hardware projects.
        </p>
      </div>
      
      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="h-80 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="animate-on-scroll">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
