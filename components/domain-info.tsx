interface DomainInfoProps {
  info: any
  whois: any
}

export function DomainInfo({ info, whois }: DomainInfoProps) {
  if (!info && !whois) return null

  return (
    <div className="grid grid-cols-2 gap-4">
      {info && (
        <div className="border-4 border-foreground p-6 space-y-4">
          <h3 className="text-xl font-bold border-b-2 border-foreground pb-2">domain status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">tokenized:</span>
              <span className="font-bold">{info.isTokenized ? "yes" : "no"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">domain:</span>
              <span className="font-bold">{info.domain}</span>
            </div>
          </div>
        </div>
      )}

      {whois && (
        <div className="border-4 border-foreground p-6 space-y-4">
          <h3 className="text-xl font-bold border-b-2 border-foreground pb-2">whois data</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">created:</span>
              <span className="font-bold">{new Date(whois.createdDate).getFullYear()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">referring domains:</span>
              <span className="font-bold">{whois.backlinks?.referringDomains?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
