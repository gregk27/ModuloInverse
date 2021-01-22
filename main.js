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
    let divisor = gcd(num, modVal, results);
    console.log(results);
    document.getElementById("euclid").innerHTML = generateEuclidHTML(results);

    console.log(divisor)
    if(divisor != 1){
        document.getElementById("inverse").innerHTML = `The GCD is ${divisor}.<br/>For inverse calculations please enter coprimes.`;
        return;
    }

    document.getElementById("inverse").innerHTML = generateInverseHTML(results);

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
        out.pop();
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
    let count = 1;
    for(let r of results){
        out += `<tr><td>${count}) </td><td class="num">${r.num}</td><td>=</td><td class="divisor">${r.divisor}</td><td>×</td><td class="quotient">${r.quotient}</td><td>+</td><td class="remainder">${r.remainder}</td></tr>`
        count ++;
    }
    return out;
}

/**
 * Generate HTML for inverse calculations
 * 
 * @param {GCDStep[]} results 
 */
function generateInverseHTML(results){
    let out = "";

    let num1 = 0;
    let coeff1 = 1;
    let num2 = 0;
    let coeff2 = 1;

    let isOdd = false;
    for(let i = results.length-1; i>=0; i--){
        isOdd = i%2!=results.length%2; // Kinda messy, but because it's counting down
        console.log(i);
        let r = results[i];    
        console.log(r);
        if(isOdd){
            num1 = r.num;
            num2 = r.divisor;
        } else {
            num1 = r.divisor;
            num2 = r.num;
        }
        let line = `1 = ${num1}×${coeff1} - ${num2}×${coeff2}`;
        out += line+"<br/>";
        if(i > 0){
            let n = results[i-1];
            out += line.replace(n.remainder, `(${n.num} - ${n.divisor}×${n.quotient})`)+`<span style="padding-left:2em">(${i+1})</span><br/>`;
            if(isOdd){
                coeff1 += n.quotient*coeff2;
            } else {
                coeff2 += n.quotient*coeff1;
            }
        }
        out += "<br/>\n";

        console.log(out);
    }

    out+= `Inverse of ${num2} mod ${num1} is <span style="font-weight:bold">${-coeff2} or <span style="color:red">${-coeff2 + num1}</span></span><br/>`;
    out+= `Inverse of ${num1} mod ${num2} is <span style="font-weight:bold">${coeff1}</span><br/>`;
    return out;
}