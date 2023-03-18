import Tweet from "../models/tweet.js";
class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        // console.log(data);
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in crud repo');
            throw error;
        }
    }

    async destroy(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log('Something went wrong in crud repo');
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log('Something went wrong in crud repo');
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log('Something went wrong in crud repo');
            throw error;
        }
    }

    async updata(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        } catch (error) {
            console.log('Something went wrong in crud repo');
            throw error;
        }
    }
}

export default CrudRepository; 