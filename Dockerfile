# Use the Node.js official image as the base
FROM node:18-alpine

# Set the working directory to the nested package
WORKDIR /app

# Copy the nested app's package files
COPY heart-disease-detection/package*.json ./

# Install dependencies
RUN npm install

# Copy the app's source code
COPY heart-disease-detection .

# Expose port 3000 (default for React apps)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
