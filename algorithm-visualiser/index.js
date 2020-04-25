var dataset = [];

function onLoad() {
    numberToBeSearchVisibilty(true);
    document.getElementById('datasetSize').focus();
}

function numberToBeSearchVisibilty(condition) {
    const numberToSearch = document.getElementById('numberToSearch');
    if (numberToSearch) {
        if (!condition) {
            numberToSearch.style.visibility = 'hidden';
        } else {
            numberToSearch.style.visibility = 'visible';
        }
    }
}


function generateRandomDataSet() {
    let datasetCount = Number(document.getElementById('datasetSize').value)
    console.log(datasetCount);
    if (!datasetCount) {
        datasetCount = 10;
    }
    dataset = [...Array(datasetCount)].map(_ => Math.ceil(Math.random() * datasetCount))
    console.log(dataset);
    visualise(dataset);
}

function visualise(data) {
    if (!data || data.length < 1) {
        return;
    }
    let visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const height = (data[i] / data.length) * 100;
        let bar = document.createElement('div')
        bar.style.height = height + '%';
        bar.innerText = data[i];
        visualizer.appendChild(bar);
    }
}

function algorithmSelected(algorithm) {
    if (!dataset || dataset.length < 1) {
        generateRandomDataSet()
    }

    const bars = document.getElementById('visualizer').children;
    removeBarClass(bars);

    switch (algorithm) {
        case 'linear': linearSearch();
            break;
        case 'binary': binarySearch();
            break;
        case 'selection': selectionSort();
            break;
        case 'bubble': bubbleSort()
            break
        default: reset()
    }
}

function removeBarClass(bars, className) {
    if (className) {
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.remove(className);
        }
    } else {
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.remove('active');
            bars[i].classList.remove('primary');
            bars[i].classList.remove('success');
        }
    }
}

function linearSearch() {
    numberToBeSearchVisibilty(true);

    const numberToSearch = document.getElementById('numberToSearch');
    if (!numberToSearch.value) {
        numberToSearch.focus();
        return alert('Please enter number to be searched');
    }

    const bars = document.getElementById('visualizer').children;
    removeBarClass(bars, 'active');
    checkValue(0);
    function checkValue(i) {
        if (i < dataset.length) {
            bars[i].className = 'active';
            i > 0 ? bars[i - 1].classList.remove('active') : '';

            if (dataset[i] === Number(numberToSearch.value)) {
                return bars[i].className = 'success'
            }
            setTimeout(() => {
                checkValue(++i);
            }, 1000)
        } else {
            bars[i - 1].classList.remove('active');
            alert('Number not found!!')
        }
    }
}

function binarySearch() {
    numberToBeSearchVisibilty(true);

    const numberToSearch = document.getElementById('numberToSearch');
    if (!numberToSearch.value) {
        numberToSearch.focus();

        return alert('Please enter number to be search');
    }

    visualise(dataset.sort((a, b) => { return a - b }));
    let lowIndex = 0;
    let highIndex = dataset.length - 1;
    const bars = document.getElementById('visualizer').children;

    checkValue();

    function checkValue() {
        if (lowIndex <= highIndex) {

            let midIndex = Math.floor((lowIndex + highIndex) / 2);
            if (dataset[midIndex] == Number(numberToSearch.value)) {
                removeBarClass(bars, 'active');
                bars[midIndex].className = 'success';
                return midIndex;
            } else if (dataset[midIndex] < Number(numberToSearch.value)) {
                lowIndex = midIndex + 1;
                removeBarClass(bars, 'active');
                bars[midIndex].className = 'active';
            } else {
                highIndex = midIndex - 1;
                removeBarClass(bars, 'active');
                bars[highIndex].className = 'active';
            }
            setTimeout(() => {
                checkValue(dataset);
            }, 2500);
        } else {

            return alert("Number not found!!!");
        }
    }
}

function selectionSort() {
    numberToBeSearchVisibilty(false);

    let sort = (inputArr) => {
        let len = inputArr.length;
        let bars = document.getElementById('visualizer').children;
        function recursion(i) {
            if (i < len - 1) {

                let min = i;

                for (let j = i + 1; j < len; j++) {
                    ((j) => {
                        setTimeout(function () {
                            removeBarClass(bars, 'active');
                            bars[i].className = 'active';
                            if (inputArr[min] > inputArr[j]) {
                                min = j;
                                removeBarClass(bars, 'primary');
                                bars[min].className = 'primary';
                            } else {
                                bars[j].className = 'active';
                            }
                            if (j === len - 1) {
                                if (min !== i) {
                                    let tmp = inputArr[i];
                                    inputArr[i] = inputArr[min];
                                    inputArr[min] = tmp;
                                    visualise(inputArr);
                                }
                                recursion(++i);
                            }
                        }, 1000 * (j - i));
                    })(j);
                }
            } else {
                removeBarClass(bars, 'active');
            }
        }
        recursion(0);
    };
    sort(dataset);

}

function bubbleSort() {
    numberToBeSearchVisibilty(false);
    console.log('bubble')
    let sort = (inputArr) => {
        let len = inputArr.length;
        let bars = document.getElementById('visualizer').children;
        function recursion(i, swapped) {
            if (i < len - 1) {
                for (let j = 0; j < len; j++) {
                    (function (j) {

                        setTimeout(function () {
                            removeBarClass(bars, 'active');
                            bars[j].className = 'active';
                            if (inputArr[j] > inputArr[j + 1]) {
                                removeBarClass(bars, 'primary');
                                len - 1 > j + 1 ? bars[j + 1].className = 'primary' : '';
                                let tmp = inputArr[j];
                                inputArr[j] = inputArr[j + 1];
                                inputArr[j + 1] = tmp;
                                swapped = true;

                            } else {
                            }
                            if (j === len - 1) {
                                if (swapped === true) {
                                    swapped = false;
                                    recursion(++i, true);
                                } else {
                                    bars[j + 1].className = 'active';
                                }
                            }
                            visualise(inputArr);
                        }, 1000 * j);
                    })(j);
                }
            }
        }
        recursion(0, false);
    };

    sort(dataset);

}

function reset() {
    numberToBeSearchVisibilty(false);
    document.getElementById('datasetSize').value = '';
    generateRandomDataSet();
}

