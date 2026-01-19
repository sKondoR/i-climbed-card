import NextFederationPlugin from '@module-federation/nextjs-mf';
import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

module.exports = {
  headers: async () => {
    return [
      // 1. CORS для remoteEntry.js
      {
        source: '/_next/static/chunks/remoteEntry.js',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      // 2. Глобальные безопасные заголовки
      {
        source: '/(.*)', // Применяется ко всем маршрутам
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';" },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' },
        ],
      },
    ];
  },
  webpack(config: Configuration, options: NextConfig) {
    if (!options.isServer) {
      config.plugins = config.plugins || [];

      config.plugins.push(
        new NextFederationPlugin({
          name: 'microfrontend',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './EditImage': './src/ui/EditImage',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
            'react-dom': { 
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
            '@fortawesome/react-fontawesome': { singleton: true, requiredVersion: false },
            '@fortawesome/free-solid-svg-icons': { singleton: true, requiredVersion: false },
          },
          // Add fallback handling
          extraOptions: {
            exposePages: true,
            enableImageLoaderFix: true,
          }
        }),
      );
    }

    return config;
  },
};

