export type AiAssistance = 'none' | 'low' | 'medium' | 'high';

export interface Project {
  name: string;
  tagline: string;
  description: string;
  url?: string;
  language: string;
  featured?: boolean;
  private?: boolean;
  aiAssistance: AiAssistance;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: 'deep-search-replace',
    tagline: 'Recursive search/replace across folder names, file names, and contents',
    description:
      'A CLI tool that renames and rewrites recursively across an entire directory tree in one pass.',
    url: 'https://github.com/nloum/deep-search-replace',
    language: 'Rust',
    featured: true,
    aiAssistance: 'high',
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
    aiAssistance: 'none',
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
    aiAssistance: 'none',
    tags: ['.NET', 'Library'],
  },
  {
    name: 'CodeIO',
    tagline: 'Read and generate C# source code',
    description: 'A C# library for reading and generating C# source code.',
    url: 'https://github.com/nloum/CodeIO',
    language: 'C#',
    featured: true,
    aiAssistance: 'none',
    tags: ['.NET', 'Code generation'],
  },
  {
    name: 'clicycle',
    tagline: 'Command line options parser generator',
    description: 'Generates strongly-typed command line parsers from simple declarative definitions.',
    url: 'https://github.com/nloum/clicycle',
    language: 'C#',
    aiAssistance: 'none',
    tags: ['.NET', 'CLI'],
  },
  {
    name: 'Pulumi.Kubernetes.Crds',
    tagline: 'Auto-generated CRD types for Pulumi Kubernetes',
    description: 'Generated Pulumi type definitions for Kubernetes Custom Resource Definitions.',
    url: 'https://github.com/nloum/Pulumi.Kubernetes.Crds',
    language: 'C#',
    aiAssistance: 'none',
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
    aiAssistance: 'high',
    tags: ['Developer tools', 'Networking'],
  },
  {
    name: 'portzero',
    tagline: 'Open source core of Port Zero',
    description: 'The open source engine behind Port Zero, maintained under the PortZeroNetwork org.',
    url: 'https://github.com/PortZeroNetwork/portzero',
    language: 'Rust',
    aiAssistance: 'none',
    tags: ['Developer tools', 'Networking'],
  },
  {
    name: 'vmkit',
    tagline: 'Parallels VM system-test control plane',
    description:
      'Golden-snapshot discipline, offline provisioning cache, guest-exec transport, and a CI harness for testing real installers on pristine VMs.',
    url: 'https://github.com/PortZeroNetwork/vmkit',
    language: 'Shell',
    aiAssistance: 'high',
    tags: ['Developer tools', 'Testing'],
  },
];
