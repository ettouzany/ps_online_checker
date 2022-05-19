// sa: swap a - swap the first 2 elements at the top of stack a. Do nothing if there is only one or no elements.
// sb: swap b - swap the first 2 elements at the top of stack b. Do nothing if there is only one or no elements.
// ss: sa and sb at the same time.
// pa: push a - take the first element at the top of b and put it at the top of a. Do nothing if b is empty.
// pb: push b - take the first element at the top of a and put it at the top of b. Do nothing if a is empty.
// ra: rotate a - shift up all elements of stack a by 1. The first element becomes the last one.
// rb: rotate b - shift up all elements of stack b by 1. The first element becomes the last one.
// rr: ra and rb at the same time.
// rra: reverse rotate a - shift down all elements of stack a by 1. The last element becomes the first one.
// rrb: reverse rotate b - shift down all elements of stack b by 1. The last element becomes the first one.
// rrr: rra and rrb at the same time.

function s(s) {
    if (s.length > 1) {
        let temp = s[0];
        s[0] = s[1];
        s[1] = temp;
    }
}

function ss(a, b) {
    a = s(a);
    b = s(b);
}

function p(a, b) {
    if (b.length > 0) {
        a.push(b[0]);
        b.shift();
    }
}

function r(s) {
    if (s.length > 1) {
        let temp = s[0];
        s.shift();
        s.push(temp);
    }
}

function rr(a, b) {
    a = r(a);
    b = r(b);
}

function rv(s) {
    if (s.length > 1) {
        let temp = s[s.length - 1];
        s.pop();
        s.unshift(temp);
    }
}

function rvr(a, b) {
    a = rv(a);
    b = rv(b);
}

