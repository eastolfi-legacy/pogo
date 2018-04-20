#!/usr/bin/env node
"use strict";

var debug = require("debug")("express:server");
var http = require("http");
var Server = require("./server/app").Server;

debug.enabled = true;

var app = Server.bootstrap().app;

var port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

var server = http.createServer(app);

server.listen(port);

server.on("error", onError);
server.on("listening", onListening);


function normalizePort(value) {
    var port = parseInt(value, 10);

    if (isNaN(port)) {
        return value;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    switch (error.code) {
        case "EACESS":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var address = server.address();
    var bind = typeof port === "string"
        ? "pipe " + address
        : "port " + address.port;

    debug("Listening on " + bind);
}
