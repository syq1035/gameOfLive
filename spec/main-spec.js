const main = require('../main/operationForGameOfLive');

describe('main()', () => {


  it('should return array', () => {
    var test_array = [[1,0,1], [1,0,1], [0,0,1]];
    let actual = main(test_array);
    expect(actual[0][0]).toEqual(
      0
     );
  });

});