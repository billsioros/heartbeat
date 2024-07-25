import { Box, CircularProgress, Fade } from '@mui/material';

export default function Loading() {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Fade
                    in={true}
                    style={{
                        transitionDelay: true ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress />
                </Fade>
            </Box>
        </Box>
    );
}
