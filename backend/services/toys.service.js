const fs = require('fs');
const utilService = require('./util.service');
const gToys = require('../data/toy.json');


function query(filterBy) {
    if (!Object.keys(filterBy).length) return Promise.resolve(gToys);
    return Promise.resolve(_getfilterBy(filterBy));

};

function _getfilterBy(filterBy) {
    const { ctg, txt, inStock } = filterBy;
    let filterToy = gToys.slice();
    if (inStock) filterToy = filterToy.filter(toy => toy.inStock === true)
    if (ctg) filterToy = filterToy.filter(toy => toy.type === ctg)
    if (txt.length) filterToy = filterToy.filter(toy => toy.name.toLowerCase().includes(txt))
    if (filterToy.length) return Promise.resolve(filterToy);
    else return Promise.resolve(gToys);
}

function saveToy(toyInfo) {
    const { _id } = toyInfo
    if (_id) {
        return getToyById(_id, true).then(idx => {
            gToys[idx] = { ...gToys[idx], ...toyInfo }
            return _saveToysToFile()
                .then(res => toyInfo)
                .catch(err => err)
        })
    }
    const toy = createToy(toyInfo);
    gToys.unshift(toy);
    return _saveToysToFile()
        .then(res => toy)
        .catch(err => err)

}

function getToyById(toyId, isIdx = false) {
    if (isIdx) return Promise.resolve(gToys.findIndex(toy => toyId === toy._id));
    return Promise.resolve(gToys.find(toy => toyId === toy._id));
};

function createToy(toyInfo) {
    const { name, price, type, inStock, img } = toyInfo;
    return {
        _id: utilService.makeId(),
        name,
        price,
        type,
        createdAt: new Date(Date.now()).toLocaleString('he-IL'),
        inStock,
        img,
    }
}

function removeToy(toyId) {
    return getToyById(toyId, true).then(idx => {
        gToys.splice(idx, 1);
        return _saveToysToFile()
            .then(res => res)
            .catch(err => err)
    })
}

function _saveToysToFile() {
    return new Promise((reslove, reject) => {
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) {
                reject('Writing to file failed!');
            } else {
                reslove('Wrote Successfully!');
            };
        });

    });
};

function getToyStatistics() {
    const goods = gToys.reduce((accumulator, currentValue) => {
        if (currentValue.type in accumulator) accumulator[currentValue.type]++;
        else {
            accumulator[currentValue.type] = 1;
        }
        return accumulator
    }, {})

    const stock = { inStock: 0, notInStock: 0 }
    gToys.reduce((accumulator, currentValue) => {
        if (currentValue.inStock) stock['inStock']++;
        else stock['notInStock']++;;
        return accumulator
    }, {})

    return Promise.resolve({ goods, stock })
}






module.exports = {
    query,
    getToyById,
    createToy,
    removeToy,
    saveToy,
    getToyStatistics
}


