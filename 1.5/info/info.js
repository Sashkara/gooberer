var save;
var settings;
var parameters = new URLSearchParams(document.location.search)
let errorList = [];

window.addEventListener('message', function(event) {
    let receivedData = JSON.parse(atob(event.data));
    if (receivedData.action !== 'initData' || receivedData.action === 'jsException') {
        return;
    }
    save = receivedData.save;
    settings = receivedData.settings;
    feature();
});

let tables = [{tablename:'lightTypes', title:'Light Types', column:'#tealight#(type),icon,cost,duration'},
            {tablename:'weather', title:'Weather', column:'#sun#(weathertype),#mdi-weather-sunny#'},
            {tablename:'hordeCards', title:'Horde Cards', column:'#rookieOnTheBattlefield#(Card Name),amount,price(proce)'},
            {tablename:'cards', title:'Cards', column:'id,color,value(wert)'}]

let hordeCards = {
        rookieOnTheBattlefield: {unlock: 'hordeItems', amount: 3, price: 20, content: {
            'HO-0001': 2.6, 'HO-0002': 0.45, 'HO-0003': 1.25, 'HO-0004': 0.92, 'HO-0005': 1.55, 'HO-0006': 1.36,
            'HO-0007': 0.6, 'HO-0008': 0.8, 'HO-0009': 0.88, 'HO-0010': 0.4, 'HO-0011': 0.48,
            'HO-0012': 2.1, 'HO-0013': 1.6, 'HO-0014': 0.77,
        }},
        spiritualSuccess: {unlock: 'hordePrestige', amount: 4, price: 65, content: {
            'HO-0003': 1.25, 'HO-0004': 0.92, 'HO-0005': 1.55, 'HO-0006': 1.36,
            'HO-0009': 0.88, 'HO-0010': 0.8, 'HO-0011': 0.96,
            'HO-0012': 2.1, 'HO-0013': 1.6, 'HO-0014': 0.77, 'HO-0015': 1.2, 'HO-0016': 1.3, 'HO-0017': 1.8,
            'HO-0018': 1.6, 'HO-0019': 0.75, 'HO-0020': 0.84, 'HO-0021': 1.05, 'HO-0022': 1.5, 'HO-0023': 0.43,
            'HO-0024': 0.7, 'HO-0026': 0.9,
        }},
        oldMemories: {unlock: 'hordeHeirlooms', amount: 2, price: 50, content: {
            'HO-0007': 1.2, 'HO-0010': 0.8, 'HO-0011': 0.96,
            'HO-0019': 1.5, 'HO-0020': 1.68, 'HO-0021': 2.1, 'HO-0022': 3.75,
            'HO-0024': 1.4, 'HO-0026': 1.8, 'HO-0027': 1.15, 'HO-0028': 2, 'HO-0030': 2.3,
        }},
        taintedWorld: {unlock: 'hordeItemMastery', amount: 6, price: 225, content: {
            'HO-0023': 0.72,
            'HO-0024': 1.2, 'HO-0025': 1.3, 'HO-0026': 1.55, 'HO-0027': 1.15, 'HO-0028': 2, 'HO-0029': 1.1, 'HO-0030': 2.3,
            'HO-0031': 3.5, 'HO-0032': 2.1, 'HO-0033': 0.9, 'HO-0034': 1.22, 'HO-0035': 1.58, 'HO-0036': 1.18,
            'HO-0037': 1.4, 'HO-0038': 0.5, 'HO-0039': 0.77, 'HO-0040': 1.36, 'HO-0041': 0.22,
        }},
    }

