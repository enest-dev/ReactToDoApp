import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    createdOn: {
        type: Date,
        default: new Date().toISOString(),
    },
    updatedOn: {
        type: Date,
        default: new Date().toISOString(),
    },
    title: {
        type: String,
        required: 'Title is required',
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

TaskSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
});

export const TaskModel = mongoose.model('Tasks', TaskSchema);
