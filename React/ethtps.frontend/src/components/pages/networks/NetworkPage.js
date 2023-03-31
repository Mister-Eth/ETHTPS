import PageWithQueryString from "../../pages/PageWithQueryString";
import HistoricalChart from "../../charts/HistoricalChart";
import { colorDictionary } from "../../../services/defaultData";
import "./NetworkPage.css";
import "../../../App.css";
import React, { setState } from "react";
import EthereumDetails from "./details/EthereumDetails";
import ArbitrumDetails from "./details/ArbitrumDetails";
import AVAXCChainDetails from "./details/AVAXCChainDetails";
import BobaNetworkDetails from "./details/BobaNetworkDetails";
import LoopringDetails from "./details/LoopringDetails";
import OptimismDetails from "./details/OptimismDetails";
import PolygonDetails from "./details/PolygonDetails";
import XDAIDetails from "./details/XDAIDetails";
import ZKSwapDetails from "./details/ZKSwapDetails";
import ZKSyncDetails from "./details/ZKSyncDetails";
import ImmutableXDetails from "./details/ImmutableXDetails";
import AztecDetails from "./details/AztecDetails";
import MetisDetails from "./details/MetisDetails";
import RoninDetails from "./details/RoninDetails";
import StarknetDetails from "./details/StarknetDetails";
import Nahmii20Details from "./details/Nahmii20Details";
import OMGNetworkDetails from "./details/OMGNetworkDetails";
import FuelDetails from "./details/FuelDetails";
import GluonDetails from "./details/GluonDetails";
import HabitatDetails from "./details/HabitatDetails";
import Layer2FinanceDetails from "./details/Layer2FinanceDetails";
import DYDXDetails from "./details/DYDXDetails";
import DeversiFiDetails from "./details/DeversiFiDetails";
import SorareDetails from "./details/SorareDetails";
import GazelleDetails from "./details/GazelleDetails";
import ZKTubeDetails from "./details/ZKTubeDetails";
import CartesiDetails from "./details/CartesiDetails";
import KchannelsDetails from "./details/KchannelsDetails";
import PerunDetails from "./details/PerunDetails";
import RaidenNetworkDetails from "./details/RaidenNetworkDetails";
import FantomDetails from "./details/FantomDetails";
import ZKSpaceDetails from "./details/ZKSpaceDetails";
import PolygonHermezDetails from "./details/PolygonHermezDetails";
import ArbitrumNovaDetails from "./details/ArbitrumNovaDetails";
import {
  globalGeneralApi,
  globalInstantDataService,
  to2DecimalPlaces,
} from "../../../services/common";
import * as qs from "query-string";
import { Helmet } from "react-helmet";

export default class NetworkPage extends PageWithQueryString {
  constructor(props) {
    super(props);

    let state = this.state;
    state.instantTPS = 0;
    state.interval = "1d";
    state.mode = "tps";
    state.colorDictionary = colorDictionary;
    let q = qs.parse(window.location.search);
    if (q.interval !== undefined) {
      state.interval = q.interval;
    }
    if (q.mode !== undefined) {
      state.mode = q.mode;
    }
    this.state = state;
  }

