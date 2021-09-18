import Link from 'next/link'
import Manager from './navs/Manager'
import PublicSafety from './navs/PublicSafety'
import Joseph from './navs/Joseph'
import OrganizationAdmin from './navs/OrganizationAdmin'
import { access } from '../utils/rolesUtils'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'

export default function Navbar() {
  const [session, loading] = useSession()
  const router = useRouter()

  function nav() {
    if (session.user.type === "manager") return (<Manager />)
    else if (session.user.type === "employee") return null
    else if (session.user.type === "publicsafety") return (<PublicSafety />)
    else if (session.user.type === "joseph") return (<Joseph />)
    else if (session.user.type === "organizationAdmin") return (<OrganizationAdmin />)
  }

  if (session) return (
    <div className="fixed-top">
      <nav>
        <div className="nav-wrapper grey lighten-5">
          <Link href={access[session.user.type].redirectTo}>
            <a className="nav-logo">
              <img src="/logo.png" style={{ width: "60px" }} />
            </a>
          </Link>
          <ul className="right hide-on-med-and-down">
            {nav()}
            <li>
              <a className="black-text" id="logout" onClick={async () => {await signOut(); router.push('/login')}}>
                Logout
                <i className="material-icons" style={{ margin: "0px" }}>exit_to_app</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
  else return null
}