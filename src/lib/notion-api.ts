
import { toast } from "../hooks/use-toast";

// This placeholder will be replaced with your actual Notion API integration
// For now, we'll use mock data to showcase the structure
const NOTION_API_KEY = "your-notion-api-key";
const DATABASE_ID = "your-database-id";

// Type definitions for our Notion data
export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  tags: string[];
  link?: string;
  githubLink?: string;
  featured: boolean;
  content: string;
  createdAt: string;
}

export interface About {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  profileImage: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  skills: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  tags: string[];
  content: string;
  coverImage?: string;
}

// Mock data to use before connecting to actual Notion
const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description: "Redesigned the UX/UI for a major e-commerce platform to improve conversion rates.",
    slug: "ecommerce-redesign",
    coverImage: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2940&auto=format&fit=crop",
    tags: ["UX/UI Design", "E-commerce", "Conversion Optimization"],
    link: "https://example.com/project1",
    githubLink: "https://github.com/username/ecommerce-redesign",
    featured: true,
    content: "# E-commerce Platform Redesign\n\nThis project involved a complete overhaul of the user experience for a major e-commerce platform...",
    createdAt: "2023-12-10",
  },
  {
    id: "2",
    title: "Financial Dashboard",
    description: "Created an intuitive dashboard for financial data visualization.",
    slug: "financial-dashboard",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    tags: ["Dashboard", "Data Visualization", "Fintech"],
    link: "https://example.com/project2",
    githubLink: "https://github.com/username/financial-dashboard",
    featured: true,
    content: "# Financial Dashboard\n\nDesigned and implemented a comprehensive financial dashboard for tracking investments and expenses...",
    createdAt: "2023-10-22",
  },
  {
    id: "3",
    title: "Mobile App for Fitness Tracking",
    description: "Developed a mobile application for tracking workouts and nutrition.",
    slug: "fitness-app",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2969&auto=format&fit=crop",
    tags: ["Mobile App", "React Native", "Health & Fitness"],
    githubLink: "https://github.com/username/fitness-app",
    featured: false,
    content: "# Fitness Tracking Mobile App\n\nThis app helps users track their workouts, nutrition, and overall fitness progress...",
    createdAt: "2023-08-15",
  },
  {
    id: "4",
    title: "AI-Powered Content Generator",
    description: "Built an AI tool that helps writers generate content ideas and outlines.",
    slug: "ai-content-generator",
    coverImage: "https://images.unsplash.com/photo-1677442135198-394d6589bfe1?q=80&w=2832&auto=format&fit=crop",
    tags: ["AI/ML", "Content Creation", "Productivity"],
    githubLink: "https://github.com/username/ai-content-generator",
    featured: false,
    content: "# AI-Powered Content Generator\n\nLeveraging OpenAI's GPT models, this tool helps content creators generate ideas, outlines, and drafts...",
    createdAt: "2023-06-30",
  }
];

const mockAbout: About = {
  name: "Jane Smith",
  tagline: "Full Stack Developer & UX Designer",
  bio: "I'm a passionate developer with 5+ years of experience building web and mobile applications. I specialize in creating intuitive, user-friendly interfaces backed by scalable architecture.",
  email: "hello@example.com",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
  socialLinks: {
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    twitter: "https://twitter.com/janesmith",
  },
  skills: ["React", "TypeScript", "Node.js", "UI/UX Design", "GraphQL", "AWS"]
};

