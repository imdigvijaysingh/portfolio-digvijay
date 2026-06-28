const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// Cities list
const cities = ['Saharanpur', 'Delhi', 'Noida', 'Dehradun', 'Gurgaon', 'Bangalore', 'Pune', 'Hyderabad', 'Mumbai', 'Chennai'];

// Generate City Pages
cities.forEach(city => {
    let cityHtml = indexHtml;
    const title = `Best MERN Stack & Website Developer in ${city} | Digvijay Singh`;
    const metaDesc = `Looking for the best MERN stack developer or website developer in ${city}? Digvijay Singh crafts premium, high-performance web applications. Hire now!`;
    const h1 = `Premium <span class="text-gradient">MERN Stack</span> Developer in ${city}`;
    const heroDesc = `Crafting exceptional, high-performance web applications with stunning UIs for businesses in ${city}. Building the web of tomorrow, today.`;
    
    const schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Digvijay Singh",
      "jobTitle": "MERN Stack Developer",
      "url": "https://digvijayp.netlify.app",
      "sameAs": [
        "https://github.com/imdigvijaysingh",
        "https://www.linkedin.com/in/digvijay-singh-pundir-12a628343/"
      ]
    }
    </script>
    `;

    // Add schema before </head>
    cityHtml = cityHtml.replace('</head>', `${schema}\n  </head>`);
    // Replace title
    cityHtml = cityHtml.replace('<title>Portfolio - Digvijay Singh</title>', `<title>${title}</title>`);
    // Replace meta description
    cityHtml = cityHtml.replace('content="Top-tier MERN stack developer crafting premium, high-performance web applications."', `content="${metaDesc}"`);
    // Replace H1
    cityHtml = cityHtml.replace('Premium <span class="text-gradient">MERN Stack</span> Developer', h1);
    // Replace hero desc
    cityHtml = cityHtml.replace('Crafting exceptional, high-performance web applications with stunning UIs. Building the web of tomorrow, today.', heroDesc);
    // Update asset paths if needed (since they will be in root, no need to update paths)

    fs.writeFileSync(path.join(__dirname, `developer-in-${city.toLowerCase()}.html`), cityHtml);
    console.log(`Created city page for ${city}`);
});

// Generate Blogs
// We'll generate 30 SEO optimized blog post objects
const blogTopics = [
    "Why MERN Stack is the Future of Web Development",
    "How to Choose the Best Website Developer for Your Startup",
    "Top 10 UI/UX Trends for Modern Web Applications",
    "React vs NextJS: Which One Should You Choose?",
    "The Ultimate Guide to Local SEO for Web Developers",
    "Building Scalable Backend Systems with NodeJS and MongoDB",
    "Why Fast Loading Speeds are Critical for Your Website",
    "How Glassmorphism is Changing Web Design",
    "Understanding Core Web Vitals for Better Ranking",
    "The Power of Framer Motion in React Applications",
    "How to Hire the Right Frontend Developer",
    "Cost of Building a Custom MERN Stack Application",
    "Tailwind CSS vs Standard CSS: A Comprehensive Review",
    "How Web Development Impacts Your Business Growth",
    "Top Security Practices for Node.js Applications",
    "Integrating AI into Next.js Applications",
    "Why Mobile-First Design is Non-Negotiable",
    "SEO Strategies for Single Page Applications (SPAs)",
    "The Role of MongoDB in Modern Data Management",
    "Creating Engaging User Experiences with Micro-Animations",
    "How to Optimize React Applications for Performance",
    "The Importance of Accessibility in Web Design",
    "Why You Need a Dedicated Backend Developer",
    "Building RESTful APIs with Express.js",
    "The Evolution of JavaScript: From Vanilla to Frameworks",
    "How to Plan Your Next Web Application Project",
    "Understanding the Full Stack Development Process",
    "The Benefits of Server-Side Rendering for SEO",
    "How to Maintain and Scale Your Web Application",
    "Choosing the Right Tech Stack for Your MVP"
];

// Create a blog directory if it doesn't exist
const blogDir = path.join(__dirname, 'blog');
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir);
}

// Extract nav and footer from index.html for blog template
const navRegex = /<nav[\s\S]*?<\/nav>/;
const footerRegex = /<!-- Footer -->[\s\S]*?<\/div>[\s\S]*?<\/div>/;

const navMatch = indexHtml.match(navRegex);
const footerMatch = indexHtml.match(footerRegex);

const navHtml = navMatch ? navMatch[0].replace(/href="#/g, 'href="../index.html#').replace(/src="\.\/assets/g, 'src="../assets') : '';
const footerHtml = footerMatch ? footerMatch[0].replace(/src="\.\/assets/g, 'src="../assets') : '';

let blogIndexLinks = '';
const baseUrl = 'https://digvijayp.netlify.app';
let sitemapUrls = [
    `<url><loc>${baseUrl}/</loc><priority>1.0</priority></url>`,
    `<url><loc>${baseUrl}/blog.html</loc><priority>0.9</priority></url>`
];

// Add city pages to sitemap
cities.forEach(city => {
    sitemapUrls.push(`<url><loc>${baseUrl}/developer-in-${city.toLowerCase()}.html</loc><priority>0.8</priority></url>`);
});

blogTopics.forEach((topic, index) => {
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const title = `${topic} | Digvijay Singh Blog`;
    const metaDesc = `Read our comprehensive guide on ${topic}. Expert insights from a premium MERN stack developer.`;
    
    // Simple 3 paragraph content generator
    const content = `
    <div class="w-11/12 max-w-3xl mx-auto pt-32 pb-20 relative z-10" data-aos="fade-up">
        <a href="../blog.html" class="text-purple-600 hover:underline mb-8 inline-block">&larr; Back to Blogs</a>
        <h1 class="text-4xl md:text-5xl font-Ovo font-bold mb-6">${topic}</h1>
        <div class="text-gray-500 mb-8">Published on June ${27 - (index % 27)}, 2026 • 5 min read</div>
        
        <div class="prose prose-lg dark:prose-invert max-w-none font-Outfit">
            <p class="mb-6 text-lg">When it comes to modern web development, understanding <strong>${topic}</strong> is crucial for businesses and developers alike. In this article, we'll dive deep into why this matters and how you can leverage it for your next big project.</p>
            
            <h2 class="text-2xl font-bold mt-10 mb-4 font-Ovo">The Core Concept</h2>
            <p class="mb-6">At its heart, the tech landscape is rapidly evolving. Whether you are a startup in Saharanpur, Delhi, or a global enterprise, the right architecture dictates your scalability. This concept is fundamental to creating premium, high-performance web applications that don't just function, but truly engage users.</p>
            
            <div class="glass-card p-6 rounded-2xl my-8 border-l-4 border-purple-500">
                <p class="italic text-gray-700 dark:text-gray-300">"The best digital experiences are built on a solid foundation of performance, aesthetics, and user-centric design."</p>
            </div>
            
            <h2 class="text-2xl font-bold mt-10 mb-4 font-Ovo">Implementing Best Practices</h2>
            <p class="mb-6">To properly implement these strategies, one must look at the holistic view of the application. From the database layer with MongoDB, through the robust Express and Node backend, all the way to a highly interactive React frontend. Every piece plays a pivotal role.</p>
            
            <p class="mb-6">If you're looking to elevate your digital presence or build a complex web app from scratch, partnering with a specialized MERN stack developer is the most effective path forward. <a href="../index.html#contact" class="text-purple-600 hover:underline">Get in touch today</a> to discuss your project.</p>
        </div>
    </div>
    `;

    const blogPageHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="../output.css" />
    <link rel="stylesheet" href="../input.css" />
    <link rel="shortcut icon" href="../assets/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Ovo&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <meta name="description" content="${metaDesc}">
    <meta name="google-site-verification" content="K_PIkDwhAO0covFJS0w-rsH3mcWI9_0RT4quhAV1FhU" />
    <link rel="canonical" href="${baseUrl}/blog/${slug}.html" />
    <style>
      .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); }
      .dark .glass-card { background: rgba(42, 0, 74, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); }
    </style>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${topic}",
      "author": {
        "@type": "Person",
        "name": "Digvijay Singh"
      },
      "datePublished": "2026-06-${27 - (index % 27)}"
    }
    </script>
  </head>
  <body class="font-Outfit leading-8 dark:bg-darkTheme dark:text-white bg-slate-50 relative overflow-x-hidden transition-colors duration-300">
    <div class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen transition-opacity">
        <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/40 dark:bg-purple-600/30 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-400/40 dark:bg-orange-600/30 rounded-full blur-[100px]"></div>
    </div>
    
    ${navHtml}
    
    <main>
    ${content}
    </main>
    
    ${footerHtml}
    
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>AOS.init({ once: true, offset: 50 });</script>
    <script src="../script.js"></script>
  </body>
</html>`;

    fs.writeFileSync(path.join(blogDir, `${slug}.html`), blogPageHtml);
    console.log(`Created blog post: ${slug}.html`);
    
    blogIndexLinks += `<a href="./blog/${slug}.html" class="block glass-card p-6 rounded-2xl hover:-translate-y-2 duration-300 shadow-lg hover:shadow-xl transition-all">
        <h3 class="text-xl font-bold font-Ovo mb-2 dark:text-white">${topic}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">${metaDesc}</p>
        <span class="text-purple-600 font-medium">Read Article &rarr;</span>
    </a>\n`;
    
    sitemapUrls.push(`<url><loc>${baseUrl}/blog/${slug}.html</loc><priority>0.7</priority></url>`);
});

