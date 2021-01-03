import Link from 'next/link'

export default function PublicSafety() {
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
        </>
    )
}