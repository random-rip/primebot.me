FROM ghcr.io/pnpm/pnpm:12.22.0 AS build
WORKDIR /app

ENV NUXT_TELEMETRY_DISABLED=1

# Fetch dependencies (incl. Node.js from devEngines.runtime) using only the lockfile, so this layer stays cached until it changes
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
RUN --mount=type=cache,id=pnpm,target=/var/cache/pnpm \
    pnpm fetch --store-dir /var/cache/pnpm --frozen-lockfile

COPY . .
RUN --mount=type=cache,id=pnpm,target=/var/cache/pnpm \
    pnpm install --store-dir /var/cache/pnpm --frozen-lockfile --offline

# SSR build (needed for Nuxt Studio auth); pages are still prerendered via nitro.prerender
RUN pnpm build

# Same distro as the build stage (glibc), so native binaries in .output keep working
FROM node:24-slim
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080 \
    NUXT_CONTENT_DATABASE_FILENAME=/app/.data/content/contents.sqlite

COPY --from=build --chown=root:root /app/.output ./.output
RUN mkdir -p .data/content && chown -R node:node .data

USER node
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:8080/').then(r => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]

CMD ["node", ".output/server/index.mjs"]
