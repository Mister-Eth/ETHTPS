import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import TotalDataSummaryStat from "../bar/TotalDataSummaryStat";
import { addThousandsSeparators, formatModeName, to2DecimalPlaces } from "../../../../../../services/common";

export default class TreemapInstantDataStat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            providerData: props.providerData,
            colorDictionary: props.colorDictionary,
            series: [],
            mode: props.mode,
            options: {
                legend: {
                    show: false
                },
                chart: {
                    height: 350,
                    type: 'treemap',
                    toolbar: {
                        show: false
                    }
                },
                colors: this.getColors(props),
                plotOptions: {
                    treemap: {
                        distributed: true,
                        enableShades: false,
                        useFillColorAsStroke: true,
                    }
                },
                states: {
                    normal: {
                        filter: {
                            type: 'none',
                            value: 0,
                        }
                    },
                    hover: {
                        filter: {
                            type: 'darken',
                            value: 0.35,
                        }
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                            return ''
                        }
                    }
                }
            }
        };
    }

    calculateTotalData(state) {
        if (state.data === undefined || state.data.length === 0)
            return 20;

        let t = state.providerData.filter(x => state.data[x.name] !== undefined).map(x => state.data[x.name][0].value);
        if (t.length === 0) {
            return 0;
        }
        return t.reduce((a, b) => a + b);
    }



    createDataPoint(x, state) {
        let value = to2DecimalPlaces(state.data[x.name][0].value);
        return {
            x: `${x.name} (${addThousandsSeparators(value)} ${formatModeName(state.mode)})`,
            y: value
        }
    }

    createSeries(state) {
        if (state.providerData === undefined || state.data === undefined || state.options.colors.length === 0) {
            return [{ data: [] }];
        }
        return [
            {
                data: state.providerData.filter(x => state.data[x.name] !== undefined && state.data[x.name][0] !== null).map(x => this.createDataPoint(x, state))
            }
        ];
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.data !== this.props.data) {
            this.setState({ data: this.props.data })
        }
        if (previousProps.colorDictionary !== this.props.colorDictionary) {
            this.setState({ colorDictionary: this.props.colorDictionary });
            this.setState({
                options: {
                    colors: this.getColors(this.props)
                }
            })
        }
        if (previousProps.providerData !== this.props.providerData) {
            this.setState({ providerData: this.props.providerData });
        }
        if (previousProps.mode !== this.props.mode) {
            this.setState({ mode: this.props.mode });
        }
    }

    getColors(props) {
        let colors = props.providerData.filter(x => props.data[x.name] !== undefined).map(x => props.colorDictionary[x.name]);
        return colors;
    }

    render() {
        return <>
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.createSeries(this.state)} type="treemap" height={350} />
            </div>
        </>
    }
}
