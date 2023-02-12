import { ProviderOverview } from "./ProviderOverview"
import { Tabs, Tab, Box, Typography, Paper, Container } from "@mui/material"
import { ProviderModel } from "ethtps.api.client"
import { useState, useEffect } from "react"
import { useLocation } from "react-router"
import { useGetProvidersFromAppStore } from "../../hooks/ProviderHooks"
import { TabPanelProps, a11yProps } from "../../components/tab panel/TabPanel"
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
export function ProviderPage(model: IProviderPageModel) {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
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
  return (
    <>
      <Container maxWidth={"lg"}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Details" {...a11yProps(1)} />
            <Tab label="Analysis" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ProviderOverview provider={provider?.name as string} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Container>
    </>
  )
}
