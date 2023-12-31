import httpStatus from "http-status";

export default function sendErrorResponse(res, error) {
    switch (error.type) {
        case "unprocessable":
            res.writeHead(httpStatus.UNPROCESSABLE_ENTITY, { "Content-Type": "text/plain" });
            return res.end(error.message);
        case "badRequest":
            res.writeHead(httpStatus.BAD_REQUEST, { "Content-Type": "text/plain" });
            return res.end(error.message);
        case "notFound":
            res.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/plain" });
            return res.end(error.message);
        case "methodNotAllowed":
            res.writeHead(httpStatus.METHOD_NOT_ALLOWED, { "Content-Type": "text/plain" });
            return res.end("Method not allowed for this route");
        case "conflict":
            res.writeHead(httpStatus.CONFLICT, { "Content-Type": "text/plain" });
            return res.end(error.message);
        case "serverError":
            res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
            return res.end("Internal server error, try again later");
        default:
            res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
            return res.end("Try again later");
    }
}
