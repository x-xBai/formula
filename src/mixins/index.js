export const tableMixins = {
    data () {
        return {
            min: 1,
            obj: {
                a:1,
                b: {
                    a: 1,
                    b: 2,
                    c: 'minxs'
                },
                c: 'minxs',
                d: 'minxs'
            }
        }
    },
    methods: {
        getMin () {
            let a = this.min
            console.log('mixins ---- mixins中', a, this.min)
        }
    },
    created () {
        console.log('mixin-----')
    }
}
