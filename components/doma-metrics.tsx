interface DomaMetricsProps {
  domaInfo: any
  topTlds: any[]
  domain: string
}

export function DomaMetrics({ domaInfo, topTlds, domain }: DomaMetricsProps) {
  const domainWithoutTld = domain?.split(".")[0] || domain

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold border-b-4 border-foreground pb-2">doma metrics</h2>

      {domaInfo?.isTokenized ? (
        <div className="space-y-4">
          <div className="border-4 border-foreground p-6 space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold">tokenization status</h3>
              <span className="px-3 py-1 bg-foreground text-background text-xs font-bold">tokenized</span>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <div className="text-muted-foreground">domain</div>
                <div className="font-bold break-all">{domaInfo.domain}</div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground">expires at</div>
                <div className="font-bold">{new Date(domaInfo.expiresAt).toLocaleDateString()}</div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground">network id</div>
                <div className="font-bold font-mono text-xs">{domaInfo.networkId}</div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground">token id</div>
                <div className="font-bold font-mono text-xs break-all">{domaInfo.tokenId}</div>
              </div>
            </div>

            <div className="border-t-2 border-foreground pt-4 space-y-2">
              <div className="text-muted-foreground text-sm">owner</div>
              <div className="font-bold font-mono text-xs break-all">{domaInfo.owner}</div>
            </div>

            {domaInfo.listings && domaInfo.listings.length > 0 && (
              <div className="border-t-2 border-foreground pt-4 space-y-3">
                <h4 className="font-bold">active listings ({domaInfo.listings.length})</h4>
                {domaInfo.listings.map((listing: any, index: number) => (
                  <div key={listing.id || index} className="border-2 border-foreground p-3 space-y-2 halftone">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="text-muted-foreground">price</div>
                        <div className="text-xl font-bold">
                          {listing.price} {listing.currency}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-muted-foreground">orderbook</div>
                        <div className="font-bold">{listing.orderbook}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-muted-foreground">listing id</div>
                        <div className="font-bold">#{listing.id}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-muted-foreground">expires</div>
                        <div className="font-bold">{new Date(listing.expiresAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {domaInfo.activities && domaInfo.activities.length > 0 && (
              <div className="border-t-2 border-foreground pt-4 space-y-3">
                <h4 className="font-bold">activity history ({domaInfo.activities.length})</h4>
                {domaInfo.activities.map((activity: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm border-b border-foreground pb-2"
                  >
                    <div className="space-y-1">
                      <div className="font-bold">{activity.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(activity.createdAt).toLocaleString()}
                      </div>
                    </div>
                    {activity.price && <div className="font-bold">{activity.price} ETH</div>}
                  </div>
                ))}
              </div>
            )}

            <a
              href={`https://dashboard-testnet.doma.xyz/domain/${domaInfo.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border-4 border-foreground p-4 text-center font-bold hover:bg-foreground hover:text-background transition-colors"
            >
              view on doma dashboard →
            </a>
          </div>
        </div>
      ) : (
        <div className="border-4 border-foreground p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">tokenization status</h3>
            <span className="px-3 py-1 border-2 border-foreground text-xs font-bold">not tokenized</span>
          </div>
          <p className="text-sm leading-relaxed">
            this domain is not currently tokenized on the doma protocol. you can search for it or tokenize it on
            interstellar.
          </p>
          <a
            href={`https://testnet.interstellar.xyz/search?query=${domainWithoutTld}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border-4 border-foreground p-4 text-center font-bold hover:bg-foreground hover:text-background transition-colors"
          >
            search on interstellar →
          </a>
        </div>
      )}

      {topTlds && topTlds.length > 0 && (
        <div className="border-4 border-foreground p-6 space-y-4">
          <h3 className="text-lg font-bold">top tlds by volume</h3>
          <div className="space-y-2">
            {topTlds.map((tld: any, index: number) => (
              <div key={index} className="border-2 border-foreground p-3 halftone">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">tld</div>
                    <div className="text-xl font-bold">{tld.tld}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">listings</div>
                    <div className="font-bold">{tld.listingCount?.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">total volume</div>
                    <div className="font-bold">
                      {tld.totalVolume} {tld.currency}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">avg price</div>
                    <div className="font-bold">
                      {(tld.totalVolume / tld.listingCount).toFixed(4)} {tld.currency}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
