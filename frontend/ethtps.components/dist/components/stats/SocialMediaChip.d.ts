/// <reference types="react" />
import { IProviderExternalWebsite } from 'ethtps.api.client';
interface ISocialMediaChipConfiguration {
    href?: string | null;
    websiteName?: string | null;
}
export declare function SocialMediaChipCollection(config: {
    links?: IProviderExternalWebsite[] | undefined;
}): JSX.Element;
export declare function SocialMediaChip(config: ISocialMediaChipConfiguration): JSX.Element;
export {};
