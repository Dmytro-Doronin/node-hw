
import {
    dbBlacklistCollections,
    dbBlogCollections,
    dbCommentsCollections, dbDeviceCollections, dbRateLimitCollections,
    dbUsersCollections
} from "../../db/dbCollections";
import {dbPostCollections} from "../../db/dbCollections";

export const deleteAllDataMutation = {
    async deleteAllDataFromDb () {
        try {
            await dbBlogCollections.deleteMany({})
            await dbPostCollections.deleteMany({})
            await dbUsersCollections.deleteMany({})
            await dbCommentsCollections.deleteMany({})
            await dbBlacklistCollections.deleteMany({})
            await dbDeviceCollections.deleteMany({})
            await dbRateLimitCollections.deleteMany({})
        } catch (e) {
            throw new Error('All data was not deleted')
        }

    }
}