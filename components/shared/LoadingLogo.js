import { Box } from '@mui/material';
import Image from 'next/image';

export default function LoadingLogo () {
  return (
    <Box height='90vh' display={'flex'} flexDirection='column' alignItems={'center'} justifyContent='center'>
      <Image alt='' src="/branda-admin-loading-gif.gif" width={280} height={280} />
    </Box>
  );
}
