import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentFromDB = async (payload: TAcademicDepartment) => {
    const isDepartmentExists = await AcademicDepartment.isDepartmentAlreadyExists(payload);
    if (isDepartmentExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, `${payload.name} department already exists!`);
    }
    const result = await AcademicDepartment.create(payload);
    return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find({});
    return result;
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findOne({ _id: id });
    return result;
};

const updateAcademicDepartmentToDB = async (id: string, payload: TAcademicDepartment) => {
    const isDepartmentExists = await AcademicDepartment.isDepartmentAlreadyExists(payload);
    if (isDepartmentExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, `${payload.name} department already exists!`);
    }
    const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

export const AcademicDepartmentService = {
    createAcademicDepartmentFromDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentToDB,
};
