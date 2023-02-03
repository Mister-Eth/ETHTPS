import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { Box, Paper, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { ProviderCarousel } from "../components/partials/navigation/ProviderCarousel"
import { ConditionalSkeletonRender, ConditionalRender } from "../Types"
import { ProviderDataChart } from "../components/charts/ProviderDataChart"
import { SocialMediaLinks } from "../components/stats/SocialMediaLinks"
import { ProviderModel } from "ethtps.api.client"
import { config } from "process"
import { useGetQueryWithAutoRefetch } from "../hooks/QueryHooks"
import { api } from "../services/DependenciesIOC"
import ReactMarkdown from "react-markdown"

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
    .replace("%20", " ")
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

  const markdown = useGetQueryWithAutoRefetch(
    `${provider?.name} markdown`,
    () => api.getMarkdownInfoPageFor(provider?.name as string),
  )

  return (
    <>
      <Paper sx={{ marginTop: "20px" }} elevation={1}>
        <Paper elevation={1}>
          <Container>
            <ProviderCarousel provider={provider} />
          </Container>
        </Paper>
        <ProviderDataChart provider={provider?.name as string} />
        <Box className={"flexbox flex-horizontal spaced-vertically"}>
          <SocialMediaLinks providerName={provider?.name as string} />
          <Paper
            key={"markdown section"}
            elevation={1}
            sx={{
              padding: "20px",
              marginRight: "20px",
              width: "90%",
            }}
          >
            {markdown?.length === 0 ? (
              <>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  No data available for {provider?.name}
                </Typography>
                <Typography>
                  If you want to help, click the edit button and suggest some
                  changes. Any help is greatly appreciated :)
                </Typography>
              </>
            ) : (
              ConditionalSkeletonRender(
                <ReactMarkdown
                  children={
                    markdown?.map((x) => x.rawMarkdown).join("\r\n") as string
                  }
                />,
                markdown !== undefined,
              )
            )}
          </Paper>
        </Box>
      </Paper>
    </>
  )
}
