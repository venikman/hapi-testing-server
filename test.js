import test from 'ava';
import hapiTestingServer from '.';

test('hapiTestingServer()', (t) => {
    t.notThrows(hapiTestingServer, 'Fix all module errors.');
});
