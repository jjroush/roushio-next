import {MyResponsiveLine} from "../components/basket-of-goods/chart";
import {getPrices} from "../server/service/prices";

export default function Home({datas}) {
    return (
        <div>
            <h1>Personal Basket of Grocery Goods</h1>
            <p>The following is tracking the changes of prices in my typical grocery basket of comparable products from a regional and a national grocery store.</p>
        <div style={{height: '600px'}}>
            <MyResponsiveLine datas={datas} />
        </div>
        </div>
    );
}

const TWENTY_FOUR_HOURS_IN_SECONDS = 86400;

export async function getStaticProps() {
    const data = await getPrices();

    return {
        props: {
           datas: data
        },
        revalidate: TWENTY_FOUR_HOURS_IN_SECONDS,
    };
}