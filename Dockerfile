FROM node:24.13.0-alpine AS deps
WORKDIR /app
RUN npm install -g corepack@latest && corepack enable pnpm && corepack use pnpm@latest-10
COPY package.json pnpm-lock.yaml* ./ 
RUN pnpm install

FROM deps AS development
WORKDIR /app
COPY . .
ENV NODE_ENV=development


FROM deps AS builder
WORKDIR /app
COPY . .
RUN pnpm run build

FROM node:24.13.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY entrypoint.sh ./

EXPOSE 3000

CMD ["pnpm", "start"]