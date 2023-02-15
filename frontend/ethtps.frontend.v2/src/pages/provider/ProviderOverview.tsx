import { Paper, Container, Box, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
import { ConditionalSkeletonRender } from "../../Types"
import { ProviderDataChart } from "../../components/charts/ProviderDataChart"
import { ProviderCarousel } from "../../components/partials/navigation/ProviderCarousel"
import { SocialMediaLinks } from "../../components/stats/SocialMediaLinks"

import { useGetQueryWithAutoRefetch } from "../../hooks/QueryHooks"
import { api } from "../../services/DependenciesIOC"

export function ProviderOverview(model: IProviderPageModel) {
  const markdown = useGetQueryWithAutoRefetch(
    `${model.provider} markdown`,
    () => api.getMarkdownInfoPageFor(model.provider as string),
  )
  return (
    <>
      <Paper sx={{ marginTop: "20px" }} elevation={1}>
        <ProviderDataChart provider={model.provider as string} />
        <Box className={"flexbox flex-horizontal spaced-vertically"}>
          <SocialMediaLinks providerName={model.provider as string} />
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
                  No data available for {model.provider}
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
