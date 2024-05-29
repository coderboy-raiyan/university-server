import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyFromDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
};
const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find({});
    return result;
};
const getSingleAcademicFaultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findOne({ _id: id });
    return result;
};

const updateAcademicFacultyToDB = async (id: string, payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

export const AcademicFacultyService = {
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFaultyFromDB,
    createAcademicFacultyFromDB,
    updateAcademicFacultyToDB,
};
