import { TAcademicSemesterCode, TAcademicSemesterName, TMonth } from './academicSemester.interface';

const SemesterName: TAcademicSemesterName[] = ['Autumn', 'Summer', 'Fall'] as const;

const SemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'] as const;

const Months: TMonth[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] as const;

// export type TSemesterAndCodeMapType = {};

const SemesterAndCodeMap = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};

const AcademicSemesterConstant = {
    SemesterName,
    SemesterCode,
    Months,
    SemesterAndCodeMap,
};

export default AcademicSemesterConstant;
