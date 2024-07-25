import MenuIcon from '@mui/icons-material/Menu';
import { List, Typography, useTheme, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ListIcon from '@mui/icons-material/List';
import MonitorHeart from '@mui/icons-material/MonitorHeart';
import { useNavigate } from 'react-router-dom';

import heartbeat from '../assets/heartbeat.png';

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Layout({ children }) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: '#2dbbc7' }}>
                    <Toolbar>
                        <img
                            alt="HeartBeat"
                            src={heartbeat}
                            width="24"
                            height="24"
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                marginLeft: theme.spacing(2),
                                fontWeight: 'bold',
                            }}
                        >
                            HeartBeat
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Tooltip title="History">
                                <IconButton
                                    size="large"
                                    aria-label="history"
                                    color="inherit"
                                    onClick={() => navigate('/heartbeats')}
                                >
                                    <ListIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Diagnose">
                                <IconButton
                                    size="large"
                                    aria-label="create a new heartbeat"
                                    color="inherit"
                                    onClick={() => navigate('/')}
                                >
                                    <MonitorHeart />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    background:
                        'repeating-linear-gradient(45deg, #f8b1ca, #f8b1ca 10px, #fddce8 10px, #fddce8 20px, #89d9e1 20px, #89d9e1 30px, #ece4d4 30px, #ece4d4 40px, #2dbbc7 40px, #2dbbc7 50px)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}
