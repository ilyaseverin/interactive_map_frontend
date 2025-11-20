import type { NextConfig } from "next";

// Получаем URL Strapi из переменной окружения
const getStrapiUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_STRAPI_URL environment variable is required. Please set it in your .env.local file or environment variables."
    );
  }
  return url;
};

// Парсим URL для создания remotePattern
const parseUrlToRemotePattern = (url: string) => {
  const urlObj = new URL(url);
  return {
    protocol: urlObj.protocol.replace(":", "") as "http" | "https",
    hostname: urlObj.hostname,
    port: urlObj.port || "",
    pathname: "/**",
  };
};

const strapiUrl = getStrapiUrl();
const strapiRemotePattern = parseUrlToRemotePattern(strapiUrl);

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      strapiRemotePattern,
    ],
  },
};

export default nextConfig;
