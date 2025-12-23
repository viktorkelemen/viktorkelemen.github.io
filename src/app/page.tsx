import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8 md:p-12 lg:p-16 relative">
      {/* Header */}
      <header>
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
          Viktor<br />
          Kelemen
        </h1>
      </header>

      {/* Center - breathing room for shapes */}
      <div className="flex-1" />

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="text-lg leading-relaxed">
          <p>Software engineer, Instagram</p>
          <p>Brooklyn / London / Tokyo</p>
        </div>

        <nav className="flex flex-col md:flex-row gap-4 md:gap-8 text-lg">
          <Link href="/about">About</Link>
          <Link href="/work">Work</Link>
          <a href="https://github.com/viktorkelemen" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}
