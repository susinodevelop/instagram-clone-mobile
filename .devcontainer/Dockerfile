# Stage 1: Base image with Node.js and dependencies
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm as base

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y openjdk-17-jdk wget unzip libglu1-mesa kmod

# Configura el Android SDK
ENV ANDROID_SDK_ROOT /usr/local/android-sdk
ENV PATH $ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH
ENV PATH $ANDROID_SDK_ROOT/platform-tools:$PATH

# Stage 2: Download and setup Android SDK
FROM base as sdk

RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools && \
    cd $ANDROID_SDK_ROOT/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O commandlinetools.zip && \
    unzip commandlinetools.zip -d latest && \
    rm commandlinetools.zip

# Acepta licencias de Android SDK
RUN yes | sdkmanager --licenses

# Instala herramientas y crea un emulador de Android
RUN sdkmanager "platform-tools" "platforms;android-33" "emulator" "system-images;android-33;google_apis;x86_64" && \
    echo "no" | avdmanager create avd -n android33 -k "system-images;android-33;google_apis;x86_64" --device "pixel"

# Stage 3: Final image with project files
FROM base

COPY --from=sdk $ANDROID_SDK_ROOT $ANDROID_SDK_ROOT

WORKDIR /workspace
COPY . .

RUN npm install

# Inicia el emulador y el servidor ADB, luego ejecuta npm run android
CMD bash -c "emulator @android33 -no-audio -no-window & adb wait-for-device && npm run android"
