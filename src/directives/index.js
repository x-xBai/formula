const roles = 'admin'

const myDirectives = {
    install (Vue) {
        Vue.directive('onfocus', {
            inserted: (el, option) => {
                // console.log('聚焦了', el, option)
                if (option.value) return el.focus()
            }
        })

        Vue.directive('msg', {
            bind: function (el, option) {
                console.log(el, option)
                el.innerhtml = '我是通过自定义指令添加的内容'
            }
        })
        Vue.directive('has', {
            inserted: (el, option, vnode) => {
                console.log(el, el.parentNode, option, vnode)
                if (!roles !== 'admin') {
                    console.log(111)
                    el.parentNode.removeChild(el)
                }
                // 
            }
        })
    }
}
export default myDirectives