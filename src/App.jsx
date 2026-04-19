import React, { useRef, useEffect, useState } from 'react';
import { 
  MonitorSmartphone, 
  Code2, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  MessageCircle,
  Phone,
  Mail,
  Star,
  Menu,
  X,
  Quote
} from 'lucide-react';

// Portfolio data with specific, highly-relevant images

const portfolioProjects = [

{ name: "Dental Services Booking Site", type: "Web Design", image: "https://blanchedentalclinic.com/wp-content/uploads/2023/12/Blanche-Dental-Lekki-Lab-1.jpg" },

{ name: "Herbal Medicine Sales Page", type: "Web Design", image: "https://lh3.googleusercontent.com/p/AF1QipN7qOw1XOpZsTkGLclUPj6wIKmr_pSSOIsu48Hy=w243-h304-n-k-no-nu" },

{ name: "E-Commerce Platform", type: "Web Design", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=600&q=80" },

{ name: "SaaS Analytics Dashboard", type: "Software Dev", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" },

{ name: "Local Business SEO", type: "Marketing", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },

{ name: "Fintech App UI", type: "Design", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80" },

{ name: "Real Estate Portal", type: "Web Design", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },

{ name: "Healthcare CRM System", type: "Software Dev", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" },

{ name: "Social Media Campaign", type: "Marketing", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80" },

{ name: "Restaurant Booking App", type: "Web Design", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" },

{ name: "Logistics Tracker", type: "Software Dev", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" },

{ name: "Brand Identity Revamp", type: "Design", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" },

{ name: "Fitness App Backend", type: "Software Dev", image: "https://framerusercontent.com/images/sjs10PNOCfciW4fvDEYO4lb1i4.jpg" },

{ name: "B2B Lead Generation", type: "Marketing", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" },

{ name: "Crypto Exchange UI", type: "Design", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80" },

{ name: "Travel Agency Website", type: "Web Design", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80" },

{ name: "EdTech Learning Platform", type: "Software Dev", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80" },

{ name: "Google Ads Optimization", type: "Marketing", image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=600&q=80" },

{ name: "Fashion Boutique Store", type: "Web Design", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600&q=80" },

{ name: "Inventory Management App", type: "Software Dev", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80" },

{ name: "Podcast Cover Art", type: "Design", image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=600&q=80" },

{ name: "Legal Firm Website", type: "Web Design", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80" },

{ name: "IoT Device Dashboard", type: "Software Dev", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80" },

{ name: "Email Marketing Flow", type: "Marketing", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80" },

{ name: "Digital Wallet UX", type: "Design", image: "https://s3-alpha.figma.com/hub/file/5872916072/b8c7a9fb-5be2-4d6d-b374-a0629058ce5a-cover.png" },

{ name: "Auto Dealership Site", type: "Web Design", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80" },

{ name: "HR Management System", type: "Software Dev", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" },

{ name: "Content Strategy", type: "Marketing", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80" },

{ name: "Non-Profit Donation Portal", type: "Web Design", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80" },

{ name: "AI Chatbot Integration", type: "Software Dev", image: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=600&q=80" },

{ name: "Mobile Game UI", type: "Design", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },

{ name: "Architecture Portfolio", type: "Web Design", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },

{ name: "Event Ticketing System", type: "Software Dev", image: "https://blog.eventhub.net/wp-content/uploads/2024/07/Ticketing-System-Image.png" },

{ name: "Comprehensive SEO Audit", type: "Marketing", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" }

];

const testimonials = [
  { name: "David Okon", role: "Founder, Peak Retail", text: "Vertikal Tech didn't just build a website; they built a revenue engine. Our client acquisition went up 150% in the first two months." },
  { name: "Sarah J.", role: "Operations Director", text: "The custom dashboard they developed saved our team 20 hours a week. Their attention to detail and innovative thinking is unmatched." },
  { name: "Michael T.", role: "Startup CEO", text: "Working with them felt like partnering with true visionaries. They translated our complex ideas into a sleek, high-performing platform." }
];

const App = () => {
  const carouselRef = useRef(null);
  const canvasRef = useRef(null);
  
  // States
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'tos' | null
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', goals: '' });

  // Handle Form Submission to WhatsApp
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.goals) return alert("Please fill in your name and goals.");
    
    const phoneNumber = "2347060472153";
    const text = `Hello Vertikal Tech Solutions!%0A%0A*My Name:* ${formData.name}%0A*My Email:* ${formData.email}%0A*My Project Goals:* ${formData.goals}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', goals: '' }); // Clear form
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Code Rain Effect (Now using real code snippets!)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Array of hardcore tech/code snippets instead of single letters
    const snippets = [
      '<Vertikal/>', '() => {}', 'const api = await fetch()', 
      '<div>', 'npm run build', '01011001', 'if(success)', 
      'return <UI />', '{ scale: 1.5 }', 'module.exports',
      'System.init()', '0x1A4', 'git push origin main'
    ];
    
    const fontSize = 16;
    const columns = Math.floor(canvas.width / (fontSize * 5)); // space columns wider for snippets
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height; 
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#2dd4bf'; // Teal glow
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = snippets[Math.floor(Math.random() * snippets.length)];
        
        ctx.fillText(text, i * fontSize * 8, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i] += 1.5; // fall speed
      }
    };

    const interval = setInterval(draw, 40); 
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Navigation Logic
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 350; 
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isHovering) return; 
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 3000); 
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* MODALS FOR PRIVACY AND TOS */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-teal-400 transition-colors">
              <X size={28} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-teal-400" />
              {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h2>
            <div className="text-slate-400 space-y-4 max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
              <p>Welcome to Vertikal Tech Solutions. We value your privacy and are committed to protecting your personal data.</p>
              <p>1. <strong>Information Collection:</strong> We collect information you provide directly to us when you fill out forms, request quotes, or communicate with us.</p>
              <p>2. <strong>Use of Information:</strong> The data we collect is used strictly to provide, maintain, and improve our digital services, software development, and customer support.</p>
              <p>3. <strong>Data Security:</strong> We implement top-tier tech security measures to maintain the safety of your personal information. We do not sell or trade your data to third parties.</p>
              <p><em>We protect your personal data, your business, and ensure absolute confidentiality of every information, data or concept for your business.</em></p>
            </div>
            <button onClick={() => setActiveModal(null)} className="mt-8 w-full bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-700 transition-colors">
              Understood & Close
            </button>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 top-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <TrendingUp className="text-teal-400" size={28} />
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">Vertikal Tech Solutions</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('home')} className="hover:text-teal-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-teal-400 transition-colors">Services</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-teal-400 transition-colors">Portfolio</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-teal-400 transition-colors">Contact</button>
          </div>
          
          <div className="hidden md:block">
            <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all">
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300 hover:text-teal-400 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl flex flex-col p-6 gap-6 animate-in slide-in-from-top-4 duration-300">
            <button onClick={() => scrollToSection('home')} className="text-left text-lg font-medium text-white hover:text-teal-400">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-left text-lg font-medium text-white hover:text-teal-400">Services</button>
            <button onClick={() => scrollToSection('work')} className="text-left text-lg font-medium text-white hover:text-teal-400">Portfolio</button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-lg font-medium text-white hover:text-teal-400">Contact</button>
            <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-5 py-3 rounded-xl font-bold w-full text-center">
              Get a Quote
            </button>
          </div>
        )}
      </nav>

      {/* TECH/CODE RAIN HERO SECTION */}
      <header id="home" className="relative overflow-hidden min-h-[100svh] flex items-center justify-center pt-20 px-6 bg-slate-950">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-50 mix-blend-screen"></canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950 z-0"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/60 to-slate-950 z-0"></div>

        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-teal-500/20 rounded-full blur-[130px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[130px] pointer-events-none z-0"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full mt-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-600 backdrop-blur-md mb-8 transition-all duration-[1200ms] ease-out transform ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-20 opacity-0 scale-50'}`}>
            <Code2 className="text-teal-400" size={16} />
            <span className="text-sm font-semibold text-slate-200 tracking-wide uppercase">Award-Winning Tech Agency</span>
          </div>

          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-[1.1] transition-all duration-[1500ms] delay-200 ease-out transform drop-shadow-2xl ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-75'}`}>
            Digital Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              that Scale Your Business
            </span>
          </h1>
          
          <p className={`text-lg md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light transition-all duration-[1200ms] delay-500 ease-out transform drop-shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            Website Building | Software Development | Business Growth | SEO Optimization
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-[1000ms] delay-700 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'}`}>
            <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-blue-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-110 hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] transition-all duration-300">
              Start Scaling Today
            </button>
            <button onClick={() => scrollToSection('work')} className="w-full sm:w-auto bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-slate-800 hover:border-teal-500 transition-all duration-300 flex items-center justify-center gap-2">
              View Our Work <ChevronRight size={24} className="text-teal-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-slate-400">Everything your business needs to dominate the digital space.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Responsive Web Design", icon: <MonitorSmartphone size={32} />, desc: "Modern, fast, and mobile-ready websites built to convert visitors into clients." },
              { title: "Custom Software", icon: <Code2 size={32} />, desc: "Tailored software development to streamline your internal operations and scale." },
              { title: "SEO & Digital Marketing", icon: <TrendingUp size={32} />, desc: "Data-driven strategies to get you ranked on Google and seen by your target audience." },
              { title: "Brand Creation", icon: <Sparkles size={32} />, desc: "Complete brand identity design that makes you stand out in a crowded market." }
            ].map((service, index) => (
              <div key={index} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 transition-all group cursor-default">
                <div className="text-teal-400 mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-STAR REVIEW & SOCIAL PROOF BANNER */}
      <div className="py-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-teal-500/10 blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" size={40} />
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
            Trusted by <span className="text-teal-400">100+</span> Businesses
          </h2>
          <div className="inline-flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-8 py-4 rounded-full border border-slate-700 shadow-2xl hover:scale-105 transition-transform duration-300 cursor-default">
            <span className="text-xl md:text-2xl font-medium text-slate-300">
              Rated <span className="text-white font-bold">4.9 / 5</span> Average from <span className="text-teal-400 font-bold">150+ Reviews</span>
            </span>
          </div>
        </div>
      </div>

      {/* CLIENT SUCCESS STORIES (TESTIMONIALS) */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Client Success Stories</h2>
            <p className="text-slate-400">Don't just take our word for it. Hear from the businesses we've scaled.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-teal-500/30 transition-colors relative">
                <Quote className="text-slate-800 absolute top-6 right-6" size={48} />
                <div className="flex items-center gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />)}
                </div>
                <p className="text-slate-300 mb-8 italic relative z-10 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <span className="text-sm text-teal-400">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Carousel */}
      <section id="work" className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Work</h2>
              <p className="text-slate-400">Swipe to see over 30 of our recent projects.</p>
            </div>
            <div className="hidden md:flex gap-4">
              <button onClick={() => scroll('left')} className="p-3 rounded-full bg-slate-800 text-white hover:bg-teal-500 transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll('right')} className="p-3 rounded-full bg-slate-800 text-white hover:bg-teal-500 transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div ref={carouselRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {portfolioProjects.map((project, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[350px] snap-center bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden group flex-shrink-0 cursor-pointer hover:border-teal-500/50 transition-colors">
                <div className="h-48 bg-slate-800 relative overflow-hidden flex items-center justify-center">
                  <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500"/>
                  <span className="relative z-10 text-white font-bold text-xl drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">View Project <ChevronRight size={20} className="text-teal-400" /></span>
                </div>
                <div className="p-6 relative z-10 bg-slate-900 border-t border-slate-800">
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">{project.type}</span>
                  <h3 className="text-xl font-bold text-white mt-2 truncate">{project.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Introduction Section */}
<section className="py-20 px-6 bg-slate-900 border-t border-slate-800/50">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-white mb-10">Meet the Vertikal Tech Solutions Team</h2>
    <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-700 shadow-2xl group">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        controls 
        className="w-full h-full object-cover" 
        poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
      >
        {/* Replace 'vertikal-video.mp4' with the actual filename you saved in your /public folder */}
        <source src="/vertikal.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</section>

      {/* Discount & Contact Section */}
      <section id="contact" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500/20 to-blue-600/20 border border-teal-500/30 rounded-2xl p-8 text-center mb-16">
            <h3 className="text-2xl font-bold text-white mb-2">Exclusive Discounts for New Clients</h3>
            <p className="text-slate-300">Reach out today and get special pricing on your first website or branding package.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's build something amazing.</h2>
              <p className="text-slate-400 mb-8">Ready to get more clients and scale your business? Send us a message directly or connect with our team on WhatsApp for immediate support.</p>
              
              <a href="https://wa.me/2347060472153?text=Hello%20Vertikal%20Tech!%20I%20am%20ready%20to%20scale%20my%20business." target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#20bd5a] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all mb-8">
                <MessageCircle size={24} />
                Chat with us on WhatsApp
              </a>

              <div className="space-y-4 border-t border-slate-800 pt-8">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <Phone className="text-teal-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Call Us Directly</p>
                    <p className="text-lg font-semibold text-white">+234 70 6047 2153</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Whatsapp Integrated Form */}
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
              <textarea 
                placeholder="Tell us about your business goals..." 
                rows="4"
                required
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
              ></textarea>
              <button type="submit" className="w-full bg-teal-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-teal-400 transition-colors shadow-lg">
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <TrendingUp className="text-teal-400" size={28} />
              <span className="text-2xl font-bold text-white tracking-tight">Vertikal Tech Solutions</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Empowering businesses to scale with cutting-edge web design, custom software, and data-driven marketing.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left">
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-teal-400 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-teal-400 transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('work')} className="hover:text-teal-400 transition-colors">Our Work</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support & Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-teal-400 transition-colors">Contact Us</button></li>
                <li><button onClick={() => setActiveModal('privacy')} className="hover:text-teal-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setActiveModal('tos')} className="hover:text-teal-400 transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-slate-600 text-sm border-t border-slate-800/50 pt-8">
          <p>© {new Date().getFullYear()} Vertikal Tech Solutions. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;