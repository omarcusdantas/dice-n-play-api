import sendErrorResponse from "../errors/sendErrorResponse.js";

export default function parseBody(req, res) {
    return new Promise((resolve) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const requestData = JSON.parse(body);
                resolve(requestData);
            } catch (error) {
                sendErrorResponse(res, { type: "unprocessable", message: "Body is not a valid JSON" });
            }
        });
    });
}
