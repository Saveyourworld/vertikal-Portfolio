import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, CircleCheck,
  Code2, Copy, ExternalLink, Globe2, Mail, Menu, MessageCircle, MonitorSmartphone,
  MousePointerClick, PlayCircle, Send, ShieldCheck, Sparkles, TrendingUp, X,
} from 'lucide-react';
import './index.css';

const BRAND = 'Hikima Forge';
const EMAIL = 'hikimaforge@proton.me';
const PHONE_DISPLAY = '09026755149';
const WHATSAPP = '2349026755149';
const LOGO = `${import.meta.env.BASE_URL}images/hikima-forge-logo.png`;
const OFFER_END = new Date('2027-01-01T00:00:00+01:00').getTime(); // Ends Dec 31, 2026 (Nigeria time)
// Replace with your verified published hero-video URL (MP4 or embedded iframe player).
const HERO_VIDEO_URL = ''; // e.g. 'https://res.cloudinary.com/YOUR_CLOUD/video/upload/your-video.mp4'
const HERO_VIDEO_EMBED = ''; // e.g. 'https://player.cloudinary.com/embed/?cloud_name=...&public_id=...'

const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;
const packages = [
  {
    name: 'Sales Starter', original: 95000, short: 'For one focused product or service',
    features: ['Single-product or service sales page', 'Mobile-first responsive design', 'WhatsApp enquiry button', 'Simple enquiry or order form', 'Basic search-engine setup'],
    popular: false,
  },
  {
    name: 'Sales Professional', original: 180000, short: 'For businesses ready to present and sell better',
    features: ['Everything in Sales Starter', 'Persuasive offer and sales-copy sections', 'Product video and testimonials', 'Custom order or enquiry form', 'WhatsApp + email notification integration*', 'Basic analytics integration'],
    popular: true,
  },
  {
    name: 'Business Growth', original: 300000, short: 'For multiple offers and more advanced growth systems',
    features: ['Advanced catalog or multi-product experience', 'Strategic sales copy and conversion flow', 'Lead capture and analytics', 'Initial Meta Ads campaign setup', 'Ad-ready campaign landing page', 'Customized feature scoping'],
    popular: false,
  },
];
const addOns = [
  ['Additional product presentation', '₦10k–₦20k / product'],
  ['WhatsApp order integration', '₦10k–₦20k'],
  ['Email notifications', '₦15k–₦25k'],
  ['Additional sales-copy sections', '₦15k–₦40k'],
  ['Payment gateway integration', '₦30k–₦60k'],
  ['Meta Pixel & event tracking', '₦20k–₦40k'],
  ['Additional advertising creatives', '₦10k–₦25k each'],
  ['Monthly website maintenance', '₦15k–₦40k / month'],
];
const services = [
  { icon: MonitorSmartphone, name: 'Sales Pages That Persuade', copy: 'Present your product or service in a way that makes its value immediately clear—and gives interested visitors an easy next step.' },
  { icon: Copy, name: 'Sales Copy & Offer Strategy', copy: 'Headlines, benefits, compelling explanations, and calls to action written around what your customers care about.' },
  { icon: TrendingUp, name: 'Meta Ads & Lead Funnels', copy: 'Campaign setup for Facebook and Instagram, with landing-page or WhatsApp enquiry pathways and meaningful tracking.' },
  { icon: MessageCircle, name: 'WhatsApp & Email Ordering', copy: 'Clear order and enquiry forms that route customers to the contact channel that suits your business.' },
  { icon: Globe2, name: 'Multi-Product Catalogs', copy: 'A polished digital showcase for collections, product categories, and several offers on one brand experience.' },
  { icon: Code2, name: 'Business Technology Solutions', copy: 'Custom websites, lead systems, and future automation solutions scoped to your business needs.' },
];

