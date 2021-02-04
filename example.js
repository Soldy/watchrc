const watchrc = new (require('./index.js')).base();


watchrc.add('1');
watchrc.init(
    function(){
        console.log('Thats all');
    }
);
