import { Chip, Typography } from "@mui/material"
import { ProviderExternalWebsite } from "ethtps.api.client"
import { Fragment } from "react"

interface ISocialMediaChipConfiguration {
  href?: string | null
  websiteName?: string | null
}

export function SocialMediaChipCollection(config: {
  links?: ProviderExternalWebsite[] | undefined
}) {
  const links = config.links
  if (links === undefined || links.length === 0)
    return (
      <Fragment>
        <Chip
          className="spaced-vertically"
          label={
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.25em",
              }}
            >
              {"No data available"}
            </Typography>
          }
          variant="outlined"
          color="primary"
        />
      </Fragment>
    )

  return (
    <Fragment>
      {links?.map((x, i) => (
        <SocialMediaChip key={i} href={x.url} websiteName={x.websiteName} />
      ))}
    </Fragment>
  )
}

export function SocialMediaChip(config: ISocialMediaChipConfiguration) {
  return (
    <Chip
      className="spaced-vertically"
      label={
        <Typography sx={{ fontWeight: "bold", fontSize: "1.25em" }}>
          {config.websiteName}
        </Typography>
      }
      //variant="outlined"
      color="primary"
      sx={{
        marginTop: "1em",
      }}
    />
  )
}
