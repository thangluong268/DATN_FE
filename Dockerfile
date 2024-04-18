# Stage 1: Build the application
FROM node:20 AS build

RUN mkdir -p /appfe
# Set the working directory in the container
WORKDIR /appfe

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN npm install 

# Copy the source code into the container
COPY . /appfe

# Build your NestJS application
RUN npm run build

# Stage 2: Create a production-ready image
FROM node:bookworm-slim

# Set the working directory in the container
WORKDIR /appfe

# Copy the production dependencies from the build stage
COPY --from=build /appfe/.env ./appfe
COPY --from=build /appfe/package*.json ./appfe
COPY --from=build /appfe/public ./appfe/public
COPY --from=build /appfe/firebase.config.js ./appfe
COPY --from=build /appfe/next.config.js ./appfe
COPY --from=build /appfe/postcss.config.js ./appfe
COPY --from=build /appfe/tailwind.config.ts ./appfe
COPY --from=build /appfe/tsconfig*.json ./appfe
COPY --from=build /appfe/node_modules ./appfe/node_modules
COPY --from=build /appfe/.next ./appfe/.next


# Expose the port used by your NestJS application
EXPOSE 3000

# Start your NestJS application in production mode
CMD ["npm", "start"]
