import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Paper, Grid, Tooltip, Typography, IconButton } from '@mui/material';
const customIcons = [
    {
        icon: (_jsx(SentimentVeryDissatisfiedIcon, { fontSize: "inherit", color: "error" })),
        label: 'Very bad',
    },
    {
        icon: _jsx(SentimentDissatisfiedIcon, { fontSize: "inherit", color: "error" }),
        label: 'Bad',
    },
    {
        icon: _jsx(SentimentSatisfiedIcon, { fontSize: "inherit", color: "warning" }),
        label: 'Meh',
    },
    {
        icon: _jsx(SentimentSatisfiedAltIcon, { fontSize: "inherit", color: "success" }),
        label: 'Good',
    },
    {
        icon: _jsx(SentimentVerySatisfiedIcon, { fontSize: "inherit", color: "success" }),
        label: 'Great',
    },
];
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export function FaceRatingGroup() {
    return (_jsx(Grid, { container: true, children: customIcons.map((x, i) => (_jsx(Tooltip, { arrow: true, placement: "bottom", title: _jsx(Typography, { children: x.label }), children: _jsx(Grid, { xs: true, item: true, children: _jsx(Item, { children: _jsx(IconButton, { sx: { fontSize: '4em' }, children: x.icon }) }) }) }, i))) }));
}
