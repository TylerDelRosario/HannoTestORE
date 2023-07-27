//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//Leftover code that I ended up not needing lmao.
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

//TAKES JSON ORE DATA AND SELECTION SORTS EACH SELL ORDER BY PRICE(LOWEST to HIGHEST).
    //STORES SORTED SPECIFIC ORE DATA VIA CLOSURE.
    const sortDataPrice = (JSON) => {

        //Swap function for selection sort.
        const dataSwap = (arr, firstIndex, secondIndex) => {

            let firstSwap = arr[firstIndex];

            arr[firstIndex] = arr[secondIndex];
            arr[secondIndex] = firstSwap;

        }

        //Finds the minimum of the array and starts iterating at startIndex.
        const findMinimum = (array, startIndex) => {

            let currentLowest = array[startIndex];
            let minIndex = startIndex;
            

            for (let i = minIndex; i < array.length; i++) {

                if (currentLowest > array[i]) {

                    currentLowest = array[i];
                    minIndex = i;

                }

            }

            return minIndex;
        }

        const selectionSort = (array) => {

            let min;

            for (let index = 0; index < array.length; index++) {

                min = findMinimum(array, index);
                dataSwap(array, index, min);

            }

            return array;

        }

        //DEBUG TESTS
        let arraySort = [18, 6, 66, 44, 9, 22, 14, 24, 3, 32, 65, 72, 1, 54, 61];
        let arrayTwo = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        let arrayThree = [987, 134, 567, 123, 545, 712, 841, 422];
        console.log(selectionSort(arrayTwo));
        console.log(selectionSort(arrayThree));
        console.log(selectionSort(arraySort));

    }

    let globalHannoOreData = '';

    const hannoFetchData = async () => {

        const staticOreData = [
            ["Veldspar", 1230],
            ["Scordite", 1228],
            ["Pyroxeres", 1224,],
            ["Plagioclase", 18],
            ["Omber", 1227],
            ["Kernite", 20],
            ["Jaspet", 1226],
            ["Hemorphite", 1231],
            ["Hedbergite", 21],
            ["Gneiss", 1229],
            ["Dark Ochre", 1232],
            ["Crokite", 1225],
            ["Spodumain", 19],
            ["Bistot", 1223],
            ["Arkonor", 22],
            ["Mercoxit", 11396]
        ];

        let oreArr = [];

        //FETCHES AND RETURNS DATA
        async function fetchOreData(fetchURL) {

            const response = await fetch(fetchURL);
            const oreData = await response.json();

            return oreData;

        }

        //Calls fetchOreData, plugs in url and adds name and id to the fetched ore data.
        const grabData = async (url, name, id) => {

           return await fetchOreData(url).then((oreData) => {

                //Most recent data is located at the end of the array.
                let newOre = oreData[oreData.length - 1];

                //Add name and ID to the json object.
                newOre.name = name;
                newOre.typeID = id;

                //Push to ore array.
                return newOre;

            });

        }

        //Loops through all of the ores that we need calls grabData() to said ore.
        //Plugs in static names and typeIDs as arguments to grabData().
        for (const index of staticOreData) {
            console.log(index);
            const oreName = index[0];
            const oreID = index[1];
            console.log(oreID);
            console.log(oreName);
            grabData(`https://esi.evetech.net/dev/markets/10000002/history/?datasource=tranquility&type_id=${oreID}`, oreName, oreID)
            .then((ore) => {
                oreArr.push(ore);
            });
        }

        return await new Promise(setTimeout(() => {
            console.log(oreArr);
            return oreArr; 
        }, 3000));       
    }

    hannoFetchData().then((resolve) => {
        console.log(resolve + "hello");
    });

    setTimeout(() => {
        console.log(globalHannoOreData);
    }, 5000);