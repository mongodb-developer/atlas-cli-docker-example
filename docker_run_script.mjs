#!/usr/bin/env zx

$.verbose = true;

const runtimeTimestamp = Date.now();

process.env.MONGODB_CLUSTER_NAME = process.env.MONGODB_CLUSTER_NAME || "examples";
process.env.MONGODB_USERNAME = process.env.MONGODB_USERNAME || "demo";
process.env.MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "password1234";
process.env.MONGODB_DATABASE = process.env.MONGODB_DATABASE || "business_" + runtimeTimestamp;
process.env.MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || "people_" + runtimeTimestamp;
process.env.CLEANUP_ONDESTROY = process.env.CLEANUP_ONDESTROY || false;

var app;

process.on("SIGTERM", () => { 
    console.log("SIGTERM"); 
    app.kill("SIGTERM");
});

try {
    let createClusterResult = await $`atlas clusters create ${process.env.MONGODB_CLUSTER_NAME} --tier M0 --provider AWS --region US_EAST_1 --output json`;
    await $`atlas clusters watch ${process.env.MONGODB_CLUSTER_NAME}`
    let loadSampleDataResult = await $`atlas clusters loadSampleData ${process.env.MONGODB_CLUSTER_NAME} --output json`;
} catch (error) {
    console.log(error.stdout);
}

try {
    let createAccessListResult = await $`atlas accessLists create --currentIp --output json`;
    let createDatabaseUserResult = await $`atlas dbusers create --role readWriteAnyDatabase,dbAdminAnyDatabase --username ${process.env.MONGODB_USERNAME} --password ${process.env.MONGODB_PASSWORD} --output json`;
    await $`sleep 10`
} catch (error) {
    console.log(error.stdout);
}

try {
    let connectionString = await $`atlas clusters connectionStrings describe ${process.env.MONGODB_CLUSTER_NAME} --output json`;
    let parsedConnectionString = new URL(JSON.parse(connectionString.stdout).standardSrv);
    parsedConnectionString.username = encodeURIComponent(process.env.MONGODB_USERNAME);
    parsedConnectionString.password = encodeURIComponent(process.env.MONGODB_PASSWORD);
    parsedConnectionString.search = "retryWrites=true&w=majority";
    process.env.MONGODB_ATLAS_URI = parsedConnectionString.toString();
    app = $`node main.js`;
} catch (error) {
    console.log(error.stdout);
}