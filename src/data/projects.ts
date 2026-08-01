export interface Project {
  name: string;
  tagline: string;
  description: string;
  url?: string;
  language: string;
  featured?: boolean;
  private?: boolean;
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
    language: 'C#',
    featured: true,
    private: true,
    tags: ['.NET', 'Library'],
  },
  {
    name: 'CodeIO',
    tagline: 'Read and generate C# source code',
    description: 'A C# library for reading and generating C# source code.',
    url: 'https://github.com/nloum/CodeIO',
    language: 'C#',
    featured: true,
    tags: ['.NET', 'Code generation'],
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
    name: 'Port Zero',
    tagline: 'Eliminate port conflicts in your dev environment',
    description:
      'Lets the OS pick random available ports, then forwards them to virtual domains on a virtual NIC — so you can run multiple branches simultaneously without clashing.',
    url: 'https://portzero.net',
    language: 'Rust',
    featured: true,
    tags: ['Developer tools', 'Networking'],
  },
  {
    name: 'portzero',
    tagline: 'Open source core of Port Zero',
    description: 'The open source engine behind Port Zero, maintained under the PortZeroNetwork org.',
    url: 'https://github.com/PortZeroNetwork/portzero',
    language: 'Rust',
    tags: ['Developer tools', 'Networking'],
  },
];
