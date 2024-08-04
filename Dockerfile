# Usar una imagen base de Node.js
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-20

# Instalar dependencias de Android SDK
RUN apt-get update && \
    apt-get install -y \
    openjdk-17-jdk \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Descargar y configurar Android SDK
RUN mkdir -p /usr/local/android-sdk && \
    cd /usr/local/android-sdk && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O cmdline-tools.zip && \
    unzip cmdline-tools.zip -d cmdline-tools && \
    rm cmdline-tools.zip && \
    mkdir -p cmdline-tools/latest && \
    mv cmdline-tools/cmdline-tools/* cmdline-tools/latest && \
    rm -rf cmdline-tools/cmdline-tools

ENV ANDROID_SDK_ROOT=/usr/local/android-sdk
ENV PATH=${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools

# Aceptar licencias de Android SDK e instalar herramientas de Android
RUN yes | ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager --licenses && \
    ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2" "emulator"

# Instalar watchman
RUN apt-get update && apt-get install -y watchman && rm -rf /var/lib/apt/lists/*

# Crear y usar el usuario vscode de forma segura
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=1000

RUN if ! getent group ${USER_GID}; then groupadd -g ${USER_GID} ${USERNAME}; fi && \
    if ! id -u ${USER_UID} > /dev/null 2>&1; then useradd -m -u ${USER_UID} -g ${USERNAME} -s /bin/bash ${USERNAME}; fi && \
    usermod -aG sudo ${USERNAME}

# Configurar permisos y directorios
RUN mkdir -p /home/${USERNAME}/.android && chown ${USERNAME}:${USERNAME} /home/${USERNAME}/.android

# Establecer el usuario predeterminado
USER ${USERNAME}
