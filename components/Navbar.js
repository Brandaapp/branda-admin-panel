import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="fixed-top">
      <nav>
        <div className="nav-wrapper grey lighten-5">
          <Link href="/"><a className="nav-logo"><img src="/logo.png" style={{ width: "60px"}} /></a></Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link href="/shuttles-management">
                <a className="black-text">
                  Shuttles Managment
                  <i className="material-icons right">directions_bus</i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/reservations">
                <a className="black-text">
                  Reservations
                  <i className="material-icons right">event_available</i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/places-management">
                <a className="black-text">
                  Places Managment
                  <i className="material-icons right">place</i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/schedules">
                <a className="black-text">
                  Schedules
                  <i className="material-icons right">access_time</i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/announcements">
                <a className="black-text">
                  Announcements
                  <i className="material-icons right">notification_important</i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/screens">
                <a className="black-text">
                  Screens
                  <i className="material-icons right">ad_units</i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/push-notifications">
                <a className="black-text">
                  Push notifications
                  <i className="material-icons right">sms</i>
                </a>
              </Link>
            </li>
            <li>
              <a className="dropdown-trigger black-text" href="#" data-activates="dropdown1" data-beloworigin="true" style={{ textAlign: "center" }}>
                Placeholder
                <img className="circle circle-small" src="/placeholder-avatar.png"/>
              </a>
              <ul id="dropdown1" className="dropdown-content">
                <li>
                  {/* logout not yet implented */}
                  <a className="black-text" href="/logout">
                    Logout
                    <i className="material-icons right">exit_to_app</i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}