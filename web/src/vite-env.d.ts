/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MQTT_WSS_URL: string;
  readonly VITE_MQTT_USERNAME: string;
  readonly VITE_MQTT_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
