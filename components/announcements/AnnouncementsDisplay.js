import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack
} from '@mui/material';

export default function AnnouncementsDisplay (props) {
  function renderAnnouncements () {
    if (props.announcements.length) {
      return (props.announcements.map(a => {
        return (
          <Card key={'_' + Math.random().toString(36).substr(2, 9)} className="announcement-card">
            <CardContent>
              <Typography variant="h5">{a.type}</Typography>
              <Typography sx={{ margin: 1.5 }}>{a.content}</Typography>
            </CardContent>
          </Card>
        );
      }));
    } else {
      return (
        <Card className="announcement-card">
          <CardContent>
            <Typography variant="h5">{'No current announcement.'}</Typography>
          </CardContent>
        </Card>
      );
    }
  }

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      width: 'auto',
      minHeight: 200,
      maxWidth: 800, // limit width on laptops making it look better
      marginLeft: 'auto', // together with marginRight, place the view in the center
      marginRight: 'auto'
    }}>
      <Stack spacing={3} sx={{ padding: 5 }}>
        {renderAnnouncements()}
      </Stack>
    </Box>
  );
}