// Actual projects discussed with the developer. Add screenshots YOU own to public/images.
// Do not claim sales numbers or client results without evidence and permission.
const projects = [
  {
    title: 'CORE Footwear', category: 'Fashion · Product sales page',
    detail: 'Premium footwear offers, product videos, bundle presentation, testimonials and structured order capture.',
    image: 'core-footwear-screenshot.webp', url: 'https://captrends.com.ng/corefootwears/',
  },
  {
    title: 'Electric Spin Scrubber', category: 'Home essentials · Direct response',
    detail: 'Long-form product presentation, visual demonstration, offer sections, and WhatsApp-connected ordering.',
    image: 'electric-scrubber-screenshot.webp', url: 'https://captrends.com.ng/electric-scrubber/',
  },
  {
    title: 'Set Stitches', category: 'Fashion · Multi-product catalog',
    detail: 'Collection-focused fashion showcase, responsive layouts, gallery features and video-led storytelling.',
    image: 'set-stitches-screenshot.webp', url: '',
  },
  {
    title: 'Royal Smile', category: 'Healthcare · Service presentation',
    detail: 'A service-business web experience designed to introduce dental services and make enquiries easier.',
    image: 'royal-smile-screenshot.webp', url: '',
  },
  {
    title: 'Majola Tech', category: 'Technology · Project awaiting verification',
    detail: 'Add an approved project description and real site link after you verify this portfolio entry.',
    image: 'majola-tech-screenshot.webp', url: '',
  },
];
const reviewEntries: Array<{ name: string; business: string; quote: string }> = [
  // Insert ONLY genuine, permission-approved testimonials here.
  // { name: 'Verified client name', business: 'Business name', quote: 'Their actual review' },
];

