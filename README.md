'Math.max(x, y)' ->
'Math.max' + '(x, y)'
'(x, y)'.split('').pop().unshift().join()
'x,y'.split(',') -> ['x', 'y']
type: 1 // 公式
type: 2 // 数值 or 参数
arr = [
name: 'Math.max',
type: 1,
isRest: true,
children: [
{
name: 'x',
type: 2,
isRest: true
},
{
name: 'y',
type: 2,
isRest: true
}
]
]

- -----> 找到当前项的 index
  判断 arr[index-1].isRest === true
  判断 arr[index+1] 是否存在 && arr[index+1].isRest === true

isRest === false 时
往前 或者 往后 插入一个输入框

[
{
value: 'Math.max()',
key: null,
type: 1
children: [
{
type: 2, // 1 为公式；2 为数值 3 文本
key: width,
value: x // x 可是个具体数值，或者 也可以是个 Math.min(),继续往下嵌套
},
{
tyee: 3,
value: ','
},
{
type: 2,// 同 x
key: height,
value: y // 同上 x
}
]
}
]
// key 需要传给后端
----> 最后组装成 Math.max(x,y)

$+$
例如：
Math.max(A 的长度 \* A 的高度， Math.min( B 的 xxx，C 的 xxx) + D 的 xxx - E 的 xxx)

list：[
{
key: A 的长度,
value: 2
},
{
key: A 的高度，
value: 3
},
{
key: B 的 xxx
value: 3
},
{
key: C 的 xxx,
value: 4
},
{
key: D 的 xxx,
value: 4
},
{
key: E 的 xxx,
value: 4
}
]

regStr = `Math.max($ * $, Math.min( $, $) + $ - $)`

<!-- isFirst = regStr.subStr(0, 1) === "$" -->

$+$-$
Math.max($, $)

$arr = [ "$","$","$","$","$","$" ]

$catch = {
'id1': {
type: '', 1 表达式；2 参数
value: ''
key; ''
id: ''
% templ: ''
},
'id2': {
},
'id3': {
},
'id4': {
},
'id5': {
},
'id6': {
}
}

$keys // = ['id1', 'id2', 'id3', 'id4', 'id5', 'id6']

// $components = [components, components, components, components, components, components] // 渲染组件

let renderTempl = ''
let $keys = []
let $catch = {}
for (let v of regStr) { if (v === '$') {
renderTempl +=`<components :key="id" :row="item" @setStatus="setStatus"/>`
let id = uuid()

} else {
renderTempl += v
}
}

renderTempl = `Math.max( <components :key="id" :row="item" /> * <components />, Math.min( <components />, <components />) + <components /> - <components />)` // 不可行

resStr = `Math.max(A的长度 * A的高度， Math.min( B的xxx，C的xxx) + D的xxx - E的xxx)`

[
{
start: '',
key: '',
type: 1, // 任意 ： 变量 或者 表达式
},
{
start: '+'
},
{
start: 'Math.min(',
end: ')',
key: '',
type: 1,
children: [

    ]

}
]
