import { createClient } from 'npm:@supabase/supabase-js@2';

const trustedOrigins = (Deno.env.get('ALLOWED_ORIGINS') || '').split(',').map(x=>x.trim()).filter(Boolean);
function response(req:Request, status:number, body:Record<string,unknown>){
  const origin=req.headers.get('origin') || '';
  const allowed=trustedOrigins.includes(origin) ? origin : '';
  return new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',
    ...(allowed?{'Access-Control-Allow-Origin':allowed,'Vary':'Origin'}:{})}});
}
Deno.serve(async(req)=>{
  const origin=req.headers.get('origin') || '';
  const allowed=trustedOrigins.includes(origin);
  if(req.method==='OPTIONS') return new Response(null,{status:allowed?204:403,headers:allowed?{
    'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'content-type, apikey',
    'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Max-Age':'600','Vary':'Origin'}:{}});
  if(!allowed) return response(req,403,{error:'Origin not allowed'});
  if(req.method!=='POST') return response(req,405,{error:'Method not allowed'});
  const type=req.headers.get('content-type')||'';
  if(!type.includes('application/json')) return response(req,415,{error:'JSON required'});
  try{
    const content=await req.text();
    if(content.length>1500) return response(req,413,{error:'Request too large'});
    const {email,consent,source}=JSON.parse(content);
    const normalized=String(email||'').trim().toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)||normalized.length>254||consent!==true)
      return response(req,400,{error:'Provide a valid email and consent.'});
    const url=Deno.env.get('SUPABASE_URL');
    const secret=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); // legacy server-only secret, never exposed in Vite
    if(!url||!secret) return response(req,503,{error:'Download service unavailable.'});
    const supabase=createClient(url,secret,{auth:{persistSession:false}});
    // Verify the actual private PDF exists before recording a subscriber.
    const bucket='free-guides', path='hikima-forge-business-visibility-guide.pdf';
    const {data:files,error:listError}=await supabase.storage.from(bucket).list('',{search:path,limit:10});
    if(listError||!files?.some(f=>f.name===path)) return response(req,503,{error:'The guide is being prepared. Please check back soon.'});
    const {error:insertError}=await supabase.from('guide_subscribers').insert({email:normalized,source:source==='hikima-forge-website'?source:'website',consent_to_delivery:true});
    if(insertError) return response(req,503,{error:'Please try again shortly.'});
    const {data,error}=await supabase.storage.from(bucket).createSignedUrl(path,90,{download:'hikima-forge-business-visibility-guide.pdf'});
    if(error||!data?.signedUrl) return response(req,503,{error:'Unable to prepare download.'});
    return response(req,200,{downloadUrl:data.signedUrl});
  }catch{ return response(req,400,{error:'Invalid request.'}); }
});
