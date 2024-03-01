function Parent() {
  this.age = 38;
}
Parent.prototype.sayHello = () => {
  console.log('parent!');
};

Parent.prototype.work = () => {
  console.log('parent work!');
};

function Child() {
  this.age = 16;
}

Child.prototype.sayHello = () => {
  console.log('child!');
};

function extend(child, parent) {
  const originPrototype = child.prototype;
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });

  for (const [key, value] of Object.entries(originPrototype)) {
    child.prototype[key] = value;
  }

  return child;
}

extend(Child, Parent);

const child = new Child();
console.log(child);
