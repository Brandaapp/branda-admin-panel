import Image from 'next/image';
import Link from 'next/link';

export default function BrandaLogo ({ redirectTo }) {
  return (
    <Link href={redirectTo}>
      <a className="nav-logo">
        <Image alt='' src="/logo-fancy.png" width={50} height={50} />
      </a>
    </Link>
  );
}
