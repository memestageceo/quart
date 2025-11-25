FROM node:24-alpine3.21

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --omit=dev

# Copy source code
COPY src ./src

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Run the application
CMD ["npm", "start"]

