import { Button, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { access } from '../../utils/rolesUtils';
import linksData from './linksData.json';
import styled from 'styled-components';

const UnderlineButton = styled(Button)({
  '&:hover': {
    textDecoration: 'underline',
    textDecorationColor: 'white',
    textUnderlineOffset: '1em',
    backgroundColor: 'transparent'
  }
});

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
              <Typography
                fontSize={15}
                fontWeight={1}
              >
                {linksData[link].name}
              </Typography>
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
