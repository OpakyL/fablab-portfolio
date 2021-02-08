export const divideArr = (arr: any[], size: number) => {
    let subarray = []; //массив в который будет выведен результат.
    for (let i = 0; i < Math.ceil(arr.length / size); i++) {
        subarray[i] = arr.slice(i * size, i * size + size);
    }
    return subarray;
};
