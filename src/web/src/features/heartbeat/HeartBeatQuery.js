import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from '../../providers/SnackbarProvider';
import {
    ChestPain,
    RestingElectrocardiogram,
    Sex,
    StSlope,
    getEnumValue,
} from './domain';

export const heartbeatQueryKeys = {
    all: ['heartbeats'],
    id: id => [...heartbeatQueryKeys.all, 'id', id],
};

export const handleResponse = async request => {
    try {
        return (await request).data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error;

            if (axiosError.response) {
                if (axiosError.response.status === 422) {
                    const validationError = axiosError.response.data;

                    const errorMessage =
                        validationError?.detail?.[0]?.msg ??
                        `Request failed with status ${axiosError.response.status}`;

                    throw new Error(errorMessage);
                }

                const genericError = axiosError.response.data;

                const errorMessage =
                    genericError?.detail ??
                    `Request failed with status ${axiosError.response.status}`;

                throw new Error(errorMessage);
            } else if (axiosError.request) {
                // The request was made but no response was received
                // `axiosError.request` is an instance of XMLHttpRequest in the browser
                // and an instance of http.ClientRequest in node.js
                console.log(axiosError.request);

                const errorMessage = 'No response was received';

                throw new Error(errorMessage);
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(
                    `Setting up the request failed (${axiosError.message})`,
                );
            }
        } else {
            // Handle non-Axios errors here
            throw error;
        }
    }
};

const publicClient = axios.create({
    baseURL: `${__BACKEND_URL__ ?? ''}/api`,
});

export const useHeartBeats = () => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: heartbeatQueryKeys.all, // Use predefined query key
        queryFn: async () =>
            await handleResponse(publicClient.get('/heartbeats')),
    });

    return { isLoading, isError, error, heartbeats: data };
};

export const useHeartBeat = id => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: heartbeatQueryKeys.id(id), // Use predefined query key
        queryFn: async () =>
            await handleResponse(publicClient.get(`/heartbeats/${id}`)),
    });

    return { isLoading, isError, error, heartbeat: data };
};

export function useCreateHeartBeat() {
    const { register } = useSnackbar();
    const queryClient = useQueryClient();

    const { mutateAsync, error } = useMutation({
        mutationFn: async heartbeat =>
            await handleResponse(publicClient.post('/heartbeats', heartbeat)),
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: heartbeatQueryKeys.all,
            });
        },
        onSuccess: (data, heartbeat, context) => {
            register({
                severity: 'success',
                message: `Created HeartBeat ${data.id}`,
            });
        },
        onError: (error, heartbeat, context) => {
            queryClient.invalidateQueries({ queryKey: heartbeatQueryKeys.all });

            register({
                severity: 'error',
                message: `Failed to create HeartBeat (${error.message})`,
            });
        },
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries({ queryKey: heartbeatQueryKeys.all });
        },
    });

    const createHeartBeat = async values => {
        await mutateAsync({
            age: values.age,
            sex: getEnumValue(Sex, values.sex),
            chest_pain_type: getEnumValue(ChestPain, values.chestPain),
            resting_blood_pressure: values.restingBloodPressure,
            cholesterol: values.cholesterol,
            fasting_blood_sugar: values.fastingBloodSugar !== 'Otherwise',
            resting_electrocardiogram: getEnumValue(
                RestingElectrocardiogram,
                values.restingElectrocardiogram,
            ),
            max_heart_rate: values.maxHeartRate,
            exercise_angina: values.exerciseAngina === 'Yes',
            old_peak: values.oldPeak,
            st_slope: getEnumValue(StSlope, values.stSlope),
        });
    };

    return { createHeartBeat, error };
}
