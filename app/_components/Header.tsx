import Navigation from '@/app/_components/Navigation';
import Link from 'next/link';

function Header() {
  return (
    <header className='border-b border-primary-200 px-8 py-5'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary-800 transition-colors hover:text-accent-700"
        >
          Foxxy
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
