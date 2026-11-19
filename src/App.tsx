import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, ExternalLink, Globe2, Mail, Menu, MessageCircle, MousePointer2, Play, ShieldCheck, Sparkles, TrendingUp, X, Zap, Layers3, Megaphone, PenLine, MonitorSmartphone, Code2, Send, Star, CheckCircle2 } from 'lucide-react';
import './index.css';

const BASE = import.meta.env.BASE_URL;
const ASSET = (name: string) => `${BASE}${name}`;
const WHATSAPP = '2349026755149';
const EMAIL = 'hikimaforge@proton.me';
const OFFER_DEADLINE = new Date('2027-01-01T00:00:00+01:00').getTime();
// Hero video: keep the existing filename in public/. Playback begins with sound after a visitor taps play.
const VIDEO = ASSET('hikima.mp4');
const PACKAGE_DATA = [
  {name:'Sales Starter',price:95000, tagline:'A powerful introduction to your offer',features:['One product or service sales page','Mobile responsive design','Persuasive offer presentation','WhatsApp enquiry button','Simple order or enquiry form','Basic SEO structure']},
  {name:'Sales Professional',price:180000,tagline:'For businesses ready to convert more interest',features:['Everything in Sales Starter','Expanded persuasive sales copy','Gallery, testimonials and videos','Custom enquiry / order experience','Email + WhatsApp integrations','Basic analytics setup']},
  {name:'Business Growth',price:300000,tagline:'A broader system for customer acquisition',features:['Multi-product or advanced sales page','Offer strategy and copy structure','Lead capture and analytics','Initial Meta Ads campaign setup','Advertising-ready conversion funnel','Custom scope for your business']},
];
const services = [
  {icon:MonitorSmartphone,title:'Single-Product Sales Pages',desc:'One focused experience that shows why your product matters and makes ordering effortless.'},
  {icon:Layers3,title:'Multi-Product Showcases',desc:'Present your collections, options and bundles without overwhelming potential buyers.'},
  {icon:PenLine,title:'Persuasive Sales Copy',desc:'Clear headlines, benefits and calls to action that speak to what your customers care about.'},
  {icon:Megaphone,title:'Meta Ads & Lead Funnels',desc:'Facebook and Instagram campaign setup with pathways to your page or WhatsApp.'},
  {icon:MessageCircle,title:'WhatsApp & Email Leads',desc:'Connect interested people with your business using practical enquiry and ordering flows.'},
  {icon:Code2,title:'Business Technology Solutions',desc:'Custom websites, digital systems and automation solutions for growing businesses.'},
];
type Project = {title:string;type:string;detail:string;image:string;url?:string};

const projects: Project[] = [
  {
    title: 'RoyalSmile',
    type: 'Dental & Healthcare',
    detail: 'A professional online presence for showcasing dental services and connecting prospective patients to a clinic.',
    image: 'project-realsmile.webp',
    url: 'https://royalsmile.com.ng/'
  },
  {
    title: 'Options',
    type: 'Business Website',
    detail: 'Business-facing web presentation built around clear messaging, responsive design and easy enquiry.',
    image: 'project-options.webp',
    url: 'https://captrends.com.ng/'
  },
  {
    title: 'GeminiSolar Tech',
    type: 'Solar & Energy',
    detail: 'Product and service visibility for an energy business, with a customer-friendly path to making enquiries.',
    image: 'project-gymny-solar.webp',
    url: 'https://colar3600.netlify.app/'
  },
  {
    title: 'Electric Spin Scrubber',
    type: 'Single-Product Sales Page',
    detail: 'Long-form product benefits, demonstration content, offers and an integrated order journey.',
    image: 'project-electric-scrubber.webp',
    url: 'https://captrends.com.ng/electric-scrubber/'
  },
  {
    title: 'CORE Footwear',
    type: 'Fashion Sales Page',
    detail: 'Premium footwear offers, sales storytelling, package comparisons, media and order capture.',
    image: 'project-core-footwear.webp',
    url: 'https://captrends.com.ng/corefootwears/'
  },
  {
    title: 'Coffee Press',
    type: 'Product Sales Page',
    detail: 'Focused product presentation that helps interested customers understand the offer and take action.',
    image: 'project-coffee-press.webp',
    url: 'https://captrends.com.ng/coffee-press/'
  },
  {
    title: 'Colar 3600 Solar Generator',
    type: 'Solar Generator Sales Page',
    detail: 'A product showcase for a solar power solution, presenting key product benefits and a clear path to enquiry.',
    image: 'project-colar-360.webp',
    url: 'https://geminisolartech.com.ng/'
  },
  {
    title: 'Seth Stitches',
    type: 'Fashion Collection & Catalog',
    detail: 'A fashion-focused collection experience showcasing men’s outfits and helping interested customers explore designs.',
    image: 'seth.webp',
    url: 'https://sethstitches.netlify.app/'
  }
];


