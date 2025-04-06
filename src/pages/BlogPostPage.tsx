
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getBlogPostBySlug } from "@/lib/notion-api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { marked } from "marked";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => getBlogPostBySlug(slug!),
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="space-y-6 animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/4"></div>
          <div className="h-64 bg-gray-800 rounded w-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-circle bg-red-500"></div>
            <div className="terminal-circle bg-yellow-500"></div>
            <div className="terminal-circle bg-green-500"></div>
            <span className="ml-2 text-gray-400 text-xs">firmware@engineer:~/error</span>
          </div>
          <div className="terminal-content">
            <p className="mb-2">$ cat error.log</p>
            <h2 className="text-xl font-bold mb-4 text-red-500">Error 404: Post Not Found</h2>
            <p>The requested blog post could not be found.</p>
            <p className="mt-4 text-gray-400">$ cd ../blogs</p>
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link to="/blogs">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Blogs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Parse markdown content
  const htmlContent = marked(post.content);

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Button
          asChild
          variant="ghost"
          className="mb-4"
        >
          <Link to="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold tracking-tight mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <time>{post.publishedDate}</time>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <div key={tag} className="flex items-center px-2 py-1 rounded-md bg-gray-800 text-gray-300 text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </div>
            ))}
          </div>
        </div>
        
        {post.coverImage && (
          <div className="w-full h-64 mb-8 overflow-hidden rounded-lg">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      <div className="prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default BlogPostPage;
