module.exports = {
    plugins: [
      require('autoprefixer')(),
      require('postcss-remove-decl')({
        decls: ['-webkit-text-size-adjust']
      })
    ]
  };
  
