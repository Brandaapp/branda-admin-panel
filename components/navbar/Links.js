import { access } from '../../utils/rolesUtils.mjs';
import linksData from './linksData.json';
import Link from 'next/link.js';

function renderLinks (type) {
  const { allowed } = access[type];
  return [...allowed]
    .filter(link => Object.keys(linksData).includes(link)) // filter links for nav bar, not all allowed
    .map((link, index) => {
      return (<li key={index}>
        <Link href={link}>
          <a className="black-text">
            {linksData[link].name}
            <i className="material-icons right">{linksData[link].icon}</i>
          </a>
        </Link>
      </li>);
    });
}

export default function Links ({ type }) {
  return (
    <>
      { renderLinks(type) }
    </>
  );
}
