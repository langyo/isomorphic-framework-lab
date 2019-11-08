const dfs = dir => {
  let files = fs.readdirSync(dir);
  let ret = {};

  for(let file of files) {
    if(fs.statSync(`${dir}/${file}`).isDirectory())
      ret[file] = dfs(`${dir}/${file}`);
    else ret[file] = require(`${dir}/${file}`);
  }
  
  return ret;
};

module.exports = {
  actions: dfs('../actions'),
  components: dfs('../components')
};
