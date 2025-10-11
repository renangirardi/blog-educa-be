# Dockerfile multi-stage para: instalar deps, testar (dev-test), build e imagem de produção
FROM node:20-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Stage usado para rodar os testes (instala cliente postgres p/ pg_isready)
FROM deps AS dev-test
RUN apk add --no-cache postgresql-client bash
COPY . .
ENV NODE_ENV=test
# O comando default é só uma segurança; no docker-compose forçamos o comando que espera pelo DB e roda os testes
CMD ["npm", "test"]

# Stage de build (para produção)
FROM deps AS build
COPY . .
RUN npm run build

# Imagem final de runtime (production)
FROM node:20-alpine AS prod
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=build /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
