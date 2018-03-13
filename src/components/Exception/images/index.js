const req = require.context('./', false, /\.svg$/);
const paths = req.keys().filter(item => item !== './index.js');

export default paths.reduce((result, path) => {
  const index = path
    .split(/(\\|\/)/g)
    .pop()
    .split(/\.svg$/)
    .shift();

  result[index] = req(path) || {};

  return result;
}, {});
