import { Edit, Link } from "@mui/icons-material"
import { Box, Chip, Paper, Tooltip, Typography } from "@mui/material"
import { Fragment, useEffect } from "react"
import { useState } from "react"
import { ConditionalSkeletonRender, ConditionalRender } from "../../Types"
import { useGetQueryWithAutoRefetch } from "../../hooks/QueryHooks"
import { api } from "../../services/DependenciesIOC"
import { SocialMediaChipCollection } from "./SocialMediaChip"

interface ISocialMediaLinksConfiguration {
  providerName: string
}

export function SocialMediaLinks(config: ISocialMediaLinksConfiguration) {
  const links = useGetQueryWithAutoRefetch(`${config.providerName} links`, () =>
    api.getLinksForProvider(config.providerName),
  )

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
                title={<Typography>Something's wrong?</Typography>}
                arrow
              >
                <Edit />
              </Tooltip>,
              links !== undefined,
            )}
            onDelete={() => {}}
            className={"spaced-vertically"}
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: "1.25em" }}>
                Links
              </Typography>
            }
            //variant="outlined"
            color="primary"
            sx={{
              marginBottom: "1em",
            }}
          />

          {ConditionalSkeletonRender(
            <SocialMediaChipCollection links={links} />,
            links !== undefined,
          )}
        </Box>
      </Paper>
    </Fragment>
  )
}
