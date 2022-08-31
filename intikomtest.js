const ThreeFive = (input) => {
    for (let i = 1; i <= input; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log('ThreeFive');
        } else if (i % 3 === 0) {
            console.log('Three');
        } else if (i % 5 === 0) {
            console.log('Five');
        } else {
            console.log(i);
        }
    }
}

ThreeFive(100);


