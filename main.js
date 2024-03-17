import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native"
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLegend, VictoryLabel, VictoryScatter, VictoryAxis } from "victory-native";

export default function Main() {
    const [dia, onChangeDia] = React.useState('');
    const [mes, onChangeMes] = React.useState('');
    const [ano, onChangeAno] = React.useState('');
    const [value, onChangeValue] = React.useState('');
    const [data, setData] = useState([]); //valores
    const [date, setDate] = useState([]); //array para settar as datas do X

    const addDataPoint = () => {
        const newDataPoint = { x: new Date(ano, mes - 1, dia), y: Number(value) }; //formatar a data para o luxon
        setData([...data, newDataPoint]); //colocar no Y
        setDate([...date, newDataPoint.x]) //colocar no X
    };
    // console.log(date)
    return (
        <ScrollView>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeDia}
                    value={dia}
                    placeholder={"Digite o dia, exemplo: 01, 10..."}
                    keyboardType='numeric'

                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeMes}
                    value={mes}
                    placeholder={"Digite o mês, exemplo: 07, 12..."}
                    keyboardType='numeric'

                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeAno}
                    value={ano}
                    placeholder={"Digite o ano, exemplo: 2022, 2018..."}
                    keyboardType='numeric'

                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeValue}
                    value={value}
                    placeholder={"Digite o valor"}
                    keyboardType='numeric'
                />

                <TouchableOpacity style={styles.button} onPress={addDataPoint}>
                    <Text>Adicionar</Text>
                </TouchableOpacity>

                <VictoryChart
                    theme={VictoryTheme.material} maxDomain={{ y: 100 }} minDomain={{ y: 0 }} responsive={true} scale={{ x: 'time' }}
                >
                    <VictoryAxis dependentAxis crossAxis
                        tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} //valores do Y
                    />
                    <VictoryAxis crossAxis //Valores do X
                        style={{ tickLabels: { fontSize: 8 } }} //font do X label
                        data={date}
                        tickCount={date.length}
                        tickValues={date}
                        tickFormat={(x) => {
                            return x.toLocaleString("pt-BR",
                                { day: "numeric", month: "numeric", year: 'numeric' }) //formatar datas
                        }
                        }
                        tickLabelComponent={
                            <VictoryLabel angle={-45} textAnchor="end" /> //angulo do X
                        }
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
                <VictoryLegend x={10} y={25}
                    orientation="horizontal"
                    height={150}
                    gutter={20}
                    itemsPerRow={3}
                    style={{ border: { stroke: "black" } }}
                    colorScale={["red", "orange", "yellow", "lightgreen", 'lightblue']}
                    data={[
                        { name: "0-25 Péssima" }, { name: "26-50 Ruim" }, { name: "51-70 Regular" }, { name: "71-90 Boa" }, { name: "91-100 Ótima" }
                    ]}
                />
            </View>
        </ScrollView>
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