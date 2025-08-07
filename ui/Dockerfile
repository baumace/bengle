FROM node:18-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm next build && pnpm next export
RUN pnpm add serve
EXPOSE 3000
CMD ["pnpm", "start"]