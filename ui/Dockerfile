FROM node:18-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm next build
EXPOSE 3000
CMD ["pnpm", "start"]