import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RuntimeConfig, getRuntimeConfig } from '../config/runtimeConfig';

type ConfigSelector = (config: RuntimeConfig) => string;

const ensureTrailingSlash = (value: string): string => (value.endsWith('/') ? value : `${value}/`);

const stripLeadingSlash = (value: string): string => value.replace(/^\/+/, '');

const normalizeArgs = (args: string | FetchArgs): string | FetchArgs => {
  if (typeof args === 'string') {
    return stripLeadingSlash(args);
  }

  if (typeof args.url === 'string') {
    return { ...args, url: stripLeadingSlash(args.url) };
  }

  return args;
};

export const createRuntimeBaseQuery = (
  selectBaseUrl: ConfigSelector,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return (args, api, extraOptions) => {
    const config = getRuntimeConfig();
    const baseUrl = ensureTrailingSlash(selectBaseUrl(config));
    return fetchBaseQuery({ baseUrl })(normalizeArgs(args), api, extraOptions);
  };
};
