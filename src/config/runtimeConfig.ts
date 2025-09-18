export type RuntimeConfig = {
  apiBaseUrl: string;
  adminApiBaseUrl: string;
  appBaseUrl: string;
};

const DEFAULT_CONFIG: RuntimeConfig = {
  apiBaseUrl: 'https://www.burrycakes.ru/api/v1/mini-app',
  adminApiBaseUrl: 'https://www.burrycakes.ru/api/v1/mini-app/admin/panel',
  appBaseUrl: '/',
};

const normalizeApiBaseUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return DEFAULT_CONFIG.apiBaseUrl;
  }
  return trimmed.replace(/\/+$/, '');
};

const normalizeAdminApiBaseUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return normalizeApiBaseUrl(DEFAULT_CONFIG.adminApiBaseUrl);
  }
  return normalizeApiBaseUrl(trimmed);
};

const normalizeAppBaseUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') {
    return '/';
  }
  const leading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return leading.endsWith('/') ? leading.slice(0, -1) : leading;
};

declare global {
  interface Window {
    __APP_CONFIG__?: Partial<Record<keyof RuntimeConfig, string>>;
  }
}

let cachedConfig: RuntimeConfig | null = null;

export const getRuntimeConfig = (): RuntimeConfig => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const runtimeOverrides: Partial<RuntimeConfig> =
    typeof window !== 'undefined' && window.__APP_CONFIG__
      ? Object.entries(window.__APP_CONFIG__).reduce<Partial<RuntimeConfig>>((acc, [key, value]) => {
          if (typeof value === 'string' && (key in DEFAULT_CONFIG)) {
            acc[key as keyof RuntimeConfig] = value;
          }
          return acc;
        }, {})
      : {};

  const merged: RuntimeConfig = {
    apiBaseUrl: normalizeApiBaseUrl(runtimeOverrides.apiBaseUrl ?? DEFAULT_CONFIG.apiBaseUrl),
    adminApiBaseUrl: normalizeAdminApiBaseUrl(runtimeOverrides.adminApiBaseUrl ?? DEFAULT_CONFIG.adminApiBaseUrl),
    appBaseUrl: normalizeAppBaseUrl(runtimeOverrides.appBaseUrl ?? DEFAULT_CONFIG.appBaseUrl),
  };

  cachedConfig = merged;
  return merged;
};

export const resetRuntimeConfigCache = () => {
  cachedConfig = null;
};
