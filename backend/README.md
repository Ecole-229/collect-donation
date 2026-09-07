# Backend Starter — Express + MongoDB

Starter propre pour commencer un projet backend avec :

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- CORS
- Nodemon
- Docker Compose pour MongoDB
- Dockerfile pour le backend
- Architecture routes / controllers / models / config

## 1. Installation

```bash
npm install
```

Copier `.env.example` vers `.env`.

Windows PowerShell :

```powershell
Copy-Item .env.example .env
```

Puis vérifier les variables dans `.env`.

## 2. Lancer MongoDB

### Option A — MongoDB installé localement

Démarrer MongoDB puis :

```bash
npm run dev
```

### Option B — Docker

```bash
docker compose up -d
```

Puis :

```bash
npm run dev
```

MongoDB sera disponible sur :

```text
mongodb://localhost:27017/my_database
```

## 3. Tester l'API

API :

```text
http://localhost:3000
```

Health check :

```text
GET http://localhost:3000/api/health
```

Utilisateurs :

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PATCH  /api/users/:id
DELETE /api/users/:id
```

Exemple POST :

```json
{
  "name": "Eddy",
  "email": "eddy@example.com"
}
```

## 4. Structure

```text
src/
├── config/
│   └── database.js
├── controllers/
│   └── user.controller.js
├── models/
│   └── user.model.js
├── routes/
│   └── user.routes.js
├── app.js
└── server.js
```

### Rôle de chaque partie

`server.js`
- démarre le serveur
- établit la connexion MongoDB

`app.js`
- configure Express
- configure les middlewares
- déclare les routes
- gère les erreurs

`config/`
- configuration externe, notamment MongoDB

`models/`
- structure des documents MongoDB avec Mongoose

`controllers/`
- logique métier des endpoints

`routes/`
- déclaration des URLs et méthodes HTTP

## 5. Docker du backend

Pour construire l'image :

```bash
docker build -t backend-starter .
```

Pour lancer le backend dans Docker, il faudra lui fournir les variables d'environnement et lui permettre d'atteindre MongoDB.

Pour un projet complet, il est recommandé de créer un `docker-compose.yml` qui orchestre backend + MongoDB.

## 6. À ajouter selon le projet

Ce starter volontairement reste simple. Pour un vrai projet, on peut ensuite ajouter :

- validation avec express-validator ou Zod
- authentification JWT
- hash des mots de passe avec bcrypt
- rôles et permissions
- upload de fichiers
- pagination
- recherche / filtres
- logs
- tests
- documentation Swagger/OpenAPI
- rate limiting
- sécurité HTTP
- gestion centralisée des erreurs
- MongoDB Atlas en production
- variables d'environnement séparées par environnement
- CI/CD

## 7. Principe recommandé

Le flux classique devient :

```text
Client (Vue / Nuxt)
        ↓
      Route
        ↓
   Controller
        ↓
     Model
        ↓
    MongoDB
```

Évite de mettre toute la logique dans `server.js` ou directement dans les routes. Cette séparation devient particulièrement utile lorsque le projet grandit.
