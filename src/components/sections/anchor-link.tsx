export interface AnchorLinkProps {
  anchorId?: string;
}

export function AnchorLink({ anchorId = "anchor-link" }: AnchorLinkProps) {
  return <div id={anchorId} />;
}
