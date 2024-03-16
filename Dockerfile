# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the wait-for-mongo.sh script to the container
COPY wait-for-mongo.sh .

# Make the wait-for-mongo.sh script executable
RUN chmod +x wait-for-mongo.sh

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD [ "node", "app.js"]
