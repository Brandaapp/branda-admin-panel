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
            {/* <li>
              <a className="dropdown-trigger black-text profile" data-activates="dropdown1" data-beloworigin="true">
                {session.user.name}
                <img className="circle circle-small" id="profile-pic" src={session.user.image}/>
              </a>
              <ul id="dropdown1" className="dropdown-content" style={{ minWidth: "135px" }}>
                <li>
                  <a className="black-text" id="logout" onClick={async () => {await signOut(); router.push('/login')}}>
                    Logout
                    <i className="material-icons" style={{ margin: "0px" }}>exit_to_app</i>
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  )
  else return null
}