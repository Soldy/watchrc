"use strict";

const fs = require("fs");


exports.watchrc = function(){
    /*
     * @param string {inputFile}
     * @public
     * boolean
     */
    this.add = function(inputFile){
        if(typeof inputFile !== "string")
            return false;
        files.push(inputFile);
        return true;
    };
    /*
     * @param function {inputFunction}
     * @public
     */
    this.init= function(inputFunction){
        if(typeof inputFunction !== "function")
            return false;
        eventFunction = inputFunction;
        restart();
        return true;
    };
    /*
     * @private
     *
     */
    let restart = function (){
        if(interval !== false) 
            clearTimeout(interval);
        interval = setTimeout(
            check,
            500
        );
    };
    /*
     * @private
     *
     */
    let check = function (){
        let currentBuffer = {};
        readError  = [];
        differents = [];
        for (let i of files)
            try{
                currentBuffer[i] = fs.statSync(i);
                if (typeof holdBuffer[i] !== "undefined")
                    if (currentBuffer[i]["ctimeMs"] !== holdBuffer[i]["ctimeMs"])
                        differents.push(i);
                holdBuffer[i] = currentBuffer[i];
            }catch(e){
                readError.push(i);
            }
        runEvent();
        interval = false;
        restart();
    };
    /*
     * @private
     *
     */
    let readError     = [];
    /*
     * @private
     *
     */
    let differents    = [];
    /*
     * @private
     *
     */
    let holdBuffer    = {};
    /*
     * @private
     *
     */
    let files         = [];
    /*
     * @private
     *
     */
    let interval      = false;
    /*
     * @private
     *
     */
    let eventFunction  = function(){};
    /*
     * @private
     *
     */
    let runEvent = function(){
        if (differents.length>0)
            eventFunction();
    };
};

