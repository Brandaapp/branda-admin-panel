import { Button, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { access } from '../../utils/rolesUtils';
import linksData from './linksData.json';

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
            : <Button
              key={`${index}`}
              onClick={() => { router.push(link); }}
              sx={{ my: 2, color: '#1B4370', display: 'block' }}
            >
              {linksData[link].name}
            </Button>
        );
      });
  };

  return (
    <>
      { renderLinks(type, drawer) }
    </>
  );
}
