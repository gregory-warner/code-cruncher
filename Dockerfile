# Build stage
FROM node:19-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Runtime stage
FROM node:19-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 5001
EXPOSE 5433

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["npm", "run", "server"]