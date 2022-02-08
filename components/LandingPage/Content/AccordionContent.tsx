import React, { FC } from "react";
import { AccordionData } from "../../../data/accordiondata";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const AccordionContent: FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {AccordionData.map((accordionDatum) => {
        return (
          <div key={accordionDatum.id}>
            <Accordion
              expanded={expanded === accordionDatum.panel}
              onChange={handleChange(accordionDatum.panel)}
              sx={{
                background: "#000000",
                margin: "0.75em 0em",
              }}
              aria-controls="panel-content"
              id="panel-header"
            >
              <AccordionSummary
                expandIcon={
                  expanded === accordionDatum.panel ? (
                    <CloseIcon sx={{ color: "#fff", fontSize: "2.3rem" }} />
                  ) : (
                    <AddIcon sx={{ color: "#fff", fontSize: "2.3rem" }} />
                  )
                }
                sx={{ background: "#303030" }}
              >
                <Typography
                  sx={{
                    fontSize: "1.6rem",
                    marginLeft: "0.25em",
                    flexBasis: "90%",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {accordionDatum.heading}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#303030",
                  padding: "1em",
                }}
              >
                <Typography sx={{ fontSize: "1.35rem", color: "#fff" }}>
                  {accordionDatum.details}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </>
  );
};

export default AccordionContent;
