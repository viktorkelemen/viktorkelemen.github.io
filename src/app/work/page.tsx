import Link from 'next/link';

const projects = [
  {
    title: 'SC-REPL MCP',
    description: 'MCP server connecting Claude to SuperCollider',
    url: 'https://github.com/viktorkelemen/sc-repl-mcp',
  },
  {
    title: 'Album Review Linker',
    description: 'Music reviews matched to Spotify',
    url: 'https://github.com/viktorkelemen/album-review-spotify',
  },
];

export default function Work() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8 md:p-12 lg:p-16 relative">
      {/* Header */}
      <header className="flex justify-between items-start">
        <h1 className="text-4xl md:text-5xl leading-tight">
          Work
        </h1>
        <Link href="/" className="text-lg">Back</Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center py-16">
        <div className="space-y-12 text-lg">
          {projects.map((project) => (
            <div key={project.title}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <h2 className="text-2xl md:text-3xl mb-2 group-hover:underline">{project.title}</h2>
                <p className="opacity-60">{project.description}</p>
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-end">
        <nav className="flex gap-8 text-lg">
          <Link href="/about">About</Link>
          <a href="https://github.com/viktorkelemen" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}
