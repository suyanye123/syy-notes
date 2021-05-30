# nextcloud性能优化

### 1.更改后台执行方式

NC的后台任务执行方式分为3中，`AJAX`、`Webcron`、`Cron`

默认是AJAX即在每次访问Nextcloud任意页面都会通过AJAX的方式发起定时任务的执行请求，这种方式如果没有自己的独立服务器或者VPS的话还是比较方便省心的

但官方推荐使用`Cron`，和Nginx或Apache等WEB服务独立开来，互不影响

在Nextcloud设置 — 基本设置里，选择为 `Cron`

进入容器修改

```bash
 docker exec --user www-data nextcloud php cron.php
```



### 2.内存缓存

**给nextcloud配置redis锁（网上有很多nc性能优化都提到了这个）**

通过使用内存作为数据缓存的话，可以提高NC的性能，以加快WEB端的访问速度，并且Nextcloud支持多个内存缓存后端，如`APCu`、`Redis`、`Memcached` 来缓存资源文件或者采用CDN加速等等手段

Nextcloud支持多个不同类型的缓存后端，所以可以同时启用本地缓存（APCu）和分布式缓存（Memcached、Redis）

官方推荐的组合是APCu+Redis其他的缓存后端配置请参阅：[Nextcloud内存缓存优化的官方文档](https://docs.nextcloud.com/server/18/admin_manual/configuration_server/caching_configuration.html)

docker装redis，修改config.php，增加锁的引用。

效果非常明显，sql语句只有insert 语句了，这个是正常的。IO也没之前高了。

### 3.启用http2，提高加载速度

nginx.conf 如下

```nginx
server
{
    #基础配置，这些可以照搬宝塔的配置
    listen 80;
    listen 443 ssl http2;
    server_name file.bugxia.com;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/file.bugxia.com;
    client_max_body_size 10G; 
    fastcgi_buffers 64 4K;
    gzip on;
    gzip_vary on;
    gzip_comp_level 4;
    gzip_min_length 256;
    gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
    gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy;
    
    #nextcloud包含了403和404的错误页面
    error_page 403 /core/templates/403.php;
    error_page 404 /core/templates/404.php;
    
    #防止一些HTTP响应头引起的安全隐患
    add_header Strict-Transport-Security 'max-age=15552000';
    add_header X-Content-Type-Options 'nosniff';
    add_header X-Robots-Tag 'none';
    add_header X-Frame-Options 'SAMEORIGIN';
    add_header X-Download-Options 'noopen';
    add_header X-Permitted-Cross-Domain-Policies 'none';
    add_header X-XSS-Protection '1;mode=block';
    add_header Referrer-Policy "no-referrer";

    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    ssl_certificate    /www/server/panel/vhost/cert/file.bugxia.com/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/file.bugxia.com/privkey.pem;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    error_page 497  https://$host$request_uri;
    #SSL-END

    #PHP-INFO-START  PHP引用配置，可以注释或修改
    #include enable-php-74.conf;
    #PHP-INFO-END
    
    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/file.bugxia.com.conf;
    #REWRITE-END
    
    location = /.well-known/carddav {
      return 301 $scheme://$host:$server_port/remote.php/dav;
    }
    location = /.well-known/caldav {
      return 301 $scheme://$host:$server_port/remote.php/dav;
    }

    location / {
        rewrite ^ /index.php;
    }
    
    #Let's Encrypt 证书续期验证目录
    location ~ \.well-known{
        allow all;
    }
    
    #nextcloud一些关键目录的权限设置
    location ~ ^\/(?:build|tests|config|lib|3rdparty|templates|data)\/ {
        deny all;
    }
    location ~ ^\/(?:\.|autotest|occ|issue|indie|db_|console) {
        deny all;
    }
    
    location ~ [^/]\.php(/|$) {
        fastcgi_split_path_info ^(.+?\.php)(\/.*|)$;
        set $path_info $fastcgi_path_info;
        try_files $fastcgi_script_name =404;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $path_info;
        fastcgi_param HTTPS on;
        fastcgi_param modHeadersAvailable true;
        #宝塔默认是include调用PHP相关配置，这里稍稍修改了一下，注意php版本 #加入了front_controller_active这项参数以隐藏页面URL中的index.php
        fastcgi_param front_controller_active true;
        fastcgi_pass unix:/tmp/php-cgi-74.sock;
        fastcgi_intercept_errors on;
        fastcgi_request_buffering off;
        include fastcgi.conf;
        include pathinfo.conf;
    }
    
    location ~ ^\/(?:updater|oc[ms]-provider)(?:$|\/) {
        try_files $uri/ =404;
        index index.php;
    }

    location ~ \.(?:css|js|woff2?|svg|gif|map)$ {
        try_files $uri /index.php$request_uri;
        add_header Cache-Control "public, max-age=15778463";
        add_header Referrer-Policy "no-referrer" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Download-Options "noopen" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Permitted-Cross-Domain-Policies "none" always;
        add_header X-Robots-Tag "none" always;
        add_header X-XSS-Protection "1; mode=block" always;
        access_log off;
    }

    location ~ \.(?:png|html|ttf|ico|jpg|jpeg|bcmap)$ {
        try_files $uri /index.php$request_uri;
        access_log off;
    }

    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
        error_log off;
        access_log /dev/null;
    }
    
    location ~ .*\.(js|css)?$
    {
        expires      12h;
        error_log off;
        access_log /dev/null; 
    }
}
```

### 4.停用无用的apps，降低系统负载

mysql 进去，看看变量，SHOW VARIABLES like '%flush%' 一看，

 innodb_flush_log_at_trx_commit 这个参数默认是1，就是最安全，性能最差的，改成0（找到my.cnf，docker卷下找到2个，全改了，重启mysql容器），

我可以接受1秒宕机，数据库丢失，因为数据库全挂了，nextcloud还可以通过scan命令重新扫描。

改成2的话，就是折中，没必要，直接改成0。

mysql binlog关闭，没什么用，还是那句话，mysql挂了都没问题，有文件就可以，

重新扫描，命令：docker exec nextcloud su www-data -s /bin/bash -c "php /var/www/html/occ files:scan —all” 【应该有点用】

### 5.上传速度优化

```
docker exec -u 1000 容器id bash    //进入容器
find / -name  'occ'		//找到nextcloud的安装文件，我们搜occ来找
php occ config:app:set files max_chunk_size --value 0 //进入目录执行（解除块大小限制）
```

参考：https://www.jianshu.com/p/55fd5ddafb1a

https://blog.csdn.net/qq_28718329/article/details/112687699

https://bugxia.com/1706.html