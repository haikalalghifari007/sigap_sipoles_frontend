import React, { useContext, useState } from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ThemeContext } from '@/components/ThemeContext';
import { Colors } from '@/constants/Colors';
import { Dimensions } from 'react-native';
import * as d3 from "d3";

export type Props = {
    data: number[];
    color: string;
    label: string;
    stat: string;
};

const GRAPH_ASPECT_RATIO = 9 / 16;

export const LineGraph = (props: Props) => {
    const [width, setWidth] = useState(0);
    const height = width * GRAPH_ASPECT_RATIO;

    const min = Math.min(...props.data);
    const max = Math.max(...props.data);

    const yScale = d3.scaleLinear().domain([min, max]).range([height, 0]);
    const xScale = d3.scaleLinear().domain([0, props.data.length - 1]).range([0, width]);
    

    const line = d3.line<number>().x((d, ix) => xScale(ix)).y((d, ix) => yScale(d));
    
    const svgLine = lineFn(props.data);

    return (
        <View
            style={[]}
            onLayout={(e) => { setWidth(e.nativeEvent.layout.width) }}>

            <Svg
                height={height}
                width={width}>
                <Path
                    d={svgLine}
                    stroke={'#000000'}
                    fill="none"
                    strokeWidth={4}
                />
            </Svg>
            </View>
    )
}

export default LineGraph