let cards = [
{id: 1, instant: true, collection: 'preciousJewelry', reward: [
    {name: 'gem_ruby', type: 'currency', value: 50}
], color: 'red', icons: [
    {"x": 0, "y": -0.05, "rotate": 0, "size": 2, "icon": "mdi-train"},
    {"x": 0.15, "y": 0.85, "rotate": 90, "size": 2, "icon": "mdi-fence"},
    {"x": 0, "y": -0.75, "rotate": 0, "size": 1, "icon": "mdi-rhombus"}
]},
{id: 2, instant: true, collection: 'preciousJewelry', reward: [
    {name: 'gem_emerald', type: 'currency', value: 50}
], color: 'green', icons: [
    {"x": -0.25, "y": 0, "rotate": 0, "size": 3, "icon": "mdi-tunnel-outline"},
    {"x": 0.8, "y": 0.4, "rotate": 105, "size": 1.5, "icon": "mdi-pickaxe"},
    {"x": -0.4, "y": 0.35, "rotate": 0, "size": 0.5, "icon": "mdi-hexagon"},
    {"x": 0, "y": 0.25, "rotate": 0, "size": 0.5, "icon": "mdi-hexagon"},
    {"x": -0.25, "y": -0.25, "rotate": 0, "size": 0.5, "icon": "mdi-hexagon"}
]},
{id: 3, instant: true, collection: 'preciousJewelry', reward: [
    {name: 'gem_sapphire', type: 'currency', value: 50}
], color: 'indigo', icons: [
    {"x": -0.15, "y": 1.1, "rotate": 0, "size": 1.5, "icon": "mdi-sail-boat-sink"},
    {"x": 0.2, "y": 1.15, "rotate": 0, "size": 0.65, "icon": "mdi-treasure-chest"},
    {"x": 0, "y": -0.26, "rotate": 0, "size": 1.5, "icon": "mdi-ferry"},
    {"x": -0.65, "y": 0.3, "rotate": 0, "size": 1.5, "icon": "mdi-waves"},
    {"x": 0, "y": 0.3, "rotate": 0, "size": 1.5, "icon": "mdi-waves"},
    {"x": 0.65, "y": 0.3, "rotate": 0, "size": 1.5, "icon": "mdi-waves"},
    {"x": 0.25, "y": 0.95, "rotate": 0, "size": 0.4, "icon": "mdi-pentagon"}
]},
{id: 4, instant: true, collection: 'preciousJewelry', reward: [
    {name: 'gem_amethyst', type: 'currency', value: 50}
], color: 'purple', icons: [
    {"x": 0, "y": 0, "rotate": 0, "size": 4, "icon": "mdi-watch-variant"},
    {"x": 0, "y": -0.15, "rotate": 90, "size": 1, "icon": "mdi-minus"},
    {"x": -0.3, "y": -0.3, "rotate": -45, "size": 0.65, "icon": "mdi-cards-diamond"},
    {"x": 0.3, "y": -0.3, "rotate": 45, "size": 0.65, "icon": "mdi-cards-diamond"},
    {"x": 0.3, "y": 0.3, "rotate": -45, "size": 0.65, "icon": "mdi-cards-diamond"},
    {"x": -0.3, "y": 0.3, "rotate": 45, "size": 0.65, "icon": "mdi-cards-diamond"},
    {"x": -0.1, "y": 0.05, "rotate": -20, "size": 0.6, "icon": "mdi-minus-thick"}
]},
{id: 5, instant: true, collection: 'preciousJewelry', reward: [
    {name: 'gem_topaz', type: 'currency', value: 50}
], color: 'amber', icons: [
    {"x": 0, "y": -0.6, "rotate": 0, "size": 2, "icon": "mdi-triangle-outline"},
    {"x": -0.7, "y": 0.6, "rotate": 0, "size": 2, "icon": "mdi-triangle"},
    {"x": 0.7, "y": 0.6, "rotate": 0, "size": 2, "icon": "mdi-triangle"},
    {"x": 0, "y": -0.5, "rotate": 0, "size": 1.15, "icon": "mdi-emoticon-angry"}
]},
{id: 6, instant: true, collection: 'preciousJewelry', reward: [
    {name: 'gem_diamond', type: 'currency', value: 5}
], color: 'cyan', icons: [
    {"x": 0, "y": 0, "rotate": -45, "size": 2, "icon": "mdi-pickaxe"},
    {"x": 0.7, "y": 0.25, "rotate": 0, "size": 2, "icon": "mdi-axe"},
    {"x": -0.7, "y": 0.3, "rotate": 95, "size": 2, "icon": "mdi-shovel"},
    {"x": -0.5, "y": -0.7, "rotate": 0, "size": 0.75, "icon": "mdi-diamond"},
    {"x": 0.5, "y": -0.7, "rotate": 0, "size": 0.75, "icon": "mdi-diamond"}
]},
{id: 7, instant: true, collection: 'preciousJewelry', reward: [
    {name: 'gem_onyx', type: 'currency', value: 1}
], color: 'deep-purple', icons: [
    {"x": 0, "y": 0.15, "rotate": 0, "size": 0.75, "icon": "mdi-octagon"},
    {"x": 0, "y": 0, "rotate": 90, "size": 2, "icon": "mdi-mirror-rectangle"},
    {"x": 0, "y": 0.85, "rotate": 0, "size": 2.5, "icon": "mdi-dresser"},
    {"x": 1.1, "y": -0.8, "rotate": 0, "size": 1.25, "icon": "mdi-cctv"}
]},
];

let weather = {
        sun: {on: 'mdi-weather-sunny', off: 'mdi-weather-sunny-off'},
        rain: {on: 'mdi-water', off: 'mdi-water-off'},
        snow: {on: 'mdi-snowflake', off: 'mdi-snowflake-off'},
        thunder: {on: 'mdi-flash', off: 'mdi-flash-off'},
        wind: {on: 'mdi-weather-windy', off: 'mdi-weather-cloudy'}
    }

