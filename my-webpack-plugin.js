class MyWebpackPlugin {
    getToday() {
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        return today;
    }

    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            const source = compilation.assets['main.js'].source();
            compilation.assets['main.js'].source = () => {
              const banner = [
                '/**',
                ' * 이것은 BannerPlugin이 처리한 결과입니다.',
                ` * Build Date: ${this.getToday()}`,
                ' */'
              ].join('\n');
              return banner + '\n' + source;
            }
      
            callback();
        })
    }
}
  
module.exports = MyWebpackPlugin;