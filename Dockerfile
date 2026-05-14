# Debian slim: native optional deps (e.g. lightningcss) target linux-x64-gnu (glibc).
# Alpine (musl) plus slow networks often time out on musl-specific tarballs.
FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

# npm honors these flags; avoids pnpm-specific fetch timeouts on very slow links
RUN npm install \
    --fetch-retries=20 \
    --fetch-timeout=1200000 \
    --no-audit \
    --no-fund

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
