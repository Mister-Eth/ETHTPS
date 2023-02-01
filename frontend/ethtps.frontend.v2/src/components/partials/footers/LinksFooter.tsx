export function LinksFooter(): JSX.Element {
  return (
    <>
      <div className="bottomnavbar">
        <a href="/Status">Status</a>
        <div className={"inline"} style={{ marginRight: "10px" }} />
        <a href="https://api.ethtps.info/API/v2/AllData">Download data</a>
      </div>
      <hr />
    </>
  )
}
