import joiBase from "joi";
import joiDate from "@joi/date";
const joi = joiBase.extend(joiDate);

export const schemaCustomer = joi.object({
    name: joi.string().min(3).max(100).required(),
    phone: joi.string().length(11).pattern(/^\d+$/).required(),
    birthday: joi.date().format("DD-MM-YYYY").required(),
});
