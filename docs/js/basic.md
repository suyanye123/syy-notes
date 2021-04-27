## JS备忘录

#### 数组方法

push 添加到数组的末尾        pop 删除数组末尾元素

unshift  在数组开头插入元素    shift 删除数组第一个元素





Math.floor() 返回小于或等于一个给定数字的最大整数。







#### 字符串方法

index of 返回指定的字符串首次出现的位置







substr(start [，length]) 第一个字符的索引是0，start必选 length可选

substring(start [, end]) 第一个字符的索引是0，start必选 end可选

相同点：当有一个参数时，两者的功能是一样的，返回从start指定的位置直到字符串结束的子串

不同点：有两个参数时

（1）substr(start,length) 返回从start位置开始length长度的子串

“goodboy”.substr(1,6);    //注意substr在ECMAscript 没有对该方法进行标准化 

 注：当length为0或者负数，返回空字符串

（2）substring(start,end) 返回从start位置开始到end位置的子串（不包含end）

“goodboy”.substring(1,6); 

【注】:

（1）substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点

（2）start 或 end 为 NaN 或者负数，那么将其替换为0