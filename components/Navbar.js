
export default function Navbar() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper grey lighten-5">
          <a href="/" className="nav-logo"><img src="/logo.png" style={{ width: "60px"}} /></a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a className="black-text" href="/manager/shuttlesmanagment">
                Shuttles Managment
                <i className="small material-icons right">directions_bus</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/reservations">
                Reservations<i className="material-icons right">event_available</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/placemanagment">
                Places Managment<i className="material-icons right">place</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/hoursupdate">
                Schedules<i className="material-icons right">access_time</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/screens">
                Screens<i className="material-icons right">ad_units</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/register">
                Register<i className="material-icons right">person_add_alt_1</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/pushnotifications">
                Push notifications
                <i className="material-icons right">sms</i>
              </a>
            </li>
            <li>
              <a className="dropdown-trigger black-text" href="#" data-activates="dropdown1" data-beloworigin="true" style={{ textAlign: "center" }}>
                Placeholder
                <img className="circle circle-small" src="/placeholder-avatar.png"/>
              </a>
              <ul id="dropdown1" className="dropdown-content">
                <li>
                  <a className="black-text" href="/logout">
                    Logout<i className="material-icons right">exit_to_app</i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}