import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native"
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLegend, VictoryLabel, VictoryScatter, VictoryAxis } from "victory-native";

export default function Main() {
    const [dia, setChangeDia] = React.useState('');
    const [mes, setChangeMes] = React.useState('');
    const [ano, setChangeAno] = React.useState('');
    const [value, setChangeValue] = React.useState('');
    const [data, setData] = useState([]); //valores
    const [date, setDate] = useState([]); //array para settar as datas do X

    const addDataPoint = () => {
        if (dia.trim() !== '' && mes.trim() !== '' && ano.trim() !== '' && mes > 0 && mes <= 12 && dia > 0 && dia <= 31 && ano >= 1970) {
        const newDataPoint = { x: new Date(ano, mes - 1, dia), y: Number(value) }; //formatar a data mes começa com 0 no Date
        setData([...data, newDataPoint]); //colocar no Y
        setDate([...date, newDataPoint.x]) //colocar no X legenda
        }
    };
    // console.log(date)
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.texto} >Dia: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setChangeDia}
                    value={dia}
                    placeholder={"Digite o dia, exemplo: 01, 10..."}
                    keyboardType='numeric'
                />
                <Text style={styles.texto} >Mês: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setChangeMes}
                    value={mes}
                    placeholder={"Digite o mês, exemplo: 07, 12..."}
                    keyboardType='numeric'
                />
                <Text style={styles.texto} >Ano: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setChangeAno}
                    value={ano}
                    placeholder={"Digite o ano, exemplo: 2022, 2018..."}
                    keyboardType='numeric'
                />
                <Text style={styles.texto} >Valor: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setChangeValue}
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
                <VictoryLegend y={10}
                    orientation="vertical"
                    height={160}
                    gutter={20}
                    itemsPerRow={2}
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
        margin: 15,
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
        margin: 'auto',
    },
    texto:{
        paddingHorizontal: 25,
        fontWeight: 'bold'
    }
});