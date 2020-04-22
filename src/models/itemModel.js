import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ItemSchema = new Schema({
    name:{
        type: String,
        required: true,
    },

    priceIGV: {
        type: Number,
        required: true,
    },

    priceNoIGV: {
        type: Number
    },

    cantidad: {
        type: Number,
        default: 0,
    },

    codigo: {
        type: String,
        required: true,
        trim: true,
    },

    tipo: {
        type: String,
        default: 'Indefinido',
    },

    unidadDeMedida:{
        type: String,
        default: 'UND',
        trim: true
    }

});



