import User from '../user/user.model';

async function findTheLastCreatedId(): Promise<string | null> {
    const foundedId = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 }).sort({
        createdAt: -1,
    });
    return foundedId?.id || null;
}

async function generateAutoIncrementalId() {
    let initialId = `F-${(0).toString().padStart(4, '0')}`;

    const foundedId = await findTheLastCreatedId();

    if (foundedId) {
        initialId = `F-${(parseInt(foundedId.split('F-')[1]) + 1).toString().padStart(4, '0')}`;
    } else {
        initialId = `F-${(parseInt(initialId.split('F-')[1]) + 1).toString().padStart(4, '0')}`;
    }

    return initialId;
}

const FacultyUtils = {
    generateAutoIncrementalId,
};

export default FacultyUtils;
