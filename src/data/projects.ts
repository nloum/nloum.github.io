export interface Project {
  name: string;
  tagline: string;
  description: string;
  url: string;
  language: string;
  featured?: boolean;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: 'agent-toolbox',
    tagline: 'Skills and AGENTS.md conventions for AI coding agents',
    description:
      'A collection of reusable skills and agent instruction files for Claude Code, Codex, and other AI coding agents.',
    url: 'https://github.com/nloum/agent-toolbox',
    language: 'Rust',
    featured: true,
    tags: ['AI tooling', 'CLI'],
  },
  {
    name: 'deep-search-replace',
    tagline: 'Recursive search/replace across folder names, file names, and contents',
    description:
      'A CLI tool that renames and rewrites recursively across an entire directory tree in one pass.',
    url: 'https://github.com/nloum/deep-search-replace',
    language: 'Rust',
    featured: true,
    tags: ['CLI', 'Developer tools'],
  },
  {
    name: 'InfisicalDotNet',
    tagline: '.NET IConfigurationProvider for Infisical',
    description:
      'Integrates the Infisical secrets manager directly into the .NET configuration pipeline.',
    url: 'https://github.com/nloum/InfisicalDotNet',
    language: 'C#',
    featured: true,
    tags: ['.NET', 'Infrastructure'],
  },
  {
    name: 'ComposableCollections',
    tagline: 'Composable, decorator-based collection types for C#',
    description:
      'A library of collection interfaces and decorators designed to be combined like building blocks.',
    url: 'https://github.com/nloum/ComposableCollections',
    language: 'C#',
    featured: true,
    tags: ['.NET', 'Library'],
  },
  {
    name: 'clicycle',
    tagline: 'Command line options parser generator',
    description: 'Generates strongly-typed command line parsers from simple declarative definitions.',
    url: 'https://github.com/nloum/clicycle',
    language: 'C#',
    tags: ['.NET', 'CLI'],
  },
  {
    name: 'Pulumi.Kubernetes.Crds',
    tagline: 'Auto-generated CRD types for Pulumi Kubernetes',
    description: 'Generated Pulumi type definitions for Kubernetes Custom Resource Definitions.',
    url: 'https://github.com/nloum/Pulumi.Kubernetes.Crds',
    language: 'C#',
    tags: ['Infrastructure', 'Kubernetes'],
  },
  {
    name: 'portzero-sdk',
    tagline: 'SDK for Port Zero, a local dev daemon exposing runtime service truth',
    description:
      'Client SDK for querying discovered services, tunnels, and routes from the Port Zero dev daemon.',
    url: 'https://github.com/nloum/portzero-sdk',
    language: 'TypeScript',
    tags: ['Developer tools'],
  },
];
