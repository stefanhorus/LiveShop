# Setup GitHub Repository pentru LiveShop

## Pași pentru a crea repository-ul pe GitHub:

### 1. Creează repository-ul pe GitHub:

1. Mergi pe [github.com](https://github.com) și loghează-te
2. Click pe butonul **"+"** din colțul dreapta sus
3. Selectează **"New repository"**
4. Completează:
   - **Repository name:** `LiveShop`
   - **Description:** `E-commerce platform built with Next.js and Saleor`
   - **Visibility:** Public sau Private (alege ce preferi)
   - **NU** bifea "Add a README file" (avem deja unul)
   - **NU** bifea "Add .gitignore" (avem deja unul)
   - **NU** bifea "Choose a license"
5. Click **"Create repository"**

### 2. Conectează repository-ul local cu GitHub:

După ce ai creat repository-ul, GitHub îți va arăta instrucțiuni. Rulează aceste comenzi în terminal:

```bash
cd /Users/stefanhorus/my-shop

# Adaugă remote-ul GitHub (înlocuiește USERNAME cu username-ul tău GitHub)
git remote add origin https://github.com/USERNAME/LiveShop.git

# Verifică că remote-ul a fost adăugat
git remote -v

# Push codul pe GitHub
git branch -M main
git push -u origin main
```

### 3. Verifică:

- Mergi pe `https://github.com/USERNAME/LiveShop`
- Ar trebui să vezi toate fișierele proiectului

## Comenzi rapide (după ce ai creat repository-ul):

```bash
# Înlocuiește USERNAME cu username-ul tău GitHub
git remote add origin https://github.com/USERNAME/LiveShop.git
git branch -M main
git push -u origin main
```

## Notă:

- **NU** include fișierul `.env.local` în repository (este deja în `.gitignore`)
- Toate fișierele necesare sunt deja commit-uite
- Repository-ul este pregătit pentru deployment pe Vercel
