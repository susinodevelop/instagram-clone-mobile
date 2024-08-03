FROM node:14

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
  openjdk-11-jdk \
  wget \
  unzip \
  git \
  && apt-get clean

# Crear directorio de trabajo
WORKDIR /workspace

# Instalar Android SDK
RUN mkdir -p /usr/local/android-sdk && \
  cd /usr/local/android-sdk && \
  wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip && \
  unzip commandlinetools-linux-9477386_latest.zip -d cmdline-tools && \
  mkdir cmdline-tools/latest && \
  mv cmdline-tools/* cmdline-tools/latest

ENV ANDROID_SDK_ROOT=/usr/local/android-sdk
ENV PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Aceptar licencias de Android SDK
RUN yes | sdkmanager --licenses

# Instalar emulador de Android
RUN sdkmanager "platform-tools" "platforms;android-33" "emulator" "system-images;android-33;google_apis;x86_64" && \
  avdmanager create avd -n android33 -k "system-images;android-33;google_apis;x86_64"

# Configurar usuario del contenedor
ARG USERNAME=node
USER $USERNAME
