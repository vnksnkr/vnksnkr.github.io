
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md w-full">
        <div className="terminal-window mb-6">
          <div className="terminal-header">
            <div className="terminal-circle bg-red-500"></div>
            <div className="terminal-circle bg-yellow-500"></div>
            <div className="terminal-circle bg-green-500"></div>
            <span className="ml-2 text-gray-400 text-xs">firmware@engineer:~/error</span>
          </div>
          <div className="terminal-content">
            <p className="mb-2">$ cat error.log</p>
            <div className="text-red-500 text-5xl font-bold mb-4">404</div>
            <p className="mb-2">$ grep -i "page" error.log</p>
            <p className="text-xl text-gray-300 font-medium mb-2">Page not found</p>
            <p className="mb-2">$ cat error_details.txt</p>
            <p className="text-muted-foreground mb-4 text-sm">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
        </div>
        
        <Button className="bg-gray-800 hover:bg-gray-700" asChild>
          <Link to="/" className="inline-flex items-center">
            <Terminal className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
