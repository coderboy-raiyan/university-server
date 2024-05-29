import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyFromDB = async (payload: TAcademicFaculty) => {
    const isExists = await AcademicFaculty.isAcademicFacultyAlreadyExists({ name: payload.name });
    if (isExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, `${payload.name} already exists!`);
    }
    const result = await AcademicFaculty.create(payload);
    return result;
};
const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find({});
    return result;
};
const getSingleAcademicFaultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findOne({ _id: id });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, `Faculty does not exists!`);
    }
    return result;
};

const updateAcademicFacultyToDB = async (id: string, payload: TAcademicFaculty) => {
    const isExists = await AcademicFaculty.isAcademicFacultyAlreadyExists({ name: payload.name });
    if (isExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, `${payload.name} already exists!`);
    }
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, `Faculty does not exists!`);
    }
    return result;
};

export const AcademicFacultyService = {
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFaultyFromDB,
    createAcademicFacultyFromDB,
    updateAcademicFacultyToDB,
};
