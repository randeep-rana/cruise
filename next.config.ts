const path = require("path")
const BundleAnalyzer = require("@next/bundle-analyzer")
const { format, utcToZonedTime } = require("date-fns-tz")

const TIME_ZONE = "Asia/Kolkata"
const TIME_FORMAT = "yyMMdd-HHmm"

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const compilerOptions = {
  removeConsole: process.env.NEXT_PUBLIC_ENV === "prod" && {
    exclude: ["error"],
  },
}

const buildTime = process.env.BUILD_TIME
const assetPrefix = process.env.ASSET_PREFIX && buildTime ? `${process.env.ASSET_PREFIX}/${buildTime}` : undefined
console.log("ASSET_PREFIX", process.env.ASSET_PREFIX, "buildTime", buildTime, "assetPrefix", assetPrefix)

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_ENV !== "prod",
  swcMinify: true,
  assetPrefix,
  crossOrigin: assetPrefix ? "anonymous" : undefined,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      {
        loader: "next/font/google",
        options: { subsets: ["latin"] },
      },
    ],
  },
  compiler: compilerOptions,
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
      preventFullImport: true,
    },
  },
  images: {
    // domains: ['neon.ipsator.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neon.ipsator.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE || "https://heliyatra-stage.ipsator.com"}/api/v1/:path*`,
      },
    ]
  },
}

const moduleExports = withBundleAnalyzer(nextConfig)

console.log("moduleExports", moduleExports)
console.log("started at", format(utcToZonedTime(new Date(), TIME_ZONE), TIME_FORMAT, { timeZone: TIME_ZONE }))

module.exports = moduleExports
