# Stage 1: Build the application
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /appfe

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN npm install 

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
RUN npm run build

# Stage 2: Create a production-ready image
FROM node:bookworm-slim

# Set the working directory in the container
WORKDIR /appfe

# Copy the production dependencies from the build stage
COPY --from=build /appfe/.env ./
COPY --from=build /appfe/package*.json ./
COPY --from=build /appfe/public ./public
COPY --from=build /appfe/firebase.config.js ./
COPY --from=build /appfe/next.config.js ./
COPY --from=build /appfe/postcss.config.js ./
COPY --from=build /appfe/tailwind.config.ts ./
COPY --from=build /appfe/tsconfig*.json ./
COPY --from=build /appfe/node_modules ./node_modules
COPY --from=build /appfe/.next ./.next


# Expose the port used by your NestJS application
EXPOSE 3000

# Start your NestJS application in production mode
CMD ["npm", "start"]
