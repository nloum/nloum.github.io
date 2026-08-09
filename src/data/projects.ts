export type AiAssistance = 'none' | 'low' | 'medium' | 'high';

export interface Project {
  name: string;
  tagline: string;
  description: string;
  url?: string;
  /** Internal path to a written case study, e.g. '/case-studies/portzero/'. */
  caseStudy?: string;
  /** Source repository, shown as a secondary link when `url` is the product site. */
  repo?: string;
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
    name: 'LiveLinq',
    tagline: 'LINQ over live, mutable collections',
    description:
      'Rx.NET-based reactive queries over lists, sets, and dictionaries, so LINQ expressions stay live as the underlying collections change.',
    url: 'https://github.com/nloum/LiveLinq',
    language: 'C#',
    featured: true,
    aiAssistance: 'low',
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
    name: 'Port Zero',
    tagline: 'Eliminate port conflicts in your dev environment',
    description:
      'Lets the OS pick random available ports, then forwards them to virtual domains on a virtual NIC — so you can run multiple branches simultaneously without clashing. Open-source core, maintained under the PortZeroNetwork org.',
    url: 'https://portzero.net',
    repo: 'https://github.com/PortZeroNetwork/portzero',
    // Re-enable once the case study is published (it's draft, so this
    // route doesn't exist in production builds and would 404):
    // caseStudy: '/case-studies/portzero/',
    language: 'Rust',
    featured: true,
    aiAssistance: 'high',
    tags: ['Developer tools', 'Networking'],
  },
];
