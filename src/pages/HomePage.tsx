
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Layout, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { getAboutInfo, getFeaturedProjects } from "@/lib/notion-api";

const HomePage = () => {
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["featuredProjects"],
    queryFn: getFeaturedProjects,
  });

  const { data: about, isLoading: aboutLoading } = useQuery({
    queryKey: ["about"],
    queryFn: getAboutInfo,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-navy text-white">
        <div className="container mx-auto max-w-5xl animate-fade-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {aboutLoading ? "Loading..." : `Hi, I'm ${about?.name || "Jane"}`}
              </h1>
              <p className="text-xl text-gray-300">
                {aboutLoading ? "Loading..." : about?.tagline || "Full Stack Developer & Designer"}
              </p>
              <p className="text-gray-300">
                {aboutLoading 
                  ? "Loading..." 
                  : about?.bio?.substring(0, 150) + "..." || 
                    "I build beautiful, functional websites and applications with a focus on user experience and clean code."}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button className="bg-teal hover:bg-teal/90 text-white">
                  <Link to="/projects">View My Work</Link>
                </Button>
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                  <Link to="/contact">Contact Me</Link>
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-2xl">
              {aboutLoading ? (
                <div className="h-80 bg-gray-800 animate-pulse"></div>
              ) : (
                <img 
                  src={about?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop"} 
                  alt={about?.name || "Profile"} 
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What I Do</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg animate-on-scroll">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-teal/10 rounded-full mb-6">
                <Layout className="text-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Web Design</h3>
              <p className="text-muted-foreground">
                I create beautiful, responsive websites with a focus on user experience and modern design principles.
              </p>
            </div>
            
            <div className="p-6 rounded-lg animate-on-scroll">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-teal/10 rounded-full mb-6">
                <Code className="text-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Web Development</h3>
              <p className="text-muted-foreground">
                I build robust web applications using modern frameworks and technologies that scale with your business.
              </p>
            </div>
            
            <div className="p-6 rounded-lg animate-on-scroll">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-teal/10 rounded-full mb-6">
                <Smartphone className="text-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile Apps</h3>
              <p className="text-muted-foreground">
                I develop cross-platform mobile applications that provide a seamless experience on all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link 
              to="/projects" 
              className="flex items-center text-teal hover:text-teal/80 font-medium"
            >
              View all projects <ArrowRight className="ml-1" size={18} />
            </Link>
          </div>
          
          {projectsLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div 
                  key={i} 
                  className="h-96 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="animate-on-scroll">
                  <ProjectCard project={project} featured />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
