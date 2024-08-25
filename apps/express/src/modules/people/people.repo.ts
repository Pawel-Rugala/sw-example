import { People, PeopleFieldsToReturn } from "@repo/schemas";
import { Collection, MongoClient } from "mongodb";

export class PeopleRepository {
    private readonly db: Collection<People>;

    constructor(mongoClient: MongoClient) {
        this.db = mongoClient.db("dev").collection<People>("people");
    }

    private getProjection = (fieldsToReturn: PeopleFieldsToReturn) => {
        return fieldsToReturn
            ? fieldsToReturn.reduce(
                  (acc, field) => {
                      acc[field] = 1;
                      return acc;
                  },
                  {} as Record<string, 1>
              )
            : { _id: 0 };
    };

    public getPeople = async (page: number, pageSize: number, fieldsToReturn: PeopleFieldsToReturn) => {
        try {
            const projection = this.getProjection(fieldsToReturn);
            const results = await this.db
                .aggregate([
                    {
                        $facet: {
                            metadata: [{ $count: "totalCount" }],
                            data: [{ $project: projection }, { $skip: (page - 1) * pageSize }, { $limit: pageSize }],
                        },
                    },
                ])
                .toArray();

            return {
                metadata: {
                    totalCount: results[0].metadata[0].totalCount,
                    page,
                    pageSize,
                },
                data: results[0].data,
            };
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    };

    public createPerson = async (person: People) => this.db.insertOne(person);

    public getPerson = async (key: number, fieldsToReturn: PeopleFieldsToReturn) => {
        const projection = this.getProjection(fieldsToReturn);
        return await this.db.findOne({ key }, { projection });
    };

    public updatePerson = async (key: number, person: Partial<People>) =>
        this.db.findOneAndUpdate({ key }, { $set: person }, { returnDocument: "after" });

    public deletePerson = async (key: number) => this.db.deleteOne({ key });
}
