export interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  location: string;
  skills: {
    primary: string[];
    secondary: string[];
  };
  projects: {
    title: string;
    description: string;
    technologies: string[];
    impact: string;
    challenges: string;
  }[];
  recording: {
    duration: string;
    transcript: string;
    aiSummary: string;
    highlights: string[];
  };
  availability: string;
  salary: string;
}

export const mockCandidates: CandidateProfile[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Senior React Developer",
    experienceYears: 5,
    location: "San Francisco, CA",
    skills: {
      primary: ["React", "TypeScript", "Node.js", "GraphQL"],
      secondary: ["AWS", "Docker", "Jest", "Webpack"]
    },
    projects: [
      {
        title: "E-commerce Platform Rebuild",
        description: "Led the complete redesign of a legacy e-commerce platform serving 100k+ daily users",
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
        impact: "Reduced page load times by 40% and increased conversion rates by 15%",
        challenges: "Migrating from a monolithic PHP application while maintaining zero downtime"
      },
      {
        title: "Real-time Dashboard System",
        description: "Built a real-time analytics dashboard for business metrics",
        technologies: ["React", "WebSocket", "D3.js", "Redis"],
        impact: "Enabled real-time decision making for product team",
        challenges: "Handling high-frequency data updates without performance degradation"
      }
    ],
    recording: {
      duration: "12:30",
      transcript: "Hi, I'm Sarah. I've been working as a React developer for about 5 years now. My most recent project was rebuilding an entire e-commerce platform from the ground up. The challenge was that we had this legacy PHP system that was really showing its age - slow load times, difficult to maintain, and our conversion rates were suffering. I led a team of 4 developers to completely rebuild it using React and TypeScript. We implemented server-side rendering, optimized our bundle sizes, and built a much more intuitive user interface. The results were pretty amazing - we saw a 40% improvement in page load times and a 15% increase in conversion rates. What I'm most proud of is that we managed to do this migration with zero downtime. We used a gradual rollout strategy where we migrated page by page...",
      aiSummary: "Sarah is a senior React developer with strong technical leadership skills. She successfully led a complex e-commerce platform rebuild, demonstrating expertise in performance optimization and zero-downtime migrations. She has strong presentation skills and focuses on business impact.",
      highlights: [
        "Led team of 4 developers",
        "40% improvement in page load times",
        "Zero-downtime migration strategy",
        "Strong focus on business metrics"
      ]
    },
    availability: "2 weeks notice",
    salary: "$140,000 - $160,000"
  },
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    role: "Full-Stack Engineer",
    experienceYears: 3,
    location: "Austin, TX",
    skills: {
      primary: ["Python", "Django", "PostgreSQL", "React"],
      secondary: ["Docker", "AWS", "Redis", "Celery"]
    },
    projects: [
      {
        title: "Healthcare Data Pipeline",
        description: "Built a HIPAA-compliant data processing pipeline for medical records",
        technologies: ["Python", "Django", "PostgreSQL", "AWS"],
        impact: "Processes 50,000+ patient records daily with 99.9% accuracy",
        challenges: "Ensuring HIPAA compliance while maintaining high performance"
      },
      {
        title: "Patient Portal Application",
        description: "Developed a web application for patients to access their medical records",
        technologies: ["React", "Django REST", "JWT", "Material-UI"],
        impact: "Reduced patient support calls by 60%",
        challenges: "Complex user permissions and real-time notifications"
      }
    ],
    recording: {
      duration: "14:45",
      transcript: "I'm Marcus, and I've been doing full-stack development for about 3 years, primarily in healthcare tech. My biggest project was building a data pipeline for processing medical records. The tricky part was that everything had to be HIPAA compliant, so we couldn't cut any corners on security. I used Python with Django for the backend, and we process about 50,000 patient records every day. The accuracy rate is 99.9%, which is critical in healthcare. I also built the patient portal that connects to this system - it's a React app that lets patients view their records, schedule appointments, and message their doctors. What I love about healthcare tech is that the work you do directly impacts people's lives...",
      aiSummary: "Marcus is a passionate full-stack developer with strong experience in healthcare technology. He demonstrates excellent attention to detail, especially regarding security and compliance. His work directly impacts patient care, which drives his motivation.",
      highlights: [
        "HIPAA-compliant systems expertise",
        "99.9% accuracy in data processing",
        "60% reduction in support calls",
        "Strong healthcare domain knowledge"
      ]
    },
    availability: "Immediately",
    salary: "$95,000 - $115,000"
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    role: "Frontend Developer & UX Designer",
    experienceYears: 4,
    location: "Seattle, WA",
    skills: {
      primary: ["Vue.js", "CSS", "Figma", "JavaScript"],
      secondary: ["Nuxt.js", "SCSS", "Adobe Creative Suite", "Cypress"]
    },
    projects: [
      {
        title: "Design System Implementation",
        description: "Created a comprehensive design system for a fintech startup",
        technologies: ["Vue.js", "Storybook", "SCSS", "Figma"],
        impact: "Reduced design-to-development time by 50%",
        challenges: "Ensuring consistency across 15+ different product teams"
      },
      {
        title: "Mobile-First Banking App",
        description: "Designed and developed a mobile banking application interface",
        technologies: ["Vue.js", "PWA", "CSS Grid", "Service Workers"],
        impact: "Achieved 4.8/5 user satisfaction rating",
        challenges: "Complex financial workflows and accessibility requirements"
      }
    ],
    recording: {
      duration: "11:20",
      transcript: "Hi, I'm Priya. I'm both a frontend developer and UX designer, which gives me a unique perspective on building user interfaces. I've been doing this for 4 years, mostly in fintech. My most impactful project was creating a design system for a banking app. The challenge was that they had 15 different product teams all building different parts of the app, and everything looked completely different. I worked closely with the design team to create a comprehensive component library using Vue.js and Storybook. We documented everything - from color palettes to interaction patterns. The result was that we cut the time from design to development by 50% because developers could just grab pre-built components...",
      aiSummary: "Priya combines frontend development skills with UX design expertise, making her valuable for user-focused products. She has strong experience in design systems and demonstrates excellent collaboration skills across teams.",
      highlights: [
        "Dual expertise in development and design",
        "50% reduction in design-to-development time",
        "4.8/5 user satisfaction rating",
        "Experience with 15+ product teams"
      ]
    },
    availability: "1 month notice",
    salary: "$105,000 - $125,000"
  },
  {
    id: "alex-rodriguez",
    name: "Alex Rodriguez",
    role: "DevOps Engineer",
    experienceYears: 6,
    location: "Denver, CO",
    skills: {
      primary: ["AWS", "Docker", "Kubernetes", "Terraform"],
      secondary: ["Python", "Bash", "Jenkins", "Prometheus"]
    },
    projects: [
      {
        title: "Multi-Cloud Infrastructure Migration",
        description: "Migrated company infrastructure from single cloud to multi-cloud setup",
        technologies: ["AWS", "GCP", "Terraform", "Kubernetes"],
        impact: "Reduced infrastructure costs by 30% and improved uptime to 99.99%",
        challenges: "Zero-downtime migration across multiple cloud providers"
      },
      {
        title: "CI/CD Pipeline Optimization",
        description: "Redesigned deployment pipeline to reduce deployment time",
        technologies: ["Jenkins", "Docker", "Kubernetes", "ArgoCD"],
        impact: "Reduced deployment time from 45 minutes to 8 minutes",
        challenges: "Complex microservices dependencies and testing requirements"
      }
    ],
    recording: {
      duration: "15:10",
      transcript: "I'm Alex, and I've been doing DevOps for 6 years. My specialty is cloud infrastructure and automation. My biggest project was migrating our entire infrastructure from AWS-only to a multi-cloud setup using AWS and Google Cloud. The business driver was cost optimization and avoiding vendor lock-in. The technical challenge was doing this migration with zero downtime for a system that processes millions of transactions daily. I used Terraform to manage all the infrastructure as code, and Kubernetes for container orchestration. We achieved a 30% cost reduction and improved our uptime to 99.99%. The key was having comprehensive monitoring and automated rollback procedures...",
      aiSummary: "Alex is an experienced DevOps engineer with deep expertise in cloud infrastructure and automation. He demonstrates strong problem-solving skills and a focus on reliability and cost optimization. His systematic approach to complex migrations is impressive.",
      highlights: [
        "Multi-cloud infrastructure expertise",
        "30% cost reduction achieved",
        "99.99% uptime improvement",
        "Zero-downtime migration experience"
      ]
    },
    availability: "3 weeks notice",
    salary: "$130,000 - $150,000"
  },
  {
    id: "emily-zhang",
    name: "Emily Zhang",
    role: "Data Scientist",
    experienceYears: 3,
    location: "Boston, MA",
    skills: {
      primary: ["Python", "TensorFlow", "SQL", "R"],
      secondary: ["AWS", "Docker", "Jupyter", "Pandas"]
    },
    projects: [
      {
        title: "Customer Churn Prediction Model",
        description: "Built ML model to predict customer churn for SaaS company",
        technologies: ["Python", "TensorFlow", "AWS SageMaker", "SQL"],
        impact: "Increased customer retention by 25% through early intervention",
        challenges: "Dealing with imbalanced datasets and feature engineering"
      },
      {
        title: "Real-time Fraud Detection System",
        description: "Developed ML pipeline for detecting fraudulent transactions",
        technologies: ["Python", "Apache Kafka", "Redis", "TensorFlow"],
        impact: "Reduced fraud losses by 40% while maintaining low false positive rate",
        challenges: "Real-time inference with sub-100ms latency requirements"
      }
    ],
    recording: {
      duration: "13:25",
      transcript: "Hi, I'm Emily. I'm a data scientist with 3 years of experience, primarily in machine learning applications for business problems. My most successful project was building a customer churn prediction model for a SaaS company. They were losing about 20% of their customers annually, and they wanted to identify at-risk customers early so they could intervene. I built a model using TensorFlow that analyzes usage patterns, support ticket history, and billing information. The tricky part was dealing with imbalanced data - only 20% of customers actually churn. I used techniques like SMOTE for oversampling and ensemble methods to improve accuracy. The model now identifies 85% of churning customers 30 days before they cancel...",
      aiSummary: "Emily is a skilled data scientist who excels at translating business problems into ML solutions. She demonstrates strong technical skills in handling real-world data challenges and has delivered measurable business impact through her models.",
      highlights: [
        "25% increase in customer retention",
        "85% accuracy in churn prediction",
        "40% reduction in fraud losses",
        "Real-time ML inference expertise"
      ]
    },
    availability: "2 weeks notice",
    salary: "$115,000 - $135,000"
  },
  {
    id: "jordan-kim",
    name: "Jordan Kim",
    role: "Mobile Developer",
    experienceYears: 4,
    location: "Los Angeles, CA",
    skills: {
      primary: ["React Native", "Swift", "Kotlin", "JavaScript"],
      secondary: ["Firebase", "Redux", "Jest", "Fastlane"]
    },
    projects: [
      {
        title: "Food Delivery Mobile App",
        description: "Led development of a food delivery app with real-time tracking",
        technologies: ["React Native", "Firebase", "Google Maps API", "Redux"],
        impact: "App reached 100k+ downloads with 4.5 star rating",
        challenges: "Real-time GPS tracking and offline functionality"
      },
      {
        title: "Cross-platform Fitness App",
        description: "Built a fitness tracking app for iOS and Android",
        technologies: ["React Native", "HealthKit", "Google Fit", "SQLite"],
        impact: "Reduced development time by 60% compared to native approach",
        challenges: "Integrating with different health APIs across platforms"
      }
    ],
    recording: {
      duration: "12:45",
      transcript: "I'm Jordan, and I specialize in mobile development with React Native, though I also do native iOS and Android development. I've been doing this for 4 years. My favorite project was building a food delivery app that became really popular in our city. The main challenge was implementing real-time GPS tracking for delivery drivers while keeping the app performant and battery-efficient. I used React Native with Firebase for the backend, and integrated Google Maps for the tracking functionality. We also had to handle offline scenarios - what happens when a user loses internet connection while placing an order? I implemented a robust offline queue system that syncs when connectivity returns...",
      aiSummary: "Jordan is a versatile mobile developer with expertise in both cross-platform and native development. They show strong problem-solving skills, particularly around performance optimization and offline functionality. Their apps have achieved significant user adoption.",
      highlights: [
        "100k+ app downloads achieved",
        "4.5 star app store rating",
        "60% reduction in development time",
        "Offline functionality expertise"
      ]
    },
    availability: "1 month notice",
    salary: "$110,000 - $130,000"
  },
  {
    id: "david-wilson",
    name: "David Wilson",
    role: "Backend Engineer",
    experienceYears: 7,
    location: "Chicago, IL",
    skills: {
      primary: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
      secondary: ["AWS", "Kafka", "Docker", "Elasticsearch"]
    },
    projects: [
      {
        title: "High-Volume API Gateway",
        description: "Built API gateway handling 10M+ requests daily",
        technologies: ["Java", "Spring Boot", "Redis", "AWS ELB"],
        impact: "Achieved 99.9% uptime with sub-50ms response times",
        challenges: "Rate limiting, caching strategies, and horizontal scaling"
      },
      {
        title: "Event-Driven Microservices Architecture",
        description: "Redesigned monolith into microservices using event sourcing",
        technologies: ["Java", "Kafka", "PostgreSQL", "Docker"],
        impact: "Improved deployment frequency from monthly to daily",
        challenges: "Distributed transactions and eventual consistency"
      }
    ],
    recording: {
      duration: "16:30",
      transcript: "I'm David, and I've been building backend systems for 7 years, mostly in Java. My expertise is in high-performance, scalable systems. My most challenging project was building an API gateway that needed to handle over 10 million requests per day. The system serves as the entry point for all our microservices, so reliability was absolutely critical. I used Spring Boot with Redis for caching and implemented sophisticated rate limiting algorithms. The trickiest part was the caching strategy - we needed to cache responses but also invalidate them quickly when data changed. I implemented a multi-layer caching approach with Redis and local caches...",
      aiSummary: "David is a senior backend engineer with deep expertise in high-performance systems and microservices architecture. He demonstrates strong architectural thinking and has experience with large-scale systems. His focus on reliability and performance is evident.",
      highlights: [
        "10M+ daily requests handled",
        "99.9% uptime achieved",
        "Sub-50ms response times",
        "Microservices architecture expertise"
      ]
    },
    availability: "4 weeks notice",
    salary: "$145,000 - $165,000"
  },
  {
    id: "lisa-garcia",
    name: "Lisa Garcia",
    role: "Product Engineer",
    experienceYears: 5,
    location: "Portland, OR",
    skills: {
      primary: ["React", "Node.js", "TypeScript", "GraphQL"],
      secondary: ["Figma", "A/B Testing", "Analytics", "PostgreSQL"]
    },
    projects: [
      {
        title: "User Onboarding Optimization",
        description: "Redesigned user onboarding flow to improve conversion rates",
        technologies: ["React", "TypeScript", "Mixpanel", "Optimizely"],
        impact: "Increased user activation by 35% and reduced time-to-value by 40%",
        challenges: "Balancing feature discovery with simplicity"
      },
      {
        title: "In-App Purchase System",
        description: "Built subscription and payment system for mobile app",
        technologies: ["Node.js", "Stripe", "GraphQL", "PostgreSQL"],
        impact: "Generated $2M+ in additional revenue in first year",
        challenges: "Complex subscription logic and international payment compliance"
      }
    ],
    recording: {
      duration: "14:15",
      transcript: "Hi, I'm Lisa. I'm a product engineer, which means I work closely with product managers and designers to build features that users love. I've been doing this for 5 years, and I really enjoy the intersection of technology and user experience. My most impactful project was redesigning our user onboarding flow. Our activation rates were pretty low - only about 40% of new users were completing the setup process. I worked with the design team to completely rethink the flow, implemented A/B testing infrastructure, and ran multiple experiments. We simplified the process from 8 steps to 4, added progress indicators, and used smart defaults based on user type...",
      aiSummary: "Lisa is a product-focused engineer who excels at building user-centric features. She combines technical skills with strong product sense and data-driven decision making. Her work has generated significant business impact through improved user experience.",
      highlights: [
        "35% increase in user activation",
        "$2M+ revenue generated",
        "40% reduction in time-to-value",
        "Strong A/B testing expertise"
      ]
    },
    availability: "2 weeks notice",
    salary: "$125,000 - $145,000"
  },
  {
    id: "ryan-o-connor",
    name: "Ryan O'Connor",
    role: "Security Engineer",
    experienceYears: 6,
    location: "Washington, DC",
    skills: {
      primary: ["Python", "Cybersecurity", "AWS Security", "Penetration Testing"],
      secondary: ["Docker", "Kubernetes", "Splunk", "Wireshark"]
    },
    projects: [
      {
        title: "Zero Trust Architecture Implementation",
        description: "Implemented zero trust security model for enterprise application",
        technologies: ["AWS IAM", "Okta", "Python", "Terraform"],
        impact: "Reduced security incidents by 70% and achieved SOC 2 compliance",
        challenges: "Migrating legacy systems without disrupting business operations"
      },
      {
        title: "Automated Threat Detection System",
        description: "Built ML-powered system for detecting security threats",
        technologies: ["Python", "TensorFlow", "Splunk", "AWS Lambda"],
        impact: "Reduced mean time to detection from hours to minutes",
        challenges: "Minimizing false positives while maintaining high sensitivity"
      }
    ],
    recording: {
      duration: "13:50",
      transcript: "I'm Ryan, and I specialize in cybersecurity engineering. I've been working in this field for 6 years, focusing on building secure systems and detecting threats. My most complex project was implementing a zero trust architecture for a large enterprise client. They had a traditional perimeter-based security model that was becoming ineffective with remote work and cloud adoption. I designed and implemented a system where every user and device is verified before accessing any resource. This involved integrating with identity providers like Okta, implementing micro-segmentation, and creating detailed access policies. The result was a 70% reduction in security incidents...",
      aiSummary: "Ryan is an experienced security engineer with expertise in modern security architectures and threat detection. He demonstrates strong technical skills combined with an understanding of business needs. His work has significantly improved security posture for organizations.",
      highlights: [
        "70% reduction in security incidents",
        "SOC 2 compliance achieved",
        "Zero trust architecture expertise",
        "ML-powered threat detection"
      ]
    },
    availability: "6 weeks notice",
    salary: "$140,000 - $160,000"
  },
  {
    id: "maya-singh",
    name: "Maya Singh",
    role: "Frontend Architect",
    experienceYears: 8,
    location: "New York, NY",
    skills: {
      primary: ["React", "TypeScript", "Webpack", "Micro-frontends"],
      secondary: ["GraphQL", "Jest", "Cypress", "Storybook"]
    },
    projects: [
      {
        title: "Micro-frontend Architecture Migration",
        description: "Led migration from monolithic frontend to micro-frontend architecture",
        technologies: ["React", "Module Federation", "TypeScript", "Webpack"],
        impact: "Enabled 8 teams to deploy independently, reducing conflicts by 90%",
        challenges: "Maintaining consistent UX across independently developed modules"
      },
      {
        title: "Performance Optimization Initiative",
        description: "Led company-wide frontend performance optimization",
        technologies: ["React", "Webpack", "Web Vitals", "Service Workers"],
        impact: "Improved Core Web Vitals scores by 60% across all products",
        challenges: "Coordinating changes across 12 different product teams"
      }
    ],
    recording: {
      duration: "17:20",
      transcript: "Hi, I'm Maya. I'm a frontend architect with 8 years of experience, and I specialize in scaling frontend applications and teams. My biggest project was leading the migration of our monolithic frontend to a micro-frontend architecture. We had 8 different product teams all working on the same massive React application, and it was becoming a bottleneck. Teams couldn't deploy independently, there were constant merge conflicts, and the build times were getting out of control. I designed a solution using Webpack Module Federation where each team could own their own micro-frontend but still maintain a consistent user experience. The migration took 8 months, but now teams can deploy independently and we've reduced conflicts by 90%...",
      aiSummary: "Maya is a senior frontend architect with exceptional experience in scaling frontend systems and teams. She demonstrates strong leadership skills and has successfully solved complex technical and organizational challenges. Her architectural decisions have enabled better team productivity.",
      highlights: [
        "Led 8-team architecture migration",
        "90% reduction in deployment conflicts",
        "60% improvement in Core Web Vitals",
        "Micro-frontend architecture expertise"
      ]
    },
    availability: "1 month notice",
    salary: "$160,000 - $180,000"
  }
];