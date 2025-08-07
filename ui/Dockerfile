FROM node:18-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm next build
RUN pnpm add serve
EXPOSE 3000
CMD ["pnpm", "serve", "out", "--port", "8081"]