// Generate main blog.html listing page
const blogMainHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog - Digvijay Singh | Web Development Insights</title>
    <link rel="stylesheet" href="./output.css" />
    <link rel="stylesheet" href="./input.css" />
    <link rel="shortcut icon" href="./assets/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Ovo&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <meta name="description" content="Read the latest articles on MERN stack development, UI/UX trends, and SEO strategies.">
    <meta name="google-site-verification" content="K_PIkDwhAO0covFJS0w-rsH3mcWI9_0RT4quhAV1FhU" />
    <style>
      .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); }
      .dark .glass-card { background: rgba(42, 0, 74, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); }
      .text-gradient { background: linear-gradient(135deg, #b820e6 0%, #da7d20 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    </style>
  </head>
  <body class="font-Outfit leading-8 dark:bg-darkTheme dark:text-white bg-slate-50 relative overflow-x-hidden transition-colors duration-300">
    <div class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen transition-opacity">
        <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/40 dark:bg-purple-600/30 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-400/40 dark:bg-orange-600/30 rounded-full blur-[100px]"></div>
    </div>
    
    ${navMatch ? navMatch[0] : ''}
    
    <main>
    <div class="w-11/12 max-w-5xl mx-auto pt-32 pb-20 relative z-10" data-aos="fade-up">
        <h1 class="text-5xl md:text-6xl font-Ovo font-bold text-center mb-4">Development <span class="text-gradient">Insights</span></h1>
        <p class="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 text-lg">Discover expert articles on MERN stack development, modern UI design, and strategies to scale your digital presence.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${blogIndexLinks}
        </div>
    </div>
    </main>
    
    ${footerMatch ? footerMatch[0] : ''}
    
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>AOS.init({ once: true, offset: 50 });</script>
    <script src="./script.js"></script>
  </body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'blog.html'), blogMainHtml);
console.log("Created blog.html main page");

// Generate Sitemap
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapUrls.join('\n    ')}
</urlset>`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent);
console.log("Created sitemap.xml");

// Generate robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsContent);
console.log("Created robots.txt");

console.log("All pages generated successfully!");
