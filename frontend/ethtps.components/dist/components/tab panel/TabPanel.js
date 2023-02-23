"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a11yProps = void 0;
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
exports.a11yProps = a11yProps;
