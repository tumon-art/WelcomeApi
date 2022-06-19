import mongoose from 'mongoose'

const SavedIPSchema = new mongoose.Schema({
    ip:{ type: String},
    date:{ type: String},
    time:{ type: String},
    visit:{type: Number}
})

export default mongoose.models.SavedIP || mongoose.model('SavedIP', SavedIPSchema)