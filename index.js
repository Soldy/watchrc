"use strict"

const fs = require('fs');


exports.watchrc = function(){
     this.add = function(inputFile){
          files.push(inputFile);
     }
     this.init= function(inputFunction){
         eventFunction = inputFunction;
         restart();
     }

     let restart = function (){
         try{
              clearTimeout(interval);
         }catch(e){}
         interval = setTimeout(
             check,
             500
         );
     }
     let check = function (){
         let currentBuffer = {};
         readError  = [];
         differents = [];
         for (let i of files)
              try{
                  currentBuffer[i] = fs.statSync(i);
                  if (typeof holdBuffer[i] !== "undefined")
                      if (currentBuffer[i]['ctimeMs'] !== holdBuffer[i]['ctimeMs'])
                          differents.push(i);
                  holdBuffer[i] = currentBuffer[i];
              }catch(e){
                  readError.push(i);
              }
        runEvent();
        restart();
     }
     let readError     = [],
         differents    = [],
         holdBuffer    = {},
         files         = [],
         interval      = "",
         eventFunction  = function(){};

     let runEvent = function(){
         if (differents.length>0)
             eventFunction();
     }
}

