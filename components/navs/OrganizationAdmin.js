import Link from 'next/link';

export default function OrganizationAdmin () {
  return (
    <>
      <li>
        <Link href="/push-notifications">
          <a className="black-text">
                  Push Notifications
            <i className="material-icons right">sms</i>
          </a>
        </Link>
      </li>
    </>
  );
}
