module.exports = {
  images: {
    domains: ['abs.twimg.com', 'scontent.fkix2-2.fna.fbcdn.net'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
      net: false,
      dns: false,
      tls: false,
    };

    return config;
  },
  publicRuntimeConfig: {
    WEBAPP_URL: process.env.WEBAPP_URL,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
