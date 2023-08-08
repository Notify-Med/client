# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Copy the rest of the app code to the working directory
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start the app when the container starts
CMD ["npm", "start"]