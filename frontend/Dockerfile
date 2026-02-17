FROM node:18

WORKDIR /app

# Copy package.json first and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Vite preview runs static build, default port 5173
EXPOSE 3000

# Run preview server (production)
CMD ["npm", "start"]
