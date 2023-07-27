
const initializeHanno = () => {

    const fetchHannoData = async () => {

        //name, typeID, list of ratios - example, 1 veldspar contains 4 tritanium
        //or 1 gneiss contains 8 isogen, 1 bistot contains 32 pyerite.
        //each indice/index of the ratio array corresponds to a mineral.
        const staticOreData = [
            ["Veldspar", 1230, [4, 0, 0, 0, 0, 0, 0, 0]],
            ["Scordite", 1228, [1.5, 0.9, 0, 0, 0, 0, 0, 0]],
            ["Pyroxeres", 1224,[0, 0.9, 0.3, 0, 0, 0, 0, 0]],
            ["Plagioclase", 18, [1.75, 0, 0.7, 0, 0, 0, 0, 0]],
            ["Omber", 1227, [0, 0.9, 0, 0.75, 0, 0, 0, 0]],
            ["Kernite", 20, [0, 0, 0.6, 1.2, 0, 0, 0, 0]],
            ["Jaspet", 1226, [0, 0, 1.5, 0, 0.5, 0, 0, 0]],
            ["Hemorphite", 1231, [0, 0, 0, 2.4, 0.9, 0, 0, 0]],
            ["Hedbergite", 21, [0, 4.5, 0, 0, 1.2, 0, 0, 0]],
            ["Gneiss", 1229, [0, 20, 15, 8, 0, 0, 0, 0]],
            ["Dark Ochre", 1232, [0, 0, 13.6, 12, 3.2, 0, 0, 0]],
            ["Crokite", 1225, [0, 8, 20, 0, 8, 0, 0, 0]],
            ["Spodumain", 19, [480, 0, 0, 10, 1.6, 0.8, 0.4, 0]],
            ["Bistot", 1223, [0, 32, 12, 0, 0, 1.6, 0, 0]],
            ["Arkonor", 22, [0, 32, 12, 0, 0 ,0, 1.2, 0]],
            ["Mercoxit", 11396, [0, 0, 0, 0, 0, 0, 0, 1.4]],
            ["Bezdnacine", 52316, [200, 0, 0, 24, 0, 0, 0.32, 0]],
            ["Talassonite", 52306, [200, 0, 0, 0, 4.8, 0, 0.16, 0]],
            ["Rakovene", 52315, [200, 0, 0, 16, 0, 1, 0, 0]]
        ];

        

        //FETCHES AND RETURNS DATA
        async function fetchOreData(fetchURL) {

            const response = await fetch(fetchURL);
            const oreData = await response.json();

            return oreData;

        }

        //Calls fetchOreData, plugs in url and adds name and id and ratio array to the fetched ore data.
        const grabData = async (url, name, id, ratio) => {

           return await fetchOreData(url).then((oreData) => {

                //Most recent data is located at the end of the array.
                let newOre = oreData[oreData.length - 1];

                //Add name, ID, ratio array to the json object.
                newOre.name = name;
                newOre.typeID = id;
                newOre.ratio = ratio;

                //return modified ore.
                return newOre;

            }).catch(() => { 
                console.log("ERROR AT grabData() -- fetchOreData failed.");
            });

        }

        //Iterate over every ore and fetch the data we need for said ore.
        const dataIterate = async () => {

            let oreArr = [];

            for (index of staticOreData) {

                //We add some important static information to each ore Object we grab.
                //These will be used later on by parseHannoData
                const oreID = index[1];
                const oreName = index[0];
                const oreRatio = index[2];

                let oreFetch = await grabData(`https://esi.evetech.net/dev/markets/10000002/history/?datasource=tranquility&type_id=${oreID}`, oreName, oreID, oreRatio);

                
                oreArr.push(oreFetch);
            }

            //We wait until oreArr has been populated and we return our fulfilled Promise to hannoPromise.
            return new Promise((resolve, reject) => {

                setTimeout(() => {
                    resolve(oreArr);
                }, 1000);

            });

        }

        //Everything has hopefully gone well and we return our fetched data from our function.
        let hannoPromise = Promise.resolve(dataIterate().then((val) => {
            //DEBUG --- console.log(val + " AT hannoPromise()");
            return val;
        }));

        return hannoPromise;
    }

    //Now that we have our fetched data, we push the data to writeHannoData.
    fetchHannoData().then((val) => {
        //DEBUG --- console.log(val + " AT fetchHannoData()");
        return writeHannoData(val);
    });

    //Writes our data into a local json file.
    const writeHannoData = (oreData) => {

        let dataWrite = {
            table: []
        }

        for (let i = 0; i < oreData.length; i++) {

            dataWrite["table"].push(oreData[i]);
    
        }

        const json = JSON.stringify(dataWrite);

        const fs = require("fs");
        fs.writeFile('hanno.json', json, 'utf8', (error) => {
            
            if (error) {
                throw error;
            }

            console.log("Write to JSON completed! :D");

        });

    }
}

initializeHanno();