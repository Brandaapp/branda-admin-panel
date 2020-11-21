
export default function Navbar() {
    return (
      <nav>
        <div className="nav-wrapper grey lighten-5">
          <ul className="right hide-on-med-and-down">
            <li>
              <a className="black-text" href="/manager/shuttlesmanagment">
                Shuttles Managment
                <i className="small material-icons right">group</i>
              </a>
            </li>

            <li>
              <a className="black-text" href="/manager/reservations">
                Reservations<i className="material-icons right">group</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/placemanagment">
                Places Managment<i className="material-icons right">group</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/hoursupdate">
                Schedules<i className="material-icons right">access_time</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/screens">
                Screens<i className="material-icons right">how_to_reg</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/register">
                Register<i className="material-icons right">how_to_reg</i>
              </a>
            </li>
            <li>
              <a className="black-text" href="/manager/pushnotifications">
                Push notifications
                <i className="material-icons right">how_to_reg</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
}