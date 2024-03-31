import {MyResponsiveLine} from "../components/basket-of-goods/chart";
import {getPrices} from "../server/service/prices";

export default function Home({datas}) {
    return (
        <div style={{height: '600px'}}>
            <MyResponsiveLine datas={datas} />
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