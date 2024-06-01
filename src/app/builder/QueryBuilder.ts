import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public ModelQuery: Query<T[], T>;
    private query: Record<string, unknown>;

    constructor(QueryModel: Query<T[], T>, query: Record<string, unknown>) {
        this.ModelQuery = QueryModel;
        this.query = query;
    }

    search(searchAbleFields: string[]) {
        const searchTerm = this.query?.searchTerm || '';

        this.ModelQuery = this.ModelQuery.find({
            $or: searchAbleFields.map((field) => {
                return {
                    [field]: { $regex: searchTerm, $options: 'i' },
                };
            }),
        } as FilterQuery<T>);

        return this;
    }
    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

        excludeFields.forEach((el) => delete queryObj[el]);
        this.ModelQuery = this.ModelQuery.find(queryObj as FilterQuery<T>);

        return this;
    }

    sort() {
        const sort = this.query?.sort || '-createdAt';
        this.ModelQuery = this.ModelQuery.sort(sort as string);
        return this;
    }

    paginate() {
        const limit = Number(this.query?.limit) || 10;
        const page = Number(this.query?.page) || 1;
        const skip = (page - 1) * limit;

        this.ModelQuery = this.ModelQuery.skip(skip).limit(limit);

        return this;
    }

    fields() {
        const fields = (this.query.fields as string)?.split(',')?.join(' ') || '-__v';
        this.ModelQuery = this.ModelQuery.select(fields);
        return this;
    }
}

export default QueryBuilder;