// These reviews were supplied in your original Vertikal code. Publish only if the
// names, roles, statements and figures have been authenticated and approved.
const reviews = [
  {name:'David Okon',role:'Founder, Peak Retail',text:"Vertikal Tech didn't just build a website; they built a revenue engine. Our client acquisition went up 150% in the first two months."},
  {name:'Sarah J.',role:'Operations Director',text:'The custom dashboard they developed saved our team 20 hours a week. Their attention to detail and innovative thinking is unmatched.'},
  {name:'Michael T.',role:'Startup CEO',text:'Working with them felt like partnering with true visionaries. They translated our complex ideas into a sleek, high-performing platform.'},
];
const addons = [
  ['Extra product presentation','₦10,000–₦20,000 / product'],['WhatsApp order integration','₦10,000–₦20,000'],['Email notifications','₦15,000–₦25,000'],['Additional sales copy','₦15,000–₦40,000'],['Payment integration','₦30,000–₦60,000'],['Meta Pixel + event tracking','₦20,000–₦40,000'],['Campaign creative','₦10,000–₦25,000 each'],['Monthly maintenance','₦15,000–₦40,000']
];
const money = (value:number) => `₦${value.toLocaleString('en-NG')}`;
function timeLeft(){
  const current = new Date();
  const now=current.getTime();
  const active=now<OFFER_DEADLINE;
  const lagosTime=new Date(now+60*60*1000);
  const intoDay=((lagosTime.getUTCHours()*60+lagosTime.getUTCMinutes())*60+lagosTime.getUTCSeconds())*1000+lagosTime.getUTCMilliseconds();
  const ms=Math.max(0,86400000-intoDay);
  return {active,h:Math.floor(ms/3600000),m:Math.floor(ms/60000)%60,s:Math.floor(ms/1000)%60};
}
function useReveal(){
  useEffect(()=>{
    const nodes=[...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (!('IntersectionObserver' in window)){nodes.forEach(x=>x.classList.add('in-view'));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -28px 0px'});
    nodes.forEach(node=>observer.observe(node));return()=>observer.disconnect();
  },[]);
}
function PortfolioImage({file,title}:{file:string;title:string}){
  const [error,setError]=useState(false);
  return <div className="portfolio-image">
    {!error ? <img src={ASSET(file)} alt={`${title} website screenshot`} loading="lazy" onError={()=>setError(true)}/> :
      <div className="portfolio-fallback" aria-label={`${title} screenshot pending upload`}><Globe2 size={36}/><strong>{title}</strong><small>Website preview</small></div>}
  </div>;
}
export default function App(){
  const [mobileMenu,setMobileMenu]=useState(false);
  const [clock,setClock]=useState(timeLeft);
  const [pop,setPop]=useState(false);
  const [dismissed,setDismissed]=useState(false);
  const [selected,setSelected]=useState('Sales Professional');
  const [discount,setDiscount]=useState(true);
  const [form,setForm]=useState({name:'',business:'',phone:'',email:'',type:'',brief:'',consent:false});
  const [modal,setModal]=useState<'privacy'|'terms'|null>(null);
  const [videoFailed,setVideoFailed]=useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
     const [videoStarted,setVideoStarted] = useState(false);
   const [videoPortrait,setVideoPortrait] = useState(false);
  const [videoError,setVideoError] = useState('');
  const [guideEmail,setGuideEmail]=useState('');
  const [guideConsent,setGuideConsent]=useState(false);
  const [guideBusy,setGuideBusy]=useState(false);
  const [guideError,setGuideError]=useState('');
  const [guideComplete,setGuideComplete]=useState(false);
  const portfolioRef=useRef<HTMLDivElement>(null);
  const promoOpened=useRef(false);
  useReveal();
  useEffect(()=>{
    const id=window.setInterval(()=>setClock(timeLeft()),1000);
    const popup=window.setTimeout(()=>{
      if(!promoOpened.current && !sessionStorage.getItem('hf-promo-dismissed') && Date.now()<OFFER_DEADLINE){setPop(true);promoOpened.current=true;}
    },9000);
    return()=>{window.clearInterval(id);window.clearTimeout(popup);};
  },[]);
  useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape'){setPop(false);setModal(null);}};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[]);
  const go=(id:string)=>{setMobileMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});};
  const apply=(plan='Sales Professional')=>{setSelected(plan);setDiscount(clock.active);setPop(false);go('apply');};
  const dismiss=()=>{setPop(false);setDismissed(true);sessionStorage.setItem('hf-promo-dismissed','true');};
   const playHeroWithSound=async()=>{
     const video=heroVideoRef.current;
     if(!video) return;
     setVideoError('');
     video.pause();
     video.currentTime=0;
     video.muted=false;
     video.volume=1;
     try{await video.play();setVideoStarted(true);}catch{setVideoError('Please use the video controls to start playback with sound.');}
   };

  const message=()=>[
    'Hello Hikima Forge! I would like a business growth consultation.',
    `Name: ${form.name}`,`Business: ${form.business}`,`WhatsApp: ${form.phone}`,`Email: ${form.email||'Not provided'}`,`Business category: ${form.type}`,`Selected package: ${selected}`,
    `December 30% sales-page discount: ${discount&&clock.active?'Requested':'Not requested'}`,
    `Project requirements: ${form.brief}`,'Please let me know the next steps and final quotation.'
  ].join('\n');
  const requestGuide=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!guideConsent || !guideEmail.trim()) return;
    setGuideBusy(true);setGuideError('');
    const endpoint=import.meta.env.VITE_SUPABASE_URL;
    const publicKey=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
    if(!endpoint || !publicKey){setGuideError('The free guide is not available yet. Please check back shortly.');setGuideBusy(false);return;}
    try{
      const result=await fetch(`${endpoint.replace(/\/$/,'')}/functions/v1/guide-download`,{
        method:'POST',headers:{'Content-Type':'application/json','apikey':publicKey},
        body:JSON.stringify({email:guideEmail.trim(),consent:guideConsent,source:'hikima-forge-website'})
      });
      const body=await result.json();
      if(!result.ok || !body.downloadUrl) throw new Error(body.error || 'The guide is temporarily unavailable.');
      setGuideComplete(true);
      const link=document.createElement('a');link.href=body.downloadUrl;link.target='_blank';link.rel='noopener noreferrer';
      document.body.appendChild(link);link.click();link.remove();
    }catch(err){setGuideError(err instanceof Error?err.message:'Unable to prepare your guide right now.');}
    finally{setGuideBusy(false);}
  };
  const contact=(e?:React.FormEvent)=>{e?.preventDefault();if(!form.consent)return;window.location.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message())}`;};
  const email=()=>{if(!form.name||!form.business||!form.phone||!form.brief||!form.consent){alert('Please complete the required fields and consent before choosing email.');return;}window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Hikima Forge project enquiry')}&body=${encodeURIComponent(message())}`;};
  return <div className="site">
    <div className="site-backdrop" aria-hidden="true"/>
    <nav className="topnav"><div className="container navwrap">
      <button className="brand" onClick={()=>go('home')} aria-label="Hikima Forge Home"><img src={ASSET('hikima-forge-logo.png')} alt=""/><span>HIKIMA <b>FORGE</b><small>BUSINESS GROWTH & DIGITAL SOLUTIONS</small></span></button>
      <div className="navlinks">{[['About','about'],['Services','services'],['Our Work','work'],['Pricing','pricing'],['Reviews','reviews'],['Contact','apply']].map(([label,id])=><button key={id} onClick={()=>go(id)}>{label}</button>)}</div>
      <button className="btn btn-gold desktop-cta" onClick={()=>apply()}>Claim 30% Off <ArrowUpRight size={17}/></button>
      <button className="menu-toggle" onClick={()=>setMobileMenu(x=>!x)} aria-label="Toggle navigation">{mobileMenu?<X/>:<Menu/>}</button>
    </div>{mobileMenu&&<div className="mobile-nav">{[['About','about'],['Services','services'],['Our Work','work'],['Pricing','pricing'],['Reviews','reviews'],['Contact','apply']].map(([label,id])=><button key={id} onClick={()=>go(id)}>{label}</button>)}<button onClick={()=>apply()}>Claim 30% Off</button></div>}</nav>

    <main>
      <header className="hero" id="home"><div className="container hero-grid">
         <div className="hero-media" data-reveal="left">
           <div className={`hero-film${videoPortrait ? ' is-portrait' : ''}`}>
             {!videoFailed ? (
               <>
                 <video
                   ref={heroVideoRef}
                   src={VIDEO}
                   playsInline
                   loop
                   controls={videoStarted}
                   preload="auto"
                   onLoadedData={event => {
                     const player = event.currentTarget;
                     // A real frame from the video is the preview: no branded poster image.
                     if (!videoStarted && player.currentTime === 0 && Number.isFinite(player.duration) && player.duration > 0.3) {
                       player.currentTime = Math.min(0.15, player.duration / 3);
                     }
                   }}
                   onLoadedMetadata={event => {
                     const player = event.currentTarget;
                     setVideoPortrait(player.videoHeight > player.videoWidth);
                   }}
                   onError={() => setVideoFailed(true)}
                   onPlay={() => setVideoStarted(true)}
                   aria-label="Watch the Hikima Forge introduction with sound"
                 />
                 {!videoStarted && (
                   <button className="film-start" type="button" onClick={playHeroWithSound} aria-label="Watch the Hikima Forge introduction with sound">
                     <span className="film-play-icon"><Play size={24} fill="currentColor" aria-hidden="true" /></span>
                     <span className="film-start-label">Watch with sound</span>
                   </button>
                 )}
                 {videoError && <p className="hero-video-error" role="alert">{videoError}</p>}
               </>
             ) : (
               <div className="film-unavailable" role="status">The introduction video is temporarily unavailable.</div>
             )}
           </div>
         </div>
        
