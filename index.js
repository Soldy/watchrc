'use strict';

const fs = require('fs');


exports.watchrc = function(){
    /*
     * @param {string} inputFile
     * @public
     * @return {boolean}
     */
    this.add = function(inputFile){
        if(typeof inputFile !== 'string')
            return false;
        if(typeof fileCountRun[inputFile] !== 'undefined')
            return false;
        fs.watch(
            inputFile, 
            { encoding: 'buffer' }, 
            runEvent
        );
        fileCountRun[inputFile] = 0;
        return true;
    };
    /*
     * @param {function} inputFunction
     * @public
     */
    this.init= function(inputFunction){
        if(typeof inputFunction !== 'function')
            return false;
        eventFunction = inputFunction;
        return true;
    };
    /*
     * @public
     * @return {object}
     */
    this.get = function(inputFile){
        return {
            'lastRun'        : lastRun,
            'runCount'       : countRun,
            'runCountByFlie' : fileCountRun

        };
    };
    /*
     * @private
     *
     */
    let fileCountRun  = {};
    /*
     * @private
     *
     */
    let countRun  = 0;
    /*
     * @private
     *
     */
    let lastRun  = false;
    /*
     * @private
     *
     */
    let eventFunction  = function(){};
    /*
     * @private
     *
     */
    let runEvent = function(eventType, inputFile){
        eventFunction();
        countRun++;
        lastRun=(+new Date);
        fileCountRun[inputFile]++;
    };
};

