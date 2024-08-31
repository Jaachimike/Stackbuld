/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://stackbuld-jaachi.netlify.app", // website URL
  generateRobotsTxt: true, // Generates robots.txt file
  changefreq: "daily", // Frequency of sitemap updates
  priority: 0.7, // Priority of URLs
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://stackbuld-jaachi.netlify.app/server-sitemap.xml", // <==== Add here
    ],
  },
};
