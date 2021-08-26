import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AccordionData } from "../../../data/accordiondata";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "min(85%, 60em)",
      marginTop: "2em",
      marginBottom: "3em",
    },
    main: {
      background: "#000000",
      margin: "0.75em 0em",
    },
    heading: {
      fontSize: theme.typography.pxToRem(25),
      marginLeft: "0.25em",
      flexBasis: "90%",
      flexShrink: 0,
    },
    icon: {
      color: "#fff",
    },
    summary: {
      background: "#303030",
      color: "#fff",
    },
    details: {
      background: "#303030",
      fontSize: theme.typography.pxToRem(25),
    },
    detailsContent: {
      fontSize: theme.typography.pxToRem(22),
      color: "#fff",
    },
  })
);

const AccordionContent: FC = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <div className={classes.root}>
        {AccordionData.map((accordionDatum) => {
          return (
            <div key={accordionDatum.id}>
              <Accordion
                expanded={expanded === accordionDatum.panel}
                onChange={handleChange(accordionDatum.panel)}
                className={classes.main}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <AccordionSummary
                  expandIcon={
                    expanded === accordionDatum.panel ? (
                      <CloseIcon
                        className={classes.icon}
                        style={{ fontSize: 35 }}
                      />
                    ) : (
                      <AddIcon
                        className={classes.icon}
                        style={{ fontSize: 35 }}
                      />
                    )
                  }
                  className={classes.summary}
                >
                  <Typography className={classes.heading}>
                    {accordionDatum.heading}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <Typography className={classes.detailsContent}>
                    {accordionDatum.details}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AccordionContent;
