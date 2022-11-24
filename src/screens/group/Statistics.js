import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, ImageBackground, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { colors, formTitleStyle } from '../../assets/style';
import Requests from '../../api';
import { BarChart } from "react-native-chart-kit";
import { convertAmount } from '../../util';

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundColor: colors.dark2,
    backgroundGradientFrom: colors.dark2,
    backgroundGradientTo: colors.dark2,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: () => `#999`,
    labelColor: () => colors.plain,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "0",
    }
};

function UserSpendingsChart({ userMap, currency }) {
    const labels = [...userMap.keys()].map(fullname => fullname.split(' ')[0]);
    const values = [...userMap.values()].map(amount => convertAmount(amount, currency));

    if (!labels?.length) return <></>

    const data = {
        labels,
        datasets: [{
            data: values,
            color: () => colors.plain,
        }]
    };

    return (
        <View style={{ backgroundColor: colors.dark2, borderRadius: 10, width: '100%', padding: 10, marginTop: 20, padding: screenWidth * 0.05 }}>
            <Text style={formTitleStyle}>
                User spendings{' '}
                <Text style={{ color: colors.plain }}>({currency})</Text>
            </Text>
            <BarChart width={screenWidth * 0.9} height={220} data={data} chartConfig={chartConfig} />
        </View>
    )
}

function StoreDistributionChart({ storeMap, currency }) {
    const labels = [...storeMap.keys()];
    const values = [...storeMap.values()].map(amount => convertAmount(amount, currency));

    if (!labels?.length) return <></>

    const data = {
        labels,
        datasets: [{
            data: values,
            color: () => colors.plain,
        }]
    };

    return (
        <View style={{ backgroundColor: colors.dark2, borderRadius: 10, width: '100%', padding: 10, marginTop: 20, padding: screenWidth * 0.05 }}>
            <Text style={formTitleStyle}>
                Store distribution{' '}
                <Text style={{ color: colors.plain }}>({currency})</Text>
            </Text>
            <BarChart width={screenWidth * 0.9} height={220} data={data} chartConfig={chartConfig} />
        </View>
    )
}

export default ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [userMap, setUserMap] = useState(new Map());
    const [storeMap, setStoreMap] = useState(new Map());

    const groupId = useSelector(state => state.edit?.Group);
    const currency = useSelector(state => state.currency.currency);
    const user = useSelector(state => state.user);
    // const dispatch = useDispatch();

    useEffect(() => {
        generateChartData(groupId);
    }, [groupId]);

    async function generateChartData(groupId) {
        setLoading(true);
        const [invoicesStatus, invoiceResponse] = await Requests.GET(`group/invoices?id=${groupId}`, user.jwt);
        if (invoicesStatus !== 200) {
            Toast.show('Error fetching group invoices!');
            return;
        }

        const [membersStatus, membersResponse] = await Requests.GET(`group/members?id=${groupId}`, user.jwt);
        if (membersStatus !== 200) {
            Toast.show('Error fetching members!');
            return;
        }

        const userDist = new Map();
        const storeDist = new Map();

        invoiceResponse.forEach(invoice => {
            const prev = userDist.get(invoice.fullname) ?? 0;
            userDist.set(invoice.fullname, prev + invoice.amount);

            const prevStore = storeDist.get(invoice.store_name) ?? 0;
            storeDist.set(invoice.store_name, prevStore + invoice.amount);
        });

        membersResponse.forEach(member => {
            const val = userDist.get(member.fullname) ?? 0;
            if (val == 0) {
                userDist.set(member.fullname, 0);
            }
        });

        setStoreMap(new Map([...storeDist.entries()].sort((a, b) => b[1] - a[1])));
        setUserMap(new Map([...userDist.entries()].sort((a, b) => b[1] - a[1])));
        setLoading(false);
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.dark }}>
            <UserSpendingsChart userMap={userMap} currency={currency} />
            <StoreDistributionChart storeMap={storeMap} currency={currency} />
        </View>
    )
}
