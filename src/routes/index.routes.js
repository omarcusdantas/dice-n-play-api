import httpStatus from "http-status";

export default function router(req, res) {
    if (req.path === "/games") {
        console.log("test");
    } else {
        res.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
}
