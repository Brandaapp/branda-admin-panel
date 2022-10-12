import { access } from '../../utils/rolesUtils';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/client';

export default function BrandaLogo ({ size }) {
  const [session] = useSession();

  return (
    <Typography
      variant={size}
      noWrap
      href={access[session.user.type].redirectTo}
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        letterSpacing: '.3rem',
        textDecoration: 'none'
      }}
    >
      BRANDA ADMIN
    </Typography>
  );
}
