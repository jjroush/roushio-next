import Head from 'next/head';
import { NextSeo } from 'next-seo';

import {MyResponsiveLine} from "../components/basket-of-goods/chart";
import {getMusicPageData} from "../server/service/spotify-data";
import {getPrices} from "../server/service/prices";

export default function Home({datas}) {
    return (
        <div style={{height: '600px'}}>
            <MyResponsiveLine datas={datas} />
        </div>
    );
}

export async function getServerSideProps() {
    const data = await getPrices();

    console.log('data', data);

    return {
        props: {
           datas: data
        },
    };
}