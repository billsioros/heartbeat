import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Typography,
    useTheme,
} from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '../../providers/SnackbarProvider';
import { useHeartBeat } from './HeartBeatQuery';
import Loading from '../../components/Loading';
import {
    ReverseChestPain,
    ReverseSex,
    ReverseStSlope,
    getEnumValue,
} from './domain';

export default function HeartBeatDetail() {
    const { id } = useParams();
    const theme = useTheme();
    const { register } = useSnackbar();

    const { isLoading, heartbeat, isError, error } = useHeartBeat(id);

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

    console.log(heartbeat);

    return (
        <Box
            sx={{
                maxWidth: 1000,
                width: '70%',
                margin: 'auto',
            }}
        >
            <Card>
                <CardHeader
                    sx={{
                        color: heartbeat.heart_disease ? 'red' : 'green',
                        fontWeight: 'bold',
                    }}
                    title={`${heartbeat.heart_disease ? 'Heart Disease' : 'No Heart Disease'}`}
                    subheader={heartbeat.id}
                />
                <CardContent>
                    <Grid container spacing={theme.spacing(0)}>
                        <Grid item xs={12} sm={6} key="age">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Age: {heartbeat.age}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} key="sex">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Sex: {getEnumValue(ReverseSex, heartbeat.sex)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} key="max_heart_rate">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Max Heart Rate: {heartbeat.max_heart_rate}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} key="old_peak">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Old Peak: {heartbeat.old_peak}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} key="chest_pain_type">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Chest Pain Type:{' '}
                                {getEnumValue(
                                    ReverseChestPain,
                                    heartbeat.chest_pain_type,
                                )}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} key="fasting_blood_sugar">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Fasting Blood Sugar:{' '}
                                {heartbeat.fasting_blood_sugar ? 'Yes' : 'No'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} key="exercise_angina">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Exercise Angina:{' '}
                                {heartbeat.exercise_angina ? 'Yes' : 'No'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} key="st_slope">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                ST Slope:{' '}
                                {getEnumValue(
                                    ReverseStSlope,
                                    heartbeat.st_slope,
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
