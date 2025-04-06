
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBlogPosts } from "@/lib/notion-api";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  tags: string[];
};

const BlogsPage = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogPosts,
  });

  return (
    <div className="container max-w-5xl py-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-circle bg-red-500"></div>
              <div className="terminal-circle bg-yellow-500"></div>
              <div className="terminal-circle bg-green-500"></div>
              <span className="ml-2 text-gray-400 text-xs">firmware@engineer:~/blogs</span>
            </div>
            <div className="terminal-content">
              <p className="mb-2">$ ls -la ./articles</p>
              <h1 className="text-3xl font-bold tracking-tight text-white">Blog Posts</h1>
              <p className="text-gray-400 mt-1">cat README.md</p>
              <p className="text-gray-300 mt-1">// Technical insights and firmware engineering thoughts</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 p-8 border rounded-md animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 border rounded-md bg-gray-900 text-white">
            <p>Error loading blog posts. Please try again later.</p>
            <Button variant="outline" className="mt-4">
              Retry
            </Button>
          </div>
        ) : blogs && blogs.length > 0 ? (
          <div className="grid gap-6">
            {blogs.map((post) => (
              <Link 
                key={post.id}
                to={`/blogs/${post.slug}`}
                className="block p-6 border border-gray-800 rounded-md hover:bg-gray-900/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{post.title}</h2>
                    <p className="text-muted-foreground mt-2">{post.description}</p>
                    <div className="flex items-center gap-2 mt-4">
                      <time className="text-xs text-gray-500">{post.publishedDate}</time>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-800 text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Terminal className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 border rounded-md bg-gray-900 text-white">
            <h3 className="font-mono text-lg mb-2">$ echo "No posts found"</h3>
            <p className="text-gray-400">No blog posts have been published yet. Check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
