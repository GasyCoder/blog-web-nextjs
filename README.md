# Blog Headless - Frontend Next.js 14

Interface moderne et responsive pour le blog headless, construite avec Next.js 14, TypeScript et Tailwind CSS.

## 🚀 Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios pour les appels API
- React Hook Form pour les formulaires
- Zustand pour le state management
- Next Themes pour le mode sombre

## 📋 Prérequis

- Node.js >= 18.0
- npm ou yarn ou pnpm
- Backend API Laravel en cours d'exécution

## ⚙️ Installation

```bash
# Cloner le projet
git clone <repository-url> blog-frontend
cd blog-frontend

# Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer l'URL de l'API dans .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Lancer le serveur de développement
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Routes d'authentification
│   │   ├── login/
│   │   └── register/
│   ├── (main)/            # Routes principales
│   │   ├── page.tsx       # Page d'accueil
│   │   ├── posts/         # Pages des articles
│   │   ├── categories/    # Pages des catégories
│   │   └── tags/          # Pages des tags
│   ├── admin/             # Interface d'administration
│   │   ├── posts/
│   │   └── comments/
│   ├── layout.tsx         # Layout racine
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   ├── layout/           # Composants de layout
│   ├── posts/            # Composants liés aux articles
│   └── admin/            # Composants admin
├── lib/                  # Utilitaires et configuration
│   ├── api.ts           # Client API
│   ├── auth.ts          # Gestion authentification
│   └── types.ts         # Types TypeScript
└── store/               # Stores Zustand
    └── authStore.ts     # Store d'authentification
```

## 🎯 Fonctionnalités

### Public
- ✅ Liste des articles avec pagination
- ✅ Détail d'article avec commentaires
- ✅ Filtrage par catégorie et tag
- ✅ Recherche d'articles
- ✅ Système de commentaires (authentifié)
- ✅ Design responsive

### Authentification
- ✅ Inscription
- ✅ Connexion
- ✅ Déconnexion
- ✅ Protection des routes

### Administration (Writer & Superadmin)
- ✅ Dashboard
- ✅ Gestion des articles (CRUD)
- ✅ Upload d'images
- ✅ Modération des commentaires
- ✅ Gestion des tags et catégories

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🌐 Déploiement sur Vercel

### Méthode 1 : Via GitHub (recommandé)

1. Pushez votre code sur GitHub
2. Connectez-vous sur [Vercel](https://vercel.com)
3. Importez votre repository
4. Configurez les variables d'environnement :
   - `NEXT_PUBLIC_API_URL` : URL de votre API backend
5. Déployez !

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Configuration Vercel

Créez un fichier `vercel.json` :

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.votredomaine.com/api/v1"
  }
}
```

## 🔒 Variables d'environnement

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Optional: Analytics, etc.
# NEXT_PUBLIC_GA_ID=
```

## 🎨 Personnalisation

### Couleurs et thème

Modifiez `tailwind.config.ts` pour personnaliser les couleurs :

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ... autres nuances
      }
    }
  }
}
```

### Layout

Les composants de layout se trouvent dans `src/components/layout/` :
- `Header.tsx` : En-tête du site
- `Footer.tsx` : Pied de page
- `Sidebar.tsx` : Barre latérale

## 📦 Dépendances principales

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "react-hook-form": "^7.48.0",
    "lucide-react": "^0.292.0"
  }
}
```

## 🧪 Tests

```bash
# Installer les dépendances de test
npm install -D @testing-library/react @testing-library/jest-dom jest

# Lancer les tests
npm test
```

## 📄 Licence

MIT