import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, View } from "react-native"
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";


export default function Main() {
    const [text, onChangeText] = React.useState('');
    const [value, onChangeValue] = React.useState(0);
    const [data, setData] = useState([]);

    const addDataPoint = () => {
        const newDataPoint = { x: text, y: Number(value) };
        setData([...data, newDataPoint]);
    };
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={"Digite a data"}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeValue}
                value={value}
                placeholder={"Digite o valor"}
            />

            <TouchableOpacity style={styles.button} onPress={addDataPoint}>
                <Text>Press Here</Text>
            </TouchableOpacity>

            <VictoryChart
                theme={VictoryTheme.material} maxDomain={{ y: 100 }} minDomain={{ y: 0 }}
            >
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={data}

                />
            </VictoryChart>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
});