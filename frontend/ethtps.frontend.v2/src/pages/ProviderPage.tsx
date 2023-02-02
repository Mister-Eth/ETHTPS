import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { Box, Paper, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { ProviderCarousel } from "../components/partials/navigation/ProviderCarousel"
import { ConditionalSkeletonRender } from "../Types"
import { ProviderDataChart } from "../components/charts/ProviderDataChart"
import { SocialMediaLinks } from "../components/stats/SocialMediaLinks"
import { ProviderModel } from "ethtps.api.client"

interface IProviderPageModel {
  provider?: string
}

export function ProviderPage(model: IProviderPageModel) {
  const location = useLocation()
  const [validProvider, setValidProvider] = useState(true)
  const [provider, setProvider] = useState<ProviderModel>()
  const providerName = location.pathname
    .toUpperCase()
    .replace("/PROVIDERS/", "")
  const providers = useGetProvidersFromAppStore()
  useEffect(() => {
    if (providers && providerName && !provider) {
      let x = providers.find(
        (y) => y.name?.toUpperCase() === providerName.toUpperCase(),
      )

      if (x) {
        // If we don't copy it, React calls this function again and again
        let p = {
          name: x?.name,
          type: x.type,
        }
        setProvider(p)
      }
    }
  }, [providers])
  return (
    <>
      <Paper sx={{ marginTop: "20px" }} elevation={1}>
        <Container maxWidth={"md"}>
          {ConditionalSkeletonRender(
            <ProviderCarousel provider={provider} />,
            provider !== undefined,
          )}
        </Container>
        <ProviderDataChart provider={provider?.name as string} />
        <Box className={"flexbox flex-horizontal spaced-vertically"}>
          <SocialMediaLinks providerName={provider?.name as string} />
          <Paper key={"markdown section"} elevation={1}>
            <Typography className={"w-hundred"}>
              This establishes the main-axis, thus defining the direction flex
              items are placed in the flex container. Flexbox is (aside from
              optional wrapping) a single-direction layout concept. Think of
              flex items as primarily laying out either in horizontal rows or
              vertical columns.
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </>
  )
}
