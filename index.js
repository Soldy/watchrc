/*
 *  @Soldy\watchrc\2021.02.04\GPL3
 */
'use strict';

const fs = require('fs');


/*
 * @prototype
 */
const watchrcBase = function(){
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
     * @return {boolean}
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
     * @var {object}
     */
    let fileCountRun  = {};
    /*
     * @private
     * @var {integer}
     */
    let countRun  = 0;
    /*
     * @private
     * @var {boolean}
     */
    let lastRun  = false;
    /*
     * @private
     */
    let eventFunction  = function(){};
    /*
     * @private
     */
    const runEvent = function(eventType, inputFile){
        eventFunction();
        countRun++;
        lastRun=(+new Date);
        fileCountRun[inputFile]++;
    };
};

exports.base =  watchrcBase;
