const SemesterRegistrationStatus = ['UPCOMING', 'ENDED', 'ONGOING'];

export const SemesterRegistrationStatusEnum = {
    UPCOMING: 'UPCOMING',
    ENDED: 'ENDED',
    ONGOING: 'ONGOING',
} as const;

const SemesterRegistrationConstants = {
    SemesterRegistrationStatus,
};

export default SemesterRegistrationConstants;
