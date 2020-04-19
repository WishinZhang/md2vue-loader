const cache = {};
let currentFileId = '';
let currentFileName = '';

module.exports = {
  getSourceCodeCache(fileId) {
    return cache[fileId] && cache[fileId].source;
  },
  setSourceCodeCache(fileId, code) {
    cache[fileId].source = code;
  },
  getRenderCodeCache(fileId) {
    return cache[fileId] && cache[fileId].render;
  },
  setRenderCodeCache(fileId, code) {
    cache[fileId].render = code;
  },
  getBlockCache(fileId, blockId) {
    let code = '';
    if (cache[fileId]) {
      for (const block of cache[fileId].blocks) {
        if (block.id === blockId) {
          code = block.code;
          break;
        }
      }
    }
    return code;
  },
  setBlockCache(code, type) {
    const id = `${cache[currentFileId].id++}`;
    const name = `${currentFileName}Block${id}`;
    cache[currentFileId].blocks.push({ id, name, type, code });
    return name;
  },
  getBlocksCache() {
    return cache[currentFileId].blocks;
  },
  resetFileCache(fileId) {
    cache[fileId] = {
      id: 0,
      source: '',
      render: '',
      blocks: []
    };
  },
  setCurrentFile(id, name) {
    currentFileId = id;
    currentFileName = name;
  }
}
