import Link from 'next/link';
import { access } from '../../utils/rolesUtils';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Image from 'next/image';
import Links from './Links';

export default function Navbar () {
  const [session] = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className="fixed-top">
        <nav>
          <div className="nav-wrapper grey lighten-5">
            <Link href={access[session.user.type].redirectTo}>
              <a className="nav-logo">
                <Image alt='' src="/logo.png" width={60} height={60} />
              </a>
            </Link>
            <ul className="right hide-on-med-and-down">
              <Links type={session.user.type}/>
              <li>
                <a className="black-text" id="logout" onClick={async () => { await signOut(); router.push('/login'); }}>
                Logout
                  <i className="material-icons" style={{ margin: '0px' }}>exit_to_app</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else return null;
}
