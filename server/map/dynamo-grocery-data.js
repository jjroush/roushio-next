export const mapToNivoChart = (items, nat) => items.map((item) => {
    const date = new Date(item.timestamp.S);

    const options = {
        month: 'short',
        day: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return {
        x: formattedDate,
        y: nat ? item.price.N : item.price.S,
    }
});
