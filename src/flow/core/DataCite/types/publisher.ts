/** Publisher | Mandatory | The name of the entity that holds, archives, publishes, prints, distributes, releases, issues, or produces the resource. This property will be used to formulate the citation, so consider the prominence of the role. */

export type dcPublisher = {
  /** The name of the publisher */
  name: string;
  /** Uniquely identifies the publisher, according to various schemes */
  publisherIdentifier?: string;
  /** The name of the publisher identifier scheme. */
  publisherIdentifierScheme?: string;
  /** The URI of the publisher identifier scheme. */
  schemeURI?: string;
}
