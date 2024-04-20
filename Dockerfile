# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN npm install
RUN npm install -D tailwindcss postcss autoprefixer

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
RUN npm run build -- --no-lint

# Stage 2: Create a production-ready image
FROM node:lts-bookworm-slim

# Set the working directory in the container
WORKDIR /app

# Copy the production dependencies from the build stage
COPY --from=build /app/.env ./
COPY --from=build /app/public ./public
COPY --from=build /app/src ./src
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/firebase.config.js ./
COPY --from=build /app/next.config.js ./
COPY --from=build /app/postcss.config.js ./
COPY --from=build /app/tailwind.config.ts ./
COPY --from=build /app/tsconfig*.json ./
COPY --from=build /app/package*.json ./

# Expose the port used by your NestJS application
EXPOSE 3000

# Start your NestJS application in production mode
CMD ["npm", "run", "start"]
