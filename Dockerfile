# Stage 1: Build the application
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN apk add --no-cache git \
    && yarn install \
    && yarn cache clean

# Copy the source code into the container
COPY public ./public
COPY src ./src
COPY .env ./
COPY firebase.config.js ./
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.ts ./
COPY tsconfig*.json ./


# Build your NestJS application
RUN apk add --no-cache git curl \
    && yarn build \
    && cd .next/standalone \
    && node-prune

# Stage 2: Create a production-ready image
FROM node:bookworm-slim

# Set the working directory in the container
WORKDIR /app

# Copy the production dependencies from the build stage
COPY --from=build /app/.env ./
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Expose the port used by your NestJS application
EXPOSE 3000

# Start your NestJS application in production mode
CMD ["yarn", "start"]
