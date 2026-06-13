# ============================================

# BusTrack Smart Docker Configuration

# ============================================

FROM node:18

# Create app directory

WORKDIR /app

# Copy package files

COPY package*.json ./

# Install dependencies

RUN npm install

# Copy all project files

COPY . .

# Expo default port

EXPOSE 8081

# Start application

CMD ["npm", "start"]