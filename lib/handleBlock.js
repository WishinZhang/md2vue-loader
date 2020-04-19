const container = require('markdown-it-container');
const cache = require('./cache');

module.exports = function handleVueBlock(md, options) {
  md.use(container, 'vue', {
    validate(params) {
      return /^vue/.test(params.trim());
    },
    render(tokens, index) {
      const wrapTagName = options.wrapBlock;
      if (tokens[index].nesting === 1) {
        const m = tokens[index].info.trim().match(/^vue\s+(.*)$/);
        // m[1] 是指 vue 后面描述的内容
        const blockDesc = m && m.length > 1 ? m[1] : '';
        const explain = blockDesc !== '' ? `<template slot="explain">${md.render(blockDesc)}</template>` : '';
        let codeType = tokens[index + 1].info.trim(); // 代码类型
        // 如果是 jsx、mjs、mjsx、javascript，则将 blockType 设置为 jsx，否则为 vue
        if (['js', 'mjs', 'mjsx', 'javascript'].indexOf(codeType) > -1) {
          codeType = 'jsx';
        } else if (['html'].indexOf(codeType) > -1) {
          codeType = 'vue';
        }
        // fence 是指代码块，如果下一个 token 是 fence
        const vueCode = tokens[index + 1].type === 'fence' ? tokens[index + 1].content : '';
        // 设置 vue block 缓存并获取其对应的组件名称
        const compName = cache.setBlockCache(vueCode, codeType);
        return `<${wrapTagName}>${explain}<${compName} slot="content" />`;
      } else if (tokens[index].nesting === -1) {
        return `</${wrapTagName}>`;
      } 
    }
  });
};
