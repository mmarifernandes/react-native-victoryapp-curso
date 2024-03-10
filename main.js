import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, View } from "react-native"
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLegend, Background, VictoryScatter, VictoryAxis } from "victory-native";


export default function Main() {
    const [text, onChangeText] = React.useState('');
    const [value, onChangeValue] = React.useState('');
    const [data, setData] = useState([]);

    const addDataPoint = () => {
        const newDataPoint = { x: text, y: Number(value) };
        setData([...data, newDataPoint]);
    };
    return (
        <View style={styles.container}>
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
                <Text>Adicionar</Text>
            </TouchableOpacity>

            <VictoryChart
                theme={VictoryTheme.material} maxDomain={{ y: 100 }} minDomain={{ y: 0 }} responsive={true}
            >
                <VictoryAxis dependentAxis crossAxis
                    tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} //valores do Y
                />
                <VictoryAxis crossAxis //X
                    style={{ tickLabels: { fontSize: 8 } }} //font do X label
                />
                <VictoryScatter
                    style={{ data: { fill: "#72e073" } }} //pontos
                    size={5}
                    data={data}
                />
                <VictoryLine sortOrder="ascending"
                    style={{
                        data: { stroke: "#72e073" },
                        parent: { border: "1px solid #ccc" }, //linha

                    }}
                    data={data}


                />
            </VictoryChart>
            <VictoryLegend x={10} y={10}
                orientation="horizontal"
                gutter={18}
                itemsPerRow={3}
                style={{ border: { stroke: "black" } }}
                colorScale={["red", "orange", "yellow", "lightgreen", 'lightblue']}
                data={[
                    { name: "0-25 Péssima" }, { name: "26-50 Ruim" }, { name: "51-70 Regular" }, { name: "71-90 Boa" }, { name: "91-100 Ótima" }
                ]}
            />
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
        width: '60%',
        alignSelf: 'center',
        marginTop: 12
    },
    container: {
        paddingTop: 40,
        margin: 'auto'
    }
});