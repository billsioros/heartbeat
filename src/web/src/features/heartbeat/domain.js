function createReverseDictionary(dictionary) {
    const reverseDictionary = {};
    for (const [key, value] of Object.entries(dictionary)) {
        reverseDictionary[value] = key;
    }
    return reverseDictionary;
}

export const Sex = {
    Male: 1,
    Female: 2,
};

export const ChestPain = {
    'Typical Angina': 1,
    'Atypical Angina': 2,
    'Non-Anginal Pain': 3,
    Asymptomatic: 4,
};

export const RestingElectrocardiogram = {
    Normal: 1,
    STT: 2, // ST-T wave abnormality
    LVH: 3, // Left ventricular hypertrophy
};

export const StSlope = {
    Up: 1,
    Flat: 2,
    Down: 3,
};

// Creating reverse dictionaries
export const ReverseSex = createReverseDictionary(Sex);
export const ReverseChestPain = createReverseDictionary(ChestPain);
export const ReverseRestingElectrocardiogram = createReverseDictionary(
    RestingElectrocardiogram,
);
export const ReverseStSlope = createReverseDictionary(StSlope);

// Function to get enum values from dictionaries
export function getEnumValue(dictionary, key) {
    console.log(dictionary, key);
    const value = dictionary[key];
    if (value === undefined) {
        throw new Error(`Invalid value: ${key}`);
    }
    return value;
}
