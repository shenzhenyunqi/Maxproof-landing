# Stage 1: Build the React application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Run the Express server
FROM node:22-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built frontend from previous stage
COPY --from=build /app/dist ./dist

# Copy server source and config files
COPY server.ts ./
COPY tsconfig.json ./

# Install tsx globally for running TypeScript server
RUN npm install -g tsx

# Expose port 3000
EXPOSE 3000

# Start the Express server in production mode
ENV NODE_ENV=production
CMD ["tsx", "server.ts"]
