import {
    TAcademicSemesterAndCodeMapperType,
    TAcademicSemesterCode,
    TAcademicSemesterName,
    TMonth,
} from './academicSemester.interface';

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

const SemesterAndCodeMapper: TAcademicSemesterAndCodeMapperType = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};

const AcademicSemesterConstant = {
    SemesterName,
    SemesterCode,
    Months,
    SemesterAndCodeMapper,
};

export default AcademicSemesterConstant;
