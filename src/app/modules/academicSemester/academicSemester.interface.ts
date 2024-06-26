/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TMonth =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemesterAndCodeMapperType = {
    [key: string]: string;
};

export type TAcademicSemester = {
    name: TAcademicSemesterName;
    code: TAcademicSemesterCode;
    year: string;
    startMonth: TMonth;
    endMonth: TMonth;
};

export type TAcademicModel = Model<TAcademicSemester> & {
    isSemesterExistsInTheSameYear(payload: TAcademicSemester): TAcademicSemester | null;
};
