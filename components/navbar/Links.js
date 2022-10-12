import { Button, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { access } from '../../utils/rolesUtils';
import linksData from './linksData.json';
import styled from 'styled-components';

const UnderlineButton = styled(Button)`
color: inherit;
  margin-right: 1em;
  text-decoration: none;
  display: block;
  position: relative;
  overflow: hidden;
  color: white;
  border-radius: 0;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: white;
    opacity: 1;
    transform: translate3d(-100%, 0, 0);
    transition: opacity 300ms, transform 300ms;
  }
  &:hover::after{
    transform: translate3d(0, 0, 0);
  }`;

export default function Links ({ type, drawer }) {
  const router = useRouter();

  const renderLinks = (type, drawer) => {
    const { allowed } = access[type];
    return [...allowed]
      .filter(link => Object.keys(linksData).includes(link))
      .map((link, index) => {
        return (
          drawer
            ? <ListItem key={`${index}`} disablePadding>
              <ListItemButton onClick={() => { router.push(link); }}>
                <ListItemText primary={linksData[link].name} />
                <i className="material-icons right">{linksData[link].icon}</i>
              </ListItemButton>
            </ListItem>
            : <UnderlineButton
              key={`${index}`}
              onClick={() => { router.push(link); }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {linksData[link].name}
            </UnderlineButton>
        );
      });
  };

  return (
    <>
      { renderLinks(type, drawer) }
    </>
  );
}
