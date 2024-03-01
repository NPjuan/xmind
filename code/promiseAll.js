const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p4');
  }, 2000);
});

const promiseAll = (arr) => {
  const result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i]).then((value) => {
        result[i] = value;
        if (result.length === arr.length) {
          resolve(result);
        }
      }, reject);
    }
  });
};

promiseAll([p1, p2, p3, p4]).then(
  (value) => {
    console.log('promiseAll', value);
  },
  (error) => {
    console.log(error);
  }
);
