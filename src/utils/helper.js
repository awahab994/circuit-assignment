const getRandomColor = () => {
    const letters = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const getSingleStructure = (cabinetTall, cabinetWide, startNumber, numberofCabinets) => {
    // Create an array and filled with Zero

    let array2D = Array(cabinetTall)
        .fill()
        .map(() => Array(cabinetWide));

    // Get Random Color
    let color = getRandomColor();

    // Number to generate the  id number of every box
    let number = startNumber;

    // check that cabinate is greater the 2
    const isCabinateGreaterTwo = cabinetTall > 2;

    // Contant to keep the maximum number we can go tall
    let maxSocket = cabinetTall;

    // constant to verify and traverse
    let remainingCabinets = numberofCabinets;

    // Create this constant to check that if the node is attached with left when the number of cabinets is two or less then two
    let maxColumnSocket = 0;

    // Traverser of remaning sockets
    let remainingMaxSocket = maxSocket;

    for (let col = 0; col < cabinetWide; col++) {
        // If the remaning Cabinents become less then rows then change the color
        if (remainingCabinets < cabinetTall) {
            remainingCabinets = numberofCabinets; //reset the number
            remainingMaxSocket = maxSocket; // reset the socket
            color = getRandomColor(); // get new color
        }

        //Traver the rows from bottom to top
        for (let row = cabinetTall - 1; row >= 0; row--) {
            let isStart = false;
            let isTreeNode = false;
            let isRootNode = false;

            // if it is last row we need to show the square and lines
            if (row === cabinetTall - 1) {
                if (isCabinateGreaterTwo) {
                    // if total cabinates is greater then two we don't need to show any linked or line just square so we can say it is start
                    isStart = true;
                } else {
                    // if the number of cabinets  <= 2
                    if (remainingMaxSocket === 0) {
                        // this will show us that the rlation betwee root and child nodes of two columns
                        if (maxColumnSocket === 2) {
                            maxColumnSocket = 0;
                            isStart = true;
                            isRootNode = true;
                        } else {
                            isTreeNode = true;
                        }
                        remainingMaxSocket = maxSocket;
                    } else if (remainingMaxSocket === maxSocket) {
                        isStart = true;
                        isRootNode = true;
                        maxColumnSocket = 0;
                    }
                }
            }
            // The structure of node that will reflects on UI
            array2D[row][col] = {
                number: number,
                color: color,
                isStart: isStart, // Start node have square and curved line
                isEnd: row === 0, // end of the tall
                isTreeNode: isTreeNode, // this the coloumn that have the relation with the first column
                isRootNode: isRootNode, // show the  bottom line towards 2nd column
            };
            number++;
            remainingCabinets--;
            remainingMaxSocket--;
        }
        maxColumnSocket++;
    }

    return {
        results: array2D,
        number: number,
    };
};

export const getDataRecursively = (rows, columns, noCabinates, startNumber = 1) => {
    if (rows === 0 || columns === 0 || noCabinates === 0) {
        return [];
    }

    let final = [];

    // Base case if the  rows become or equal to Number of Cabinets return the list
    if (rows <= noCabinates) {
        const { results } = getSingleStructure(rows, columns, startNumber, noCabinates);
        final.push(...results);
        return final;
    }

    // Find the minimum and generate the array again
    const currentRows = Math.min(noCabinates, rows);

    const { results, number } = getSingleStructure(currentRows, columns, startNumber, noCabinates);
    final.push(...results);

    // Complete run the cycle untill it's complete

    const remainingArrays = getDataRecursively(rows - currentRows, columns, noCabinates, number);
    final = remainingArrays.concat(final);
    return final;
};
