const { findTree } = require('./strategy');

test('the data is peanut butter', async () => {
    const data = await findTree('strategy/');
    const result = {
        dirs: ["strategy"],
        files: [
            "strategy/strategy.test.js",
            "strategy/strategy.js",
            "strategy/index.js",
        ],
    };
    expect(data).toStrictEqual(result);
});
  
test('the promise fails with an error about empty path', async () => {
    try {
      await findTree();
    } catch (e) {
      expect(e).toMatch('This path is empty!');
    }
});

test('the fetch fails with an error', async () => {
    try {
      await findTree('newFolder/');
    } catch (e) {
      expect(e).toMatch('This path is not correct!');
    }
});