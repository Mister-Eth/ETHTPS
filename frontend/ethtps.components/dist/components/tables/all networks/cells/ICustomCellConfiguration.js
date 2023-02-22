export const buildClassNames = (config) => {
    return {
        className: `inline ${config.clickCallback !== undefined ? 'pointable' : ''}`,
    };
};
