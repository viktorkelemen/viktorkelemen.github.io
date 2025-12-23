import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8 md:p-12 lg:p-16 relative">
      {/* Header */}
      <header className="flex justify-between items-start">
        <h1 className="text-4xl md:text-5xl leading-tight">
          About
        </h1>
        <Link href="/" className="text-lg">Back</Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center py-16">
        <div className="max-w-xl space-y-6 text-lg leading-relaxed">
          <p>
            Software engineer at Instagram, working on tools
            and infrastructure at scale.
          </p>

          <p>
            Outside of work: modular synthesis, generative music,
            creative coding. SuperCollider. Eurorack.
          </p>

          <p>
            Also improv and clowning. Not a metaphor.
          </p>

          <p>
            Hungarian-British. 日本語もオッケ.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-end">
        <nav className="flex gap-8 text-lg">
          <Link href="/work">Work</Link>
          <a href="https://github.com/viktorkelemen" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}
