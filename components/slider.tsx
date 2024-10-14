import { StyleSheet, Text, View, FlatList, ViewToken, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { carouselItems, carouselItemType } from '@/data/orderData'
import SliderItem from './sliderItem'
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import Pagination from './pagination'

const screenWidth = Dimensions.get('window').width; // Get screen width

type Props = {
    itemList: carouselItemType[]
}
const Slider = ({ itemList }: Props) => {
    const scrollX = useSharedValue(0);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [data, setData] = useState(itemList);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: (event) => {
            offset.value = event.contentOffset.x;
        }
    });

    useEffect(() => {
        if (isAutoPlay == true){
            interval.current = setInterval(() => {
                offset.value = offset.value + screenWidth;
            }, 2000);
        } else {
            clearInterval(interval.current);
        }

        return () => {
            clearInterval(interval.current);
        }
    }, [isAutoPlay, offset, screenWidth])

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    });

    const onViewableItemsChanged = ({viewableItems} : {viewableItems: ViewToken[]}) => {
        if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
            setPaginationIndex(viewableItems[0].index % itemList.length);
        }
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    const viewabilityConfigCallbackPairs = useRef([
        {viewabilityConfig, onViewableItemsChanged}
    ]);
    return (
        <View>
            <Animated.FlatList
                ref={ref}
                data={data}
                renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX} />}
                horizontal
                pagingEnabled
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                onEndReached={() => setData([...data, ...itemList])}
                onEndReachedThreshold={0.5}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false)
                }}
                onScrollEndDrag={() =>{
                    setIsAutoPlay(true)
                }}
                
            />
            <Pagination items={itemList} scrollX={scrollX} paginationIndex={paginationIndex} />
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({})