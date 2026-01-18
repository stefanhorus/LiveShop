# Configurare Vercel pentru LiveShop

## ⚠️ IMPORTANT: Variabile de Mediu

**Cea mai comună problemă este că variabila de mediu nu este setată corect pe Vercel!**

## Pași pentru a configura corect:

### 1. Obține URL-ul tău Saleor GraphQL

Din Saleor Dashboard, găsește URL-ul GraphQL:
- Format: `https://store-XXXXX.eu.saleor.cloud/graphql/`
- Sau: `https://your-store.saleor.cloud/graphql/`

### 2. Configurează pe Vercel

1. **Mergi în Vercel Dashboard:**
   - Selectează proiectul LiveShop
   - Click pe **Settings**
   - Click pe **Environment Variables**

2. **Adaugă variabila:**
   - **Key:** `NEXT_PUBLIC_SALEOR_API_URL`
   - **Value:** `https://store-pxeqjdj9.eu.saleor.cloud/graphql/` (înlocuiește cu URL-ul tău!)
   - **Environment:** Selectează **Production**, **Preview**, și **Development**

3. **Redeploy:**
   - După adăugarea variabilei, fă un **Redeploy**
   - Vercel va reconstrui aplicația cu noua variabilă

### 3. Verifică Build Logs

După redeploy, verifică build logs:
- Dacă vezi `⚠️ NEXT_PUBLIC_SALEOR_API_URL nu este setată!` → variabila nu este setată corect
- Dacă vezi erori GraphQL → verifică că URL-ul este corect și accesibil

### 4. Testează

După redeploy:
- Accesează aplicația live
- Verifică că produsele se încarcă
- Deschide Console (F12) și verifică dacă există erori

## Troubleshooting

### Produsele nu apar

1. **Verifică variabila de mediu:**
   - În Vercel Dashboard > Settings > Environment Variables
   - Asigură-te că `NEXT_PUBLIC_SALEOR_API_URL` este setată
   - Asigură-te că URL-ul se termină cu `/graphql/`

2. **Verifică URL-ul Saleor:**
   - Deschide URL-ul în browser: `https://your-store.saleor.cloud/graphql/`
   - Ar trebui să vezi un GraphQL Playground sau o pagină JSON

3. **Verifică CORS:**
   - În Saleor Dashboard > Settings > Channels
   - Asigură-te că domeniul Vercel este permis

4. **Redeploy:**
   - După orice schimbare de variabile, fă un redeploy
   - Vercel nu aplică automat variabilele noi la build-uri existente

### Build-ul eșuează

- Verifică că `npm run fix-apollo` rulează în build
- Verifică build logs pentru erori specifice
- Asigură-te că toate dependențele sunt în `package.json`
