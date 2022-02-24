import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ExchangeSchema = new Schema(
    {
        rateAsBid: {
            type: Number,
        },
        rateAsAsk: {
            type: Number,
        },
        currencyPair: {
            type: String,
            required: true,
        },
        timestampFromSource: {
            type: Number,
        },
        timestampAtInsertion: {
            type: Number,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const Exchange = mongoose.model('Exchange', ExchangeSchema);
export default Exchange;
