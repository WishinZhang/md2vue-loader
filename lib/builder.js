const cache = require('./cache');

module.exports = function(html, fileName, fileNameExt, querystring, options) {
  const blocks = cache.getBlocksCache();
  let importList = '';
  let compNames = '';
  for (const block of blocks) {
    const query = `${querystring}&blockId=${block.id}&blockType=${block.type}`;
    console.log(query);
    importList += `import ${block.name} from "./${fileNameExt}?${query}";`;
    compNames += `${block.name},`;
  }
  return `
    <template>
      <div class="${options.wrapClass}">${html}</div>
    </template>
    <script>
    ${importList}
    export default {
      name: "${fileName}",
      components: {
        ${compNames}
      }
    }
    </script>
  `;
}
