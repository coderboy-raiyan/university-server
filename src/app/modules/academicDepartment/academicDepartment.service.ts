import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentFromDB = async (payload: TAcademicDepartment) => {
    const isExists = await AcademicDepartment.isDepartmentAlreadyExists({ name: payload.name });
    if (isExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, `${payload.name} already exists!`);
    }
    const result = await AcademicDepartment.create(payload);
    return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find({}).populate('academicFaculty');
    return result;
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findOne({ _id: id }).populate('academicFaculty');
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, `Department does not exists!`);
    }
    return result;
};

const updateAcademicDepartmentToDB = async (id: string, payload: TAcademicDepartment) => {
    if (payload.name) {
        const isExists = await AcademicDepartment.isDepartmentAlreadyExists({ name: payload.name });
        if (isExists) {
            throw new ApiError(httpStatus.NOT_ACCEPTABLE, `${payload.name} already exists!`);
        }
    }

    const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, { new: true });

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, `Department does not exists!`);
    }

    return result;
};

export const AcademicDepartmentServices = {
    createAcademicDepartmentFromDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentToDB,
};
