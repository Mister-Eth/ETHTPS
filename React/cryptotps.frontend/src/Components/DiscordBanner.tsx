import blackDiscordIcon from '../../src/assets/discord-black-icon-703937.jpg';
import FeatureDependentComponent from "./FeatureDependentComponent";
import { FeatureConfiguration } from './FeatureDependentComponent';

export default class DiscordBanner extends FeatureDependentComponent {
    constructor(props: FeatureConfiguration) {
        super(props);
    }

    render() {
        if (super.shouldRender()) {
            return <>
                <div style={{ backgroundColor: '#7289da', borderRadius: 3, marginBottom: '5px' }}>
                    <img className={"small-img"} src={blackDiscordIcon}></img>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }} href={'https://discord.gg/jWPcsTzpCT'}>
                        Click here to join our Discord channel
                    </a>
                    <img className={"small-img"} src={blackDiscordIcon}></img>
                </div>
            </>;
        }
        else {
            return <></>;
        }
    }
}