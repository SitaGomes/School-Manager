# Use the official Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (replace 3000 with your app's port if different)
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
