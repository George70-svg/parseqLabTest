export const useUrlQueryString = (filterParams) => {
    const {inputName, checkedSignificance, pickedGenotype, pickedHGWS, inputHGWS} = filterParams
    return `?name=${inputName}&significance=${checkedSignificance}&genotype=${pickedGenotype}&HGWStype=${pickedHGWS}&HGWSname=${inputHGWS}`
}