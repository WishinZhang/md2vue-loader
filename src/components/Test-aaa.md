
## md-vue-block-loader测试

:::vue 这是模块说明

```html
<template>
  <div class="test">
    <p>{{ msg }}</p>
    <Button />
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  components: { Button },
  data() {
    return {
      msg: '这是测试内容'
    }
  }

}
</script>

<style lang="less" scoped>
.test {
  font-size: 16px;
  color: red;
}
</style>
```

:::

:::vue 这是JSX案例

``` javascript
import './demo.css';
import Button from './Button.vue';

export default {
  components: { Button },
  data() {
    return {
      msg: 'JSX测试内容'
    }
  },
  render() {
    return (
      <div class="test">
        <p>{ this.msg }</p>
        <Button />
      </div>
    )
  }

}
```

:::
