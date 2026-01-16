const NextFederationPlugin = require('@module-federation/nextjs-mf');
import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

module.exports = {
  headers: async () => {
    return [
      {
        source: '/_next/static/chunks/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
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
            './test': './src/pages/test',
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
            automaticAsyncBoundary: true,
          }
        }),
      );
    }

    return config;
  },
};

