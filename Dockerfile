FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .

# Add ARGs for each environment variable
ARG VITE_NYT_API_KEY
ARG VITE_NEWS_API_KEY
ARG VITE_NEWS_DATA_API_KEY

# Set environment variables from ARGs
ENV VITE_NYT_API_KEY=$VITE_NYT_API_KEY
ENV VITE_NEWS_API_KEY=$VITE_NEWS_API_KEY
ENV VITE_NEWS_DATA_API_KEY=$VITE_NEWS_DATA_API_KEY

RUN pnpm run build

FROM ubuntu
RUN apt-get update && apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]