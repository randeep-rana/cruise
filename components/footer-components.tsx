import Link from "next/link"

import styles from "./footer.module.css"
import { List } from "./ui/typography"

const StyledTitle = ({ title }) => {
  return <h3 className="pb-4 text-left text-2xl font-semibold"> {title}</h3>
}
const StyledLink = ({ data, external = false }) => {
  return (
    <li>
      {external ? (
        <a aria-label={data.title} href={`${data.href}`} target={"_blank"} rel={data.href.startsWith("http") ? "noopener noreferrer" : ""}>
          {data.title}
        </a>
      ) : (
        <Link href={`${data.href}`}>{data.title}</Link>
      )}
    </li>
  )
}
const renderLinks = (arrayLinks: any[], extenal = false) => {
  return (
    <List className="ml-0 mt-0 flex list-none flex-col [&>li]:mt-0 [&>li]:mb-2">
      {arrayLinks.map((u, index) => (
        <StyledLink data={u} key={index} external={extenal} />
      ))}
    </List>
  )
}
export const AboutUS = ({ about }) => {
  const { title, description } = about
  return (
    <div>
      <StyledTitle title={title} />
      <p>{description}</p>
    </div>
  )
}

export const Utilities = ({ utilities }) => {
  const { title, links } = utilities
  return (
    <div>
      <StyledTitle title={title} />
      {renderLinks(links, true)}
    </div>
  )
}

export const Links = ({ externalLinks }) => {
  const { title, links } = externalLinks
  return (
    <div>
      <StyledTitle title={title} />
      {renderLinks(links, true)}
    </div>
  )
}
const ContactInfo = ({ title, ...rest }) => {
  const allkeys = Object.keys(rest)

  return (
    <div>
      <StyledTitle title={title} />
      <div className={styles._container}>
        {allkeys.map((k, index) => (
          <p key={index}>{rest[k]}</p>
        ))}
      </div>
    </div>
  )
}

export const GetInTouch = ({ contact }) => {
  return <ContactInfo {...contact} />
}
