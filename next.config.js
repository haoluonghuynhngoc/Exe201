/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};
// lấy tất cả domain có protocol là https
module.exports = nextConfig;