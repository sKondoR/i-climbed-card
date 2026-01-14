const NextFederationPlugin = require('@module-federation/nextjs-mf');
import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

module.exports = {
  webpack(config: Configuration, options: NextConfig) {
    if (!options.isServer) {
      config.plugins = config.plugins || [];

      config.plugins.push(
        new NextFederationPlugin({
          name: 'remote',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './EditImage': './src/ui/EditImage/EditImage',
          },
          shared: {},
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

