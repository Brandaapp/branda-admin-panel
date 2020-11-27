import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const Accordion = withStyles({
    root: {
        color: 'white',
        backgroundColor: '#1B4370'
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        color: 'white',
        backgroundColor: '#1B4370',
        borderTop: '1px solid rgba(0, 0, 0, 0.125)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function AnnouncementRow(props) {
    const [open, setOpen] = useState(false);

    function handleChange() {
        setOpen(!open);
    }

    return (
        <div>
            <Accordion square expanded={open} onChange={handleChange}>
                <AccordionSummary>
                    <Typography>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{props.content}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}