'use strict';

//часть 1: Promise - теория


//синхронный код, выполнится сразу
console.log('Запрос данных');

//создаем promise - обещание, которое может закончится либо положительно либо отрицательно
//promise принимает 2 аргумента: resole and reject - фунции, которые мы можем сами передавать

//resolve - что то выполнилось правильно, например сервер ответил, вызываем relolve,
//reject - обещание не выполнилось и что то пошло на так, сервер не ответил, вызываем reject

//блок finally - выполняется всегда, при любом исходе
const req = new Promise(function(resolve, reject){

//асихнронный код
setTimeout(() => {
    console.log('Подготовка данных: ');

//объект
    const product = {
        name:'TV',
        price: 2000,
    };
    //функцию вызвали
    resolve(product);
}, 2000);
});

//then - метод обработки положительного результата (resolve) - передаем объект product из промиса
//первый then с callback функцией, которая принимает данные
req.then((product) => {
//возвращаем новый промис
    return  new Promise((resolve,reject) => {
        setTimeout(() => {
            product.status = 'order';
            //обработаем reject (ошибку)
            //2 сценария: можем поставить resolve - можем поставить reject
            reject(product);
        }, 2000);
    });
//обрабатываем promise 
}).then(data => {
    data.modify = true;
    return data;
    console.log(data);
}).then((data)=> {
    console.log(data);
//обработка reject идет через catch
}).catch(() => {
    console.error('Произошла ошибка.')
}).finally(()=>{
    console.log('Finally');
});


//часть 2: методы all and race
const test = time => {
    return new Promise(resole => {
        setTimeout(() => resole(), time);
    })
}

test(1000).then(()=> {console.log('1000 ms');});
test(1000).then(()=> {console.log('2000 ms');});


//Promise.all - проверить, что все промисы выполнены, 
Promise.all([test(1000), test(2000)]).then(()=> {
    console.log('ALL');
});

//Promise.race - выполняет действие, когда отработал первый промис
Promise.race([test(1000), test(2000)]).then(()=> {
    console.log('RACE');
});