<div className="hero-copy">
  <div className="eyebrow">
    <Sparkles size={15} />
    DECEMBER VISIBILITY CAMPAIGN
    <span>30% OFF</span>
  </div>

  <h1>
    Stop being <em>the best-kept secret.</em> Let your business be seen.
  </h1>

  <p className="results-promise">
    <span className="results-accent" aria-hidden="true" />
    <span>
      Progress you can measure in weeks, not months.
    </span>
  </p>

  <p>
    Your customers are online. The question is: can they find you—and
    will they choose you? We build persuasive sales pages and digital
    growth systems that turn interest into enquiries, conversations,
    and opportunities to sell.
  </p>

  <div className="hero-actions">
    <button className="btn btn-gold" onClick={() => apply()}>
      Apply for 30% Off <ArrowRight size={19} />
    </button>

    <button className="btn btn-outline" onClick={() => go('work')}>
      Explore Our Projects <ArrowUpRight size={18} />
    </button>
  </div>

  <div className="hero-guide-link">
    <button type="button" onClick={() => go('guide')}>
      Get our free Nigerian business-growth guide
      <ArrowUpRight size={16} />
    </button>
  </div>

  <div className="hero-proof">
    <span>
      <CheckCircle2 size={17} /> Made for real businesses
    </span>
    <span>
      <CheckCircle2 size={17} /> WhatsApp-ready enquiries
    </span>
  </div>
