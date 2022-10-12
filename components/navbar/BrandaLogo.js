import Image from 'next/image';
import Link from 'next/link';

export default function BrandaLogo ({ redirectTo }) {
  return (
    <Link href={redirectTo}>
      <a className="nav-logo">
        <Image alt='' src="/logo.png" width={60} height={60} />
      </a>
    </Link>
  );
}