let lightTypes = {
    candle: {
        tealight: {
            icon: 'mdi-light-recessed',
            cost: 15,
            duration: 30,
            soot: 5,
            lightMult: 25
        },
        regular: {
            icon: 'mdi-candle',
            cost: 36,
            duration: 3600,
            soot: 25,
            lightMult: 1.25
        },
        aroma: {
            icon: 'mdi-candle',
            cost: 48,
            duration: 14400,
            soot: 20,
            lightMult: 1.5
        },
        chandelier: {
            icon: 'mdi-candelabra-fire',
            cost: 75,
            duration: 900,
            soot: 30,
            lightMult: 7
        }
    },
    activeCandle: null
}


function feature() {
    try {
        generateTables();
        logErrors();
    } catch (error) {
        errorList.push(`Error in feature: ${error.message}`);
        console.error(`Error in feature: ${error.message}`);
    }
}

// Log any errors
function logErrors() {
    if (errorList.length > 0) {
        console.error("Errors occurred during table generation:");
        errorList.forEach(error => console.error(error));
    } else {
        console.log("No errors occurred.");
    }
}

function generateTables() {
    const container = document.createElement('div'); // Create a container for the tables

    tables.forEach(table => {
        try {
            const section = createTableSection(table);  // Pass correct reference to section
            container.appendChild(section); // Append the section to the container
        } catch (error) {
            errorList.push(`Error generating table for ${table.title}: ${error.message}`);
        }
    });

    document.body.appendChild(container); // Append the container to the body
    logErrors(); // Log any errors that occurred
}

function createTableSection(table) {
    const section = document.createElement('div');
    section.id = table.tablename;

    const title = document.createElement('h3');
    title.textContent = table.title;
    section.appendChild(title);

    const tableElement = createTableElement(table, section);  // Pass section reference
    section.appendChild(tableElement);

    return section;
}

function createTableElement(table, section) {
    const tableElement = document.createElement('table');
    tableElement.id = `${table.tablename}-table`;

    const headerRow = createTableHeader(table.column);
    tableElement.appendChild(headerRow);

    let data;
    try {
        data = eval(table.tablename); // Evaluate the variable name to get the data
    } catch (error) {
        errorList.push(`Error evaluating data for ${table.tablename}: ${error.message}`);
        data = null;
    }

    if (data) {
        const rowCount = addTableRows(tableElement, data, table.column.split(','), table.tablename);
        addRowCount(section, rowCount); // Add row count below the table
    }

    return tableElement;
}

function createTableHeader(columnString) {
    const headerRow = document.createElement('tr');
    const columns = columnString.split(',');
    columns.forEach(col => {
        const trimmedCol = col.trim();
        const columnName = trimmedCol.replace(/\(.*?\)/, '');  // Strip special identifiers
        const th = createHeaderCell(columnName);
        headerRow.appendChild(th);
    });
    return headerRow;
}

// Add rows by extracting keys or values depending on columns
function addTableRows(tableElement, data, columns, tableName) {
    let rowCount = 0;

    // Handle cases for nested objects like lightTypes
    if (tableName === 'lightTypes') {
        const filteredLightTypes = filterLightTypes(data);
        filteredLightTypes.forEach((row, key) => {
            const dataRow = document.createElement('tr');
            columns.forEach(col => {
                const trimmedCol = col.trim();
                let rowData;

                if (trimmedCol === 'type') {
                    // If the column is 'type', use the key (e.g., 'tealight', 'regular')
                    rowData = key;
                } else {
                    // For other columns, get the values inside the object
                    rowData = row[trimmedCol] || '';
                }

                const dataCell = createDataCell(rowData);
                dataRow.appendChild(dataCell);
            });
            tableElement.appendChild(dataRow);
            rowCount++;
        });
    } else {
        // For other tables, handle object traversal based on columns
        for (const key in data) {
            const row = data[key];
            const dataRow = document.createElement('tr');

            columns.forEach(col => {
                const trimmedCol = col.trim();
                let rowData;

                try {
                    // Use the key or value based on the column
                    rowData = row[trimmedCol] || '';
                    if (!rowData) throw new Error(`Missing data for column ${trimmedCol}`);
                } catch (error) {
                    errorList.push(`Error processing column ${trimmedCol} for key ${key} in table ${tableName}: ${error.message}`);
                }

                const dataCell = createDataCell(rowData);
                dataRow.appendChild(dataCell);
            });

            tableElement.appendChild(dataRow);
            rowCount++;
        }
    }

    return rowCount;
}

function filterLightTypes(data) {
    const result = {};
    // Extract keys with valid icon, cost, duration
    for (const key in data.candle) {
        const entry = data.candle[key];
        if (entry.icon && entry.cost && entry.duration) {
            result[key] = entry; // Save key (e.g., tealight, regular) and its associated data
        }
    }
    return result;
}

function addRowCount(section, count) {
    const rowCountElement = document.createElement('p');
    rowCountElement.textContent = `Row count: ${count}`;
    section.appendChild(rowCountElement);
}

// Helper functions to create header and data cells
function createHeaderCell(text) {
    const th = document.createElement('th');
    th.textContent = text;
    return th;
}

function createDataCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}
