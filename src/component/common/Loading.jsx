import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress size={80} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading...
            </Typography>
        </Box>
    );
}
