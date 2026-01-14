const NextFederationPlugin = require('@module-federation/nextjs-mf');
import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

module.exports = {
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
            react: { singleton: true, requiredVersion: false },
            'react-dom': { singleton: true, requiredVersion: false },
          },
          extraOptions: {
            exposePages: false,
            useManifestFormat: true,
          },
        }),
      );
    }

    return config;
  },
};

