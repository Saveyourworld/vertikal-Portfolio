HIKIMA FORGE GUIDE DOWNLOAD — RESTORE MISSING FUNCTION

This package repairs the missing local file reported by the Supabase CLI:
  supabase/functions/guide-download/index.ts

COPY THE FOLDER into the ROOT of your existing vertex-portfolio project.
It should be next to package.json, src and public, NOT inside public.

Linux Mint / VS Code terminal (once you have downloaded the ZIP to Downloads):
  cd ~/vertex-portfolio
  unzip -o ~/Downloads/Hikima_Forge_Guide_Function_Fix.zip -d .
  ls -l supabase/functions/guide-download/index.ts

Then deploy:
  npx supabase functions deploy guide-download --no-verify-jwt --use-api

Before real requests work:
- Private Supabase Storage bucket: free-guides
- PDF at bucket root: hikima-forge-business-visibility-guide.pdf
- SQL table: public.guide_subscribers, using prior migration
- Set ALLOWED_ORIGINS secret for your exact website origin (and localhost if needed)
- .env.local in Vite project root needs VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
- Netlify needs those same public variables configured and the site rebuilt.

This function uses current injected SUPABASE_SECRET_KEYS (default) with legacy
SUPABASE_SERVICE_ROLE_KEY fallback, only server-side. Never expose secret keys
in React or in VITE_ environment variables.
