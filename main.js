/**
 * @typedef {object} GCDStep
 * @property {number} num
 * @property {number} divisor
 * @property {number} quotient
 * @property {number} remainder  
 */

function init(reload) {
    console.log('Load')
    let urlParams = new URLSearchParams(window.location.search);
    let num = urlParams.get('n');
    if (num != null) {
        document.getElementById("number").value = num;
        calculateInverse(reload);
    }
    let mod = urlParams.get('m');
    if (mod != null) {
        document.getElementById("modVal").value = mod;
        calculateInverse(reload);
    }
}

window.onload = ()=>{init(true)};
window.onpopstate = ()=>{init(false)};


function calculateInverse(reload = true){
    let modVal = document.getElementById("modVal").value;
    let num = document.getElementById("number").value;

    document.title = document.title.split("|")[0];
    document.title += `|${num} % ${modVal}`
    if(reload && window.location.href.split("?")[1]!==`n=${num}&m=${modVal}`){
        window.history.pushState(null, document.title, `?n=${num}&m=${modVal}`);
    }

    /** @type {GCDStep[]} */
    let results = [];
    let divisor = gcd(num, modVal, results);
    console.log(results);
    document.getElementById("euclid").innerHTML = generateEuclidHTML(results);

    console.log(divisor)
    if(divisor != 1){
        document.getElementById("inverse").innerHTML = `<div tabindex="4">The GCD is ${divisor}.<br/>For inverse calculations please enter coprimes.</div>`;
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
        out += `<tr tabindex="0"><td>${count})&nbsp&nbsp</td><td class="num">${r.num}</td><td>=</td><td class="divisor">${r.divisor}</td><td>×</td><td class="quotient">${r.quotient}</td><td>+</td><td class="remainder">${r.remainder}</td></tr>`
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
    let coeff2 = results[results.length-1].quotient;

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
        out += `<div tabindex="0">`
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
        out += "</div><br/>\n";

        console.log(out);
    }

    out += `<div id="result" tabindex="4">\n`;

    if(num2 == document.getElementById("number").value){
        out+= `Inverse of ${num2} mod ${num1} is <span style="font-weight:bold">${-coeff2} or <span style="color:#c90000">${-coeff2 + num1}</span></span><br/>`;
        out+= `Inverse of ${num1} mod ${num2} is <span style="font-weight:bold">${coeff1}</span><br/>`;
    } else {
        out+= `Inverse of ${num1} mod ${num2} is <span style="font-weight:bold;color:#c90000">${coeff1}</span><br/>`;
        out+= `Inverse of ${num2} mod ${num1} is <span style="font-weight:bold">${-coeff2} or ${-coeff2 + num1}</span><br/>`;
    }

    out += "</div>"
    return out;
}