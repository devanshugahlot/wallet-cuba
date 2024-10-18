import * as React from 'react';
// import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Success Copy Link!', {
      variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  return (
    <div className='copy-button' onClick={handleClickVariant('success')}>
      Copy
    </div>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