</div>

      </div><div className="hero-glow"/></header>

      <div className="marquee" aria-label="Hikima Forge capabilities"><div className="marquee-track">{Array.from({length:2}).flatMap((_,i)=>['SALES PAGES','BUSINESS VISIBILITY','META ADS','CONVERSION COPY','CUSTOMER ENQUIRIES','DIGITAL SOLUTIONS'].map((t,j)=><span key={`${i}-${j}`}><span className="marquee-star">✦</span>{t}</span>))}</div></div>

      <section className="section about-section" id="about"><div className="container about-grid">
        <div className="about-visual" data-reveal><div className="about-photo" role="img" aria-label="Professionals working together on a business growth strategy"/><div className="about-photo-badge"><Sparkles size={19}/> BUILT ON WISDOM <span>DRIVEN BY GROWTH</span></div></div>
        <div className="about-content" data-reveal><span className="kicker">ABOUT HIKIMA FORGE</span><h2>Great businesses deserve <em>more than being overlooked.</em></h2>
          <p>We started Hikima Forge with a simple conviction: too many worthwhile businesses remain unseen, not because their products or services lack value, but because the right people haven't discovered them yet.</p>
          <p>We exist to help change that. By combining purposeful strategy, persuasive storytelling, beautiful sales experiences and practical technology, we help businesses show up with confidence—and connect with people who are looking for what they offer.</p>
          <div className="about-pillars"><div><span>01</span><strong>Visibility</strong><small>Be discovered by the right audience.</small></div><div><span>02</span><strong>Clarity</strong><small>Communicate your value convincingly.</small></div><div><span>03</span><strong>Connection</strong><small>Make every enquiry easier to act on.</small></div></div>
          <button className="btn btn-dark" onClick={()=>go('apply')}>Let's talk about your business <ArrowRight size={18}/></button>
        </div>
      </div></section>
      <section className="section problem" id="why"><div className="container problem-grid"><div data-reveal><span className="kicker">WHY HIKIMA FORGE?</span><h2>Being good at what you do is not enough <em>if nobody sees it.</em></h2></div><div className="problem-text" data-reveal><p>Your product deserves more than another forgotten social media post. Your service deserves more than an empty inbox.</p><p>We help you explain your offer clearly, present it beautifully, and guide interested people straight to a conversation or order.</p><button className="text-link" onClick={()=>apply()}>Let's make your business visible <ArrowUpRight size={19}/></button></div></div></section>

      <section className="section promise-section" id="roadmap"><div className="container">
        <div className="section-head" data-reveal="up"><div><span className="kicker">THE FIRST 30 DAYS</span><h2>Not just a website. <em>A clear plan to move forward.</em></h2></div><p>Every engagement has a measurable path. What changes first is your visibility, presentation, tracking and enquiry process—not a guaranteed sales figure.</p></div>
        <div className="roadmap-grid">
          {[
            {week:'WEEK 01',title:'Diagnose & position',copy:'Understand your offer, ideal buyers and the reasons prospects hesitate. Define the page structure, message and enquiry goal.',result:'Clear offer, audience and campaign direction.'},
            {week:'WEEK 02',title:'Build the experience',copy:'Create persuasive sales copy, a responsive sales page and clear WhatsApp, email or order pathways.',result:'A professional, mobile-first place to send customers.'},
            {week:'WEEK 03',title:'Launch & connect',copy:'Publish the page, check key journeys, configure measurement and prepare or activate agreed Meta campaigns.',result:'A live, trackable customer acquisition pathway.'},
            {week:'WEEK 04',title:'Review & refine',copy:'Assess visitor behaviour, enquiry quality, campaign signals and friction points. Prioritise improvements.',result:'An initial performance review and action plan.'}
          ].map((step,i)=><article className="roadmap-card" key={step.week} data-reveal={i%2?'right':'left'} style={{transitionDelay:`${i*85}ms`}}><div className="roadmap-index">0{i+1}<span>{step.week}</span></div><h3>{step.title}</h3><p>{step.copy}</p><div className="roadmap-outcome"><CheckCircle2 size={18}/><span>{step.result}</span></div></article>)}
        </div>
        <div className="milestone-strip" data-reveal="up"><div><span>MONTH 01</span><strong>Launch with clarity</strong><p>Offer, page, enquiry flow and baseline tracking.</p></div><div><span>MONTH 02</span><strong>Learn from real signals</strong><p>Compare visitor actions, enquiries and creative performance.</p></div><div><span>MONTH 03</span><strong>Refine what works</strong><p>Improve messaging, follow-up and campaign efficiency.</p></div></div>
        <p className="roadmap-note">Milestones depend on the project scope, client approvals, ad budget and data available. Revenue, customer numbers and advertising outcomes cannot be guaranteed.</p>
      </div></section>

      <section className="section values-section" id="values"><div className="container">
        <div className="section-head" data-reveal="left"><div><span className="kicker">THE PRINCIPLES BEHIND OUR WORK</span><h2>What <em>HIKIMA</em> means to us.</h2></div><p>Wisdom is more than our name. It is how we approach every business challenge, every design decision and every customer journey.</p></div>
        <div className="values-grid">{[
          ['H','Honesty','Clear expectations, transparent recommendations and no invented promises.'],
          ['I','Innovation','Thoughtful ideas that solve real commercial challenges.'],
          ['K','Knowledge','Research, customer understanding and informed execution.'],
          ['I','Integrity','Respect for your brand, customer data and investment.'],
          ['M','Mastery','Careful craftsmanship in copy, development and design.'],
          ['A','Accountability','Clear deliverables, reporting and continuous improvement.']
        ].map(([letter,title,detail],i)=><article key={`${letter}-${i}`} className="value-card" data-reveal={i%3===0?'left':i%3===2?'right':'up'} style={{transitionDelay:`${i%3*75}ms`}}><span className="value-letter">{letter}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
      </div></section>

      <section className="section guide-section" id="guide"><div className="container guide-layout">
        <div className="guide-copy" data-reveal="left"><span className="kicker">FREE BUSINESS GROWTH RESOURCE</span><h2>Why do promising Nigerian businesses <em>struggle to get noticed?</em></h2><p>Get our upcoming practical guide on common visibility gaps, unclear offers, weak customer journeys and missed enquiry opportunities—and the questions to ask before investing in promotion.</p><div className="guide-points"><span><CheckCircle2 size={17}/> Spot common visibility problems</span><span><CheckCircle2 size={17}/> Evaluate your sales journey</span><span><CheckCircle2 size={17}/> Identify practical next steps</span></div><p className="guide-disclaimer">This resource is being prepared. We will enable downloads when the actual PDF is published; it is not presented as completed original research.</p></div>
        <div className="guide-panel" data-reveal="right"><div className="guide-cover"><span>HIKIMA FORGE / INSIGHTS</span><strong>THE VISIBILITY GAP</strong><p>A practical look at what keeps promising businesses from reaching the right customers.</p><small>COMPLIMENTARY GUIDE · PDF</small></div>
          <form onSubmit={requestGuide} className="guide-form"><label htmlFor="guide-email">Your business email</label><input id="guide-email" type="email" autoComplete="email" required placeholder="you@business.com" value={guideEmail} onChange={e=>setGuideEmail(e.target.value)}/><label className="guide-consent"><input type="checkbox" checked={guideConsent} onChange={e=>setGuideConsent(e.target.checked)} required/><span>I agree to receive this guide and understand my email will be used to deliver it. Optional marketing updates require separate consent.</span></label><button className="btn btn-gold" type="submit" disabled={guideBusy||!guideConsent}>{guideBusy?'Preparing your guide…':guideComplete?'Download again':'Get the free PDF'} <ArrowRight size={17}/></button>{guideError&&<p className="guide-error" role="alert">{guideError}</p>}{guideComplete&&<p className="guide-success" role="status">Your guide link has opened. Check your browser's download window.</p>}<small>No spam. Contact: {EMAIL}</small></form>
        </div>
      </div></section>
      <section className="section" id="services"><div className="container"><div className="section-head" data-reveal><div><span className="kicker">WHAT WE BUILD</span><h2>Solutions built around <em>your business goals.</em></h2></div><p>One product or a complete catalogue. A booking enquiry or a customer order. We make the journey clearer.</p></div><div className="service-grid">{services.map(({icon:Icon,title,desc},i)=><article className="service-card" data-reveal key={title} style={{transitionDelay:`${i%3*80}ms`}}><div className="service-icon"><Icon size={27}/></div><div className="service-number">0{i+1}</div><h3>{title}</h3><p>{desc}</p><button onClick={()=>apply(title)} aria-label={`Enquire about ${title}`}>Discuss this service <ArrowUpRight size={17}/></button></article>)}</div></div></section>

      <section className="section showcase" id="work"><div className="container"><div className="section-head" data-reveal><div><span className="kicker">SELECTED PROJECTS</span><h2>Work that speaks <em>for itself.</em></h2></div><div className="carousel-buttons"><button aria-label="Scroll projects left" onClick={()=>portfolioRef.current?.scrollBy({left:-360,behavior:'smooth'})}><ChevronLeft/></button><button aria-label="Scroll projects right" onClick={()=>portfolioRef.current?.scrollBy({left:360,behavior:'smooth'})}><ChevronRight/></button></div></div><div className="project-rail" ref={portfolioRef}>{projects.map(p=><article className="project-card" key={p.title}>{p.url?<a href={p.url} target="_blank" rel="noopener noreferrer"><PortfolioImage file={p.image} title={p.title}/><span className="project-open"><ExternalLink size={18}/></span></a>:<PortfolioImage file={p.image} title={p.title}/>}<div className="project-body"><span className="project-type">{p.type}</span><h3>{p.title}</h3><p>{p.detail}</p>{p.url&&<a href={p.url} target="_blank" rel="noopener noreferrer">Explore website <ArrowUpRight size={18}/></a>}</div></article>)}</div></div></section>

      <section className="offer-band" id="offer"><div className="container offer-band-grid" data-reveal><div><div className="eyebrow"><Zap size={15}/> DECEMBER VISIBILITY OFFER</div><h2>Give your business the attention it deserves.</h2><p>Get 30% off eligible sales-page development this December. Choose the service that fits your growth plan.</p></div><div className="offer-count"><strong>30<span>%</span></strong><small>OFF SALES-PAGE DEVELOPMENT</small><div className="timer"><span>{String(clock.h).padStart(2,'0')}<small>HOURS</small></span><b>:</b><span>{String(clock.m).padStart(2,'0')}<small>MINS</small></span><b>:</b><span>{String(clock.s).padStart(2,'0')}<small>SECS</small></span></div><p>December Visibility Offer</p><button className="btn btn-gold" onClick={()=>apply()}>Apply for your discount <ArrowRight size={18}/></button></div></div></section>

      <section className="section" id="pricing"><div className="container"><div className="section-head" data-reveal><div><span className="kicker">CLEAR PACKAGES</span><h2>Find a plan built for <em>your next step.</em></h2></div><p>Transparent development pricing, with flexible add-ons and scope-based quotations.</p></div><div className="pricing-grid">{PACKAGE_DATA.map((p,i)=><article className={`price-card ${i===1?'featured':''}`} data-reveal key={p.name} style={{transitionDelay:`${i*90}ms`}}>{i===1&&<div className="popular">MOST REQUESTED</div>}<p className="price-name">{p.name}</p><p className="price-tagline">{p.tagline}</p><div className="price-line"><span className="original-label">STANDARD PRICE</span><del>{money(p.price)}{i===2?'+':''}</del>{i!==2 && clock.active ? <><span className="offer-label">YOUR DECEMBER PRICE · 30% OFF</span><strong>{money(Math.round(p.price*.7))}</strong><span className="savings">You save {money(Math.round(p.price*.3))}</span></> : <><span className="offer-label">{i===2?'CUSTOM OFFER AVAILABLE':'PACKAGE PRICE'}</span><strong>{i===2?'Request a quote':money(p.price)}</strong></>}</div><p className="price-disclaimer">{i===2?'The 30% offer applies to the eligible sales-page development portion only; ads setup and other services are quoted separately.':'Offer valid on eligible sales-page development through December 31, 2026.'}</p><ul>{p.features.map(f=><li key={f}><Check size={17}/>{f}</li>)}</ul><button className={`btn ${i===1?'btn-gold':'btn-outline'}`} onClick={()=>apply(p.name)}>Choose this plan <ArrowRight size={18}/></button></article>)}</div><div className="addons" data-reveal><div><span className="kicker">CUSTOMISE YOUR EXPERIENCE</span><h3>Only pay for what your business needs.</h3><p>Add specific features as your project requires.</p></div><div className="addons-list">{addons.map(([name,cost])=><div key={name}><span>{name}</span><b>{cost}</b></div>)}</div></div><p className="fine-print">Website hosting, domains, third-party subscriptions and advertising spend are separate. Promotions apply to eligible development work only. Final quotes depend on project scope.</p></div></section>

      <section className="section reviews" id="reviews"><div className="container"><div className="section-head" data-reveal><div><span className="kicker">CLIENT FEEDBACK</span><h2>Relationships built on <em>trust and delivery.</em></h2></div><p>Feedback shared from previous projects and client work.</p></div><div className="review-grid">{reviews.map((r,i)=><article key={r.name} className="review-card" data-reveal style={{transitionDelay:`${i*90}ms`}}><div className="review-stars" aria-label="Client review">{Array.from({length:5}).map((_,k)=><Star key={k} size={16} fill="currentColor"/>)}</div><blockquote>“{r.text}”</blockquote><div className="review-person"><span className="review-avatar">{r.name.charAt(0)}</span><div><b>{r.name}</b><small>{r.role}</small></div></div></article>)}</div></div></section>

      <section className="section process"><div className="container"><div className="section-head" data-reveal><div><span className="kicker">OUR PROCESS</span><h2>From first conversation <em>to live experience.</em></h2></div></div><div className="steps">{[['01','Tell us your goals','We learn about your offer, audience and the action you want customers to take.'],['02','We shape the experience','We develop the message, page structure and selected conversion features.'],['03','Launch & connect','Your page goes live, with order or enquiry flows and optional Meta campaign setup.']].map(([n,t,d])=><div key={n} data-reveal><strong>{n}</strong><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

      <section className="section contact" id="apply"><div className="container contact-grid"><div data-reveal><span className="kicker">START YOUR GROWTH JOURNEY</span><h2>Let's build something your customers <em>won't overlook.</em></h2><p>Tell us what you sell or the service you provide. We'll help you choose the right page, the right customer journey, and the right next step.</p><div className="contact-list"><span><MessageCircle/> WhatsApp: 09026755149</span><span><Mail/> hikimaforge@proton.me</span><span><ShieldCheck/> Your enquiry is handled with care.</span></div></div><form className="contact-form" onSubmit={contact} data-reveal><div className="form-top"><div><span className="kicker">FREE PROJECT ENQUIRY</span><h3>Tell us about your business</h3></div><Sparkles size={25}/></div><div className="form-grid"><label>Your name *<input required value={form.name} onChange={e=>setForm(v=>({...v,name:e.target.value}))} placeholder="Full name"/></label><label>Business name *<input required value={form.business} onChange={e=>setForm(v=>({...v,business:e.target.value}))} placeholder="Your brand or company"/></label><label>WhatsApp number *<input required type="tel" value={form.phone} onChange={e=>setForm(v=>({...v,phone:e.target.value}))} placeholder="080..."/></label><label>Email address<input type="email" value={form.email} onChange={e=>setForm(v=>({...v,email:e.target.value}))} placeholder="you@business.com"/></label></div><label>What kind of business do you run? *<select required value={form.type} onChange={e=>setForm(v=>({...v,type:e.target.value}))}><option value="">Select category</option><option>Product business</option><option>Fashion & beauty</option><option>Healthcare & professional service</option><option>Technology & solar</option><option>Other services</option></select></label><label>Which service or package do you need? *<select required value={selected} onChange={e=>setSelected(e.target.value)}>{[...PACKAGE_DATA.map(p=>p.name),...services.map(s=>s.title),'Meta Ads Campaign Setup','Custom Business Solution'].map(x=><option key={x}>{x}</option>)}</select></label><label>What would you like to achieve? *<textarea required rows={4} value={form.brief} onChange={e=>setForm(v=>({...v,brief:e.target.value}))} placeholder="Tell us about your product, services, your customers and what you want to achieve..."/></label><label className="checkline"><input type="checkbox" checked={discount&&clock.active} onChange={e=>setDiscount(e.target.checked)} disabled={!clock.active}/> Apply the December 30% development discount</label><label className="checkline"><input type="checkbox" required checked={form.consent} onChange={e=>setForm(v=>({...v,consent:e.target.checked}))}/> I consent to being contacted about this enquiry.</label><button className="btn btn-gold submit" type="submit">Submit via WhatsApp <Send size={18}/></button><button type="button" className="email-submit" onClick={email}><Mail size={17}/> Or send your enquiry by email</button><p className="fine-print">Submitting via WhatsApp opens a prepared message for you to send. No order or payment is placed automatically.</p></form></div></section>
    </main>
    <footer className="footer"><div className="container footer-grid"><div><button className="brand" onClick={()=>go('home')}><img src={ASSET('hikima-forge-logo.png')} alt=""/><span>HIKIMA <b>FORGE</b><small>BUILT ON WISDOM. DRIVEN BY GROWTH.</small></span></button><p>Business growth and technology solutions shaped by clarity, creativity and purpose.</p></div><div><h4>Explore</h4><button onClick={()=>go('services')}>Services</button><button onClick={()=>go('work')}>Portfolio</button><button onClick={()=>go('pricing')}>Pricing</button></div><div><h4>Get in touch</h4><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">09026755149</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><div className="footer-policies"><button onClick={()=>setModal('privacy')}>Privacy</button><button onClick={()=>setModal('terms')}>Terms</button></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Hikima Forge. All rights reserved.</span><span>Built on Wisdom. Driven by Growth.</span></div></footer>

    {clock.active&&!dismissed&&<button className="floating-offer" onClick={()=>setPop(true)}><Sparkles size={19}/><span><strong>30% OFF</strong><small>Tap to apply</small></span><ArrowUpRight size={18}/></button>}
    {pop&&clock.active&&<div className="overlay" onClick={dismiss}><div className="popup" role="dialog" aria-modal="true" aria-label="Hikima Forge December 30% offer" onClick={e=>e.stopPropagation()}><button className="popup-close" onClick={dismiss} aria-label="Dismiss promotion"><X/></button><div className="popup-shine"><Sparkles size={24}/></div><div className="popup-orbit popup-orbit-one" aria-hidden="true"/><div className="popup-orbit popup-orbit-two" aria-hidden="true"/><span className="kicker">A SMARTER MOVE FOR YOUR BUSINESS</span><h2>Your business deserves to be <em>seen.</em></h2><div className="popup-discount">30<span>% OFF</span></div><p>Turn your offer into a persuasive sales experience—built to earn attention, communicate value and open real customer conversations.</p><div className="popup-benefits"><span><Check size={15}/> Conversion-focused pages</span><span><Check size={15}/> WhatsApp-ready enquiries</span></div><div className="popup-timer"><Clock3 size={16}/> Offer countdown · {String(clock.h).padStart(2,'0')}:{String(clock.m).padStart(2,'0')}:{String(clock.s).padStart(2,'0')}</div><button className="btn btn-gold" onClick={()=>apply()}>Click to apply <ArrowRight size={19}/></button><button className="popup-later" onClick={dismiss}>Maybe later</button></div></div>}
    {modal&&<div className="overlay" onClick={()=>setModal(null)}><div className="policy-dialog" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><button className="popup-close" onClick={()=>setModal(null)} aria-label="Close"><X/></button><h2>{modal==='privacy'?'Privacy Policy':'Service Terms'}</h2>{modal==='privacy'?<><p>Hikima Forge collects information you voluntarily provide through enquiries, such as your name, business, phone number and project requirements, to respond to you and discuss requested services.</p><p>WhatsApp and email communications are also processed by their respective providers. Please do not submit passwords or sensitive personal records through this form.</p><p>For enquiries about your information, contact {EMAIL}.</p></>:<><p>Service scope, deliverables, revisions, timelines, hosting, advertising spend and third-party subscriptions are agreed in a written quotation before work begins.</p><p>Advertised discounts apply to eligible development services during the stated campaign period. Results from advertising and web pages are not guaranteed.</p></>}</div></div>}
  </div>;
}
