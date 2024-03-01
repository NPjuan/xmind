const obj = {
  a: 1,
};

const proxy = {
  a: 2,
};

function log(...args) {
  console.log(args);
  console.log(this.a);
}

function call(context, ...args) {
  if (!context) {
    context = window;
  } else {
    context = Object(context);
  }
  if (typeof this !== 'function') {
    throw new Error('no function');
  }

  const prop = Symbol('uniqueFn');
  context[prop] = this;
  console.log(context);

  const result = context[prop](...args);
  delete context[prop];

  return result;
}

Function.prototype.call = call;
log.call(proxy, 1, 2, 3);
