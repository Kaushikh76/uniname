interface SeoMetricsProps {
  seoData: any
}

export function SeoMetrics({ seoData }: SeoMetricsProps) {
  console.log("[v0] SEO Data received:", seoData)
  console.log("[v0] Keywords object:", seoData?.keywords)
  console.log("[v0] Related Keywords full object:", seoData?.keywords?.relatedKeywords)
  console.log("[v0] Related Keywords array:", seoData?.keywords?.relatedKeywords?.relatedKeywords)
  console.log("[v0] Whois object:", seoData?.whois)
  console.log("[v0] Whois metrics:", seoData?.whois?.metrics)

  if (!seoData) return null

  const { keywords, whois } = seoData
  const metrics = whois?.metrics

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold border-b-4 border-foreground pb-2">seo metrics</h2>

      {(keywords?.rankedKeywords || metrics) && (
        <div className="border-4 border-foreground p-6 space-y-6">
          <h3 className="text-lg font-bold">overview</h3>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <div className="text-muted-foreground">total keywords</div>
              <div className="text-3xl font-bold dithered">
                {keywords?.rankedKeywords?.totalKeywords?.toLocaleString() ||
                  metrics?.organic?.keywordCount?.toLocaleString() ||
                  0}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-muted-foreground">estimated traffic</div>
              <div className="text-3xl font-bold dithered">
                {Math.round(
                  keywords?.rankedKeywords?.estimatedTraffic || metrics?.organic?.estimatedTraffic || 0,
                ).toLocaleString()}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-muted-foreground">organic positions</div>
              <div className="text-3xl font-bold dithered">{metrics?.organic?.positions?.toLocaleString() || 0}</div>
            </div>
          </div>

          {metrics?.paid && (
            <div className="border-t-2 border-foreground pt-4">
              <h4 className="font-bold text-sm mb-3">paid advertising</h4>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="text-muted-foreground">paid keywords</div>
                  <div className="text-2xl font-bold dithered">{metrics.paid.keywordCount?.toLocaleString() || 0}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground">paid traffic</div>
                  <div className="text-2xl font-bold dithered">
                    {Math.round(metrics.paid.estimatedTraffic || 0).toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground">paid positions</div>
                  <div className="text-2xl font-bold dithered">{metrics.paid.positions?.toLocaleString() || 0}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {(keywords?.rankedKeywords?.keywords?.length > 0 || keywords?.relatedKeywords?.relatedKeywords?.length > 0) && (
        <div className="border-4 border-foreground p-6 space-y-6">
          <h3 className="text-lg font-bold">keywords</h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Top Keywords */}
            {keywords?.rankedKeywords?.keywords?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm border-b-2 border-foreground pb-2">
                  top ranked ({keywords.rankedKeywords.keywords.slice(0, 5).length})
                </h4>
                <div className="space-y-2">
                  {keywords.rankedKeywords.keywords.slice(0, 5).map((kw: any, index: number) => (
                    <div key={index} className="border-2 border-foreground p-3 bg-background">
                      <div className="space-y-2 text-sm">
                        <div className="font-bold font-mono">{kw.keyword}</div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            position: <span className="font-bold text-foreground">#{kw.position}</span>
                          </span>
                          <span className="text-muted-foreground">
                            volume:{" "}
                            <span className="font-bold text-foreground">{kw.searchVolume?.toLocaleString() || 0}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {keywords?.relatedKeywords?.relatedKeywords?.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm border-b-2 border-foreground pb-2">
                  related ({keywords.relatedKeywords.relatedKeywords.slice(0, 5).length})
                  {keywords.relatedKeywords.seedKeyword && (
                    <span className="text-xs text-muted-foreground ml-2">
                      seed: {keywords.relatedKeywords.seedKeyword}
                    </span>
                  )}
                </h4>
                <div className="space-y-2">
                  {keywords.relatedKeywords.relatedKeywords.slice(0, 5).map((kw: any, index: number) => (
                    <div key={index} className="border-2 border-foreground p-3 bg-background">
                      <div className="space-y-2 text-sm">
                        <div className="font-bold font-mono">{kw.keyword}</div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            volume:{" "}
                            <span className="font-bold text-foreground">{kw.searchVolume?.toLocaleString() || 0}</span>
                          </span>
                          <span className="text-muted-foreground">
                            cpc: <span className="font-bold text-foreground">${kw.cpc?.toFixed(2) || "0.00"}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {whois && (
        <div className="border-4 border-foreground p-6 space-y-6">
          <h3 className="text-lg font-bold">whois information</h3>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-muted-foreground">created date</div>
                <div className="font-bold text-lg">{new Date(whois.createdDate).toLocaleDateString()}</div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground">domain age</div>
                <div className="font-bold text-lg">
                  {Math.floor((Date.now() - new Date(whois.createdDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                </div>
              </div>
            </div>

            {whois.backlinks && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-muted-foreground">total backlinks</div>
                  <div className="font-bold text-lg">{whois.backlinks.totalBacklinks?.toLocaleString() || 0}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground">referring domains</div>
                  <div className="font-bold text-lg">{whois.backlinks.referringDomains?.toLocaleString() || 0}</div>
                </div>
              </div>
            )}
          </div>

          {metrics?.organic && (
            <div className="border-t-2 border-foreground pt-4 space-y-3">
              <h4 className="font-bold">additional metrics</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">organic keywords</div>
                  <div className="font-bold">{metrics.organic.keywordCount?.toLocaleString() || 0}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">organic traffic</div>
                  <div className="font-bold">{Math.round(metrics.organic.estimatedTraffic || 0).toLocaleString()}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">organic cost</div>
                  <div className="font-bold">
                    ${Math.round(metrics.organic.estimatedTraffic * 0.5 || 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
