/**
 * @typedef {object} GCDStep
 * @property {number} num
 * @property {number} divisor
 * @property {number} quotient
 * @property {number} remainder  
 */



function calculateInverse(){
    let modVal = document.getElementById("modVal").value;
    let num = document.getElementById("number").value;

    /** @type {GCDStep[]} */
    let results = [];
    gcd(num, modVal, results);
    console.log(results);
    document.getElementById("euclid").innerHTML = generateEuclidHTML(results);
}

/**
 * Calculate GCD and populate array with steps
 * 
 * @param {number}  x
 * @param {number}  y
 * @param {GCDStep[]} out
 */
function gcd(x, y, out){
    if(x < y){
        return gcd(y, x, out);
    } else if (y == 0){
        return x;
    } else {
        out.push({
            num:parseInt(x),
            divisor:parseInt(y),
            quotient:Math.floor(x/y),
            remainder:x%y
        });
        return gcd(y, x%y, out);
    }
}

/**
 * Generate HTML for euclidian algorithm result
 * 
 * @param {GCDStep[]} results
 */
function generateEuclidHTML(results){
    let out = "";
    for(let r of results){
        out += `<tr><td class="num">${r.num}</td><td>=</td><td class="divisor">${r.divisor}</td><td>×</td><td class="quotient">${r.quotient}</td><td>+</td><td class="remainder">${r.remainder}</td></tr>`
    }
    return out;
}