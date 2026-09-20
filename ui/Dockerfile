FROM node:22-alpine AS build
WORKDIR /app

# `output: 'export'` inlines NEXT_PUBLIC_* values into the generated HTML/JS,
# so the API URL has to be known here at build time, not at container start.
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Install deps first so the layer is reused when only source changes
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm next build

# Runtime image carries only the static output, not the toolchain
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/out ./out
EXPOSE 3000
CMD ["serve", "out", "--listen", "3000"]
