import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Select as MuiSelect,
    TextField as MuiTextField,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useCreateHeartBeat } from './HeartBeatQuery';
import {
    Sex as SexType,
    ChestPain as ChestPainType,
    RestingElectrocardiogram as RestingElectrocardiogramType,
    StSlope as StSlopeType,
} from './domain';

function TextField({
    id,
    label,
    value,
    error,
    onBlur,
    onChange,
    placeholder,
    helperText,
}) {
    return (
        <MuiTextField
            fullWidth
            variant="outlined"
            type="text"
            id={id}
            label={label}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            name={id}
            error={error}
            helperText={helperText}
        />
    );
}

function Select({
    id,
    label,
    value,
    choices,
    error,
    setFieldTouched,
    setFieldValue,
    helperText,
}) {
    const onChange = event => {
        const {
            target: { value },
        } = event;

        setFieldValue(id, value);
    };

    return (
        <FormControl fullWidth error={error}>
            <InputLabel id={`${id}-multiselect-label`}>{label}</InputLabel>
            <MuiSelect
                labelId={`${id}-multiselect-label`}
                id={id}
                value={value}
                onChange={onChange}
                onBlur={() => setFieldTouched(id)}
                label={label}>
                {choices.map(newChoice => (
                    <MenuItem key={newChoice} value={newChoice}>
                        {newChoice}
                    </MenuItem>
                ))}
            </MuiSelect>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}

export default function HeartBeatCreateForm({ open }) {
    const theme = useTheme();
    const navigate = useNavigate();

    const { createHeartBeat, error } = useCreateHeartBeat();

    const initialValues = {
        age: '',
        sex: '',
        chestPain: '',
        restingBloodPressure: '',
        cholesterol: '',
        fastingBloodSugar: '',
        restingElectrocardiogram: '',
        maxHeartRate: '',
        exerciseAngina: '',
        oldPeak: '',
        stSlope: '',
    };

    const Sex = yup.mixed().label('Sex').oneOf(Object.keys(SexType));
    const ChestPain = yup
        .mixed()
        .label('Chest Pain')
        .oneOf(Object.keys(ChestPainType));
    const FastingBloodSugar = yup
        .mixed()
        .label('Fasting Blood Sugar')
        .oneOf(['Greater than 120 mg/dl', 'Otherwise']);
    const RestingElectrocardiogram = yup
        .mixed()
        .label('Resting Electrocardiogram')
        .oneOf(Object.keys(RestingElectrocardiogramType));
    const ExerciseAngina = yup
        .mixed()
        .label('Exercise Angina')
        .oneOf(['Yes', 'No']);
    const StSlope = yup
        .mixed()
        .label('ST Slope')
        .oneOf(Object.keys(StSlopeType));

    const HeartBeatSchema = yup.object().shape({
        age: yup.number().label('Age').integer().min(0).max(130).required(),
        sex: Sex.required(),
        chestPain: ChestPain.required(),
        restingBloodPressure: yup
            .number()
            .label('Resting Blood Pressure')
            .integer()
            .min(0)
            .max(250)
            .required(),
        cholesterol: yup
            .number()
            .label('Cholesterol')
            .integer()
            .min(0)
            .max(700)
            .required(),
        fastingBloodSugar: FastingBloodSugar.label(
            'Fasting Blood Sugar',
        ).required(),
        restingElectrocardiogram: RestingElectrocardiogram.required(),
        maxHeartRate: yup
            .number()
            .label('Max Heart Rate')
            .integer()
            .min(60)
            .max(300)
            .required(),
        exerciseAngina: ExerciseAngina.required(),
        oldPeak: yup.number().label('Old Peak').min(-10).max(10).required(),
        stSlope: StSlope.required(),
    });

    const renderForm = ({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
    }) => {
        const getHelperText = field => {
            if (touched[field] && errors[field]) {
                return (
                    <Typography component="span" variant="subtitle1">
                        {JSON.stringify(errors[field])}
                    </Typography>
                );
            }
        };

        return (
            <form
                autoComplete="off"
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                <Grid
                    sx={{ minHeight: '30vh' }}
                    container
                    columns={20}
                    spacing={theme.spacing(1)}>
                    <Grid item xs={10}>
                        <TextField
                            id="age"
                            label="Age"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.age}
                            placeholder="27"
                            name="age"
                            error={!!touched.age && !!errors.age}
                            helperText={getHelperText('age')}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Select
                            setFieldValue={setFieldValue}
                            id={'sex'}
                            label="Sex"
                            choices={['Male', 'Female']}
                            error={!!touched.sex && !!errors.sex}
                            onChange={handleChange}
                            setFieldTouched={setFieldTouched}
                            value={values.sex}
                            helperText={getHelperText('sex')}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="restingBloodPressure"
                            label="Resting Blood Pressure"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.restingBloodPressure}
                            placeholder="120"
                            name="restingBloodPressure"
                            error={
                                !!touched.restingBloodPressure &&
                                !!errors.restingBloodPressure
                            }
                            helperText={getHelperText('restingBloodPressure')}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="cholesterol"
                            label="Cholesterol"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cholesterol}
                            placeholder="200"
                            name="cholesterol"
                            error={
                                !!touched.cholesterol && !!errors.cholesterol
                            }
                            helperText={getHelperText('cholesterol')}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="maxHeartRate"
                            label="Max Heart Rate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.maxHeartRate}
                            placeholder="60"
                            name="cholesterol"
                            error={
                                !!touched.maxHeartRate && !!errors.maxHeartRate
                            }
                            helperText={getHelperText('maxHeartRate')}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="oldPeak"
                            label="Old Peak"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.oldPeak}
                            placeholder="5"
                            name="oldPeak"
                            error={!!touched.oldPeak && !!errors.oldPeak}
                            helperText={getHelperText('oldPeak')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            setFieldValue={setFieldValue}
                            id={'chestPain'}
                            label="Chest Pain"
                            choices={[
                                'Typical Angina',
                                'Atypical Angina',
                                'Non-Anginal Pain',
                                'Asymptomatic',
                            ]}
                            error={!!touched.chestPain && !!errors.chestPain}
                            onChange={handleChange}
                            setFieldTouched={setFieldTouched}
                            value={values.chestPain}
                            helperText={getHelperText('chestPain')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            setFieldValue={setFieldValue}
                            id={'fastingBloodSugar'}
                            label="Fasting Blood Sugar"
                            choices={['Greater than 120 mg/dl', 'Otherwise']}
                            error={
                                !!touched.fastingBloodSugar &&
                                !!errors.fastingBloodSugar
                            }
                            onChange={handleChange}
                            setFieldTouched={setFieldTouched}
                            value={values.fastingBloodSugar}
                            helperText={getHelperText('fastingBloodSugar')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            setFieldValue={setFieldValue}
                            id={'restingElectrocardiogram'}
                            label="Resting Electrocardiogram"
                            choices={['Normal', 'STT', 'LVH']}
                            error={
                                !!touched.restingElectrocardiogram &&
                                !!errors.restingElectrocardiogram
                            }
                            onChange={handleChange}
                            setFieldTouched={setFieldTouched}
                            value={values.restingElectrocardiogram}
                            helperText={getHelperText(
                                'restingElectrocardiogram',
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            setFieldValue={setFieldValue}
                            id={'exerciseAngina'}
                            label="Exercise Angina"
                            choices={['Yes', 'No']}
                            error={
                                !!touched.exerciseAngina &&
                                !!errors.exerciseAngina
                            }
                            onChange={handleChange}
                            setFieldTouched={setFieldTouched}
                            value={values.exerciseAngina}
                            helperText={getHelperText('exerciseAngina')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            setFieldValue={setFieldValue}
                            id={'stSlope'}
                            label="ST Slope"
                            choices={['Up', 'Flat', 'Down']}
                            error={!!touched.stSlope && !!errors.stSlope}
                            onChange={handleChange}
                            setFieldTouched={setFieldTouched}
                            value={values.stSlope}
                            helperText={getHelperText('stSlope')}
                        />
                    </Grid>
                </Grid>
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="flex-end"
                    mt={theme.spacing(4)}>
                    <Box width="25%" display="flex" justifyContent="flex-end">
                        <Button
                            color="primary"
                            variant="contained"
                            endIcon={<MonitorHeartIcon />}
                            type="submit">
                            Diagnose
                        </Button>
                    </Box>
                </Box>
            </form>
        );
    };

    const handleFormSubmit = values => {
        console.log(values);
        createHeartBeat(values);
    };

    return (
        <Paper
            variant="outlined"
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                margin: 'auto',
                justifyContent: 'center',
                padding: theme.spacing(4),
            }}>
            <Typography sx={{ marginBottom: theme.spacing(4) }} variant="h5">
                Fill in the form to get your diagnosis
            </Typography>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={HeartBeatSchema}>
                {renderForm}
            </Formik>
        </Paper>
    );
}
