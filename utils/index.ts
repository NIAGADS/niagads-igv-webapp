export * from "./tracks";
export * from "./browser";

export const downloadObjectAsJson = (exportObj: any, exportName: string) => {
    const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};
export const ignoreCaseIndexOf = (arr: any[], lookup: any) =>
    arr.findIndex((item) => lookup.toLowerCase() === item.toLowerCase());

export const isSimpleType = (value: any) => {
    const simpleTypes = new Set(["boolean", "number", "string", "symbol"]);
    const valueType = typeof value;
    return (
        value !== undefined &&
        (simpleTypes.has(valueType) || value.substring || value.toFixed)
    );
};

export const capitalize = (str: string) => {
    return str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const numberFormatter = (rawNumber: number) => {
    const dec = String(rawNumber).split(/[.,]/),
        sep = ",",
        decsep = ".";

    return (
        dec[0]
            .split("")
            .reverse()
            .reduce(function (prev, now, i) {
                return i % 3 === 0 ? prev + sep + now : prev + now;
            })
            .split("")
            .reverse()
            .join("") + (dec[1] ? decsep + dec[1] : "")
    );
};

export const snakeToProperCase = (str: string) => {
    return str
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
};
