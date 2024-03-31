import {getLocalDynamo, getNationalDynamo} from "./dynamo";
import {mapToNivoChart} from "../map/dynamo-grocery-data";

export const getPrices = async () => {
    const ldy = await getLocalDynamo();
    const ndy = await getNationalDynamo();

    const ldyMapped = mapToNivoChart(ldy);
    const ndyMapped = mapToNivoChart(ndy, true);

    return [
        {
            id: 'Local',
            data: ldyMapped
        },
        {
            id: 'National',
            data: ndyMapped
        },
    ]
}
