class MyWebpackPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Hello World Plugin',(stats) => {
            console.log('Hello World!');
        });
    }
}
  
module.exports = MyWebpackPlugin;