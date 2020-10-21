# Real Challenge File watcher


Simple Inotify alternative for nodejs.



## init

```javascript

const watchrc = new (require('watchrc')).watchrc();


watchrc.init(
     function(){
              testChange = true;
     }
);

```


## add file to watch

```javascript
watchrc.add(
    'patch/file'
);

```


