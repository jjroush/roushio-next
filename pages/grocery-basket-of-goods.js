import {MyResponsiveLine} from "../components/basket-of-goods/chart";
import {getPrices} from "../server/service/prices";

import styles from '../styles/grocery-cron.module.css';

export default function Home({datas}) {
    console.log('datas', datas)

    const localPrice = datas[0].data[datas[0].data.length - 1].y;
    const nationalPrice = datas[1].data[datas[1].data.length - 1].y;

    return (
        <div>
            <h1>{"Personal Basket of Grocery Goods"}</h1>
            <p>The following is tracking the changes of prices in my typical grocery basket which I found comparable products at
                a regional and a national grocery store.</p>
            <div className={styles.priceRow}>
                <div className={styles.card}>
                    <h2 style={{display: 'inline-block'}}>{"Local Grocery Store"}</h2>
                    <div>{`$${Number(localPrice).toFixed(2)}`}</div>
                    {/*<div>{"+3.02 (5.02%)"}</div>*/}
                </div>
                <div className={styles.card}>
                    <h2 style={{display: 'inline-block'}}>{"National Grocery Store"}</h2>
                    <div>{`$${Number(nationalPrice).toFixed(2)}`}</div>
                    {/*<div>{"+32.00 (5.00%)"}</div>*/}
                    <div />
                </div>
            </div>

            <div style={{height: '600px'}}>
                <MyResponsiveLine datas={datas}/>
            </div>
            <div>Everything 'feels' more expensive when going to the grocery store. I built out a personalized basket of goods which I track daily to see how prices change over time. Consistently tracking the same items allows me to compare the fluctuations in prices over time directly, offering insights into whether I'm spending more or if groceries are indeed rising in price.</div>
            <br/>
            <div>Items in my basket:</div>
            <ul>
                <li>Choice Rib Eye Steak</li>
                <li>Chobani Plain Oat Milk</li>
                <li>Hipster Whole Milk</li>
                <li>Hipster Cageless Eggs</li>
                <li>La Croix LimonCello Sparkling 12Pk</li>
                <li>Store Brand Sliced Provolone</li>
                <li>Maytag Blue Cheese Wedge</li>
                <li>Hass Large Avocados</li>
                <li>Avocado Ranch Chopped Salad Kit</li>
                <li>King Arthur AP Flour</li>
                <li>Store Brand Extra Virgin Olive Oil</li>
                <li>Farm Raised Atlantic Salmon</li>
                <li>Store Brand Salted Butter</li>
                <li>Fancy Habanero Jerky</li>
                <li>Popchips Sour Crm&Onion Chips</li>
                <li>Peace Birchwood Blend Coffee</li>
                <li>Firehook Rosemary SS Crckrs</li>
                <li>B&J's Phish Food Ice Cream</li>
                <li>Good Culture 4% WM Cottage Chs</li>
                <li>Guinness Draught 4Pk Cans</li>
                <li>Store Brand Garbanzo Beans</li>
                <li>Amys Org LS Lentil Vegetable</li>
                <li>Grillo's Pickles Italian Dill</li>
                <li>Bacon</li>
                <li>Navel Oranges</li>
            </ul>
        </div>
    );
}

const TWENTY_FOUR_HOURS_IN_SECONDS = 86400;

export async function getStaticProps() {
    const data = await getPrices();

    return {
        props: {
            datas: data
        }, revalidate: TWENTY_FOUR_HOURS_IN_SECONDS,
    };
}