import sendErrorResponse from "../errors/sendErrorResponse.js";

export default function validateSchema(res, body, schema) {
    return new Promise((resolve) => {
        const validateBody = schema.validate(body, { abortEarly: false });
        if (validateBody.error) {
            const message = validateBody.error.details.map((detail) => detail.message).join("\n");
            return sendErrorResponse(res, { type: "unprocessable", message });
        }
        resolve();
    });
}
