import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Skeleton,
  Tooltip,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { BitlyClient } from 'bitly';
import Link from 'next/link';

import { TokensContext } from '../../../pages/_app';

// links cache
const links = {};

export default function ScheduledPushNotificationCard ({ notification, onDelete, onSend }) {
  const [bitlyLink, setBitlyLink] = useState(undefined);
  const tokens = useContext(TokensContext);

  useEffect(() => {
    const { _id } = notification;

    if (notification.link !== '') {
      if (!links[_id]) {
        const bitly = new BitlyClient(tokens.bitly, {});
        bitly.shorten(notification.link)
          .then(({ link }) => {
            setBitlyLink(link);
            links[_id] = link;
          });
      } else {
        setBitlyLink(links[_id]);
      }
    }
  }, []);

  return (
    <Card sx={{
      p: 2,
      width: 280,
      height: 220,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <CardContent sx={{ overflow: 'auto' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {notification.to}
        </Typography>
        <Typography variant="h6" component="div">
          {notification.title}
        </Typography>
        {
          notification.link
            ? <>
              {bitlyLink
                ? <Typography color="text.secondary" variant='subtitle2'>
                  <Link href={bitlyLink}>{bitlyLink}</Link>
                </Typography>
                : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
            </>
            : null
        }
        <Typography variant='subtitle2' sx={{ mb: 1.5 }} fontWeight={1}>
          {dayjs(notification.sendOn).format('L LT')}
        </Typography>
        <Typography variant='subtitle2' fontWeight={3}>
          {notification.body}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Tooltip title='Un-schedule the notification and send it now'>
          <Button onClick={onSend}>Send Now</Button>
        </Tooltip>
        <Tooltip title='Delete notification'>
          <IconButton aria-label={`delete-${notification._id}`} onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
