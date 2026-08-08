// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import astroMermaid from 'astro-mermaid';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://shashanthk.github.io',
  integrations: [
    astroMermaid(),
    starlight({
      title: 'Shashanth | Technical Knowledge Base',
      description: 'Personal technical documentation on Java, Spring Boot, Databases, System Design, Distributed Systems, DevOps, Architecture, and Security.',
      editLink: {
        baseUrl: 'https://github.com/shashanthk/shashanthk.github.io/edit/main/',
      },
      lastUpdated: true,
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Overview',
          link: '/',
        },
        {
          label: 'Java Core',
          autogenerate: { directory: 'java' },
        },
        {
          label: 'Spring Boot',
          autogenerate: { directory: 'spring-boot' },
        },
        {
          label: 'Databases & Storage',
          autogenerate: { directory: 'databases' },
        },
        {
          label: 'System Design',
          autogenerate: { directory: 'system-design' },
        },
        {
          label: 'Distributed Systems',
          autogenerate: { directory: 'distributed-systems' },
        },
        {
          label: 'DevOps & Cloud',
          autogenerate: { directory: 'devops-cloud' },
        },
        {
          label: 'Software Architecture',
          autogenerate: { directory: 'architecture' },
        },
        {
          label: 'Security & Auth',
          autogenerate: { directory: 'security' },
        },
        {
          label: 'Interview Preparation',
          autogenerate: { directory: 'interview-prep' },
        },
      ],
    }),
    sitemap(),
  ],
});
