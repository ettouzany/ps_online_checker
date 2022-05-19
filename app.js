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



a = []

b = []

instructions = []
height = document.getElementById("myRange").value;

let formattedNumber = (number) => {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: 4,
        useGrouping: false
    })
}
function slider_value(value) {
    height = value;
    render(a, b)
}
click_instruction = (instruction) => {
    switch (instruction) {
        case "sa":
            s(a)
            break;
        case "sb":
            s(b)
            break;
        case "ss":
            ss(a, b)
            break;
        case "pa":
            p(a, b)
            break;
        case "pb":
            p(b, a)
            break;
        case "ra":
            r(a)
            break;
        case "rb":
            r(b)
            break;
        case "rr":
            rr(a, b)
            break;
        case "rra":
            rv(a)
            break;
        case "rrb":
            rv(b)
            break;
        case "rrr":
            rvr(a, b)
            break;
        default:
            break;

    }
    render(a, b)
}

function check() {
    numbers = document.getElementById("numbers").value.split("\n")
    // check if numbers are valid
    numbers.forEach(element => {
        // check if element is a number
        if (isNaN(element)) {
            alert("Please enter numbers only")
            return
        }
    });
    // check if numbers are unique
    if (new Set(numbers).size !== numbers.length) {
        alert("Please enter unique numbers")
        return
    }
    // check if numbers are positive
    numbers.forEach(element => {
        if (element < 0) {
            alert("Please enter positive numbers only")
            return
        }
    });
    //remove empty strings
    numbers = numbers.filter(function (el) {
        return el != "";
    });
    a = numbers;
    b = [];
    _instructions = document.getElementById("instructions").value.split("\n")

    _instructions.forEach(element => {
        if (element.length > 0) {
            click_instruction(element)
        }
    });

    instructions = _instructions;
    render(a, b)
    console.log(numbers);
}

instructions_player = (action) => {
    switch (action) {
        case "play":
            play()
            break;
        case "pause":
            pause()
            break;
        case "restart":
            restart()
            break;
        default:
            break;
    }
}

function play() {
    if (instructions.length > 0) {
        let action = instructions.shift();
        click_instruction(action)
        var t = setTimeout(play, 1000)
    }
}

function pause() {
    clearTimeout(t)
}

function restart() {
    instructions = instructions.concat(instructions)
    play()
}


function render(a, b) {

    stack_a = document.getElementById("stack_a");
    stack_b = document.getElementById("stack_b");
    stack_a.innerHTML = "";
    stack_b.innerHTML = "";
    // sorted_a = return sorted a
    sorted_a = JSON.parse(JSON.stringify(a)).sort((a, b) => a - b)
    _a = a.map((item, index) => {
        //get index of item in sorted_a
        let index_in_sorted_a = sorted_a.indexOf(item);
        return index_in_sorted_a + 1
    })

    sorted_b = JSON.parse(JSON.stringify(b)).sort((a, b) => a - b)
    _b = b.map((item, index) => {
        //get index of item in sorted_a
        let index_in_sorted_b = sorted_b.indexOf(item);
        return index_in_sorted_b + 1
    })
    _a.forEach(element => {
        stack_a.innerHTML += `<span class="stack-item" style="background-color: #1${formattedNumber(element)}0; width: ${element / a.length * 100}%; height: ${height}px;"></span>`
    });

    _b.forEach(element => {
        stack_b.innerHTML += `<span class="stack-item" style="background-color: #1${formattedNumber(element)}0; width: ${element / b.length * 100}%; height: ${height}px;"></span>`
    }
    )
}

render(a, b)
