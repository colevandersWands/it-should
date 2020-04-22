itShould('assertion: ok', function okSpec(test) {
  // debugger;
  test.ok(false, 'failing ok');
  test.ok(true, 'passing ok');
  test.ok(null);
  test.ok(12);
});

itShould('assertion: notOk', function notOkSpec(test) {
  test.notOk('hi', 'failing notOk');
  test.notOk('', 'passing notOk');
  test.notOk(0);
  test.notOk({});
});

itShould('assertion: strictEqual', function strictEqualSpec(test) {
  test.strictEqual(true, false, 'failing strictEqual');
  test.strictEqual(true, true, 'passing strictEqual');
  test.strictEqual(true, false);
  test.strictEqual(true, true);
  test.strictEqual([], []);
  test.strictEqual({}, {});
  const obj = {};
  test.strictEqual(obj, obj);
});

itShould('assertion: notStrictEqual', function notStrictEqualSpec(test) {
  test.notStrictEqual(true, true, 'failing notStrictEqual');
  test.notStrictEqual(true, false, 'passing notStrictEqual');
  test.notStrictEqual(true, true);
  test.notStrictEqual(true, false);
  test.notStrictEqual([], []);
  test.notStrictEqual({}, {});
  const obj = {};
  test.notStrictEqual(obj, obj);
});

itShould('assertion: deepStrictEqual', function deepStrictEqualSpec(test) {
  test.deepStrictEqual({ a: 1, b: 1 }, { b: 2, a: 1 }, 'failing deepStrictEqual');
  test.deepStrictEqual({ a: 1, b: 2 }, { b: 2, a: 1 }, 'passing deepStrictEqual');
  test.deepStrictEqual(true, true);
  test.deepStrictEqual(true, false);
  test.deepStrictEqual([1, 3], [1, 2]);
  test.deepStrictEqual([2], [2]);
  const obj = {};
  test.deepStrictEqual(obj, obj);
});

itShould('assertion: notDeepStrictEqual', function notDeepStrictEqualSpec(test) {
  test.notDeepStrictEqual({ a: 1, b: 2 }, { b: 2, a: 1 }, 'failing notDeepStrictEqual');
  test.notDeepStrictEqual({ a: 1, b: 1 }, { b: 2, a: 1 }, 'passing notDeepStrictEqual');
  test.notDeepStrictEqual(false, true);
  test.notDeepStrictEqual(false, false);
  test.notDeepStrictEqual([1, 2], [1, 2]);
  test.notDeepStrictEqual([2], [1]);
  const obj = {};
  test.notDeepStrictEqual(obj, obj);
});

itShould('assertion: throws', function throwsSpec(test) {
  test.throws(() => { throw new Error('hi') });
  test.throws(() => { throw new Error('hi') }, { name: 'Error', message: 'hi' });
  test.throws(() => { throw new Error('hi') }, { name: 'Error', message: 'hi' }, 'throw an error please');
  test.throws(() => { });
  test.throws(() => { }, { name: 'Error', message: 'hi' });
  test.throws(() => { throw new Error('hi') }, { name: 'Error', message: 'ih' }, 'throw an error please');
});

itShould('assertions return a boolean value', function assertionsReturnBooleanSpec(test) {
  console.log(
    test.ok('why not?', 'why not?'),
    test.notOk(''),
    test.strictEqual('e', 3),
    test.notStrictEqual('e', 3),
    test.deepStrictEqual([2], [2]),
    test.notDeepStrictEqual([2], [2]),
    test.throws(() => { throw new Error('do it!') }),
  );
}, { console: false });


itShould("meta: exit", function exitSpec(test) {
  test.ok('this happens');
  test.exit('done!')
  test.ok('this doesn\'t happens');
});


itShould("meta: log", function logSpec(test) {
  test.log('test.log pushes to the hidden report\'s log');
  test.log('pushes', 'arguments', 'separately');
  const returnedArgs = test.log('but doesn\'t print to the console');
  console.log(returnedArgs);
});


const testReport0 = itShould('report: itShould returns a test report', function returnValueSpec0(test) {
  test.ok(false, 'failing ok');
  test.ok(true);
  test.throws(() => { throw new Error('hi') }, { name: 'rorrE', message: 'hi' });
  test.notDeepStrictEqual({ a: 1, b: 2 }, { b: 2, a: 1 }, 'failing');
});
console.log(testReport0);


itShould('report.returned - return value', function returnValueSpec2() {
  return ".return will be the return value from the test function \n"
    + "   if no exceptions were thrown, uncaught will be false";
}, { after: r => console.log(r) });


itShould('report.uncaught - thrown exceptions', function thrownErrorsSpec() {
  throw new Error("if the function throws an exception,\n"
    + "   .uncaught will be the exception & uncaught will be true");
}, { after: r => console.log(r) });


itShould('report.exit - forced (does not influence pass/fail)', function forcedExitSpec(test) {
  test.exit('exit message');
}, { after: r => console.log(r) });


// itShould('config - debug: true', function configDebugSpec() {
//   const hi = '!';
// }, { debug: true });


itShould("config - console: false", function configConsoleSpec(test) {
  test.ok(false, 'failing ok');
  test.ok(true);
  test.throws(() => { throw new Error('hi') }, { name: 'rorrE', message: 'hi' });
  test.notDeepStrictEqual({ a: 1, b: 2 }, { b: 2, a: 1 }, 'failing');
}, { console: false });


itShould('config - before: ()=>{}', function beforeSpec() {
  window.before = 'nope';
},
  { before: r => console.log(window.before, r) });


itShould('config - after: ()=>{}', function afterSpec() {
  window.after = 'yup';
},
  { before: r => console.log(window.after, r) });


itShould("report and config are hidden in a test", function reportAndConfigAreHiddenSpec(test) {
  test.notOk(test.report, 'report is not exposed');
  test.notOk(test.config, 'config is not exposed');
});


const suiteReport = itShould('be able to simulate larger test suites', function suiteNameSpec(suiteName) {

  itShould('do this one thing', test => {
    test.ok('it does it', 'words, words, words');
  },
    { after: (report) => suiteName.log(report) });

  itShould('do this other one thing', test => {
    test.ok('it does it', 'words, words');
  },
    { before: (report) => suiteName.log(report) });

  suiteName.log('hello dev');

  suiteName.log(
    itShould('and this last thing', test => {
      test.notOk('', 'words');
    }));

  if (suiteName.notDeepStrictEqual([2], ['2'])) {
    suiteName.exit('too bad');
  };

});

console.log(suiteReport);


console.log(
  'itShould.methods:',
  itShould.ok('why not?'),
  itShould.notOk(''),
  itShould.strictEqual('e', 3),
  itShould.notStrictEqual('e', 3),
  itShould.deepStrictEqual([2], [2]),
  itShould.notDeepStrictEqual([2], [2]),
  itShould.throws(() => { throw new Error('do it!') }),
  itShould.exit === undefined,
  itShould.log('bye!')
);

console.log('it should ... store its own report', itShould.report);



// ------ final demo ------

const reverse = (str) => str.split('').reverse().join('');

itShould('(final demo) reverse strings ...', function reverseSuite(suite) {

  itShould('... with numbers', test => {
    const arg = '321';
    const actual = reverse(arg);
    const expected = '123';
    test.strictEqual(actual, expected);
  },
    { after: r => suite.log(r) });

  itShould('... with letters', function withLetters(test) {
    const arg = 'asdf';
    const actual = reverse(arg);
    const expected = 'fdsa';
    test.strictEqual(actual, expected);
  },
    { after: r => suite.log(r) });

},
  { after: r => renderReport('tests', reverse, r) });
