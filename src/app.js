import http from "http";
import { parse } from "url";
import router from "./routes/index.routes.js";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const { pathname, query } = parse(req.url, true);
    req.path = pathname;
    req.query = query;

    router(req, res);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});
