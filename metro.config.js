const { getDefaultConfig } = require('metro-config');
const path = require('path');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      assetRegistryPath: 'react-native/Libraries/Image/AssetRegistry',
    },
    resolver: {
      assetExts: [
        ...assetExts.filter(ext => ext !== 'svg'),
        'png',
        'jpg',
        'jpeg',
        'gif',
      ],
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: new Proxy(
        {},
        {
          get: (_, name) => path.join(__dirname, `node_modules/${name}`),
        }
      ),
    },
  };
})();
