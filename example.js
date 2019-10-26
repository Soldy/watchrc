const watchrc = new (require('./index.js')).watchrc();


watchrc.add('1');
watchrc.init(
    function(){
        console.log('Thats all');
    }
);