// Mock blog posts for the blog section
const mockBlogPosts: BlogPost[] = [
  {
    id: "blog1",
    title: "Optimizing Firmware for Battery-Powered Devices",
    description: "Techniques for extending battery life through efficient code and hardware optimization.",
    slug: "optimizing-firmware-battery",
    publishedDate: "2023-11-15",
    tags: ["Firmware", "Power Optimization", "Embedded Systems"],
    content: "# Optimizing Firmware for Battery-Powered Devices\n\nBattery life is a critical concern for portable embedded systems. This post explores techniques to minimize power consumption through efficient code practices and hardware utilization strategies.\n\n## Power Modes\n\nModern microcontrollers offer various power states that can dramatically reduce energy consumption when full processing power isn't needed. Understanding and properly implementing these modes is essential.\n\n```c\n// Example of setting a sleep mode on an ARM Cortex-M microcontroller\nvoid enterLowPowerMode() {\n  // Disable unnecessary peripherals\n  disableUnusedPeripherals();\n  \n  // Configure wake-up sources\n  configureWakeupSources();\n  \n  // Enter sleep mode\n  SCB->SCR |= SCB_SCR_SLEEPDEEP_Msk;\n  __WFI(); // Wait for interrupt\n}\n```\n\n## Efficient Coding Practices\n\n1. **Minimize busy-waiting loops**: Use interrupts instead of polling\n2. **Optimize memory access patterns**: Reduce cache misses\n3. **Use DMA for peripheral operations**: Offload data transfer tasks\n4. **Implement duty cycling**: Only power components when needed\n\n## Conclusion\n\nBy combining hardware-aware programming with algorithmic optimizations, you can significantly extend battery life without compromising functionality."
  },
  {
    id: "blog2",
    title: "Debugging Techniques for Embedded Systems",
    description: "Effective strategies for troubleshooting firmware issues when traditional debuggers aren't available.",
    slug: "debugging-embedded-systems",
    publishedDate: "2023-10-28",
    tags: ["Debugging", "Embedded Systems", "Firmware"],
    content: "# Debugging Techniques for Embedded Systems\n\nDebugging embedded systems presents unique challenges compared to traditional software development. Limited resources, real-time constraints, and hardware dependencies all complicate the process.\n\n## Hardware-Assisted Debugging\n\nJTAG and SWD interfaces provide powerful visibility into the system state:\n\n```c\n// Setting up debug pins\n#define DEBUG_PIN1 GPIO_PIN_1\n#define DEBUG_PIN2 GPIO_PIN_2\n\nvoid toggleDebugPin(uint8_t pin) {\n  HAL_GPIO_TogglePin(GPIOB, pin);\n}\n```\n\n## Logic Analyzers\n\nCapturing digital signals can reveal timing issues and communication problems:\n\n1. Connect probes to key signal lines\n2. Configure trigger conditions\n3. Capture and analyze waveforms\n\n## Printf Debugging\n\nWhen hardware tools aren't available, strategic logging can help identify issues:\n\n```c\n#ifdef DEBUG_ENABLED\n  #define DEBUG_PRINT(x) UART_Transmit(x)\n#else\n  #define DEBUG_PRINT(x)\n#endif\n```\n\n## Memory Corruption Detection\n\nImplementing canaries and checksums can help detect memory corruption:\n\n```c\n#define STACK_CANARY 0xDEADBEEF\nvolatile uint32_t stackCanary = STACK_CANARY;\n\nvoid checkStackIntegrity() {\n  if (stackCanary != STACK_CANARY) {\n    handleStackCorruption();\n  }\n}\n```"
  },
  {
    id: "blog3",
    title: "Implementing Real-Time Operating Systems in Resource-Constrained Environments",
    description: "How to effectively utilize RTOSes in systems with limited memory and processing power.",
    slug: "rtos-resource-constrained",
    publishedDate: "2023-09-10",
    tags: ["RTOS", "Embedded Systems", "FreeRTOS"],
    content: "# Implementing RTOSes in Resource-Constrained Environments\n\nReal-Time Operating Systems (RTOS) bring task management, timing guarantees, and synchronization primitives to embedded systems. But how do you implement them effectively when resources are limited?\n\n## Choosing the Right RTOS\n\nFactors to consider:\n\n1. Memory footprint (both RAM and Flash)\n2. Deterministic behavior\n3. Scheduling algorithm\n4. Available middleware\n\n## Task Optimization\n\nEfficient task design is crucial:\n\n```c\nvoid vTaskFunction(void *pvParameters) {\n  // Initialize task-local variables\n  \n  for (;;) {\n    // Do work\n    \n    // Either block on a resource or delay\n    vTaskDelay(pdMS_TO_TICKS(100));\n  }\n  \n  // Tasks should never return\n  vTaskDelete(NULL);\n}\n```\n\n## Stack Sizing\n\nCareful stack allocation prevents both overflow and wasted memory:\n\n```c\n// Create a task with the minimum required stack\nxTaskCreate(\n  vTaskFunction,       // Function that implements the task\n  \"TASK\",               // Text name for the task\n  configMINIMAL_STACK_SIZE + 128, // Stack size in words, not bytes\n  NULL,                 // Parameter passed into the task\n  tskIDLE_PRIORITY + 1, // Priority\n  NULL                  // Task handle\n);\n```\n\n## Memory Management\n\nStatic allocation can replace dynamic allocation in critical systems:\n\n```c\n// Statically allocate the task control block and stack\nStaticTask_t xTaskBuffer;\nStackType_t xStack[STACK_SIZE];\n\n// Create a task using static allocation\nxTaskCreateStatic(\n  vTaskFunction,\n  \"TASK\",\n  STACK_SIZE,\n  NULL,\n  tskIDLE_PRIORITY + 1,\n  xStack,\n  &xTaskBuffer\n);\n```"
  }
];

// API Functions
export async function getProjects(): Promise<Project[]> {
  // This would be replaced with actual Notion API call
  // Using a try/catch block to demonstrate error handling
  try {
    return mockProjects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    toast({
      title: "Error fetching projects",
      description: "Could not load projects. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = mockProjects.find(p => p.slug === slug);
    if (!project) {
      return null;
    }
    return project;
  } catch (error) {
    console.error(`Failed to fetch project with slug ${slug}:`, error);
    toast({
      title: "Error fetching project",
      description: "Could not load the project. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    return mockProjects.filter(p => p.featured);
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    toast({
      title: "Error fetching featured projects",
      description: "Could not load featured projects. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
}

export async function getAboutInfo(): Promise<About> {
  try {
    return mockAbout;
  } catch (error) {
    console.error("Failed to fetch about info:", error);
    toast({
      title: "Error fetching profile information",
      description: "Could not load profile information. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
}

// Blog related functions
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return mockBlogPosts;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    toast({
      title: "Error fetching blog posts",
      description: "Could not load blog posts. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = mockBlogPosts.find(p => p.slug === slug);
    if (!post) {
      return null;
    }
    return post;
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error);
    toast({
      title: "Error fetching blog post",
      description: "Could not load the blog post. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
}
