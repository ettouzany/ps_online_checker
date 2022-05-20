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

instructions = [];
played = 0;
height = document.getElementById("myRange").value;
a_init = [];
state = 0;
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
    a_init = JSON.parse(JSON.stringify(a));
    b = [];
    _instructions = document.getElementById("instructions").value.split("\n")

    _instructions.forEach(element => {
        if (element.length > 0) {
            played++;
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
        case "next":
            next();
        case "back":
            back();
        default:
            break;
    }
}
let timer;

function play() {
    if (played < instructions.length) {
        click_instruction(instructions[played])
        played++;
        clearTimeout(timer);
        timer = setTimeout(play, 1000);
        document.getElementById("play").innerHTML ='<i class="fa fa-pause"></i>';
    } else {
        document.getElementById("play").innerHTML ='<i class="fa fa-play"></i>';
        clearTimeout(timer)
    }
}

function pause() {
    if(state == 0)
    {
        document.getElementById("play").innerHTML ='<i class="fa fa-pause"></i>';
        state = 1;
        clearTimeout(timer);
        play();
    } else
    {
        document.getElementById("play").innerHTML = '<i class="fa fa-play"></i>';
        state = 0;
        console.log("not play");
        clearTimeout(timer)
    }
    if(played == instructions.length)
    {
        restart()
    }
}

function restart() {
    console.log(played);
    a = JSON.parse(JSON.stringify(a_init));
    b = [];
    console.log(a);
    render(a, b)
    played = 0;
    clearTimeout(timer);
    play();
}

function next()
{
    if (played < instructions.length) {
        click_instruction(instructions[played])
        played++;
    }
}


function back_from_instruction() {
    console.log(b.length)
    if(instructions[played] == "rrr")
    {
        rvr(a, b)
    }
    else if(instructions[played] == "rrb")
    {
        rv(b)
    }
    else if(instructions[played] == "rra")
    {
        rv(a)
    }
    else if(instructions[played] == "rr")
    {
        rr(a, b)
    }
    else if(instructions[played] == "rb")
    {
        r(b)
    }
    else if(instructions[played] == "ra")
    {
        r(a)
    }
    else if(instructions[played] == "pb")
    {
        p(a, b)
    }
    else if(instructions[played] == "pa")
    {
        p(b, a)
    }
    else if(instructions[played] == "ss")
    {
        ss(a, b)
    }
    else if(instructions[played] == "sb")
    {
        s(b)
    }
    else if(instructions[played] == "sa")
    {
        s(a)
    }
}
function back()
{
    if(played)
    {
        back_from_instruction()
        played--;
    }
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
