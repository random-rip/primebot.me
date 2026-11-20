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

RUN pnpm generate

FROM caddy:2.11-alpine

# Run unprivileged; Caddy only needs write access to its data/config dirs
RUN addgroup -S caddy && adduser -S -G caddy -H -s /sbin/nologin caddy \
    && chown -R caddy:caddy /data /config

COPY --chown=root:root Caddyfile /etc/caddy/Caddyfile
COPY --from=build --chown=root:root /app/.output/public /srv

USER caddy
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
