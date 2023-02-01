import { Home } from "@mui/icons-material"
import { Alert, AlertTitle, Button, Container, Typography } from "@mui/material"
import { Fragment } from "react"

export function FourOhFour() {
  return (
    <Fragment>
      <Container
        sx={{
          position: "center",
          width: "50%",
        }}
      >
        <Alert severity="error">
          <AlertTitle>404</AlertTitle>
          <Typography>Page not found</Typography>
          <br />
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outlined"
            startIcon={<Home />}
          >
            Go back
          </Button>
        </Alert>
      </Container>
    </Fragment>
  )
}
