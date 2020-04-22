import moongoose from 'mongoose';

import {ItemSchema} from '../models/itemModel';

const Item = moongoose.model('Item', ItemSchema);

const IGV = 0.18;

export const nuevoItem = async (req, res, next) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            priceIGV: req.body.priceIGV,
            codigo: req.body.codigo
        });

        newItem.priceNoIGV = getNoIGV_Price(newItem.priceIGV);
        
        if(req.body.cantidad)
            newItem.cantidad = req.body.cantidad;

        if(req.body.tipo)
            newItem.tipo = req.body.tipo;

        if(req.body.unidadDeMedida)
            newItem.unidadDeMedida = req.body.unidadDeMedida;

        var item = await newItem.save();

        if(item) return res.json(item);

        next(new Error('Error Desconocido'));

    } catch (error) {
        next(error);
    }
};

const getNoIGV_Price = (igvPrice) =>{
    var aprox_NO_IGV = igvPrice - (igvPrice*IGV);
    return Math.round(((aprox_NO_IGV) + Number.EPSILON) * 100) / 100;
};