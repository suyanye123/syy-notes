# Typescript

类型

- any	任意类型，会传染
- unknown    任意类型，安全的any，不会传染

- void	 空值（null）或undefined
- never    不能是任何值，永远不会返回结果

- objext	 

```typescript
//在属性名后面加问号，表示属性可选，否则必选
let b:{name:string, age?:number}
//propName代表任意属性 （propname可以为任意名字，但是限制类型为string）
let c:{name:string,[propName:string]:any}
//用箭头函数，限定函数结构的参数和返回值属性
let d:(a:number,b:number)=>number
```

- string	设置数组中元素的类型

```typescript
let e:string[]; let f:number[]
let g:Array<number>;
```

- tuple	元祖，固定长度的数组,，效率更快

```typescript
let h:[string,string]
```

- enum    枚举

```typescript
//定义枚举
enum Gender{male=0,female=1};
let i:{name:string, gender:Gender};
i= {name:'孙武',gender:Gender.male}
```



类型断言，告诉解析器变量的实际类型

```typescript
ts = e as string;
s = <string>e;
```

&和|

```typescript
let j: {name:string} & {age:number}
j = {name:'xxx',age:18}			//必须同时满足存在两个属性
let j:string| number         //表示j是字符串或 数字类型
```

类型的 别名

```typescript
type myType = 1|2|3|4|5;
let k: myType;
let l: myType;
```

