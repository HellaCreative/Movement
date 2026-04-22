/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * In development, Webpack’s persistent cache can occasionally serve a stale
   * chunk graph (runtime still `require()`s e.g. `./470.js` after IDs shift).
   * Disabling the cache here trades a bit of compile speed for fewer
   * “Cannot find module './NNN.js'” / white-screen recoveries after HMR.
   * Production builds keep the default caching (`dev` is false).
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
