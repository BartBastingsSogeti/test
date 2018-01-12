function myModule() {
  this.hello = function() {
    return 'hello!';
  };

  this.goodbye = function() {
    return 'goodbye!';
  };

  this.test = function() {
    return 'test!';
  };
}

module.exports = myModule;
