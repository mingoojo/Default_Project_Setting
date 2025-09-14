/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

let url = "";

if (process.env.NEXT_PUBLIC_ENV === "dev") {
  url = process.env.NEXT_PUBLIC_DEV_URL || ""
} else {
  url = process.env.NEXT_PUBLIC_LOCAL_URL || ""
}

const googleUrl = "https://maps.googleapis.com/maps/api/geocode"

const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: `${url}/auth/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${url}/api/:path*`,
      },
      {
        source: "/json/:path*",
        destination: `${googleUrl}/json/:path*`,
      },
    ];
  },

  compiler: {
    styledComponents: true,
  },

}

const SentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "ppsoln-pp",
  project: "ssr2osr-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};



module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions)

