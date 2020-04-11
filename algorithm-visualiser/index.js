var dataset = [];

function onLoad() {
    numberToBeSearchVisibilty(true);
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

function numberToBeSearched() {
    // if (dataset.length > 0) {
    //     let numberToSearch = document.getElementById('numberToSearch').value;
    //     if (numberToSearch) {
    //         dataset[Math.floor(Math.random() * (dataset.length))] = Number(numberToSearch);
    //         console.log(dataset);
    //         visualise(dataset)
    //     }
    // }
}

function algorithmSelected(algorithm) {
    if (!dataset || dataset.length < 1) {
        generateRandomDataSet()
    }
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

function linearSearch() {
    numberToBeSearchVisibilty(true);

    const numberToSearch = document.getElementById('numberToSearch');
    if (!numberToSearch.value) {
        numberToSearch.focus();
        return alert('Please enter number to be search');
    }
    let index = -1;
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i] === Number(numberToSearch.value)) {
            index = i;
            break;
        }
    }
    if (index > -1) { alert(numberToSearch.value + ' found at position' + (index + 1)) }
    else {
        alert('Number not found!!')
    }

}

function binarySearch() {
    numberToBeSearchVisibilty(true);

    const numberToSearch = document.getElementById('numberToSearch');
    if (!numberToSearch.value) {
        numberToSearch.focus();
        return alert('Please enter number to be search');
    }
    let index = -1;



}

function selectionSort() {
    numberToBeSearchVisibilty(false);

}

function bubbleSort() {
    numberToBeSearchVisibilty(false);

}

function reset() {
    numberToBeSearchVisibilty(false);
    document.getElementById('datasetSize').value = '';
    generateRandomDataSet();
}

