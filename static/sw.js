const VERSION = 'v7';
const CACHE_NAME = 'service-worker-demo' + VERSION;

console.log('begin');

this.addEventListener('install', function (event) {
    console.log('安装 sw.js');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                './',
                'getList',
                'img/avatar.jpg',
                'js/index.js',
                'js/jquery.js'
            ]);
        })
    )
});

this.addEventListener('activate', function (event) {
    console.log('激活 sw.js，可以开始处理 fetch 请求。');
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (CACHE_NAME.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }))
        })
    )
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (resp) {
                if (resp) {
                    console.log(new Date(), 'fetch ', event.request.url, '有缓存，从缓存中取');
                    return resp;
                } else {
                    console.log(new Date(), 'fetch ', event.request.url, '没有缓存，网络获取');
                    return fetch(event.request)
                        .then(function (response) {
                            return caches.open(CACHE_NAME).then(function (cache) {
                                cache.put(event.request, response.clone());
                                return response;
                            })
                        })
                }
            })
    )
});
console.log('end');