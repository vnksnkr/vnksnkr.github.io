
import { useQuery } from "@tanstack/react-query";
import { getAboutInfo } from "@/lib/notion-api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const AboutPage = () => {
  const { data: about, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: getAboutInfo,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 animate-pulse w-1/2"></div>
              <div className="h-6 bg-gray-200 animate-pulse w-3/4"></div>
              <div className="h-6 bg-gray-200 animate-pulse w-full"></div>
              <div className="h-6 bg-gray-200 animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, skills, and what drives me as a developer.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16 animate-fade-in">
          <div>
            <img 
              src={about?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop"} 
              alt={about?.name || "Profile"} 
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{about?.name || "Jane Smith"}</h2>
            <p className="text-xl text-teal font-medium">
              {about?.tagline || "Full Stack Developer & UX Designer"}
            </p>
            
            <div className="flex gap-3">
              {about?.socialLinks?.github && (
                <a 
                  href={about.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-navy transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              
              {about?.socialLinks?.linkedin && (
                <a 
                  href={about.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-navy transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              
              {about?.socialLinks?.twitter && (
                <a 
                  href={about.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-navy transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
              
              {about?.email && (
                <a 
                  href={`mailto:${about.email}`}
                  className="text-gray-600 hover:text-navy transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
            
            <p className="text-muted-foreground">
              {about?.bio || "I'm a passionate developer with 5+ years of experience building web and mobile applications. I specialize in creating intuitive, user-friendly interfaces backed by scalable architecture."}
            </p>
            
            <div className="pt-4">
              <Button className="bg-teal hover:bg-teal/90 text-white">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-16 animate-on-scroll">
          <h3 className="text-2xl font-bold mb-6">My Skills</h3>
          <div className="flex flex-wrap gap-2">
            {about?.skills.map((skill) => (
              <Badge key={skill} className="px-4 py-2 text-sm bg-navy">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="animate-on-scroll">
          <h3 className="text-2xl font-bold mb-6">My Journey</h3>
          <div className="prose prose-lg max-w-none">
            <p>
              Throughout my career, I've had the opportunity to work on a diverse range of projects, from small business websites to complex enterprise applications. My journey in tech began with a deep curiosity about how things work and a desire to build solutions that make people's lives easier.
            </p>
            <p>
              After completing my education in Computer Science, I worked at several tech companies where I honed my skills in front-end and back-end development. I've collaborated with talented teams on challenging projects, learning valuable lessons about software architecture, user experience design, and project management along the way.
            </p>
            <p>
              Today, I focus on creating elegant, efficient solutions that solve real problems. I'm particularly passionate about clean code, intuitive interfaces, and staying current with the latest technologies and best practices in the industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
