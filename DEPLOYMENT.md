# Ghid Deployment LiveShop

## Pregătire pentru Deployment

### 1. Verifică configurația

Asigură-te că ai:
- ✅ Un cont Saleor activ
- ✅ URL-ul GraphQL al instanței Saleor
- ✅ Produse și categorii create în Saleor

### 2. Variabile de Mediu

Creează fișierul `.env.production` (pentru local testing) sau configurează-le în platforma de hosting:

```bash
NEXT_PUBLIC_SALEOR_API_URL=https://store-pxeqjdj9.eu.saleor.cloud/graphql/
```

**IMPORTANT**: Înlocuiește cu URL-ul tău real Saleor!

## Deployment pe Vercel (Recomandat)

### Pas cu Pas:

1. **Pregătește repository-ul:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy pe Vercel:**
   - Mergi pe [vercel.com](https://vercel.com)
   - Sign up / Login
   - Click "Add New Project"
   - Importă repository-ul tău
   - Vercel va detecta automat Next.js

3. **Configurează Environment Variables:**
   - În proiect settings > Environment Variables
   - Adaugă:
     - Key: `NEXT_PUBLIC_SALEOR_API_URL`
     - Value: `https://store-pxeqjdj9.eu.saleor.cloud/graphql/`
   - Selectează toate environment-urile (Production, Preview, Development)

4. **Deploy:**
   - Click "Deploy"
   - Așteaptă build-ul (va dura ~2-3 minute)
   - Aplicația va fi live!

5. **Verifică:**
   - Accesează URL-ul generat de Vercel
   - Verifică că produsele se încarcă
   - Testează funcționalitățile

## Configurare CORS în Saleor

Dacă întâmpini erori CORS după deployment:

1. Mergi în Saleor Dashboard
2. Settings > Channels
3. Configurează CORS pentru domeniul tău Vercel

## Troubleshooting

### Eroare: "Cannot find module"
- Asigură-te că `npm install` rulează înainte de build
- Verifică că toate dependențele sunt în `package.json`

### Eroare: "GraphQL types not found"
- Build-ul include automat `npm run generate`
- Verifică că `vercel.json` este configurat corect

### Produsele nu se încarcă
- Verifică că `NEXT_PUBLIC_SALEOR_API_URL` este setată corect
- Verifică că URL-ul Saleor este accesibil public
- Verifică CORS settings în Saleor

## Post-Deployment

După deployment:
1. Testează toate funcționalitățile
2. Verifică că produsele se afișează corect
3. Testează coșul de cumpărături
4. Verifică că checkout-ul funcționează

## Custom Domain (Opțional)

Pentru a folosi un domeniu propriu:
1. În Vercel Dashboard > Settings > Domains
2. Adaugă domeniul tău
3. Urmează instrucțiunile pentru DNS configuration
