import { Edit, Link } from "@mui/icons-material"
import { Box, Chip, Paper, Tooltip, Typography } from "@mui/material"
import { Fragment } from "react"
import { useState } from "react"
import { ConditionalSkeletonRender, ConditionalRender } from "../../Types"

interface ISocialMediaLinksConfiguration {
  providerName?: string
}

export function SocialMediaLinks(config: ISocialMediaLinksConfiguration) {
  const [loaded, setLoaded] = useState(false)
  return (
    <Fragment>
      <Paper
        className={"spaced-vertically spaced-horizontally"}
        sx={{
          width: "250px",
        }}
        elevation={1}
      >
        <Box
          className={"box w-hundred flex-vertical"}
          sx={{
            border: "0px solid",
            borderColor: "secondary.main",
            borderRadius: "20px",
          }}
        >
          <Chip
            icon={<Link />}
            deleteIcon={ConditionalRender(
              <Tooltip
                placement="top"
                title={<Typography>Propose changes</Typography>}
                arrow
              >
                <Edit />
              </Tooltip>,
              loaded,
            )}
            onDelete={() => {}}
            className={"spaced-vertically"}
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: "1.25em" }}>
                Social media
              </Typography>
            }
            //variant="outlined"
            color="primary"
          />

          {ConditionalSkeletonRender(
            <Chip
              className="spaced-vertically"
              label={
                <Typography sx={{ fontWeight: "bold", fontSize: "1.25em" }}>
                  Social media
                </Typography>
              }
              variant="outlined"
              color="primary"
            />,
            loaded,
          )}
        </Box>
      </Paper>
    </Fragment>
  )
}