type FormState = {
  name: string; business: string; phone: string; email: string; category: string;
  service: string; goals: string; promo: boolean; consent: boolean;
};
const initialForm: FormState = {
  name: '', business: '', phone: '', email: '', category: '', service: 'Sales Professional',
  goals: '', promo: false, consent: false,
};
function getOfferRemaining() {
  const ms = Math.max(0, OFFER_END - Date.now());
  return { days: Math.floor(ms / 86400000), hours: Math.floor((ms / 3600000) % 24), minutes: Math.floor((ms / 60000) % 60), active: ms > 0 };
}
function ProjectImage({ filename, title }: { filename: string; title: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="flex h-52 flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0e2441] to-[#050d1b] text-center px-5">
      <MonitorSmartphone className="text-[#d4ab55]" size={36} />
      <span className="font-semibold text-white">{title}</span>
      <span className="text-xs text-slate-400">Project screenshot to be added</span>
    </div>
  );
  return <img src={`${import.meta.env.BASE_URL}images/${filename}`} alt={`Screenshot of the ${title} project`} loading="lazy" onError={() => setFailed(true)} className="h-52 w-full object-cover object-top" />;
}

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [remaining, setRemaining] = useState(getOfferRemaining);
  const [showFloatingOffer, setShowFloatingOffer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getOfferRemaining()), 60000);
    const floatTimer = window.setTimeout(() => setShowFloatingOffer(true), 900);
    return () => { window.clearInterval(timer); window.clearTimeout(floatTimer); };
  }, []);

  function scrollTo(id: string) {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function apply(service = 'Sales Professional', promo = true) {
    setForm((old) => ({ ...old, service, promo: promo && remaining.active }));
    scrollTo('apply');
  }
  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((old) => ({ ...old, [key]: value }));
  }
  function enquiryText() {
    const pack = packages.find((item) => item.name === form.service);
    const eligible = form.promo && remaining.active && Boolean(pack);
    const original = pack?.original;
    const offer = original ? Math.round(original * 0.7) : undefined;
    return [
      `Hello ${BRAND}! I would like to discuss a project.`,
      '', `Name: ${form.name}`, `Business: ${form.business}`, `Phone: ${form.phone}`,
      `Email: ${form.email || 'Not provided'}`, `Business type: ${form.category}`,
      `Interested service: ${form.service}`,
      `December 30% page-development offer: ${eligible ? 'Requested' : 'Not selected / ineligible'}`,
      ...(eligible ? [`Illustrative development price: ${formatNaira(offer!)}${form.service === 'Business Growth' ? ' starting from' : ''} (subject to scope)`] : []),
      '', `Project details: ${form.goals}`, '', 'Please contact me with next steps and a quotation.',
    ].join('\n');
  }
  function handleWhatsApp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.consent) return;
    setSubmitting(true);
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(enquiryText())}`;
    // Navigation is intentionally synchronous to the submit gesture, reducing popup blockers.
    window.location.href = url;
    window.setTimeout(() => setSubmitting(false), 1000);
  }
  function handleEmail() {
    if (!form.name.trim() || !form.phone.trim() || !form.business.trim() || !form.category || !form.goals.trim() || !form.consent) {
      window.alert('Please complete your name, business, WhatsApp number, business type, project details and consent first.'); return;
    }
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${BRAND} project enquiry — ${form.service}`)}&body=${encodeURIComponent(enquiryText())}`;
  }
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#060e1c] text-slate-200 selection:bg-[#ddb665] selection:text-[#071226]">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_75%_5%,rgba(28,64,100,.25),transparent_55%)]" />
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06101eea] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3 text-left" aria-label="Hikima Forge, home">
            <img src={LOGO} alt="Hikima Forge logo" className="h-11 w-11 rounded-full object-cover ring-1 ring-[#d4ab55]/50" />
            <span className="font-black leading-tight tracking-wide text-white text-base sm:text-lg">HIKIMA <span className="text-[#d4ab55]">FORGE</span><small className="block text-[9px] tracking-[.22em] font-medium text-slate-400">BUSINESS & DIGITAL SOLUTIONS</small></span>
          </button>
          <div className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            {([['Services','services'],['Our Work','work'],['Pricing','pricing'],['Reviews','reviews'],['Contact','apply']] as const).map(([label,id]) => <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#edca82] transition-colors">{label}</button>)}
          </div>
          <button onClick={() => apply()} className="hidden rounded-full bg-[#d4ab55] px-5 py-2.5 text-sm font-extrabold text-[#091525] transition hover:bg-[#f0d18d] md:block">Claim 30% Off <ArrowUpRight size={15} className="inline" /></button>
          <button className="lg:hidden rounded-lg border border-white/15 p-2" aria-label="Toggle menu" aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        </div>
        {mobileMenu && <div className="border-t border-white/10 bg-[#09172a] px-6 py-5 lg:hidden">
          {([['Services','services'],['Our Work','work'],['Pricing','pricing'],['Reviews','reviews'],['Apply','apply']] as const).map(([label,id]) => <button key={id} onClick={() => scrollTo(id)} className="block w-full py-3 text-left font-semibold hover:text-[#edca82]">{label}</button>)}
        </div>}
      </nav>

      <header id="home" className="relative scroll-mt-24 overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-28">
        <div className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] max-w-full rounded-full bg-[#274a74]/20 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 grid gap-12 lg:grid-cols-[1.08fr_.92fr] items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4ab55]/40 bg-[#d4ab55]/10 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[#f1cc7f]"><Sparkles size={15}/> December Visibility Offer · 30% Off</div>
            <h1 className="max-w-3xl text-4xl leading-[1.12] font-black tracking-tight text-white sm:text-6xl lg:text-[4.4rem]">Your business deserves <span className="text-[#d4ab55]">to be seen.</span> Your offer deserves to be chosen.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">You have something worth selling. But can the people who need it find you? We build persuasive sales pages, compelling customer journeys, and ad-ready systems that help turn attention into real enquiries.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => apply()} className="group flex items-center justify-center gap-2 rounded-xl bg-[#d4ab55] px-7 py-4 text-base font-black text-[#081323] transition hover:-translate-y-0.5 hover:bg-[#f0d18d]">Apply for 30% Discount <ArrowRight size={20} className="transition group-hover:translate-x-1"/></button>
              <button onClick={() => scrollTo('work')} className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-bold text-white hover:border-[#d4ab55]/60">See Our Work <ArrowUpRight size={19}/></button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300"><span className="flex items-center gap-2"><Check className="text-[#d4ab55]" size={17}/> Products & services</span><span className="flex items-center gap-2"><Check className="text-[#d4ab55]" size={17}/> Mobile-friendly</span><span className="flex items-center gap-2"><Check className="text-[#d4ab55]" size={17}/> WhatsApp-ready</span></div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[28px] border border-[#d4ab55]/25 bg-[#0c1d32] p-3 shadow-[0_20px_90px_rgba(0,0,0,.4)]">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#122f4c,#050d1a)]">
                {HERO_VIDEO_EMBED ? <iframe className="h-full w-full" src={HERO_VIDEO_EMBED} title="Hikima Forge introduction video" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="lazy" /> : HERO_VIDEO_URL ? <video className="h-full w-full object-cover" controls playsInline preload="metadata" src={HERO_VIDEO_URL} poster={LOGO} /> : <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"><div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4ab55]/50 bg-[#d4ab55]/10"><PlayCircle size={42} className="text-[#e6bd66]" /></div><p className="text-xl font-extrabold text-white">A Smarter Way to Grow</p><p className="mt-2 max-w-xs text-sm text-slate-400">Your Hikima Forge promo video goes here.</p></div>}
              </div>
              <div className="flex items-center justify-between gap-3 p-3"><span className="text-xs font-semibold text-slate-400">SALES PAGES · ADS · CUSTOMER ENQUIRIES</span><span className="text-[#d4ab55]"><Sparkles size={18}/></span></div>
            </div>
            <div className="absolute -bottom-7 -left-2 rounded-xl border border-[#d4ab55]/30 bg-[#10243b] px-5 py-3 shadow-xl sm:-left-6"><span className="text-sm text-slate-300">December 2026 offer</span><strong className="block text-2xl text-[#f4cd7f]">30% OFF</strong></div>
          </div>
        </div>
      </header>

      <section className="border-y border-white/10 bg-[#0b1a2c] py-5"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-center text-xs font-bold uppercase tracking-wider text-slate-300"><span>Sales pages built to persuade</span><span className="text-[#d4ab55]">✦</span><span>Clearer customer journeys</span><span className="text-[#d4ab55]">✦</span><span>Business-first technology</span></div></section>

      <section id="services" className="scroll-mt-24 px-5 py-20 sm:px-6"><div className="mx-auto max-w-7xl">
        <p className="section-kicker">WHAT WE DO</p><h2 className="section-title">Don't just have an online presence. <span>Make it work for your business.</span></h2>
        <p className="section-subtitle">Your next customer may already be looking for what you offer. We help you present it clearly, earn interest, and create an easier path to enquiry or purchase.</p>
        <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(({icon:Icon,name,copy}) => <article key={name} className="group rounded-2xl border border-white/10 bg-[#0b1a2c] p-7 transition hover:border-[#d4ab55]/50 hover:bg-[#11223a]"><div className="mb-6 inline-flex rounded-xl bg-[#d4ab55]/10 p-3 text-[#e4bd6d]"><Icon size={28}/></div><h3 className="mb-3 text-xl font-extrabold text-white">{name}</h3><p className="leading-relaxed text-slate-400">{copy}</p></article>)}</div>
      </div></section>

      <section className="px-5 pb-20 sm:px-6"><div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-[#d4ab55]/30 bg-[linear-gradient(110deg,#132c47,#081426)] p-8 md:grid-cols-2 md:p-12"><div><p className="section-kicker">THE DECEMBER OPPORTUNITY</p><h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">This season, give customers a better reason to choose you.</h2><p className="mt-5 leading-relaxed text-slate-300">From a one-product page to a full collection or appointment-based service, we'll help your offer look professional, explain its value, and give visitors a clear next step.</p></div><div className="flex flex-col justify-center gap-4"><div className="grid grid-cols-3 gap-3 text-center">{[['Days',remaining.days],['Hours',remaining.hours],['Mins',remaining.minutes]].map(([label,value]) => <div key={label} className="rounded-xl border border-white/10 bg-[#05101e]/65 p-4"><strong className="block text-3xl font-black text-[#eac775]">{String(value).padStart(2,'0')}</strong><span className="text-xs text-slate-400">{label}</span></div>)}</div><button onClick={() => apply()} className="rounded-xl bg-[#d4ab55] px-6 py-4 font-black text-[#081323] hover:bg-[#f0d18d]">{remaining.active ? 'Claim My 30% Discount' : 'Request a Project Quote'} →</button><p className="text-center text-xs text-slate-400">30% discount applies to eligible sales-page development fees until 31 Dec 2026. Ad spend, add-ons and recurring ad management are excluded.</p></div></div></section>

      <section id="work" className="scroll-mt-24 bg-[#0b1829] px-5 py-20 sm:px-6"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker">SELECTED WORK</p><h2 className="section-title">Real projects. <span>Purposeful experiences.</span></h2><p className="section-subtitle">Explore examples of the sales and catalog experiences built across different business categories.</p></div><div className="flex gap-2"><button aria-label="Previous projects" onClick={() => carouselRef.current?.scrollBy({left:-340,behavior:'smooth'})} className="rounded-full border border-white/20 p-3 hover:border-[#d4ab55]"><ChevronLeft/></button><button aria-label="Next projects" onClick={() => carouselRef.current?.scrollBy({left:340,behavior:'smooth'})} className="rounded-full border border-white/20 p-3 hover:border-[#d4ab55]"><ChevronRight/></button></div></div>
        <div ref={carouselRef} className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 scroll-smooth [scrollbar-width:thin]">{projects.map((project) => <article key={project.title} className="w-[86vw] max-w-[370px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#0e2035] sm:w-[370px]"><ProjectImage filename={project.image} title={project.title}/><div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#e4bd6d]">{project.category}</p><h3 className="mt-2 text-xl font-extrabold text-white">{project.title}</h3><p className="mt-3 min-h-24 text-sm leading-6 text-slate-400">{project.detail}</p>{project.url ? <a className="inline-flex items-center gap-2 font-bold text-[#e9c77f] hover:underline" href={project.url} target="_blank" rel="noopener noreferrer">View project <ExternalLink size={16}/></a> : <span className="text-xs text-slate-500">Public link to be added</span>}</div></article>)}</div>
        <p className="mt-5 text-xs text-slate-400">Portfolio project links and permissions should be checked before publishing; add real project screenshots to the specified image folder.</p>
      </div></section>

      <section id="pricing" className="scroll-mt-24 px-5 py-20 sm:px-6"><div className="mx-auto max-w-7xl"><div className="text-center"><p className="section-kicker">SIMPLE, TRANSPARENT PRICING</p><h2 className="section-title">Choose your <span>starting point.</span></h2><p className="section-subtitle mx-auto">Every business is different. Start with a page that matches your offer, then add only the features you need.</p></div>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">{packages.map((plan) => <article key={plan.name} className={`relative flex flex-col rounded-2xl border p-7 ${plan.popular ? 'border-[#d4ab55] bg-[#11233a] shadow-[0_12px_60px_rgba(212,171,85,.12)]' : 'border-white/10 bg-[#0a192b]'}`}>{plan.popular && <span className="absolute -top-4 left-6 rounded-full bg-[#d4ab55] px-4 py-1.5 text-xs font-black text-[#071426]">POPULAR CHOICE</span>}<p className="text-sm font-bold text-[#e5c077]">{plan.name}</p><h3 className="mt-2 min-h-12 text-2xl font-extrabold text-white">{plan.short}</h3><p className="mt-5 text-sm text-slate-400 line-through">{formatNaira(plan.original)}{plan.name === 'Business Growth' && '+'}</p><p className="mt-1 text-4xl font-black text-white">{plan.name === 'Business Growth' ? 'From ' : ''}{formatNaira(Math.round(plan.original * (remaining.active ? .7 : 1)))}</p><p className="mt-1 text-xs text-[#e6bd6d]">{remaining.active ? 'December 30% sales-page development offer' : 'Standard development pricing'}</p><div className="my-7 h-px bg-white/10"/><ul className="mb-8 flex-1 space-y-4">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-300"><CircleCheck size={18} className="mt-1 shrink-0 text-[#ddb665]"/>{feature}</li>)}</ul><button onClick={() => apply(plan.name)} className={`${plan.popular ? 'bg-[#d4ab55] text-[#081323]' : 'border border-[#d4ab55] bg-[#d4ab55]/10 text-[#f3d08b]'} rounded-xl px-6 py-4 font-extrabold hover:brightness-110`}>Choose {plan.name} <ArrowRight size={18} className="inline"/></button></article>)}</div>
        <p className="mt-5 text-sm text-slate-400">*Email notifications depend on your configured delivery service. Hosting, domain registration, advertising spend, third-party subscriptions, advanced integrations, and ongoing ad management are separately quoted. Final scope and prices are confirmed before work begins.</p>
      </div></section>

      <section className="bg-[#0b192b] px-5 py-20 sm:px-6"><div className="mx-auto max-w-7xl"><p className="section-kicker">MORE WAYS WE CAN HELP</p><h2 className="section-title">Build what you need. <span>Nothing unnecessary.</span></h2><div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{addOns.map(([name,price]) => <div key={name} className="rounded-xl border border-white/10 bg-[#091728] p-5"><p className="font-semibold text-white">{name}</p><p className="mt-2 text-sm font-bold text-[#e2bc73]">{price}</p></div>)}</div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{[['Meta Ads setup','₦30k–₦60k','One-time campaign and account configuration'],['Monthly ad management','₦60k–₦120k','Campaign optimization and performance reporting'],['Sales page + initial ads setup','From ₦220k','Custom bundle quotation; clarify eligible discount scope']].map(([label,price,detail]) => <div className="rounded-xl border border-[#d4ab55]/20 bg-[#13253b] p-6" key={label}><h3 className="font-bold text-white">{label}</h3><p className="mt-2 text-2xl font-black text-[#e8c477]">{price}</p><p className="mt-2 text-sm text-slate-400">{detail}</p></div>)}</div>
      </div></section>

      <section id="reviews" className="scroll-mt-24 px-5 py-20 sm:px-6"><div className="mx-auto max-w-7xl"><p className="section-kicker">CLIENT REVIEWS</p><h2 className="section-title">Trust is earned. <span>Proof matters.</span></h2><p className="section-subtitle">We believe genuine feedback and measurable improvements should speak louder than exaggerated promises.</p>
        {reviewEntries.length ? <div className="mt-9 grid gap-5 md:grid-cols-3">{reviewEntries.map((review) => <blockquote className="rounded-2xl border border-[#d4ab55]/20 bg-[#0e1e31] p-7" key={`${review.name}-${review.business}`}><p className="leading-relaxed text-white">“{review.quote}”</p><footer className="mt-5 text-sm text-[#d4ab55]">{review.name} · {review.business}</footer></blockquote>)}</div> : <div className="mt-9 rounded-2xl border border-dashed border-[#d4ab55]/35 bg-[#0e1e31] p-8 sm:p-10"><ShieldCheck size={34} className="text-[#d4ab55]"/><h3 className="mt-4 text-xl font-extrabold text-white">Verified client feedback will appear here.</h3><p className="mt-2 max-w-2xl leading-relaxed text-slate-400">This section is intentionally ready for authentic client testimonials. Add permission-approved reviews to the reviewEntries array rather than publishing placeholder quotes as real results.</p></div>}
      </div></section>

      <section className="bg-[#0b192b] px-5 py-20 sm:px-6"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center"><div><p className="section-kicker">HOW IT WORKS</p><h2 className="section-title">A clearer path from <span>idea to launch.</span></h2><p className="section-subtitle">You know your business. We help turn its offering into a professional digital experience customers can understand and act on.</p></div><div className="space-y-4">{[['01','Tell us about your business','Choose a plan and share your goals.'],['02','We shape the offer and page','Agree on the scope, messaging, assets and flow.'],['03','Build, test, and launch','Review the mobile experience, forms and tracking.'],['04','Attract and learn','If selected, add ad campaigns and monitor results.']].map(([no,title,body]) => <div className="flex gap-4 rounded-xl border border-white/10 bg-[#0d2035] p-5" key={no}><span className="text-2xl font-black text-[#d4ab55]">{no}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm text-slate-400">{body}</p></div></div>)}</div></div></section>

      <section id="apply" className="scroll-mt-24 px-5 py-20 sm:px-6"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><p className="section-kicker">LET'S BUILD YOUR NEXT STEP</p><h2 className="section-title">Ready to give your business <span>more visibility?</span></h2><p className="section-subtitle">Tell us what you sell and what you'd like to achieve. We'll help you find a sensible starting point.</p><div className="mt-8 space-y-4"><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-white hover:text-[#e6c477]"><MessageCircle size={21} className="text-[#d4ab55]"/>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`} className="flex items-center gap-3 font-semibold text-white hover:text-[#e6c477]"><Mail size={21} className="text-[#d4ab55]"/>{EMAIL}</a></div><div className="mt-9 rounded-2xl border border-[#d4ab55]/25 bg-[#d4ab55]/10 p-6"><p className="font-extrabold text-[#f1ce89]">{remaining.active ? 'Your 30% December offer' : 'Your project quote'}</p><p className="mt-2 text-sm leading-6 text-slate-300">Select an eligible package and check “Apply 30% discount” below. The enquiry message will include your chosen plan and offer request. Our team will confirm the final scope and pricing.</p></div></div>
        <form onSubmit={handleWhatsApp} className="rounded-3xl border border-white/10 bg-[#0d1e32] p-6 shadow-2xl sm:p-9"><h3 className="mb-6 text-2xl font-black text-white">Start your project</h3><div className="grid gap-5 sm:grid-cols-2">
          <label className="form-label">Your name *<input required value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Your full name" className="form-input"/></label>
          <label className="form-label">Business name *<input required value={form.business} onChange={e=>update('business',e.target.value)} placeholder="Your business / brand" className="form-input"/></label>
          <label className="form-label">WhatsApp number *<input type="tel" required value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="080..." className="form-input"/></label>
          <label className="form-label">Email address (optional)<input type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="you@business.com" className="form-input"/></label>
          <label className="form-label">Type of business *<select required value={form.category} onChange={e=>update('category',e.target.value)} className="form-input"><option value="">Select your business type</option><option>Single-product business</option><option>Multi-product business</option><option>Professional services</option><option>Healthcare / appointments</option><option>Other business</option></select></label>
          <label className="form-label">Preferred plan / service *<select required value={form.service} onChange={e=>update('service',e.target.value)} className="form-input">{packages.map(p=><option key={p.name} value={p.name}>{p.name}</option>)}<option value="Meta Ads setup">Meta Ads setup</option><option value="Monthly ad management">Monthly ad management</option><option value="Custom business solution">Custom business solution</option></select></label>
          <label className="form-label sm:col-span-2">Tell us about your project *<textarea required rows={5} value={form.goals} onChange={e=>update('goals',e.target.value)} placeholder="What do you sell? What would you like customers to do? Any special features?" className="form-input resize-y"/></label>
          <label className="sm:col-span-2 flex cursor-pointer items-start gap-3 rounded-xl border border-[#d4ab55]/25 bg-[#d4ab55]/10 p-4 text-sm"><input type="checkbox" checked={form.promo && remaining.active} disabled={!remaining.active} onChange={e=>update('promo',e.target.checked)} className="mt-1 accent-[#d4ab55]"/><span><strong className="text-white">Apply my 30% December discount</strong><span className="block mt-1 text-slate-400">Applies to eligible sales-page development fees only, through December 31, 2026.</span></span></label>
          <label className="sm:col-span-2 flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-400"><input required type="checkbox" checked={form.consent} onChange={e=>update('consent',e.target.checked)} className="mt-1 accent-[#d4ab55]"/>I agree that Hikima Forge may use the details I submit to respond to my enquiry. I understand that WhatsApp/email will open to send my message, rather than storing it on this site.</label>
        </div><button disabled={submitting} type="submit" className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4ab55] px-5 py-4 font-black text-[#081323] hover:bg-[#f2d28c] disabled:opacity-60"><Send size={19}/> Send Enquiry on WhatsApp</button><button type="button" onClick={handleEmail} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 font-bold text-white hover:border-[#d4ab55]"><Mail size={18}/> Send Using Email Instead</button><p className="mt-4 text-center text-xs text-slate-500">The form opens your selected messaging app. No automatic email is sent unless you configure an email-delivery integration.</p></form>
      </div></section>

      <footer className="border-t border-white/10 bg-[#050b15] px-5 py-12 sm:px-6"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><div className="flex items-center gap-3"><img src={LOGO} alt="" className="h-14 w-14 rounded-full"/><div><p className="text-xl font-black text-white">HIKIMA <span className="text-[#d4ab55]">FORGE</span></p><p className="text-xs text-slate-400">Built on Wisdom. Driven by Growth.</p></div></div><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Purposeful technology and digital growth solutions to help businesses present better, reach potential customers, and build for the future.</p></div><div><h3 className="font-bold text-white">Explore</h3><div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-400">{([['Our services','services'],['Selected work','work'],['Pricing & packages','pricing'],['Client reviews','reviews'],['Start a project','apply']] as const).map(([name,id])=><button onClick={()=>scrollTo(id)} key={id} className="hover:text-[#d4ab55]">{name}</button>)}</div></div><div><h3 className="font-bold text-white">Get in touch</h3><p className="mt-4 text-sm text-slate-400">{EMAIL}<br/>{PHONE_DISPLAY}</p><div className="mt-5 flex gap-4 text-sm text-[#d4ab55]"><button onClick={()=>setModal('privacy')}>Privacy</button><button onClick={()=>setModal('terms')}>Terms</button></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">© {new Date().getFullYear()} Hikima Forge. All rights reserved. Development work and advertised offers are subject to agreed scope.</div></footer>

      {showFloatingOffer && remaining.active && <button onClick={() => apply()} className="fixed bottom-5 right-4 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-[#f4d58d]/50 bg-[#d4ab55] px-5 py-3.5 text-xs font-black text-[#071426] shadow-[0_8px_36px_rgba(0,0,0,.55)] transition hover:-translate-y-1 hover:bg-[#f1cf86] sm:bottom-7 sm:right-7 sm:text-sm"><MousePointerClick size={18}/> Apply for 30% Off <ArrowUpRight size={16}/></button>}

      {modal && <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4" onClick={()=>setModal(null)}><div role="dialog" aria-modal="true" aria-label={modal === 'privacy' ? 'Privacy policy' : 'Service terms'} onClick={e=>e.stopPropagation()} className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#d4ab55]/30 bg-[#102139] p-8 shadow-2xl"><button onClick={()=>setModal(null)} aria-label="Close dialog" className="absolute right-4 top-4 text-slate-300 hover:text-white"><X/></button><h2 className="mb-5 text-2xl font-black text-white">{modal === 'privacy' ? 'Privacy Information' : 'Service Terms'}</h2>{modal === 'privacy' ? <div className="space-y-4 text-sm leading-7 text-slate-300"><p>Hikima Forge collects the information you enter in our enquiry form, including name, business details, contact information and project requirements, to discuss your requested services.</p><p>Form submission opens WhatsApp or your email application. Your information is shared with the selected messaging provider when you choose to send it. This website does not currently maintain a separate enquiry database.</p><p>We use information received to respond to enquiries, prepare proposals, and arrange requested services. Please do not include sensitive personal or payment details in the enquiry.</p><p>Contact {EMAIL} for privacy questions or to request correction or deletion of information you have sent us, subject to applicable legal obligations.</p></div> : <div className="space-y-4 text-sm leading-7 text-slate-300"><p>Quotes depend on agreed scope, content availability, integrations, delivery requirements and revisions. Work begins after project acceptance and the agreed deposit.</p><p>Our standard payment structure is 60% upfront and 40% before final handover, unless otherwise agreed in writing.</p><p>Domain registration, hosting, paid advertising budgets, third-party subscriptions and recurring management are quoted separately. Ad performance and sales volumes cannot be guaranteed.</p><p>The December 30% promotion applies to eligible sales-page development fees only through December 31, 2026. Final eligibility and scope are confirmed in your written quotation.</p></div>}<button onClick={()=>setModal(null)} className="mt-7 rounded-xl bg-[#d4ab55] px-5 py-3 font-bold text-[#06101e]">Close</button></div></div>}
    </div>
  );
}
