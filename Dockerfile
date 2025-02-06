# Dockerfile for API Gateway
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the API Gateway port
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
