# Usar una imagen base con Node.js y herramientas de desarrollo
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:20

# Instalar Watchman, una herramienta necesaria para el desarrollo de React Native
RUN apt-get update && apt-get install -y \
    watchman \
    && rm -rf /var/lib/apt/lists/*

# Instalar Expo CLI y TypeScript
RUN npm install -g expo

# Establecer el directorio de trabajo
WORKDIR /workspace

# Establecer el usuario predeterminado
USER node
