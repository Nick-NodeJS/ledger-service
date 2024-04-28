FROM node:18.16 as builder
# Install runtime dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Build application
COPY . .
RUN npm run job-consumer-build

FROM node:18.16
# Copy runtime dependencies and application code
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Copy the .env file into the image
COPY .env /app/.env

COPY ./package*.json ./

# Configure application startup command
ENTRYPOINT ["node"]
CMD ["dist/apps/job-consumer-app/main"]