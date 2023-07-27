function hannoParseModule(oreJson) {
    
    //Calculates the cheapest set of ore to be purchased to fulfill a given blue print.
    const parseHannoData = (oreData) => {

//console.log(oreData);

        //The indices/indexes of these arrays correspond in order to the static array staticOreData.
        const mineralArr = [
            {min: 0}, //tri 0
            {min: 0}, //pye 1
            {min: 0}, //mex 2
            {min: 0}, //iso 3
            {min: 0}, //noc 4
            {min: 0}, //zyd 5
            {min: 0}, //meg 6
            {min: 0}  //mor 7
        ];

        //DEBUG EXAMPLE BLUEPRINT FOR drekavac ship.
        const drekavacArr = [
            {min: 3080000}, //tri 0
            {min: 1100000}, //pye 1
            {min: 198000}, //mex 2
            {min: 22000}, //iso 3
            {min: 13200}, //noc 4
            {min: 7700}, //zyd 5
            {min: 3850}, //meg 6
            {min: 0}  //mor 7
        ];

        //Takes in the type of mineral and the amount of mineral needed and calculates how much
        //ore is needs to be processed to reach the mineral amount needed.
        const oreCalc = (reqMineral, oreRatio) => {
            
            const mineralIndex = reqMineral.req;
            const oreAmount = Math.ceil((reqMineral.reqAmnt / oreRatio[mineralIndex])/100)*100;
           
            //console.log(oreRatio);
            for (let index = 0; index < oreRatio.length; index++) {
            
                    mineralArr[index]["min"] += (oreAmount * oreRatio[index]);
                
            }
            //console.log(mineralArr);
            return oreAmount;
        }

        //DEBUG arkonor --- oreCalc({req: 6, reqAmnt: 7700}, oreData[oreData.length - 2]["ratio"]);

        //Takes in a blueprint, iterates over mineral requirements and pushes them
        //into oreCalc.
        const bpCalc = (blueprint) => {

            let oreArr = [];
            

                for (let x = blueprint.length - 1; x >= 0; x--) {

                    let currentMineral = blueprint[x]["min"] - mineralArr[x]["min"];
                    
                    if (blueprint[x] === 0 || currentMineral < 100) {
                        
                        
                        oreData[x]["currentOre"] = 0;
                        oreArr.push(oreData[x]);
                        
                    }

                    else {

                    let reqMineral = {req: x, reqAmnt: currentMineral};
                    let reqRatio = oreData[x]["ratio"];
                    oreData[x]["currentOre"] = oreCalc(reqMineral, reqRatio);

                    oreArr.push(oreData[x]);
                    
                    }    
                }

            oreOutput(oreArr);

        }

        const oreOutput = (array) => {

            console.log("Cheapest ore list for {DREKAVAC}");
            for (let i = array.length - 1; i >= 0; i--) {

                console.log(`Compressed ${array[i]["name"]}: ${array[i]["currentOre"]}`);

            }

        }

        bpCalc(drekavacArr);

    }

    parseHannoData(oreJson);
}

module.exports = hannoParseModule;