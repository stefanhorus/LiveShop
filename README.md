This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-shop`](https://github.com/saleor/create-next-shop).

## Configurare Saleor

Pentru a conecta magazinul la contul tău Saleor:

### Găsește URL-ul GraphQL în Dashboard:

**Opțiunea 1 - Din URL-ul browserului:**
- Vezi în bara de adresă URL-ul tău Saleor (ex: `store-pxeqjdj9.eu.saleor.cloud`)
- Adaugă `/graphql/` la sfârșit: `https://store-pxeqjdj9.eu.saleor.cloud/graphql/`

**Opțiunea 2 - Din Playground:**
- În sidebar-ul din stânga, click pe **"Playground"**
- URL-ul GraphQL este afișat în Playground

**Opțiunea 3 - Din Configuration:**
- În sidebar, click pe **"Configuration"**
- Caută secțiunea despre API sau GraphQL endpoint

### Configurare:

1. Creează un fișier `.env.local` în rădăcina proiectului:
```bash
NEXT_PUBLIC_SALEOR_API_URL=https://store-pxeqjdj9.eu.saleor.cloud/graphql/
```

2. **IMPORTANT**: Înlocuiește `store-pxeqjdj9.eu.saleor.cloud` cu URL-ul tău real din dashboard!

3. După ce ai actualizat URL-ul, regenerează tipurile GraphQL:
```bash
npm run generate
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Saleor, take a look at the following resources:

- [Saleor Documentation](https://docs.saleor.io/docs/)

## Deployment / Hosting

### Opțiunea 1: Vercel (Recomandat - Cel mai simplu)

1. **Creează un cont pe Vercel:**
   - Mergi pe [vercel.com](https://vercel.com)
   - Sign up cu GitHub/GitLab/Bitbucket

2. **Conectează repository-ul:**
   - Click pe "New Project"
   - Importă repository-ul tău GitHub

3. **Configurează variabilele de mediu:**
   - În setările proiectului, adaugă:
     - `NEXT_PUBLIC_SALEOR_API_URL` = `https://store-pxeqjdj9.eu.saleor.cloud/graphql/`
   - **IMPORTANT**: Înlocuiește cu URL-ul tău real Saleor!

4. **Deploy:**
   - Vercel va detecta automat că e un proiect Next.js
   - Click "Deploy"
   - Așteaptă build-ul să se finalizeze

5. **Accesează aplicația:**
   - Vercel va genera un URL (ex: `liveshop.vercel.app`)
   - Aplicația va fi live!

### Opțiunea 2: Netlify

1. **Creează un cont pe Netlify:**
   - Mergi pe [netlify.com](https://netlify.com)
   - Sign up cu GitHub

2. **Deploy:**
   - Click "New site from Git"
   - Selectează repository-ul
   - Build settings:
     - Build command: `npm run generate && npm run build`
     - Publish directory: `.next`

3. **Variabile de mediu:**
   - În Site settings > Environment variables
   - Adaugă `NEXT_PUBLIC_SALEOR_API_URL`

### Opțiunea 3: Self-hosted (VPS/Server)

1. **Pregătește serverul:**
   ```bash
   # Instalează Node.js 18+
   # Instalează npm
   ```

2. **Clonează și build:**
   ```bash
   git clone <your-repo-url>
   cd liveshop
   npm install
   npm run build
   ```

3. **Configurează variabile de mediu:**
   ```bash
   export NEXT_PUBLIC_SALEOR_API_URL=https://store-pxeqjdj9.eu.saleor.cloud/graphql/
   ```

4. **Rulează aplicația:**
   ```bash
   npm start
   # Sau folosește PM2 pentru production:
   npm install -g pm2
   pm2 start npm --name "liveshop" -- start
   ```

### Notă Importantă

După deployment, asigură-te că:
- ✅ Variabila `NEXT_PUBLIC_SALEOR_API_URL` este setată corect
- ✅ CORS este configurat în Saleor pentru domeniul tău
- ✅ Tipurile GraphQL sunt generate (se face automat în build)
