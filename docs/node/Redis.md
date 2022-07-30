# Redis详细入门教程

> Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。

Redis 的效率很高，官方给出的数据是 100000+ QPS，这是因为：

> Redis 完全基于内存，绝大部分请求是纯粹的内存操作，执行效率高。
>
> Redis 使用单进程单线程模型的（K，V）数据库，将数据存储在内存中，存取均不会受到硬盘 IO 的限制，因此其执行速度极快。 另外单线程也能处理高并发请求，还可以避免频繁上下文切换和锁的竞争，如果想要多核运行也可以启动多个实例。
>
> 数据结构简单，对数据操作也简单，Redis 不使用表，不会强制用户对各个关系进行关联，不会有复杂的关系限制，其存储结构就是键值对，类似于 HashMap，HashMap 最大的优点就是存取的时间复杂度为 O(1)。
>
> Redis 使用多路 I/O 复用模型，为非阻塞 IO。
>
> 注：Redis 采用的 I/O 多路复用函数：epoll/kqueue/evport/select。

[mac os 安装 redis - 简书](https://link.juejin.cn?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F3bdfda703552)

[在 windows 上安装 Redis - 官方](https://link.juejin.cn?target=https%3A%2F%2Fwww.redis.com.cn%2Fredis-installation)

有意思的是，官方的教程中提到了：

> Redis 官方不建议在 windows 下使用 Redis，所以官网没有 windows 版本可以下载。还好微软团队维护了开源的 window 版本，虽然只有 3.2 版本，对于普通测试使用足够了。

使用 Redis 实现登录挤出功能

https://juejin.cn/post/6854573216879345672 

---


作者：QQ 音乐前端团队

> 本文将会从：Redis 使用场景与介绍 -> 数据结构与简单使用 -> 小功能大用处 -> 持久化、主从同步与缓存设计 -> 知识拓展 来书写，初学的童鞋只要能记住 Redis 是用来干嘛，各功能的使用场景有哪些，然后对 Redis 有个大概的认识就好啦，剩下的以后有需要的时候再来查看和实践吧~

文章真的有亿点长，下面是目录，建议先收藏再看~

## **目录**

- Redis 介绍

- - Redis 是什么？
  - Redis 特性
  - Redis 典型使用场景
  - Redis 高并发原理
  - Redis 安装、启动
  - redis conf 配置文件

- Redis 数据结构与命令使用

- - 通用全局命令
  - 常用全局命令
  - 字符串使用
  - 哈希 hash
  - 列表（lists）
  - set 集合和 zset 有序集合

- 小功能大用处

- - 慢查询分析
  - Pipeline（流水线）机制
  - 事务与 Lua
  - Bitmaps
  - HyperLogLog
  - 发布订阅
  - GEO

- Redis 客户端

- 持久化、主从同步与缓存设计

- - 持久化
  - 主从同步
  - 缓存

- 知识拓展

- - 缓存与数据库同步策略
  - 分布式锁
  - 关于集群

## **Redis 介绍**

### **Redis 是什么？**

- Redis 是一个开源（BSD 许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件；
- Redis 支持多种类型的数据结构，如 字符串（strings），散列（hashes）， 列表（lists）， 集合（sets）， 有序集合（sorted sets） ，范围查询， bitmaps， hyperloglogs 和 地理空间（geospatial） 索引半径查询；
- Redis 内置了复制（replication），LUA 脚本（Lua scripting），LRU 驱动事件（LRU eviction），事务（transactions）和不同级别的 磁盘持久化（persistence）；
- Redis 通过 哨兵（Sentinel） 和自动分区（Cluster）提供高可用性（high availability）。

### **Redis 特性**

- 速度快
  \- 单节点读 110000次/s，写81000次/s

- - 数据存放内存中
  - 用 C 语言实现，离操作系统更近
  - 单线程架构，6.0 开始支持多线程（CPU、IO 读写负荷）

- 持久化

- - 数据的更新将异步地保存到硬盘（RDB 和 AOF）

- 多种数据结构 - 不仅仅支持简单的 key-value 类型数据，还支持：字符串、hash、列表、集合、有序集合，

- 支持多种编程语言

- 功能丰富
  \- HyperLogLog、GEO、发布订阅、Lua脚本、事务、Pipeline、Bitmaps，key 过期

- 简单稳定
  \- 源码少、单线程模型

- 主从复制

- Redis 支持数据的备份（master-slave）与集群（分片存储），以及拥有哨兵监控机制。

- Redis 的所有操作都是原子性的，同时 Redis 还支持对几个操作合并后的原子性执行。

### **Redis 典型使用场景**

**缓存:**

![img](https://pic1.zhimg.com/80/v2-22a3e214675f187378f31559930b3774_720w.jpg)

**计数器:**

![img](https://pic3.zhimg.com/80/v2-697ecd98a03c278020280f3d68a5602a_720w.jpg)

**消息队列:**

![img](https://pic2.zhimg.com/80/v2-5deb8fac4308f6ee57a3204b145bffcd_720w.jpg)

**排行榜:**

![img](https://pic4.zhimg.com/80/v2-16e7cf710d78802555c94dc72f910f43_720w.jpg)

**社交网络:**

![img](https://pic4.zhimg.com/80/v2-512daf33e3bf9f3046a33cb444a67bef_720w.jpg)

### **Redis 高并发原理**

1. Redis 是纯内存数据库，一般都是简单的存取操作，线程占用的时间很多，时间的花费主要集中在 IO 上，所以读取速度快
2. Redis 使用的是非阻塞 IO，IO 多路复用，使用了单线程来轮询描述符，将数据库的开、关、读、写都转换成了事件，减少了线程切换时上下文的切换和竞争。
3. Redis 采用了单线程的模型，保证了每个操作的原子性，也减少了线程的上下文切换和竞争。
4. Redis 存储结构多样化，不同的数据结构对数据存储进行了优化，如压缩表，对短数据进行压缩存储，再如，跳表，使用有序的数据结构加快读取的速度。
5. Redis 采用自己实现的事件分离器，效率比较高，内部采用非阻塞的执行方式，吞吐能力比较大。

### **Redis 安装**

这里只提供 linux 版本的安装部署

### **下载 Redis**

进入官网找到下载地址：[https://redis.io/download](https://link.zhihu.com/?target=https%3A//redis.io/download)

右键 Download 按钮，选择复制链接地址，然后进入 linux 的 shell 控制台：输入 wget 将上面复制的下载链接粘贴上，如下命令：

```text
wget https://download.redis.io/releases/redis-6.2.4.tar.gz
```

回车后等待下载完毕。

### **解压并安装 Redis**

下载完成后需要将压缩文件解压，输入以下命令解压到当前目录：

```text
tar -zvxf redis-6.2.4.tar.gz
```

解压后在根目录上输入 `ls` 列出所有目录会发现与下载 redis 之前多了一个 redis-6.2.4.tar.gz 文件和 redis-6.2.4 的目录。

![img](https://pic3.zhimg.com/80/v2-d1c861e126a6739a6e8262b18ed22fe6_720w.jpg)

### **移动 Redis 目录（可选）**

若你不想在下载的目录安装 Redis，可以将 Redis 移动到特定目录安装，我习惯放在 ‘/usr/local/’ 目录下，所以我这里输入命令将目前在 ‘/root’ 目录下的 'redis-6.2.4' 文件夹更改目录，同时修改其名字为 redis:

```text
mv /root/rredis-6.2.4 /usr/local/redis
```

`cd` 到 '/usr/local' 目录下输入 `ls` 命令可以查询到当前目录已经多了一个 redis 子目录，同时 '/root' 目录下已经没有 'redis-6.2.4' 文件:

![img](https://pic1.zhimg.com/80/v2-725273081589eac1604fa964e3512388_720w.jpg)

### **编译**

`cd` 到 '/usr/local/redis' 目录，输入命令 `make` 执行编译命令，接下来控制台会输出各种编译过程中输出的内容：

```text
make
```

最终运行结果如下:

![img](https://pic1.zhimg.com/80/v2-56b31d99d5d33c51e011197367665d44_720w.jpg)

### **安装**

输入以下命令:

```text
make PREFIX=/usr/local/redis install
```

这里多了一个关键字 'PREFIX=' 这个关键字的作用是编译的时候用于指定程序存放的路径。比如我们现在就是指定了 redis 必须存放在 '/usr/local/redis' 目录。假设不添加该关键字 linux 会将可执行文件存放在 '/usr/local/bin' 目录，库文件会存放在 '/usr/local/lib' 目录。配置文件会存放在 '/usr/local/etc 目录。其他的资源文件会存放在 'usr/local/share' 目录。这里指定好目录也方便后续的卸载，后续直接 `rm -rf /usr/local/redis` 即可删除 Redis。

执行结果如下图:

![img](https://pic3.zhimg.com/80/v2-032e10cf8f930642e704e9554cffe6be_720w.jpg)

到此为止，Redis 已经安装完毕，可以开始使用了～

### **Redis 启动**

根据上面的操作已经将 redis 安装完成了。在目录 ‘/usr/local/redis’ 输入下面命令启动 redis：

```text
./bin/redis-server&amp; ./redis.conf
```

上面的启动方式是采取后台进程方式,下面是采取显示启动方式(如在配置文件设置了 daemonize 属性为 yes 则跟后台进程方式启动其实一样):

```text
./bin/redis-server ./redis.conf
```

两种方式区别无非是有无带符号&的区别。redis-server 后面是配置文件，目的是根据该配置文件的配置启动 redis 服务。redis.conf 配置文件允许自定义多个配置文件，通过启动时指定读取哪个即可。

启动可以概括为：

- 最简默认启动
  \- 安装后在 bin 目录下直接执行 redis-server

- - 验证（ps –aux | grep redis）

- 动态参数启动（可配置一下参数，例如指定端口）
  \- ./bin/redis-server –port 6380

- 配置文件启动
  \- ./bin/redis-server& ./redis.conf

- 生产环境一般选择配置启动

- 单机多实例配置文件可以用端口区分开

注：若在进行 redis 命令操作，直接在 redis 中的 bin 目录下运行 redis-cli 命令即可，若开启了多个则需要加上对应的端口参数：

![img](https://pic2.zhimg.com/80/v2-49d77ab79d8036d319e6ae492a56bd9d_720w.jpg)

若运行 redis-cli 提示不未安装，则安装一下即可：

![img](https://pic1.zhimg.com/80/v2-41daf1935b73466ef2e3853e8533df58_720w.jpg)

### **redis.conf 配置文件**

在目录 '/usr/local/redis' 下有一个 redis.conf 的配置文件。我们上面启动方式就是执行了该配置文件的配置运行的。我们可以通过 `cat、vim、less` 等 linux 内置的读取命令读取该文件。

这里列举下比较重要的配置项：

![img](https://pic1.zhimg.com/80/v2-e3c2b17390c7eaa82b23cc579fa76234_720w.jpg)

| 配置项名称 | 配置项值范围 | 说明 |
| ---------- | ------------ | ---- |
|            |              |      |

这里我要将 daemonize 改为 yes，不然我每次启动都得在 redis-server 命令后面加符号 &，不这样操作则只要回到 linux 控制台则 redis 服务会自动关闭，同时也将 bind 注释，将 p rotected-mode 设置为 no。这样启动后我就可以在外网访问了。修改方式通过 vim 或者你喜欢的方式即可：

```text
vim /usr/local/redis/redis.conf
```

通过 /daemonize 查找到属性，默认是 no，更改为 yes 即可。(通过/关键字查找出现多个结果则使用 n 字符切换到下一个即可，按 i 可以开始编辑，ESC 退出编辑模式，输入 `:wq` 命令保存并退出)，如下图：

![img](https://pic3.zhimg.com/80/v2-9282a94dfea9d618d5caa3d509d5bfe2_720w.jpg)

其他属性也是同样方式查找和编辑即可。

安装部署部分参考：[https://www.cnblogs.com/hunanzp/p/12304622.html](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/hunanzp/p/12304622.html)

**Redis 数据结构与命令使用**

Redis 的数据结构有：string(字符串)、hash(哈希)、list(列表)、set(集合)、zset(有序集 合)。但这些只是 Redis 对外的数据结构，实际上每种数据结构都有自己底层的内部编码实现，而且是多种实现， 这样 Redis 会在合适的场景选择合适的内部编码。

![img](https://pic4.zhimg.com/80/v2-ccc438634911dad54de79c4ab1080cdb_720w.jpg)

可以看到每种数据结构都有两种以上的内部编码实现，例如 list 数据结 构包含了 linkedlist 和 ziplist 两种内部编码。同时，有些内部编码，例如 ziplist， 可以作为多种外部数据结构的内部实现，可以通过 `object encoding` 命令查询内部编码。

```text
object encoding xxx  # xxx 为键名
```

Redis 所有的数据结构都是以唯一的 key 字符串作为名称，然后通过这个唯一 key 值来获取相应的 value 数据。不同类型的数据结 构的差异就在于 value 的结构不一样。

### **通用全局命令**

### **常用全局命令**

- keys：查看所有键
- dbsize：键总数
- exists key：检查键是否存在
- del key [key ...]：删除键
- expire key seconds：键过期
- ttl key: 通过 ttl 命令观察键键的剩余过期时间
- type key：键的数据结构类型

### **简单使用截图**

![img](https://pic1.zhimg.com/80/v2-b9dca938e06109ebf7783742f80ea020_720w.jpg)

![img](https://pic4.zhimg.com/80/v2-8cfb88e0b4f33d66ea650361a4e6ebb7_720w.jpg)

根据上面的命令解释，大家应该比较容易看懂截图里面的所有命令含义，这里就不过多解释了。

### **字符串使用**

字符串 string 是 Redis 最简单的数据结构。Redis 的字符串是动态字符串，是可以修改的字符串，内部结构实现上类似于 Java 的 ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配。

字符串结构使用非常广泛，一个常见的用途就是缓存用户信息。我们将用户信息结构体 使用 JSON 序列化成字符串，然后将序列化后的字符串塞进 Redis 来缓存。同样，取用户 信息会经过一次反序列化的过程。

### **常用字符串命令**

- set key value [ex seconds][px milliseconds] [nx|xx]: 设置值，返回 ok 表示成功

- - ex seconds:为键设置秒级过期时间。
  - px milliseconds:为键设置毫秒级过期时间。
  - nx:键必须不存在，才可以设置成功，用于添加。可单独用 setnx 命令替代
  - xx:与 nx 相反，键必须存在，才可以设置成功，用于更新。可单独用 setxx 命令替代

- get key：获取值

- mset key value [key value ...]：批量设置值，批量操作命令可以有效提高业务处理效率

- mget key [key ...]：批量获取值，批量操作命令可以有效提高业务处理效率

- incr key：计数，返回结果分 3 种情况：

- - 值不是整数，返回错误。
  - 值是整数，返回自增后的结果。
  - 键不存在，按照值为 0 自增，返回结果为 1。

- decr(自减)、incrby(自增指定数字)、 decrby(自减指定数字)

### **字符串简单使用截图**

![img](https://pic2.zhimg.com/80/v2-264736a10070725de17fb0ed627c7799_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-0e4d39f60b3867670c223d079ef80076_720w.jpg)

根据上面的命令解释，大家应该比较容易看懂截图里面的所有命令含义，这里就不过多解释了。

### **字符串使用场景**

1. 缓存数据，提高查询性能。比如存储登录用户信息、电商中存储商品信息
2. 可以做计数器（想知道什么时候封锁一个 IP 地址(访问超过几次)）,短信限流
3. 共享 Session，例如：一个分布式 Web 服务将用户的 Session 信息(例如用户登录信息)保存在各自服务器中，这样会造成一个问题，出于负载均衡的考虑，分布式服务会将用户的访问均衡到不同服务器上，用户刷新一次访问可 能会发现需要重新登录，为了解决这个问题，可以使用 Redis 将用户的 Session 进行集中管理，在这种模式下只要保证 Redis 是高可用和扩展性的，每次用户 更新或者查询登录信息都直接从 Redis 中集中获取，如图：

![img](https://pic4.zhimg.com/80/v2-4c48047d4f2dd2b557d0f60c570ce09f_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-c1e4a037213b1696a02ae3299f2e79f9_720w.jpg)

### **哈希 hash**

哈希相当于 Java 中的 HashMap，以及 Js 中的 Map，内部是无序字典。实现原理跟 HashMap 一致。一个哈希表有多个节点，每个节点保存一个键值对。

与 Java 中的 HashMap 不同的是，rehash 的方式不一样，因为 Java 的 HashMap 在字典很大时，rehash 是个耗时的操作，需要一次性全部 rehash。

Redis 为了高性能，不能堵塞服务，所以采用了渐进式 rehash 策略。

渐进式 rehash 会在 rehash 的同时，保留新旧两个 hash 结构，查询时会同时查询两个 hash 结构，然后在后续的定时任务中以及 hash 操作指令中，循序渐进地将旧 hash 的内容一点点迁移到新的 hash 结构中。当搬迁完成了，就会使用新的 hash 结构取而代之。

当 hash 移除了最后一个元素之后，该数据结构自动被删除，内存被回收。

### **常用哈希命令**

- hset key field value：设置值
- hget key field：获取值
- hdel key field [field ...]：删除 field
- hlen key：计算 field 个数
- hmset key field value [field value ...]：批量设置 field-value
- hmget key field [field ...]：批量获取 field-value
- hexists key field：判断 field 是否存在
- hkeys key：获取所有 field
- hvals key：获取所有 value
- hgetall key：获取所有的 field-value
- incrbyfloat 和 hincrbyfloat:就像 incrby 和 incrbyfloat 命令一样，但是它们的作 用域是 filed

### **哈希简单使用截图**

![img](https://pic1.zhimg.com/80/v2-b88d21e550134ca0b8016857a356aba4_720w.jpg)

![img](https://pic4.zhimg.com/80/v2-63be5b426b54565f3ebc86c5ddb116e3_720w.jpg)

根据上面的命令解释，大家应该比较容易看懂截图里面的所有命令含义，这里同样不过多解释了

### **哈希使用场景**

1. Hash 也可以同于对象存储，比如存储用户信息，与字符串不一样的是，字符串是需要将对象进行序列化（比如 json 序列化）之后才能保存，而 Hash 则可以讲用户对象的每个字段单独存储，这样就能节省序列化和反序列的时间。如下：

1.gif

![img](https://pic1.zhimg.com/v2-2df9c06f2b5fb3226a47c83fed7e2d64_b.jpg)



1. 此外还可以保存用户的购买记录，比如 key 为用户 id，field 为商品 i d，value 为商品数量。同样还可以用于购物车数据的存储，比如 key 为用户 id，field 为商品 id，value 为购买数量等等:

![img](https://pic1.zhimg.com/80/v2-93725ee6ff04b372dc27cb7946d2002c_720w.jpg)

### **列表（lists）**

Redis 中的 lists 相当于 Java 中的 LinkedList，实现原理是一个双向链表（其底层是一个快速列表），即可以支持反向查找和遍历，更方便操作。插入和删除操作非常快，时间复杂度为 O(1)，但是索引定位很慢，时间复杂度为 O(n)。

0.gif

### **常用列表命令**

- rpush key value [value ...]：从右边插入元素

- lpush key value [value ...]：从左边插入元素

- linsert key before|after pivot value：向某个元素前或者后插入元素

- lrange key start end：获取指定范围内的元素列表，`lrange key 0 -1`可以从左到右获取列表的所有元素

- lindex key index：获取列表指定索引下标的元素

- llen key：获取列表长度

- lpop key：从列表左侧弹出元素

- rpop key：从列表右侧弹出

- lrem key count value：删除指定元素，lrem 命令会从列表中找到等于 value 的元素进行删除，根据 count 的不同 分为三种情况:

- - ·count>0，从左到右，删除最多 count 个元素。
  - count<0，从右到左，删除最多 count 绝对值个元素。
  - count=0，删除所有。

- ltrim key start end：按照索引范围修剪列表

- lset key index newValue：修改指定索引下标的元素

- blpop key [key ...] timeout 和 brpop key [key ...] timeout：阻塞式弹出

### **列表简单使用截图**

![img](https://pic1.zhimg.com/80/v2-15b7c1779f95891d8f2725eeb0ba5a70_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-38458c255db9e93f2a58a8affc12d989_720w.jpg)

![img](https://pic4.zhimg.com/80/v2-a6d44c50e91c6fec9a6505a9100672c7_720w.jpg)

![img](https://pic1.zhimg.com/80/v2-4a4c23050eccc2ab0a95eebcdc5ce964_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-c4c772695981fa4765d9317dc7329d1a_720w.jpg)

根据上面的命令解释，大家应该比较容易看懂截图里面的所有命令含义，这里同样不过多解释了

### **列表使用场景**

1. 热销榜，文章列表
2. 实现工作队列（利用 lists 的 push 操作，将任务存在 lists 中，然后工作线程再用 pop 操作将任务取出进行执行 ），例如消息队列
3. 最新列表，比如最新评论

使用参考：

- lpush+lpop=Stack(栈)
- lpush+rpop=Queue(队列)
- lpsh+ltrim=Capped Collection(有限集合)
- lpush+brpop=Message Queue(消息队列)

### **set 集合和 zset 有序集合**

Redis 的集合相当于 Java 语言里面的 HashSet 和 JS 里面的 Set，它内部的键值对是无序的唯一的。Set 集合中最后一个 value 被移除后，数据结构自动删除，内存被回收。

zset 可能是 Redis 提供的最为特色的数据结构，它也是在面试中面试官最爱问的数据结构。它类似于 Java 的 SortedSet 和 HashMap 的结合体，一方面它是一个 set，保证了内部 value 的唯一性，另一方面它可以给每个 value 赋予一个 score，代表这个 value 的排序权重。它的内部实现用的是一种叫着「跳跃列表」(后面会简单介绍)的数据结构。

### **常用集合命令**

- sadd key element [element ...]：添加元素，返回结果为添加成功的元素个数
- srem key element [element ...]：删除元素，返回结果为成功删除元素个数
- smembers key：获取所有元素
- sismember key element：判断元素是否在集合中，如果给定元素 element 在集合内返回 1，反之返回 0
- scard key：计算元素个数，scard 的时间复杂度为 O(1)，它不会遍历集合所有元素
- spop key：从集合随机弹出元素，从 3.2 版本开始，spop 也支持[count]参数。
- srandmember key [count]：随机从集合返回指定个数元素，[count]是可选参数，如果不写默认为 1
- sinter key [key ...]：求多个集合的交集
- suinon key [key ...]：求多个集合的并集
- sdiff key [key ...]：求多个集合的差集

### **集合简单使用截图**

![img](https://pic1.zhimg.com/80/v2-85c0430470e72a792af63c08a4f587f8_720w.jpg)

### **常用有序集合命令**

- zadd key score member [score member ...]：添加成员，返回结果代表成功添加成员的个数。Redis3.2 为 zadd 命令添加了 nx、xx、ch、incr 四个选项:

- - nx:member 必须不存在，才可以设置成功，用于添加
  - xx:member 必须存在，才可以设置成功，用于更新
  - ch:返回此次操作后，有序集合元素和分数发生变化的个数
  - incr:对 score 做增加，相当于后面介绍的 zincrby

- zcard key：计算成员个数

- zscore key member：计算某个成员的分数

- zrank key member 和 zrevrank key member：计算成员的排名，zrank 是从分数从低到高返回排名，zrevrank 反之

- zrem key member [member ...]：删除成员

- zincrby key increment member：增加成员的分数

- zrange key start end [withscores] 和 zrevrange key start end [withscores]：返回指定排名范围的成员，zrange 是从低到高返回，zrevrange 反之。

- zrangebyscore key min max [withscores][limit offset count] 和 zrevrangebyscore key max min [withscores][limit offset count] 返回指定分数范围的成员，其中 zrangebyscore 按照分数从低到高返回，zrevrangebyscore 反之

- zcount key min max：返回指定分数范围成员个数

- zremrangebyrank key start end：删除指定排名内的升序元素

- zremrangebyscore key min max：删除指定分数范围的成员

- zinterstore 和 zunionstore 命令求集合的交集和并集，可用参数比较多，可用到再查文档

有序集合相比集合提供了排序字段，但是也产生了代价，zadd 的时间 复杂度为 O(log(n))，sadd 的时间复杂度为 O(1)。

### **有序集合简单使用截图**

![img](https://pic4.zhimg.com/80/v2-4830c3a1bd5867bbfa8018e3e8ae3e4b_720w.jpg)

### **集合和有序集合使用场景**

1. 给用户添加标签
2. 给标签添加用户
3. 根据某个权重进行排序的队列的场景，比如游戏积分排行榜，设置优先级的任务列表，学生成绩表等

2.gif

### **关于跳跃列表**

跳跃列表就是一种层级制，最下面一层所有的元素都会串起来。然后每隔几个元素挑选出一个代表来，再将这几个代表使用另外一级指针串起来。然后在这些代表里再挑出二级代表，再串起来。最终就形成了金字塔结构，如图：

![img](https://pic2.zhimg.com/80/v2-9b1b5ccce39c42ad3db5a0b2f95b296d_720w.jpg)

更多可以看：[https://www.jianshu.com/p/09c3b0835ba6](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/09c3b0835ba6)

### **列表、集合和有序集合异同**

![img](https://pic2.zhimg.com/80/v2-2758ef4850f18f47e9e3125c00199909_720w.jpg)

## **小功能大用处**

### **慢查询分析**

许多存储系统（例如 MySQL）提供慢查询日志帮助开发和运维人员定位系统存在的慢操作。

所谓慢查询日志就是系统在命令执行前后计算每条命令的执行时间，当超过预设阈值，就将这条命令的相关信息（例如：发生时间，耗时，命令的详细信息）记录下来，Redis 也提供了类似的功能。这里可以顺带了解一下 Redis 客户端执行一条命令的过程，分为如下 4 个部分：

![img](https://pic4.zhimg.com/80/v2-ff44bdd64ce528f5e507b481b312f6e7_720w.jpg)

对于慢查询功能，需要明确 3 件事：

1、预设阈值怎么设置？

在 redis 配置文件中修改配置 ‘slowlog-log-slower-than’ 的值，单位是微妙（1 秒 = 1000 毫秒 = 1000000 微秒），默认是 10000 微秒，如果把 slowlog-log-slower-than 设置为 0，将会记录所有命令到日志中。如果把 slowlog-log-slower-than 设置小于 0，将会不记录任何命令到日志中。

2、慢查询记录存放在哪？

在 redis 配置文件中修改配置 ‘slowlog-max-len’ 的值。slowlog-max-len 的作用是指定慢查询日志最多存储的条数。实际上，Redis 使用了一个列表存放慢查询日志，slowlog-max-len 就是这个列表的最大长度。当一个新的命令满足满足慢查询条件时，被插入这个列表中。当慢查询日志列表已经达到最大长度时，最早插入的那条命令将被从列表中移出。比如，slowlog-max-len 被设置为 10，当有第 11 条命令插入时，在列表中的第 1 条命令先被移出，然后再把第 11 条命令放入列表。

记录慢查询指 Redis 会对长命令进行截断，不会大量占用大量内存。在实际的生产环境中，为了减缓慢查询被移出的可能和更方便地定位慢查询，建议将慢查询日志的长度调整的大一些。比如可以设置为 1000 以上。

除了去配置文件中修改，也可以通过 config set 命令动态修改配置

```text
> config set slowlog-log-slower-than 1000
OK
> config set slowlog-max-len 1200
OK
> config rewrite
OK
```

3、如何获取慢查询日志？

可以使用 `slowlog get` 命令获取慢查询日志，在 `slowlog get` 后面还可以加一个数字，用于指定获取慢查询日志的条数，比如，获取 2 条慢查询日志：

```text
> slowlog get 3
1) 1) (integer) 6107
   2) (integer) 1616398930
   3) (integer) 3109
   4) 1) "config"
      2) "rewrite"
2) 1) (integer) 6106
   2) (integer) 1613701788
   3) (integer) 36004
   4) 1) "flushall"
```

可以看出每一条慢查询日志都有 4 个属性组成：

1. 唯一标识 ID
2. 命令执行的时间戳
3. 命令执行时长
4. 执行的命名和参数

此外，可以通过 `slowlog len` 命令获取慢查询日志的长度；通过 `slowlog reset` 命令清理慢查询日志。

### **Pipeline（流水线）机制**

Redis 提供了批量操作命令（例如 mget、mset 等），有效地节约 RTT。但大部分命令是不支持批量操作的，例如要执行 n 次 hgetall 命令，并没有 mhgetall 命令存在，需要消耗 n 次 RTT。

Redis 的客户端和服务端可能部署在不同的机器上。例如客户端在北京，Redis 服务端在上海，两地直线距离约为 1300 公里，那么 1 次 RTT 时间 = 1300×2/(300000×2/3) = 13 毫秒（光在真空中 传输速度为每秒 30 万公里，这里假设光纤为光速的 2/3），那么客户端在 1 秒 内大约只能执行 80 次左右的命令，这个和 Redis 的高并发高吞吐特性背道而驰。

Pipeline（流水线）机制能改善上面这类问题，它能将一组 Redis 命令进 行组装，通过一次 RTT 传输给 Redis，再将这组 Redis 命令的执行结果按顺序返回给客户端。

不使用 Pipeline 的命令执行流程：

![img](https://pic3.zhimg.com/80/v2-de9e9877270e3538befea55e65ee6106_720w.jpg)

使用 Pipeline 的命令执行流程：

![img](https://pic4.zhimg.com/80/v2-4ea932091411dbba78108888041d2be3_720w.jpg)

Redis 的流水线是一种通信协议，没有办法通过客户端演示给大家，这里以 Jedis 为例，通过 Java API 或者使用 Spring 操作它（代码来源于互联网）：

```text
/**
 * 测试Redis流水线
 * @author liu
 */
publicclass TestPipelined {

    /**
     * 使用Java API测试流水线的性能
     */
    @SuppressWarnings({ "unused", "resource" })
    @Test
    public void testPipelinedByJavaAPI() {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(20);
        jedisPoolConfig.setMaxTotal(10);
        jedisPoolConfig.setMaxWaitMillis(20000);

        JedisPool jedisPool = new JedisPool(jedisPoolConfig,"localhost",6379);
        Jedis jedis = jedisPool.getResource();
        long start = System.currentTimeMillis();
        // 开启流水线
        Pipeline pipeline = jedis.pipelined();
        // 测试10w条数据读写
        for(int i = 0; i < 100000; i++) {
            int j = i + 1;
            pipeline.set("key" + j, "value" + j);
            pipeline.get("key" + j);
        }
        // 只执行同步但不返回结果
        //pipeline.sync();
        // 以list的形式返回执行过的命令的结果
        List<Object> result = pipeline.syncAndReturnAll();
        long end = System.currentTimeMillis();
        // 计算耗时
        System.out.println("耗时" + (end - start) + "毫秒");
    }

    /**
     * 使用RedisTemplate测试流水线
     */
    @SuppressWarnings({ "resource", "rawtypes", "unchecked", "unused" })
    @Test
    public void testPipelineBySpring() {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
        RedisTemplate rt = (RedisTemplate)applicationContext.getBean("redisTemplate");
        SessionCallback callback = (SessionCallback)(RedisOperations ops)->{
            for(int i = 0; i < 100000; i++) {
                int j = i + 1;
                ops.boundValueOps("key" + j).set("value" + j);
                ops.boundValueOps("key" + j).get();
            }
            returnnull;
        };
        long start = System.currentTimeMillis();
        // 执行Redis的流水线命令
        List result = rt.executePipelined(callback);
        long end = System.currentTimeMillis();
        System.out.println(end - start);
    }
}
```

网上写的测试结果为：使用 Java API 耗时在 550ms 到 700ms 之间，也就是不到 1s 就完成了 10 万次读写，使用 Spring 耗时在 1100ms 到 1300ms 之间。这个与之前一条一条命令使用，1s 内就发送几十几百条（客户端和服务端距离导致）命令的差距不是一般的大了。

注意，这里只是为了测试性能而已，当你要执行很多的命令并返回结果的时候，需要考虑 List 对象的大小，因为它会“吃掉”服务器上许多的内存空间，严重时会导致内存不足，引发 JVM 溢出异常，所以在工作环境中，是需要读者自己去评估的，可以考虑使用迭代的方式去处理。

### **事务与 Lua**

### **multi 和 exec 命令**

很多情况下我们需要一次执行不止一个命令，而且需要其同时成功或者失败。为了保证多条命令组合的原子性，Redis 提供了简单的事务功能以及集成 Lua 脚本来解决这个问题。

Redis 提供了简单的事务功能，将一组需要一起执行的命令放到 multi 和 exec 两个命令之间。Multi 命令代表事务开始，exec 命令代表事务结束，它们之间的命令是原子顺序执行的。使用案例：

```text
127.0.0.1:6379> multi
OK
127.0.0.1:6379> SET msg "hello chrootliu"
QUEUED
127.0.0.1:6379> GET msg
QUEUED
127.0.0.1:6379> EXEC
1) OK
1) hello chrootliu
```

Redis 提供了简单的事务，之所以说它简单，主要是因为它不支持事务中的回滚特性，同时无法实现命令之间的逻辑关系计算，主要有以下几点：

1. **不够满足原子性**。一个事务执行过程中，其他事务或 client 是可以对相应的 key 进行修改的（并发情况下，例如电商常见的超卖问题），想要避免这样的并发性问题就需要使用 WATCH 命令，但是通常来说，必须经过仔细考虑才能决定究竟需要对哪些 key 进行 WATCH 加锁。然而，额外的 WATCH 会增加事务失败的可能，而缺少必要的 WATCH 又会让我们的程序产生竞争条件。
2. **后执行的命令无法依赖先执行命令的结果**。由于事务中的所有命令都是互相独立的，在遇到 exec 命令之前并没有真正的执行，所以我们无法在事务中的命令中使用前面命令的查询结果。我们唯一可以做的就是通过 watch 保证在我们进行修改时，如果其它事务刚好进行了修改，则我们的修改停止，然后应用层做相应的处理。
3. **事务中的每条命令都会与 Redis 服务器进行网络交互**。Redis 事务开启之后，每执行一个操作返回的都是 queued，这里就涉及到客户端与服务器端的多次交互，明明是需要一次批量执行的 n 条命令，还需要通过多次网络交互，显然非常浪费（这个就是为什么会有 pipeline 的原因，减少 RTT 的时间）。

### **Redis 事务缺陷的解决 – Lua**

Lua 是一个小巧的脚本语言，用标准 C 编写，几乎在所有操作系统和平台上都可以编译运行。一个完整的 Lua 解释器不过 200k，在目前所有脚本引擎中，Lua 的速度是最快的，这一切都决定了 Lua 是作为嵌入式脚本的最佳选择。

Redis 2.6 版本之后内嵌了一个 Lua 解释器，可以用于一些简单的事务与逻辑运算，也可帮助开发者定制自己的 Redis 命令（例如：一次性的执行复杂的操作，和带有逻辑判断的操作），在这之前，必须修改源码。

在 Redis 中执行 Lua 脚本有两种方法：eval 和 evalsha，这里以 eval 做为案例介绍：

eval 语法：

```text
eval script numkeys key [key ...] arg [arg ...]
```

其中：

- script 一段 Lua 脚本或 Lua 脚本文件所在路径及文件名
- numkeys Lua 脚本对应参数数量
- key [key …] Lua 中通过全局变量 KEYS 数组存储的传入参数
- arg [arg …] Lua 中通过全局变量 ARGV 数组存储的传入附加参数

```text
EVAL "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 first second
1) "key1"
2) "key2"
3) "first"
4) "second"
```

Lua 执行流程图:

![img](https://pic3.zhimg.com/80/v2-1794025419bc8c444f778493e76e4cf2_720w.jpg)

**SCRIPT LOAD 与 EVALSHA 命令**

对于不立即执行的 Lua 脚本，或需要重用的 Lua 脚本，可以通过 SCRIPT LOAD 提前载入 Lua 脚本，这个命令会立即返回对应的 SHA1 校验码

当需要执行函数时，通过 EVALSHA 调用 SCRIPT LOAD 返回的 SHA1 即可

```text
SCRIPT LOAD "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}"
"232fd51614574cf0867b83d384a5e898cfd24e5a"

EVALSHA "232fd51614574cf0867b83d384a5e898cfd24e5a" 2 key1 key2 first second
1) "key1"
2) "key2"
3) "first"
4) "second"
```

**通过 Lua 脚本执行 Redis 命令**

在 Lua 脚本中，只要使用 `redis.call()` 或 `redis.pcall()` 传入 Redis 命令就可以直接执行：

```text
eval "return redis.call('set',KEYS[1],'bar')" 1 foo     --等同于在服务端执行 set foo bar
```

案例，使用 Lua 脚本实现访问频率限制：

```text
--
-- KEYS[1] 要限制的ip
-- ARGV[1] 限制的访问次数
-- ARGV[2] 限制的时间
--

local key = "rate.limit:" .. KEYS[1]
local limit = tonumber(ARGV[1])
local expire_time = ARGV[2]

local is_exists = redis.call("EXISTS", key)
if is_exists == 1then
    if redis.call("INCR", key) > limit then
        return0
    else
        return1
    end
else
    redis.call("SET", key, 1)
    redis.call("EXPIRE", key, expire_time)
    return1
end
```

使用方法，通过：

```text
eval(file_get_contents(storage_path("limit.lua")), 3, "127.0.0.1", "3", "100");
```

redis 的事务与 Lua，就先介绍到这里了，更多的用法大家请查看 Lua 官方文档

### **Bitmaps**

许多开发语言都提供了操作位的功能，合理地使用位能够有效地提高内存使用率和开发效率。Redis 提供了 Bitmaps 这个“数据结构”可以实现对位的操作。把数据结构加上引号主要因为：

- Bitmaps 本身不是一种数据结构，实际上它就是字符串，但是它可以对字符串的位进行操作。
- Bitmaps 单独提供了一套命令，所以在 Redis 中使用 Bitmaps 和使用字符串的方法不太相同。可以把 Bitmaps 想象成一个以位为单位的数组，数组的每个单元只能存储 0 和 1，数组的下标在 Bitmaps 中叫做偏移量。

在我们平时开发过程中，会有一些 bool 型数据需要存取，比如用户一年的签到记录， 签了是 1，没签是 0，要记录 365 天。如果使用普通的 key/value，每个用户要记录 365 个，当用户上亿的时候，需要的存储空间是惊人的。为了解决这个问题，Redis 提供了位图数据结构，这样每天的签到记录只占据一个位， 365 天就是 365 个位，46 个字节 (一个稍长一点的字符串) 就可以完全容纳下，这就大大节约了存储空间。

语法：

```text
setbit key offset value  # 设置或者清空 key 的 value(字符串)在 offset 处的 bit 值
getbit key offset  # 返回 key 对应的 string 在 offset 处的 bit 值
bitcount key [start end] # start end 范围内被设置为1的数量，不传递 start end 默认全范围
```

使用案例，统计用户登录（活跃）情况

```text
127.0.0.1:6379> setbit userLogin:2021-04-10 66666 1 #userId=66666的用户登录，这是今天登录的第一个用户。
(integer) 0
127.0.0.1:6379> setbit userLogin:2021-04-10 999999 1 #userId=999999的用户登录，这是今天第二个登录、的用户。
(integer) 0
127.0.0.1:6379> setbit userLogin:2021-04-10 3333 1
(integer) 0
127.0.0.1:6379> setbit userLogin:2021-04-10 8888 1
(integer) 0
127.0.0.1:6379> setbit userLogin:2021-04-10 100000 1
(integer) 0

127.0.0.1:6379> getbit active:2021-04-10 66666
(integer) 1
127.0.0.1:6379> getbit active:2021-04-10 55555
(integer)

127.0.0.1:6379> bitcount active:2021-04-10
(integer) 5
```

由于 bit 数组的每个位置只能存储 0 或者 1 这两个状态；所以对于实际生活中，处理两个状态的业务场景就可以考虑使用 bitmaps。如用户登录/未登录，签到/未签到，关注/未关注，打卡/未打卡等。同时 bitmap 还通过了相关的统计方法进行快速统计。

### **HyperLogLog**

HyperLogLog 并不是一种新的数据结构（实际类型为字符串类型），而 是一种基数算法，通过 HyperLogLog 可以利用极小的内存空间完成独立总数的统计，数据集可以是 IP、Email、ID 等。

HyperLogLog 提供了 3 个命令：pfadd、pfcount、pfmerge。

```text
# 用于向 HyperLogLog 添加元素
# 如果 HyperLogLog 估计的近似基数在 PFADD 命令执行之后出现了变化， 那么命令返回 1 ， 否则返回 0
# 如果命令执行时给定的键不存在， 那么程序将先创建一个空的 HyperLogLog 结构， 然后再执行命令
pfadd key value1 [value2 value3]

# PFCOUNT 命令会给出 HyperLogLog 包含的近似基数
# 在计算出基数后， PFCOUNT 会将值存储在 HyperLogLog 中进行缓存，知道下次 PFADD 执行成功前，就都不需要再次进行基数的计算。
pfcount key

# PFMERGE 将多个 HyperLogLog 合并为一个 HyperLogLog ， 合并后的 HyperLogLog 的基数接近于所有输入 HyperLogLog 的并集基数。
pfmerge destkey key1 key2 [...keyn]
127.0.0.1:6379> pfadd totaluv user1
(integer) 1
127.0.0.1:6379> pfcount totaluv
(integer) 1
127.0.0.1:6379> pfadd totaluv user2
(integer) 1
127.0.0.1:6379> pfcount totaluv
(integer) 2
127.0.0.1:6379> pfadd totaluv user3
(integer) 1
127.0.0.1:6379> pfcount totaluv
(integer) 3
127.0.0.1:6379> pfadd totaluv user4
(integer) 1
127.0.0.1:6379> pfcount totaluv
(integer) 4
127.0.0.1:6379> pfadd totaluv user5
(integer) 1
127.0.0.1:6379> pfcount totaluv
(integer) 5
127.0.0.1:6379> pfadd totaluv user6 user7 user8 user9 user10
(integer) 1
127.0.0.1:6379> pfcount totaluv
(integer) 10
```

HyperLogLog 内存占用量非常小，但是存在错误率，开发者在进行数据 229 结构选型时只需要确认如下两条即可：

1. 只为了计算独立总数，不需要获取单条数据。
2. 可以容忍一定误差率，毕竟 HyperLogLog 在内存的占用量上有很大的优势。

例如：如果你负责开发维护一个大型的网站，有一天老板找产品经理要网站每个网页每天的 UV 数据，然后让你来开发这个统计模块，你会如何实现?

如果统计 PV 那非常好办，给每个网页一个独立的 Redis 计数器就可以了，这个计数器 的 key 后缀加上当天的日期。这样来一个请求，incrby 一次，最终就可以统计出所有的 PV 数据。

但是 UV 不一样，它要去重，同一个用户一天之内的多次访问请求只能计数一次。这就 要求每一个网页请求都需要带上用户的 ID，无论是登录用户还是未登录用户都需要一个唯一 ID 来标识。

你也许已经想到了一个简单的方案，那就是为每一个页面一个独立的 set 集合来存储所 有当天访问过此页面的用户 ID。当一个请求过来时，我们使用 sadd 将用户 ID 塞进去就可 以了。通过 scard 可以取出这个集合的大小，这个数字就是这个页面的 UV 数据。没错，这是一个非常简单的方案。

但是，如果你的页面访问量非常大，比如一个爆款页面几千万的 UV，你需要一个很大 的 set 集合来统计，这就非常浪费空间。如果这样的页面很多，那所需要的存储空间是惊人 的。为这样一个去重功能就耗费这样多的存储空间，值得么?其实老板需要的数据又不需要 太精确，105w 和 106w 这两个数字对于老板们来说并没有多大区别，So，有没有更好的解 决方案呢?

Redis 提供了 HyperLogLog 数据结构就是用来解决 这种统计问题的。HyperLogLog 提供不精确的去重计数方案，虽然不精确但是也不是非常不精确，标准误差是 0.81%，这样的精确度已经可以满足上面的 UV 统计需求了。

对于上面的场景，同学们可能有疑问，我或许同样可以使用 HashMap、BitMap 和 HyperLogLog 来解决。对于这三种解决方案，这边做下对比：

- HashMap：算法简单，统计精度高，对于少量数据建议使用，但是对于大量的数据会占用很大内存空间；
- BitMap：位图算法，具体内容可以参考我的这篇文章，统计精度高，虽然内存占用要比 HashMap 少，但是对于大量数据还是会占用较大内存；
- HyperLogLog：存在一定误差，占用内存少，稳定占用 12k 左右内存，可以统计 2^64 个元素，对于上面举例的应用场景，建议使用。

### **发布订阅**

Redis 提供了基于“发布/订阅”模式的消息机制，此种模式下，消息发布者和订阅者不进行直接通信，发布者客户端向指定的频道（channel）发布消 息，订阅该频道的每个客户端都可以收到该消息：

![img](https://pic1.zhimg.com/80/v2-bc0a770a5a12eec5acc20dbc0d5908f4_720w.jpg)

主要对应的 Redis 命令为:

```text
subscribe channel [channel ...] # 订阅一个或多个频道
unsubscribe channel # 退订指定频道
publish channel message # 发送消息
psubscribe pattern # 订阅指定模式
punsubscribe pattern # 退订指定模式
```

使用案例：

打开一个 Redis 客户端，如向 TestChanne 说一声 hello:

```text
127.0.0.1:6379> publish TestChanne hello
(integer) 1 # 返回的是接收这条消息的订阅者数量
```

这样消息就发出去了。发出去的消息不会被持久化，也就是有客户端订阅 TestChanne 后只能接收到后续发布到该频道的消息，之前的就接收不到了。

打开另一 Redis 个客户端，这里假设发送消息之前就打开并且订阅了 TestChanne 频道：

```text
127.0.0.1:6379> subscribe TestChanne # 执行上面命令客户端会进入订阅状态
Reading messages... (press Ctrl-C to quit)
1) "subscribe" // 消息类型
2) "TestChanne" // 频道
3) "hello" // 消息内容
```

我们可以利用 Redis 发布订阅功能，实现的简单 MQ 功能，实现上下游的解耦。不过需要注意了，由于 Redis 发布的消息不会被持久化，这就会导致新订阅的客户端将不会收到历史消息。所以，如果当前的业务场景不能容忍这些缺点，那还是用专业 MQ 吧。

### **GEO**

Redis3.2 版本提供了 GEO（地理信息定位）功能，支持存储地理位置信 息用来实现诸如附近位置、摇一摇这类依赖于地理位置信息的功能，对于需 要实现这些功能的开发者来说是一大福音。GEO 功能是 Redis 的另一位作者 Matt Stancliff 借鉴 NoSQL 数据库 Ardb 实现的，Ardb 的作者来自中国，它提供了优秀的 GEO 功能。

Redis GEO 相关的命令如下：

```text
# 添加一个空间元素,longitude、latitude、member分别是该地理位置的经度、纬度、成员
# 这里的成员就是指代具体的业务数据，比如说用户的ID等
# 需要注意的是Redis的纬度有效范围不是[-90,90]而是[-85,85]
# 如果在添加一个空间元素时，这个元素中的menber已经存在key中，那么GEOADD命令会返回0,相当于更新了这个menber的位置信息
GEOADD key longitude latitude member [longitude latitude member]
# 用于添加城市的坐标信息
geoadd cities:locations 117.12 39.08 tianjin 114.29 38.02 shijiazhuang 118.01 39.38 tangshan 115.29 38.51 baoding

# 获取地理位置信息
geopos key member [member ...]
# 获取天津的坐标
geopos cities:locations tianjin

# 获取两个坐标之间的距离
# unit代表单位，有4个单位值
  - m (meter) 代表米
  - km （kilometer）代表千米
  - mi （miles）代表英里
  - ft （ft）代表尺
geodist key member1 member2 [unit]
# 获取天津和保定之间的距离
GEODIST cities:locations tianjin baoding km

# 获取指定位置范围内的地理信息位置集合，此命令可以用于实现附近的人的功能
# georadius和georadiusbymember两个命令的作用是一样的，都是以一个地理位置为中心算出指定半径内的其他地理信息位置，不同的是georadius命令的中心位置给出了具体的经纬度，georadiusbymember只需给出成员即可。其中radiusm|km|ft|mi是必需参数，指定了半径（带单位），这两个命令有很多可选参数，参数含义如下：
# - withcoord：返回结果中包含经纬度。
# - withdist：返回结果中包含离中心节点位置的距离。
# - withhash：返回结果中包含geohash，有关geohash后面介绍。
# - COUNT count：指定返回结果的数量。
# - asc|desc：返回结果按照离中心节点的距离做升序或者降序。
# - store key：将返回结果的地理位置信息保存到指定键。
# - storedist key：将返回结果离中心节点的距离保存到指定键。
georadius key longitude latitude radiusm|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [store key] [storedist key]

georadiusbymember key member radiusm|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [store key] [storedist key]

# 获取geo hash
# Redis使用geohash将二维经纬度转换为一维字符串，geohash有如下特点：
# - GEO的数据类型为zset，Redis将所有地理位置信息的geohash存放在zset中。
# - 字符串越长，表示的位置更精确，表3-8给出了字符串长度对应的精度，例如geohash长度为9时，精度在2米左右。长度和精度的对应关系，请参考：https://easyreadfs.nosdn.127.net/9F42_CKRFsfc8SUALbHKog==/8796093023252281390
# - 两个字符串越相似，它们之间的距离越近，Redis利用字符串前缀匹配算法实现相关的命令。
# - geohash编码和经纬度是可以相互转换的。
# - Redis正是使用有序集合并结合geohash的特性实现了GEO的若干命令。
geohash key member [member ...]

# 删除操作，GEO没有提供删除成员的命令，但是因为GEO的底层实现是zset，所以可以借用zrem命令实现对地理位置信息的删除。
zrem key member
```

使用案例，例如咋部门是做直播的，那直播业务一般会有一个“附近的直播”功能，这里就可以考虑用 Redis 的 GEO 技术来完成这个功能。

数据操作主要有两个：一是主播开播的时候写入主播 Id 的经纬度，二是主播关播的时候删除主播 Id 元素。这样就维护了一个具有位置信息的在线主播集合提供给线上检索。

大家具体使用的时候，可以去了解一下 Redis GEO 原理，主要用到了空间索引的算法 GEOHASH 的相关知识，针对索引我们日常所见都是一维的字符，那么如何对三维空间里面的坐标点建立索引呢，直接点就是三维变二维，二维变一维。这里就不再详细阐述了。

**Redis 客户端**

主流编程语言都有对应的常用 Redis 客户端，例如：

- java -> Jedis
- python -> redis-py
- node -> ioredis

具体使用语法，大家可以根据自己的需要查找对应的官方文档：

Jedis 文档：[https://github.com/redis/jedis](https://link.zhihu.com/?target=https%3A//github.com/redis/jedis)

redis-py 文档：[https://github.com/redis/redis-py](https://link.zhihu.com/?target=https%3A//github.com/redis/redis-py)

ioredis 文档：[https://github.com/luin/ioredis](https://link.zhihu.com/?target=https%3A//github.com/luin/ioredis)

## **持久化、主从同步与缓存设计**

### **持久化**

Redis 支持 RDB 和 AOF 两种持久化机制，持久化功能有效地避免因进程 退出造成的数据丢失问题，当下次重启时利用之前持久化的文件即可实现数据恢复。

- RDB 是一次全量备份，AOF 日志是连续的增量备份， RDB 是内存数据的二进制序列化形式，在存储上非常紧凑，而 AOF 日志记录的是内存数据修改的指令记录文本。
- AOF 以独立日志的方式记录每次写命令， 重启时再重新执行 AOF 文件中的命令达到恢复数据的目的。AOF 的主要作用 是解决了数据持久化的实时性，目前已经是 Redis 持久化的主流方式。

AOF 日志在长期的运行过程中会变的无比庞大，数据库重启时需要加载 AOF 日志进行指令重放，这个时间就会无比漫长。所以需要定期进行 AOF 重写，给 AOF 日志进行瘦身。

### **RDB**

我们知道 Redis 是单线程程序，这个线程要同时负责多个客户端套接字的并发读写操作和内存数据结构的逻辑读写。

在服务线上请求的同时，Redis 还需要进行内存 RDB，内存 RDB 要求 Redis 必须进行文件 IO 操作，可文件 IO 操作是不能使用多路复用 API。这意味着单线程同时在服务线上的请求还要进行文件 IO 操作，文件 IO 操作会严重拖垮服务器请求的性能。还有个重要的问题是为了不阻塞线上的业务，就需要边持久化边响应客户端请求。持久化的同时，内存数据结构还在改变，比如一个大型的 hash 字典正在持久化，结果一个请求过来把它给删掉了，还没持久化完呢，这可怎么办?

那该怎么办呢? Redis 使用操作系统的多进程 COW(Copy On Write) 机制来实现 RDB 持久化，以下为 RDB 备份流程：

![img](https://pic3.zhimg.com/80/v2-70dad5a527bcb49caa224b74e158b172_720w.jpg)

1. 执行 bgsave 命令，Redis 父进程判断当前是否存在正在执行的子进 程，如 RDB/AOF 子进程，如果存在 bgsave 命令直接返回。
2. 父进程执行 fork 操作创建子进程，fork 操作过程中父进程会阻塞，通 过 info stats 命令查看 latest_fork_usec 选项，可以获取最近一个 fork 操作的耗 时，单位为微秒。
3. 父进程 fork 完成后，bgsave 命令返回 “Background saving started” 信息 并不再阻塞父进程，可以继续响应其他命令。
4. 子进程创建 RDB 文件，根据父进程内存生成临时快照文件，完成后 对原有文件进行原子替换。执行 lastsave 命令可以获取最后一次生成 RDB 的 时间，对应 info 统计的 rdb_last_save_time 选项。
5. 进程发送信号给父进程表示完成，父进程更新统计信息，具体见 info Persistence 下的 rdb_* 相关选项。

### **AOF**

AOF 日志存储的是 Redis 服务器的顺序指令序列，AOF 日志只记录对内存进行修改的 指令记录。

假设 AOF 日志记录了自 Redis 实例创建以来所有的修改性指令序列，那么就可以通过 对一个空的 Redis 实例顺序执行所有的指令，也就是「重放」，来恢复 Redis 当前实例的内 存数据结构的状态。

Redis 会在收到客户端修改指令后，先进行参数校验，如果没问题，就立即将该指令文本存储到 AOF 日志中，也就是先存到磁盘，然后再执行指令。这样即使遇到突发宕机，已经存储到 AOF 日志的指令进行重放一下就可以恢复到宕机前的状态。通过 appendfsync 参数可以控制实时/秒级持久化 。

AOF 流程:

![img](https://pic4.zhimg.com/80/v2-327021594705f9e0be8a32895e8461d7_720w.jpg)

1. 所有的写入命令会追加到 aof_buf(缓冲区)中。
2. AOF 缓冲区根据对应的策略向硬盘做同步操作。
3. 随着 AOF 文件越来越大，需要定期对 AOF 文件进行重写，达到压缩的目的。
4. 当 Redis 服务器重启时，可以加载 AOF 文件进行数据恢复。

Redis 在长期运行的过程中，AOF 的日志会越变越长。如果实例宕机重启，重放整个 AOF 日志会非常耗时，导致长时间 Redis 无法对外提供服务。所以需要对 AOF 日志瘦身。

Redis 提供了 bgrewriteaof 指令用于对 AOF 日志进行瘦身。其原理就是开辟一个子进程对内存进行遍历转换成一系列 Redis 的操作指令，序列化到一个新的 AOF 日志文件中。序列化完毕后再将操作期间发生的增量 AOF 日志追加到这个新的 AOF 日志文件中，追加完毕后就立即替代旧的 AOF 日志文件了，瘦身工作就完成了。

AOF 瘦身重写流程：

![img](https://pic3.zhimg.com/80/v2-61b4f4c5a6c0b45179e06468afb1a272_720w.jpg)

AOF 重写可以通过 auto-aof-rewrite-min-siz e 和 auto-aof-rewrite- percentage 参数控制自动触发，也可以使用 bgrewriteaof 命令手动触发。

子进程执行期间使用 copy-on-write 机制与父进程共享内存，避免内 存消耗翻倍。AOF 重写期间还需要维护重写缓冲区，保存新的写入命令避免 数据丢失。

单机下部署多个实例时，为了防止出现多个子进程执行重写操作， 建议做隔离控制，避免 CPU 和 IO 资源竞争。

### **Redis 4.0 混合持久化**

重启 Redis 时，我们很少使用 RDB 来恢复内存状态，因为会丢失大量数据。我们通常 使用 AOF 日志重放，但是重放 AOF 日志性能相对 rdb 来说要慢很多，这样在 Redis 实 例很大的情况下，启动需要花费很长的时间。

Redis 4.0 为了解决这个问题，带来了一个新的持久化选项——混合持久化。将 RDB 文 件的内容和增量的 AOF 日志文件存在一起。这里的 AOF 日志不再是全量的日志，而是自 持久化开始到持久化结束的这段时间发生的增量 AOF 日志，通常这部分 AOF 日志很小。

于是在 Redis 重启的时候，可以先加载 RDB 的内容，然后再重放增量 AOF 日志就可 以完全替代之前的 AOF 全量文件重放，重启效率因此大幅得到提升。

![img](https://pic3.zhimg.com/80/v2-e021aef52667d8065a2bfff1aaac5c36_720w.jpg)

### **主从同步—简单了解**

很多企业都没有使用到 Redis 的集群，但是至少都做了主从。有了主从，当 master 挂 掉的时候，运维让从库过来接管，服务就可以继续，否则 master 需要经过数据恢复和重启的过程，这就可能会拖很长的时间，影响线上业务的持续服务。

Redis 通过主从同步功能实现主节点的多个副本。从节点可灵活地通过 slaveof 命令建立或断开同步流程。同步复制分为：全量复制和部分增量复制主从节点之间维护心跳和偏移量检查机制，保证主从节点通信正常和数据一致。

Redis 为了保证高性能复制过程是异步的，写命令处理完后直接返回给客户端，不等待从节点复制完成。因此从节点数据集会有延迟情况。即当使用从节点用于读写分离时会存在数据延迟、过期数据、从节点可用性等问题，需要根据自身业务提前作出规避。

注意：在运维过程中，主节点存在多个从节点或者一台机器上部署大量主节点的情况下，会有复制风暴的风险。

**Redis Sentinel(哨兵) **

主从复制是 Redis 分布式的基础，Redis 的高可用离开了主从复制将无从进行。后面的我们会讲到 Redis 的集群模式，集群模式都依赖于本节所讲的主从复制。

不过复制功能也不是必须的，如果你将 Redis 只用来做缓存，也就无需要从库做备份，挂掉了重新启动一下就行。但是只要你使用了 Redis 的持久化 功能，就必须认真对待主从复制，它是系统数据安全的基础保障。

举例：如果主节点凌晨 3 点突发宕机怎么办?就坐等运维从床上爬起来，然后手工进行从主切换，再通知所有的程 序把地址统统改一遍重新上线么?毫无疑问，这样的人工运维效率太低，事故发生时估计得 至少 1 个小时才能缓过来。

Sentinel 负责持续监控主从节点的健康，当主节点挂掉时，自动选择一个最优的从节点切换为主节点。客户端来连接集群时，会首先连接 sentinel，通过 sentinel 来查询主节点的地址， 然后再去连接主节点进行数据交互。当主节点发生故障时，客户端会重新向 sentinel 要地址，sentinel 会将最新的主节点地址告诉客户端。如此应用程序将无需重启即可自动完成节点切换。如图：

![img](https://pic4.zhimg.com/80/v2-69a6e11416edcec1af710d24064fd58b_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-43e2bf37eb06c514f1bd0baa8830243e_720w.jpg)

### **消息丢失**

Redis 主从采用异步复制，意味着当主节点挂掉时，从节点可能没有收到全部的同步消息，这部分未同步的消息就丢失了。如果主从延迟特别大，那么丢失的数据就可能会特别 多。Sentinel 无法保证消息完全不丢失，但是也尽可能保证消息少丢失。它有两个选项可以 限制主从延迟过大：

- min-slaves-to-write 1
- min-slaves-max-lag 10

第一个参数表示主节点必须至少有一个从节点在进行正常复制，否则就停止对外写服务，丧失可用性。

何为正常复制，何为异常复制?这个就是由第二个参数控制的，它的单位是秒，表示如果 10s 没有收到从节点的反馈，就意味着从节点同步不正常，要么网络断开了，要么一直没有给反馈。

### **Redis 最终一致**

Redis 的主从数据是异步同步的，所以分布式的 Redis 系统并不满足「一致性」要求。当客户端在 Redis 的主节点修改了数据后，立即返回，即使在主从网络断开的情况下，主节 点依旧可以正常对外提供修改服务，所以 Redis 满足「可用性」。

Redis 保证「最终一致性」，从节点会努力追赶主节点，最终从节点的状态会和主节点 的状态将保持一致。如果网络断开了，主从节点的数据将会出现大量不一致，一旦网络恢 复，从节点会采用多种策略努力追赶上落后的数据，继续尽力保持和主节点一致。

### **缓存**

### **缓存的收益与成本**

收益：

- 加速读写：CPU L1/L2/L3 Cache、浏览器缓存等。因为缓存通常都是全内存的（例如 Redis、Memcache），而 存储层通常读写性能不够强悍（例如 MySQL），通过缓存的使用可以有效 地加速读写，优化用户体验。
- 降低后端负载：帮助后端减少访问量和复杂计算，在很大程度降低了后端的负载。成本：
- 数据不一致：缓存层和数据层有时间窗口不一致，和更新策略有关。
- 代码维护成本：加入缓存后，需要同时处理缓存层和存储层的逻辑， 增大了开发者维护代码的成本。
- 运维成本：以 Redis Cluster 为例，加入后无形中增加了运维成本。使用场景：
- 降低后端负载：对高消耗的 SQL：join 结果集/分组统计结果缓存。
- 加速请求响应：利用 Redis/Memcache 优化 IO 响应时间。
- 大量写合并为批量写：比如计数器先 Redis 累加再批量写入 DB。

### **缓存更新策略—算法剔除**

- LRU：Least Recently Used，最近最少使用。
- LFU：Least Frequently Used，最不经常使用。
- FIFO：First In First Out，先进先出。

使用场景：剔除算法通常用于缓存使用量超过了预设的最大值时候，如何对现有的数据进行剔除。例如 Redis 使用 maxmemory-policy 这个配置作为内存最大值后对于数据的剔除策略。

一致性：要清理哪些数据是由具体算法决定，开发人员只能决定使用哪种算法，所以数据的一致性是最差的。

维护成本：算法不需要开发人员自己来实现，通常只需要配置最大 maxmemory 和对应的策略即可。

### **缓存更新策略—超时剔除**

使用场景：超时剔除通过给缓存数据设置过期时间，让其在过期时间后自动删除，例如 Redis 提供的 expire 命令。如果业务可以容忍一段时间内，缓存层数据和存储层数据不一致，那么可以为其设置过期时间。在数据过期后，再从真实数据源获取数据，重新放到缓存并设置过期时间。

一致性：一段时间窗口内（取决于过期时间长短）存在一致性问题，即缓存数据和真实数据源的数据不一致。

维护成本：维护成本不是很高，只需设置 expire 过期时间即可，当然前提是应用方允许这段时间可能发生的数据不一致。

### **缓存更新策略—主动更新**

使用场景：应用方对于数据的一致性要求高，需要在真实数据更新后， 立即更新缓存数据。例如可以利用消息系统或者其他方式通知缓存更新。

一致性：一致性最高，但如果主动更新发生了问题，那么这条数据很可能很长时间不会更新，所以建议结合超时剔除一起使用效果会更好。

维护成本：维护成本会比较高，开发者需要自己来完成更新，并保证更新操作的正确性。

### **缓存更新策略—总结**

![img](https://pic4.zhimg.com/80/v2-549855a22c6e23854edef6efca7f82ab_720w.jpg)

低一致性业务：建议配置最大内存和淘汰策略的方式使用。

高一致性业务：可以结合使用超时剔除和主动更新，这样即使主动更新出了问题，也能保证数据过期时间后删除脏数据。

### **缓存可能会遇到的问题**

缓存穿透：指查询一个一定不存在的数据，由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。在流量大时，可能 DB 就挂掉了，要是有人利用不存在的 key 频繁攻击我们的应用，这就是漏洞。解决方法：

- 布隆过滤器，将所有可能存在的数据哈希到一个足够大的 bitmap 中，一个一定不存在的数据会被 这个 bitmap 拦截掉，从而避免了对底层存储系统的查询压力。
- 另外也有一个更为简单粗暴的方法（我们采用的就是这种），如果一个查询返回的数据为空（不管是数 据不存在，还是系统故障），我们仍然把这个空结果进行缓存，但它的过期时间会很短，最长不超过五分钟。

缓存雪崩：指在我们设置缓存时采用了相同的过期时间，导致缓存在某一时刻同时失效，请求全部转发到 DB，DB 瞬时压力过重雪崩。解决方法：我们可以在原有的失效时间基础上增加一个随机值，比如 1-5 分钟随机，这样每一个缓存的过期时间的重复率就会降低，就很难引发集体失效的事件。

缓存击穿：对于一些设置了过期时间的 key，如果这些 key 可能会在某些时间点被超高并发地访问，是一种非常“热点”的数据。这个时候，需要考虑一个问题：缓存被“击穿”的问题，这个和缓存雪崩的区别在于这里针对某一 key 缓存，前者则是很多 key。缓存在某个时间点过期的时候，恰好在这个时间点对这个 Key 有大量的并发请求过来，这些请求发现缓存过期一般都会从后端 DB 加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端 DB 压垮。解决方法：互斥锁、永远不过期设置、资源保护等等。

缓存无底洞问题：Facebook 的工作人员反应 2010 年已达到 3000 个 memcached 节点，储存数千 G 的缓存。他们发现一个问题– memcached 的连接效率下降了，于是添加 memcached 节点，添加完之后，并没有好转。称为“无底洞”现象。原因：客户端一次批量操作会涉及多次网络操作，也就意味着批量操作会随着实例的增多，耗时会不断增大。服务端网络连接次数变多，对实例的性能也有一定影响。即：更多的机器不代表更多的性能，所谓“无底洞”就是说投入越多不一定产出越多。解决方案有：串行 mget、串行 IO、并行 IO、Hash tag 实现等，更多请看：缓存无底洞问题（[http://ifeve.com/redis-multiget-hole/](https://link.zhihu.com/?target=http%3A//ifeve.com/redis-multiget-hole/)）

## **知识拓展**

### **缓存与数据库同步策略（如何保证缓存(Redis)与数据库(MySQL)的一致性？）**

对于热点数据（经常被查询，但不经常被修改的数据），我们一般会将其放入 Redis 缓存中，以增加查询效率，但需要保证从 Redis 中读取的数据与数据库中存储的数据最终是一致的，这就是经典的**缓存与数据库同步问题**。

那么，如何保证缓存(Redis)与数据库(MySQL)的一致性呢？根据缓存是删除还是更新，以及操作顺序大概是可以分为下面四种情况：

1. 先更新数据库，再更新缓存
2. 先更新缓存，再更新数据库
3. 先删除缓存，再更新数据库
4. 先更新数据库，再删除缓存

### **删除缓存对比更新缓存**

- 删除缓存: 数据只会写入数据库，不会写入缓存，只会删除缓存
- 更新缓存: 数据不但写入数据库，还会写入缓存

**删除缓存**

- 优点：操作简单，无论更新操作是否复杂，直接删除，并且能防止更新出现的线程安全问题
- 缺点：删除后，下一次查询无法在 cache 中查到，会有一次 Cache Miss，这时需要重新读取数据库，高并发下可能会出现上面说的缓存问题

**更新缓存**

- 优点：命中率高，直接更新缓存，不会有 Cache Miss 的情况
- 缺点：更新缓存消耗较大，尤其在复杂的操作流程中

那到底是选择更新缓存还是删除缓存呢，主要取决于更新缓存的复杂度

- 更新缓存的代价很小，此时我们应该更倾向于更新缓存，以保证更高的缓存命中率
- 更新缓存的代价很大，此时我们应该更倾向于删除缓存

例如：只是简单的更新一下用户积分，只操作一个字段，那就可以采用更新缓存，还有类似秒杀下商品库存数量这种并发下查询频繁的数据，也可以使用更新缓存，不过也要注意线程安全的问题，防止产生脏数据。但是当更新操作的逻辑较复杂时，需要涉及到其它数据，如用户购买商品付款时，需要考虑打折、优惠券、红包等多种因素，这样需要缓存与数据库进行多次交互，将打折等信息传入缓存，再与缓存中的其它值进行计算才能得到最终结果，此时更新缓存的消耗要大于直接淘汰缓存。

所以还是要根据业务场景来进行选择，**不过大部分场景下删除缓存操作简单，并且带来的副作用只是增加了一次 Cache Miss，建议作为通用的处理方式。**

### **先更新数据库，再更新缓存**

这种方式就适合更新缓存的代价很小的数据，例如上面说的用户积分，库存数量这类数据，同样还是要注意线程安全的问题。

**线程安全角度**

同时有请求 A 和请求 B 进行更新操作，那么会出现

1. 线程 A 更新了数据库
2. 线程 B 更新了数据库
3. 线程 B 更新了缓存
4. 线程 A 更新了缓存

这就出现请求 A 更新缓存应该比请求 B 更新缓存早才对，但是因为网络等原因，B 却比 A 更早更新了缓存，这就导致了脏数据。

**业务场景角度**

有如下两种不适合场景：

1. 如果你是一个写数据库场景比较多，而读数据场景比较少的业务需求，采用这种方案就会导致，数据压根还没读到，缓存就被频繁的更新，浪费性能
2. 如果你写入数据库的值，并不是直接写入缓存的，而是要经过一系列复杂的计算再写入缓存。那么，每次写入数据库后，都再次计算写入缓存的值，无疑是也浪费性能的

### **先更新缓存，再更新数据库**

这种情况应该是和第一种情况一样会存在线程安全问题的，但是这种情况是有人使用过的，根据书籍《淘宝技术这十年》里，多隆把商品详情页放入缓存，采取的正是先更新缓存，再将缓存中的数据异步更新到数据库这种方式，有兴趣了解的可以查看这篇博客: [https://www.cnblogs.com/rjzheng/p/9240611.html](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/rjzheng/p/9240611.html)

还有现在互联网常见的点赞功能，也可以采用这种方式，有兴趣了解的可以查看这篇文章: [https://juejin.im/post/5bdc257e6fb9a049ba410098](https://link.zhihu.com/?target=https%3A//juejin.im/post/5bdc257e6fb9a049ba410098)

### **先删除缓存，再更新数据库**

简单的想一下，好像这种方式不错，就算是第一步删除缓存成功，第二步写数据库失败，则只会引发一次 Cache Miss，对数据没有影响，其实仔细一想并发下也很容易导致了脏数据，例如

1. 请求 A 进行写操作，删除缓存
2. 请求 B 查询发现缓存不存在
3. 请求 B 去数据库查询得到旧值
4. 请求 B 将旧值写入缓存
5. 请求 A 将新值写入数据库

那怎么解决呢，先看第四种情况（先更新数据库，再删除缓存），后面再统一说第三种和第四种的解决方案。

### **先更新数据库，再删除缓存**

先说一下，国外有人提出了一个缓存更新套路，名为 Cache-Aside Pattern：[https://docs.microsoft.com/en-us/azure/architecture/patterns/cache-aside](https://link.zhihu.com/?target=https%3A//docs.microsoft.com/en-us/azure/architecture/patterns/cache-aside)

- **失效**：应用程序先从 cache 取数据，没有得到，则从数据库中取数据，成功后，放到缓存中
- **命中**：应用程序从 cache 中取数据，渠道后返回
- **更新**：先把数据存到数据库中，成功后再让缓存失效

更新操作就是先更新数据库，再删除缓存；读取操作先从缓存取数据，没有，则从数据库中取数据，成功后，放到缓存中；这是标准的设计方案，包括 Facebook 的论文 Scaling Memcache at Facebook： chrome-extension://ikhdkkncnoglghljlkmcimlnlhkeamad/pdf-viewer/web/viewer.html? file=https%3A%2F%2Fwww.usenix.org%2Fsystem%2Ffiles%2Fconference%2Fnsdi13%2Fnsdi13-final170_update.pdf 也使用了这个策略。

为什么他们都用这种方式呢，这种情况不存在并发问题么?

答案是也存在，但是出现概率比第三种低，例如：

1. 请求缓存刚好失效
2. 请求 A 查询数据库，得一个旧值
3. 请求 B 将新值写入数据库
4. 请求 B 删除缓存
5. 请求 A 将查到的旧值写入缓存

这样就出现脏数据了，然而，实际上出现的概率可能非常低，因为这个条件需要发生在读缓存时缓存失效，而且并发着有一个写操作。而实际上数据库的写操作会比读操作慢得多，而且还要锁表，而读操作必需在写操作前进入数据库操作，而又要晚于写操作删除缓存，所有的这些条件都具备的概率基本并不大，但是还是会有出现的概率。

并且假如第一步写数据库成功，第二步删除缓存失败，这样也导致脏数据，请看解决方案。

### **方案三四脏数据解决方案**

那怎么解决呢，可以采用**延时双删策略(缓存双淘汰法)**，可以将前面所造成的缓存脏数据，再次删除：

1. 先删除(淘汰)缓存
2. 再写数据库（这两步和原来一样）
3. 休眠 1 秒，再次删除(淘汰)缓存

或者是：

1. 先写数据库
2. 再删除(淘汰)缓存（这两步和原来一样）
3. 休眠 1 秒，再次删除(淘汰)缓存

这个 1 秒应该看你的业务场景，应该自行评估自己的项目的读数据业务逻辑的耗时，然后写数据的休眠时间则在读数据业务逻辑的耗时基础上，加几百毫秒即可，这么做确保读请求结束，写请求可以删除读请求造成的缓存脏数据。

如果你用了 MySql 的读写分离架构怎么办？，例如：

1. 请求 A 进行写操作，删除缓存
2. 请求 A 将数据写入数据库了，(或者是先更新数据库，后删除缓存)
3. 请求 B 查询缓存发现，缓存没有值
4. 请求 B 去从库查询，这时，还没有完成主从同步，因此查询到的是旧值
5. 请求 B 将旧值写入缓存
6. 数据库完成主从同步，从库变为新值

这种情景，就是数据不一致的原因，还是采用延时双删策略(缓存双淘汰法)，只是，休眠时间修改为在主从同步的延时时间基础上，加几百毫秒

**并且为了性能更快，可以把第二次删除缓存可以做成异步的，这样不会阻塞请求了，如果再严谨点，防止第二次删除缓存失败，这个异步删除缓存可以加上重试机制，失败一直重试，直到成功。**

这里给出两种重试机制参考

方案一

1. 更新数据库数据
2. 缓存因为种种问题删除失败
3. 将需要删除的 key 发送至消息队列
4. 自己消费消息，获得需要删除的 key
5. 继续重试删除操作，直到成功

![img](https://pic2.zhimg.com/80/v2-d9983d67cf9f4a44383171ab0806bdd5_720w.jpg)

然而，该方案有一个缺点，对业务线代码造成大量的侵入，于是有了方案二，启动一个订阅程序去订阅数据库的 Binlog，获得需要操作的数据。在应用程序中，另起一段程序，获得这个订阅程序传来的信息，进行删除缓存操作

方案二：

1. 更新数据库数据
2. 数据库会将操作信息写入 binlog 日志当中
3. 订阅程序提取出所需要的数据以及 key
4. 另起一段非业务代码，获得该信息
5. 尝试删除缓存操作，发现删除失败
6. 将这些信息发送至消息队列
7. 重新从消息队列中获得该数据，重试操作

![img](https://pic2.zhimg.com/80/v2-d4473abe5d052af267009ca8cb6bd75d_720w.jpg)

上述的订阅 Binlog 程序在 MySql 中有现成的中间件叫 Canal，可以完成订阅 Binlog 日志的功能，另外，重试机制，这里采用的是消息队列的方式。如果对一致性要求不是很高，直接在程序中另起一个线程，每隔一段时间去重试即可，这些大家可以灵活自由发挥，只是提供一个思路。

**总结：**大部分应该使用的都是第三种或第四种方式，如果都是采用延时双删策略(缓存双淘汰法)，可能区别不会很大，不过第四种方式出现脏数据概率是更小点，更多的话还是要结合自身业务场景使用，灵活变通。

### **分布式锁**

例如一个操作要修改用户的状态，修改状态需要先读出用户的状态，在内存里进行修 改，改完了再存回去。如果这样的操作同时进行了，就会出现并发问题，因为读取和保存状 态这两个操作不是原子的。（Wiki 解释：所谓原子操作是指不会被线程调度机制打断的操作；这种操作一旦开始，就一直运行到结束，中间不会有任何 context switch 线程切换。）如图：

![img](https://pic1.zhimg.com/80/v2-8436b714afad715b9000ddbc1dc430c8_720w.jpg)

这个时候就要使用到分布式锁来限制程序的并发执行。

分布式锁本质上要实现的目标就是在 Redis 里面占一个“茅坑”，当别的进程也要来占 时，发现已经有人蹲在那里了，就只好放弃或者稍后再试。占坑一般是使用 setnx(set if not exists) 指令，只允许被一个客户端占坑。先来先占， 用 完了，再调用 del 指令释放茅坑。

```text
setnx lock:codehole true
OK
 ... do something critical ...
del lock:codehole
(integer) 1
```

但是有个问题，如果逻辑执行到中间出现异常了，可能会导致 del 指令没有被调用，这样 就会陷入死锁，锁永远得不到释放。于是我们在拿到锁之后，再给锁加上一个过期时间，比如 5s，这样即使中间出现异常也 可以保证 5 秒之后锁会自动释放。

```text
setnx lock:codehole true
OK
> expire lock:codehole 5 ...
do something critical ...
> del lock:codehole
 (integer) 1
```

如果在 setnx 和 expire 之间服务器进程突然挂掉了，可能是因为机器掉电或者是被人为杀掉的，就会导致 expire 得不到执行，也会造成死锁。

这种问题的根源就在于 setnx 和 expire 是两条指令而不是原子指令。如果这两条指令可 以一起执行就不会出现问题。也许你会想到用 Redis 事务来解决。但是这里不行，因为 expire 是依赖于 setnx 的执行结果的，如果 setnx 没抢到锁，expire 是不应该执行的。事务里没有 if else 分支逻辑，事务的特点是一口气执行，要么全部执行要么一个都不执行。

Redis 2.8 版本中作者加入了 set 指令的扩展参数，使得 setnx 和 expire 指令可以一起执行：

```text
set lock:codehole trueex 5 nx
OK
... do something critical ...
del lock:codehole
```

上面这个指令就是 setnx 和 expire 组合在一起的原子指令，它就是分布式锁的奥义所在。

### **分布式锁存在的问题**

超时问题：如果在加锁和释放锁之间的逻辑执行的太长，以至于超出了锁的超时限制，就会出现问题。因为这时候锁过期了，第二个线程重新持有了这把锁，但是紧接着第一个线程执行完了业务逻辑，就把锁给释放了，第三个线程就会在第二个线程逻辑执行完之间拿到了锁。

单节点的分布式锁问题：在单 Matste 的主从 Matster-Slave Redis 系统中，正常情况下 Client 向 Master 获取锁之后同步给 Slave，如果 Client 获取锁成功之后 Master 节点挂掉，并且未将该锁同步到 Slave，之后在 Sentinel 的帮助下 Slave 升级为 Master 但是并没有之前未同步的锁的信息，此时如果有新的 Client 要在新 Master 获取锁，那么将可能出现两个 Client 持有同一把锁的问题，来看个图来想下这个过程：

![img](https://pic4.zhimg.com/80/v2-02015bd47c8f54d29f00fa96e6051613_720w.jpg)

所以，为了保证自己的锁只能自己释放需要增加唯一性的校验，综上基于单 Redis 节点的获取锁和释放锁的简单过程如下:

```text
// 获取锁 unique_value作为唯一性的校验
SET resource_name unique_value NX PX 30000

// 释放锁 比较unique_value是否相等 避免误释放
if redis.call("get",KEYS[1]) == ARGV[1] then
    return redis.call("del",KEYS[1])
else
    return 0
end
```

### **关于分布式锁的 Redlock 算法**

Redis 性能好并且实现方便，但是单节点的分布式锁在故障迁移时产生安全问题，Redlock 算法是 Redis 的作者 Antirez 提出的集群模式分布式锁，基于 N 个完全独立的 Redis 节点实现分布式锁的高可用。

在 Redis 的分布式环境中，我们假设有 N 个完全互相独立的 Redis 节点，在 N 个 Redis 实例上使用与在 Redis 单实例下相同方法获取锁和释放锁。

现在假设有 5 个 Redis 主节点(大于 3 的奇数个)，这样基本保证他们不会同时都宕掉，获取锁和释放锁的过程中，客户端会执行以下操作:

1. 获取当前 Unix 时间，以毫秒为单位
2. 依次尝试从 5 个实例，使用相同的 key 和具有唯一性的 value 获取锁 当向 Redis 请求获取锁时，客户端应该设置一个网络连接和响应超时时间，这个超时时间应该小于锁的失效时间，这样可以避免客户端死等
3. 客户端使用当前时间减去开始获取锁时间就得到获取锁使用的时间。当且仅当从半数以上的 Redis 节点取到锁，并且使用的时间小于锁失效时间时，锁才算获取成功
4. 如果取到了锁，key 的真正有效时间等于有效时间减去获取锁所使用的时间，这个很重要
5. 如果因为某些原因，获取锁失败（没有在半数以上实例取到锁或者取锁时间已经超过了有效时间），客户端应该在所有的 Redis 实例上进行解锁，无论 Redis 实例是否加锁成功，因为可能服务端响应消息丢失了但是实际成功了，毕竟多释放一次也不会有问题

### **关于集群**

在大数据高并发场景下，单个 Redis 实例往往会显得捉襟见肘。首先体现在内存上，单个 Redis 的内存不宜过大，内存太大会导致 rdb 文件过大，进一步导致主从同步时全量同步时间过长，在实例重启恢复时也会消耗很长的数据加载时间，特别是在云环境下，单个实例内存往往都是受限的。其次体现在 CPU 的利用率上，单个 Redis 实例只能利用单个核心，这单个核心要完成海量数据的存取和管理工作压力会非常大。所以孕育而生了 Redis 集群，集群方案主要有以下几种：

- Sentinel：Sentinel（哨兵）模式，基于主从复制模式，只是引入了哨兵来监控与自动处理故障
- Codis：Codis 是 Redis 集群方案之一，令我们感到骄傲的是，它是中国人开发并开源的，来自前豌豆荚中间件团队。
- Cluster：Redis Cluster 是 Redis 的亲儿子，它是 Redis 作者自己提供的 Redis 集群化方案。

感谢阅读，部分图片来源于互联网，暂未备注来源～

## **参考**

Redis 开发与运维：[https://book.douban.com/subject/26971561](https://link.zhihu.com/?target=https%3A//book.douban.com/subject/26971561)

事务和 Lua 脚本：[https://whiteccinn.github.io/2020/06/02/Redis/redis%E4%BA%8B%E5%8A%A1%E5%92%8Clua](https://link.zhihu.com/?target=https%3A//whiteccinn.github.io/2020/06/02/Redis/redis%E4%BA%8B%E5%8A%A1%E5%92%8Clua)

Redis GEO 功能使用场景：[https://www.cnblogs.com/54chensongxia/p/13813533.html](https://link.zhihu.com/?target=https%3A//www.cnblogs.com/54chensongxia/p/13813533.html)

Redis 与数据库一致性：[https://note.dolyw.com/cache/00-DataBaseConsistency.html](https://link.zhihu.com/?target=https%3A//note.dolyw.com/cache/00-DataBaseConsistency.html)



