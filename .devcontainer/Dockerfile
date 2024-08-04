# Usar una imagen base con Node.js y herramientas de desarrollo
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:18

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    watchman \
    openjdk-17-jdk \
    unzip \
    wget \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Instalar Android SDK
ENV ANDROID_SDK_ROOT=/usr/lib/android-sdk
RUN mkdir -p $ANDROID_SDK_ROOT
RUN wget -q "https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip" -O android-commandlinetools.zip \
    && unzip android-commandlinetools.zip -d $ANDROID_SDK_ROOT/cmdline-tools \
    && rm android-commandlinetools.zip \
    && mv $ANDROID_SDK_ROOT/cmdline-tools/cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest

# Configurar las herramientas de Android
ENV PATH=$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH
RUN yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" "platforms;android-30" "emulator" "system-images;android-30;google_apis;x86_64"

# Crear un dispositivo virtual Android (AVD)
RUN echo "no" | avdmanager create avd -n pixel_4 -k "system-images;android-30;google_apis;x86_64" --device "pixel"

# Instalar Expo CLI y TypeScript
RUN npm install -g expo typescript

# Establecer el directorio de trabajo
WORKDIR /workspace

# Establecer el usuario predeterminado
USER node
