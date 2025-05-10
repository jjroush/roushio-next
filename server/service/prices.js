import { getLocalDynamo, getNationalDynamo } from "./dynamo";
import { mapToNivoChart } from "../map/dynamo-grocery-data";

export const getPrices = async () => {
	const ldy = await getLocalDynamo();
	const ndy = await getNationalDynamo();
	console.log("ndy", ndy);
	const ldyMapped = mapToNivoChart(ldy);
	const ndyMapped = mapToNivoChart(ndy, true);

	const calculateChanges = (data) => {
		if (!data || data.length < 2) {
			return {
				raw: { percentageChange: 0, dollarChange: 0 },
				formatted: "$0.00 (0.00%)",
			};
		}
		const oldestPrice = parseFloat(data[0].y);
		const newestPrice = parseFloat(data[data.length - 1].y);
		const dollarChange = newestPrice - oldestPrice;
		const percentageChange = (dollarChange / oldestPrice) * 100;

		const formattedDollar = `${dollarChange >= 0 ? "+" : "-"}$${Math.abs(dollarChange).toFixed(2)}`;
		const formattedPercent = `${dollarChange >= 0 ? "+" : "-"}${Math.abs(percentageChange).toFixed(2)}%`;

		return {
			formatted: `${formattedDollar} (${formattedPercent})`,
		};
	};

	const localChanges = calculateChanges(ldyMapped);
	const nationalChanges = calculateChanges(ndyMapped);

	return [
		{
			id: "Local",
			data: ldyMapped,
			changes: localChanges.formatted,
		},
		{
			id: "National",
			data: ndyMapped,
			changes: nationalChanges.formatted,
		},
	];
};
