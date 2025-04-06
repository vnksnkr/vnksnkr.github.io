
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ContactPage from "@/pages/ContactPage";
import BlogsPage from "@/pages/BlogsPage";
import BlogPostPage from "@/pages/BlogPostPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
                <HomePage />
              </Layout>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <Layout>
                <ProjectsPage />
              </Layout>
            } 
          />
          <Route 
            path="/projects/:slug" 
            element={
              <Layout>
                <ProjectDetailPage />
              </Layout>
            } 
          />
          <Route 
            path="/blogs" 
            element={
              <Layout>
                <BlogsPage />
              </Layout>
            } 
          />
          <Route 
            path="/blogs/:slug" 
            element={
              <Layout>
                <BlogPostPage />
              </Layout>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <Layout>
                <ContactPage />
              </Layout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
