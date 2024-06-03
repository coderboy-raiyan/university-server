import User from '../user/user.model';

async function findTheLastCreatedId(): Promise<string | null> {
    const foundedId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({
        createdAt: -1,
    });
    return foundedId?.id || null;
}

async function generateAutoIncrementalId() {
    let initialId = `A-${(0).toString().padStart(4, '0')}`;

    const foundedId = await findTheLastCreatedId();

    if (foundedId) {
        initialId = `A-${(parseInt(foundedId.split('A-')[1]) + 1).toString().padStart(4, '0')}`;
    } else {
        initialId = `A-${(parseInt(initialId.split('A-')[1]) + 1).toString().padStart(4, '0')}`;
    }

    return initialId;
}

const AdminUtils = {
    generateAutoIncrementalId,
};

export default AdminUtils;
