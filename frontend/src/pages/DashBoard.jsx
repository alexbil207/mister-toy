import React from "react";
import { BarChart } from "../cmps/BarChart";
import { PieChart } from "../cmps/PieChart";
import { toyService } from "../services/toy.service";

export class DashBoard extends React.Component {
    state = {
        goodsStatisticts: '',
        stockStatisticts: '',
    }

    componentDidMount() {
        toyService.getStatisticts()
            .then(statisticts => {
                const { goods } = statisticts;
                const { stock } = statisticts;
                this.setState({
                    goodsStatisticts: goods,
                    stockStatisticts: stock
                })
            })
    }





    render() {
        return (
            <section className="dashboard-container flex align-center justify-center gap wrap">
                <div className="pie-chart flex column align-center">
                    <h2>Our Goods</h2>
                    <PieChart goodsStatisticts={this.state.goodsStatisticts} />
                </div>
                <div className="bar-chart flex column align-center">
                    <h2>Stock</h2>
                    <BarChart stockStatisticts={this.state.stockStatisticts} />
                </div>
            </section>

        )

    }
}