# Etapa 1: Base image con Node.js y dependencias
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm as base

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y openjdk-17-jdk wget unzip libglu1-mesa kmod

# Configurar el Android SDK
ENV ANDROID_SDK_ROOT /usr/local/android-sdk
ENV PATH ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}

# Etapa 2: Descargar y configurar Android SDK
FROM base as sdk

RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    cd ${ANDROID_SDK_ROOT}/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O commandlinetools.zip && \
    unzip commandlinetools.zip -d latest && \
    rm commandlinetools.zip

# Añadir cmdline-tools al PATH temporalmente para usar sdkmanager
ENV PATH ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}

RUN yes | ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager --licenses && \
    ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-33" "emulator" "system-images;android-33;google_apis;x86_64" && \
    echo "no" | ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/avdmanager create avd -n android33 -k "system-images;android-33;google_apis;x86_64" --device "pixel"

# Etapa 3: Imagen final con los archivos del proyecto
FROM base

COPY --from=sdk ${ANDROID_SDK_ROOT} ${ANDROID_SDK_ROOT}

WORKDIR /workspace
COPY . .

RUN npm install

# Inicia el emulador y el servidor ADB, luego ejecuta npm run android
CMD bash -c "emulator @android33 -no-window & adb wait-for-device && npm run android"
