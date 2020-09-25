#!/usr/bin/node
"use strict"


const nanoTest = new (require('nanoTest')).test();
const fs = require('fs');
const path = require('path');
const dir = '.tmp';
const targetFile = dir+'file';
const watchrc = new (require('./index.js')).watchrc();
const sleep = (require("cheapest-sleep")).sleep;

const deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
let testChange = false;



nanoTest.add( 
    'create tmp dir',
    {
        "function":function(){
            if (!fs.existsSync(dir)){
                 fs.mkdirSync(dir);
                 return true;
            }
            return false;
        },
        "options":[]
     },
     "==",
     true
);



nanoTest.add( 
    'create watch',
    {
        "function":watchrc.init,
        "options":[
            function(){
                testChange = true;
            }
        ]
     },
     "==",
     true
);


nanoTest.add( 
    'create file',
    {
        "function":function(){
            fs.writeFileSync(
                targetFile, 
                'anni',
                { 
                    encodind : 'utf8',
                    mode     : 0o755 
                }
            );
            return true;
        },
        "options":[]
     },
     "==",
     true
);

nanoTest.add( 
    'create file watch',
    {
        "function":function(){
            return watchrc.add(targetFile);
        },
        "options":[]
     },
     "==",
     true
);


nanoTest.add( 
    'change file',
    {
        "function":function(){
            fs.appendFileSync(
                 targetFile, 
                 'anni',
                 {
                     encoding : 'utf8',
                     mode     : 0o755 
                 }
            );
            return true;
        },
        "options":[]
     },
     "==",
     true
);

nanoTest.add( 
    'check watcher',
    {
        "function":async function(){
            await sleep(3);
            return testChange;
        },
        "options":[]
     },
     "==",
     true
);


nanoTest.add( 
    'stop watch',
    {
        "function":watchrc.stop,
        "options":[]
     },
     "==",
     true
);

nanoTest.add( 
    'delete file',
    {
        "function":function(){
             fs.unlinkSync(targetFile);
             return true;
        },
        "options":[]
     },
     "===",
     true
);




nanoTest.add( 
    'delete tmp dir',
    {
        "function":function(){
            if (fs.existsSync(dir)){
                 deleteFolderRecursive(dir);
                 return true;
            }
            return false;
        },
        "options":[]
     },
     "==",
     true
);


nanoTest.run();
