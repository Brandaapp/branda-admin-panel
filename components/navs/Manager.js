import Link from 'next/link'

export default function Manager() {
    return (
        <>
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
                <Link href="/register">
                    <a className="black-text">
                        Register
                        <i className="material-icons right">person_add_alt_1</i>
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
        </>
    )
}