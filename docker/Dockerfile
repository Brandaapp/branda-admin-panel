FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code into the container
COPY .. .

# Build the app for production
RUN npm run build

# Set the command to start the app in production mode
CMD ["npm", "start"]