  components = {
    Ethereum: <EthereumDetails name={this.state.name} />,
    "Arbitrum One": <ArbitrumDetails name={this.state.name} />,
    "AVAX C-chain": <AVAXCChainDetails name={this.state.name} />,
    "Boba Network": <BobaNetworkDetails name={this.state.name} />,
    Loopring: <LoopringDetails name={this.state.name} />,
    Optimism: <OptimismDetails name={this.state.name} />,
    Polygon: <PolygonDetails name={this.state.name} />,
    XDAI: <XDAIDetails name={this.state.name} />,
    ZKSwap: <ZKSwapDetails name={this.state.name} />,
    ZKSync: <ZKSyncDetails name={this.state.name} />,
    "Immutable X": <ImmutableXDetails name={this.state.name} />,
    Aztec: <AztecDetails name={this.state.name} />,
    Metis: <MetisDetails name={this.state.name} />,
    Ronin: <RoninDetails name={this.state.name} />,
    Starknet: <StarknetDetails name={this.state.name} />,
    "Nahmii 2.0": <Nahmii20Details name={this.state.name} />,
    "OMG Network": <OMGNetworkDetails name={this.state.name} />,
    Gluon: <GluonDetails name={this.state.name} />,
    Habitat: <HabitatDetails name={this.state.name} />,
    Fuel: <FuelDetails name={this.state.name} />,
    "Layer2.Finance": <Layer2FinanceDetails name={this.state.name} />,
    dYdX: <DYDXDetails name={this.state.name} />,
    Sorare: <SorareDetails name={this.state.name} />,
    DeversiFi: <DeversiFiDetails name={this.state.name} />,
    Gazelle: <GazelleDetails name={this.state.name} />,
    zkTube: <ZKTubeDetails name={this.state.name} />,
    Cartesi: <CartesiDetails name={this.state.name} />,
    Kchannels: <KchannelsDetails name={this.state.name} />,
    Perun: <PerunDetails name={this.state.name} />,
    "Raiden Network": <RaidenNetworkDetails name={this.state.name} />,
    Fantom: <FantomDetails name={this.state.name} />,
    ZKSpace: <ZKSpaceDetails name={this.state.name} />,
    "Polygon Hermez": <PolygonHermezDetails name={this.state.name} />,
    "Arbitrum Nova": <ArbitrumNovaDetails name={this.state.name} />,
  };

  updateInstantTPS(data) {
    try {
      this.setState({ instantTPS: data["tps"][this.state.name][0].value });
    } catch {}
  }

  componentDidMount() {
    globalInstantDataService.periodicallyGetInstantDataForPage(
      this.state.name,
      this.updateInstantTPS.bind(this)
    );
    globalInstantDataService.getAndCallbackInstantData();
    window.scrollTo(0, 0);
  }

  render() {
    let index = Object.keys(this.components).indexOf(this.state.name);
    let previous =
      index === 0
        ? Object.keys(this.components)[Object.keys(this.components).length - 1]
        : Object.keys(this.components)[index - 1];
    let next =
      index === Object.keys(this.components).length - 1
        ? Object.keys(this.components)[0]
        : Object.keys(this.components)[index + 1];
    if (this.state !== null && this.state.colorDictionary !== undefined)
      return (
        <>
          <CompactHeader />
          <Helmet>
            <title>{this.state.name} Live TPS</title>
          </Helmet>
          <div style={{ display: "inline-box" }}>
            <div style={{ display: "inline" }}>
              <p style={{ display: "inline", marginRight: "5px" }}>←</p>
              <img
                className={"provider-icon"}
                src={`/provider-icons/${previous}.png`}
              />
              <a href={previous}>{previous}</a>
            </div>
            <div style={{ float: "right", display: "inline" }}>
              <img
                className={"provider-icon"}
                src={`/provider-icons/${next}.png`}
              />
              <a href={next}>{next}</a>
              <p style={{ display: "inline", marginLeft: "5px" }}>→</p>
            </div>
          </div>
          <hr />
          <a
            href={`https://github.com/WhoEvenAmI/ETHTPS/edit/dev/React/ethtps.frontend/src/components/pages/networks/details/${this.state.name}Details.js`}
            style={{ float: "right", display: "inline" }}
          >
            [Edit]
          </a>
          <div>
            <h1 style={{ display: "inline" }} className={"box"}>
              <img
                className={"large"}
                src={`/provider-icons/${this.state.name}.png`}
              />
              {this.state.name}
            </h1>
          </div>
          <h4
            style={{
              display: "inline",
              color: "darkgray",
              verticalAlign: "middle",
              top: "-100%",
            }}
          >
            {this.state.instantTPS !== undefined ? (
              `${to2DecimalPlaces(this.state.instantTPS)} TPS`
            ) : (
              <></>
            )}
          </h4>
          <HistoricalChart
            height={250}
            provider={this.state.name}
            colorDictionary={this.state.colorDictionary}
            interval={this.state.interval}
            mode={this.state.mode}
            scale={"lin"}
            showYears={true}
            network={"Mainnet"}
          />
          <hr />
          {this.components[this.state.name]}
        </>
      );
    else return <></>;
  }
}
