import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from '../../providers/SnackbarProvider';
import { useHeartBeats } from './HeartBeatQuery';
import Loading from '../../components/Loading';

import {
    Pagination,
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';

export default function HeartBeatList({ pageSize = 10 }) {
    const theme = useTheme();
    const { register } = useSnackbar();

    const { isLoading, heartbeats, isError, error } = useHeartBeats();

    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        setPage(1);
    }, [heartbeats]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        register({
            severity: 'error',
            message: `Failed to retrieve HeartBeat (${error.message})`,
        });

        return null;
    }

    const pageCount = Math.ceil(heartbeats.length / pageSize);

    return (
        <Box
            sx={{
                background: theme.palette.background.default,
                minHeight: '10vh',
                width: '100%',
                height: '100%',
                padding: theme.spacing(3),
            }}
        >
            <List>
                {heartbeats
                    .slice((page - 1) * pageSize, page * pageSize)
                    .map(heartbeat => (
                        <ListItem
                            key={heartbeat.id}
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: theme.palette.divider,
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            fontWeight: 'bold',
                                        }}
                                        to={`/heartbeats/${heartbeat.id}`}
                                        color="inherit"
                                    >
                                        {heartbeat.id}
                                    </Link>
                                }
                                secondary={
                                    <Typography
                                        variant="body2"
                                        color={
                                            heartbeat.heart_disease
                                                ? 'red'
                                                : 'green'
                                        }
                                    >
                                        {`${heartbeat.heart_disease ? 'Heart Disease' : 'No Heart Disease'}`}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
            </List>
            <Box sx={{ display: 'flex', flexGrow: 1 }} />
            <Box
                sx={{
                    marginBottom: theme.spacing(3),
                    width: '100%',
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: theme.spacing(2),
                }}
            >
                <Pagination
                    color="primary"
                    count={pageCount}
                    page={page}
                    onChange={(event, val) => setPage(val)}
                />
            </Box>
        </Box>
    );
}
