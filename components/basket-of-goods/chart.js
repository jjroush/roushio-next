'client'
import dynamic from "next/dynamic";

import { useWindowSize } from "@uidotdev/usehooks";

const ResponsiveLine = dynamic(() => import("@nivo/line").then(m => m.ResponsiveLine), { ssr: false });


export const MyResponsiveLine = ({datas}) => {
    const size = useWindowSize();

    const isMobile = size.width < 500;

    const everyNthTick = isMobile ? 3 : 2;

    const valuesToShow = datas[0].data.map(item => item.x).map((v,i)=> i % everyNthTick !== 0  ?  '' : v);

    return (
        <ResponsiveLine
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                truncateTickAt: 0,
                format: v => valuesToShow.find(vts => vts === v) ? v : "",
            }}
            axisLeft={{
                format: v => `$${v}`,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                truncateTickAt: 0
            }}
            axisRight={null}
            axisTop={null}
            data={datas}
            enableTouchCrosshair
            legends={[
                {
                    anchor: isMobile ? 'bottom' : 'bottom-right',
                    direction: isMobile ? 'row' : 'column',
                    justify: false,
                    translateX: isMobile ? 0 : 100,
                    translateY: isMobile ? 70 : 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            margin={{ top: 50, right: isMobile ? 60 : 110, bottom: 100, left: 60 }}
            pointBorderColor={{ from: 'serieColor' }}
            pointBorderWidth={2}
            pointColor={{ theme: 'background' }}
            pointLabelYOffset={-12}
            pointSize={10}
            useMesh
            xScale={{ type: 'point' }}
            yFormat=" >-.2f"
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
        />
    );
}

