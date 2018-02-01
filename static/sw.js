const CACHE_NAME = 'service-worker-demo';

console.log('begin');

this.addEventListener('install', function (event) {
    console.log('安装 sw.js');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                './'
            ]);
        })
    )
});

this.addEventListener('activate', function (event) {
    console.log('激活 sw.js，可以开始处理 fetch 请求。');
})

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