import joi from "joi";

export const schemaGame = joi.object({
    name: joi.string().min(3).max(100).required(),
    stock: joi.number().integer().min(1).required(),
    pricePerDay: joi.number().integer().min(100).required(),
});
