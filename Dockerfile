# Usar una imagen base de Node.js
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-14

# Instalar dependencias de Android SDK
RUN apt-get update && \
    apt-get install -y \
    openjdk-11-jdk \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Descargar y configurar Android SDK
RUN mkdir -p /usr/local/android-sdk && \
    cd /usr/local/android-sdk && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip -O cmdline-tools.zip && \
    unzip cmdline-tools.zip && \
    rm cmdline-tools.zip && \
    mkdir cmdline-tools && \
    mv tools cmdline-tools/latest

ENV ANDROID_SDK_ROOT /usr/local/android-sdk
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/platform-tools

# Aceptar licencias de Android SDK
RUN yes | sdkmanager --licenses

# Instalar herramientas de Android
RUN sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3" "emulator"

# Instalar watchman
RUN apt-get update && apt-get install -y watchman && rm -rf /var/lib/apt/lists/*

# Crear y usar el usuario vscode
ARG USERNAME=vscode
RUN groupadd -g 1000 ${USERNAME} && \
    useradd -m -u 1000 -g ${USERNAME} -s /bin/bash ${USERNAME} && \
    usermod -aG sudo ${USERNAME}

# Configurar permisos y directorios
RUN mkdir /home/${USERNAME}/.android && chown ${USERNAME}:${USERNAME} /home/${USERNAME}/.android

# Establecer el usuario predeterminado
USER ${USERNAME}
