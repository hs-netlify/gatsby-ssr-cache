import * as React from "react"

const SSRPage = props => (
  <main>
    <pre>
      SSR Page for {props.id} - time is {props.serverData.time}
    </pre>{" "}
    <img alt="Happy dog" src={props.serverData.message} />
  </main>
)

export default SSRPage

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`)

    if (!res.ok) {
      throw new Error(`Response failed`)
    }

    return {
      props: { ...(await res.json()), time: Date.now() },
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
