const readline = require("readline");
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


rl.question("enter number of person to distribute: ", (distribute_to) => { 

    const inp= fs.readFileSync(__dirname+'/sample_input.txt',{encoding:'utf8', flag:'r'}); 

    distribute_to=Number(distribute_to)
    let gifts_cost_pair = inp.trim() 
        .split("\n"). 
        slice(2,). 
        map(line => line.split(": "))
        .sort((a, b) => a[1] - b[1])  

    let min_diff = Infinity
    let item_range = {}
    for (let i = 0; i < gifts_cost_pair.length - distribute_to; i++) {
        const diff_btwn_next = Math.abs(gifts_cost_pair[i + distribute_to - 1][1] - gifts_cost_pair[i][1]) 
        if (diff_btwn_next < min_diff) {
            min_diff = diff_btwn_next 
            item_range.start = i 
            item_range.end = i + distribute_to - 1
        }
    }
   
    rl.close();

    const final_output_items=gifts_cost_pair.slice(item_range.start, item_range.end + 1)
    .map(item=>item.join(": "))
    .join("\n")



    const outout=`
The goodies selected for distribution are:

${final_output_items}

And the difference between the chosen goodie with highest price and the lowest price is ${min_diff}` 


    fs.writeFileSync(__dirname+"/sample_output.txt", outout);
})

