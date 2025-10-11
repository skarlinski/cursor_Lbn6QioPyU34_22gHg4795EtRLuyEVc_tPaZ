import Logo from '@/components/Logo';
import Link from 'next/link';

type HeaderProps = {
  t: { [key: string]: string };
};

const Header = ({ t }: HeaderProps) => {
  const href = t.LOCALE === 'ca' ? '/ca' : '/';

  return (
    <header className="flex justify-between items-center">
      <a href={href} className="flex text-interactive no-underline">
        <div className="pt-4">
          <Logo width={80} height={55} color="#d0383e" />
        </div>
        <h1 className="ml-2 text-4xl font-bold my-6">{t.APP_TITLE}</h1>
      </a>
      <nav>
        <Link href="/upload" className="text-interactive no-underline hover:underline">
          Upload Cat
        </Link>
      </nav>
    </header>
  );
};

export default Header;
